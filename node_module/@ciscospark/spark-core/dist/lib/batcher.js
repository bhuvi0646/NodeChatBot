'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _sparkPlugin = require('./spark-plugin');

var _sparkPlugin2 = _interopRequireDefault(_sparkPlugin);

var _common = require('@ciscospark/common');

var _sparkHttpError = require('./spark-http-error');

var _sparkHttpError2 = _interopRequireDefault(_sparkHttpError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base class for coalescing requests to batched APIs
 * @class Batcher
 */
var Batcher = _sparkPlugin2.default.extend({
  session: {
    deferreds: {
      type: 'object',
      default: function _default() {
        return new _map2.default();
      }
    },
    queue: {
      type: 'array',
      default: function _default() {
        return [];
      }
    }
  },

  derived: {
    bounce: {
      fn: function fn() {
        var _this = this;

        return (0, _common.cappedDebounce)(function () {
          return _this.executeQueue.apply(_this, arguments);
        }, this.config.batcherWait, {
          maxCalls: this.config.batcherMaxCalls,
          maxWait: this.config.batcherMaxWait
        });
      }
    }
  },

  /**
   * Requests an item from a batched API
   * @param {Object} item
   * @returns {Promise<mixed>}
   */
  request: function request(item) {
    var _this2 = this;

    // So far, I can't find a way to avoid three layers of nesting here.
    /* eslint max-nested-callbacks: [0] */
    var defer = new _common.Defer();
    this.fingerprintRequest(item).then(function (idx) {
      if (_this2.deferreds.has(idx)) {
        defer.resolve(_this2.deferreds.get(idx).promise);
        return;
      }
      _this2.deferreds.set(idx, defer);
      _this2.prepareItem(item).then(function (req) {
        defer.promise = defer.promise.then((0, _common.tap)(function () {
          return _this2.deferreds.delete(idx);
        })).catch(function (reason) {
          _this2.deferreds.delete(idx);
          return _promise2.default.reject(reason);
        });

        _this2.enqueue(req).then(function () {
          return _this2.bounce();
        }).catch(function (reason) {
          return defer.reject(reason);
        });
      }).catch(function (reason) {
        return defer.reject(reason);
      });
    }).catch(function (reason) {
      return defer.reject(reason);
    });

    return defer.promise;
  },


  /**
   * Adds an item to the queue.
   * Intended to be overridden
   * @param {mixed} req
   * @returns {Promise<undefined>}
   */
  enqueue: function enqueue(req) {
    this.queue.push(req);
    return _promise2.default.resolve();
  },


  /**
   * Transform the item before adding it to the queue
   * Intended to be overridden
   * @param {mixed} item
   * @returns {Promise<mixed>}
   */
  prepareItem: function prepareItem(item) {
    return _promise2.default.resolve(item);
  },


  /**
   * Detaches the current queue, does any appropriate transforms, and submits it
   * to the API.
   * @returns {Promise<undefined>}
   */
  executeQueue: function executeQueue() {
    var _this3 = this;

    var queue = this.queue.splice(0, this.config.batcherMaxCalls);
    return new _promise2.default(function (resolve) {
      resolve(_this3.prepareRequest(queue).then(function (payload) {
        return _this3.submitHttpRequest(payload).then(function (res) {
          return _this3.handleHttpSuccess(res);
        });
      }).catch(function (reason) {
        if (reason instanceof _sparkHttpError2.default) {
          return _this3.handleHttpError(reason);
        }

        return _promise2.default.all(queue.map(function (item) {
          return _this3.getDeferredForRequest(item).then(function (defer) {
            defer.reject(reason);
          });
        }));
      }));
    }).catch(function (reason) {
      _this3.logger.error(process.env.NODE_ENV === 'production' ? reason : reason.stack);
      return _promise2.default.reject(reason);
    });
  },


  /**
   * Performs any final transforms on the queue before submitting it to the API
   * Intended to be overridden
   * @param {Object|Array} queue
   * @returns {Promise<Object>}
   */
  prepareRequest: function prepareRequest(queue) {
    return _promise2.default.resolve(queue);
  },


  /**
   * Submits the prepared request body to the API.
   * This method *must* be overridden
   * @param {Object} payload
   * @returns {Promise<HttpResponseObject>}
   */
  // eslint-disable-next-line no-unused-vars
  submitHttpRequest: function submitHttpRequest(payload) {
    throw new Error('request() must be implemented');
  },


  /**
   * Actions taken when the http request returns a success
   * Intended to be overridden
   * @param {Promise<HttpResponseObject>} res
   * @returns {Promise<undefined>}
   */
  handleHttpSuccess: function handleHttpSuccess(res) {
    var _this4 = this;

    return _promise2.default.all((res.body && res.body.items || res.body).map(function (item) {
      return _this4.acceptItem(item);
    }));
  },


  /**
   * Actions taken when the http request returns a failure. Typically, this
   * means failing the entire queue, but could be overridden in some
   * implementations to e.g. reenqueue.
   * Intended to be overridden
   * @param {SparkHttpError} reason
   * @returns {Promise<undefined>}
   */
  handleHttpError: function handleHttpError(reason) {
    var _this5 = this;

    if (reason instanceof _sparkHttpError2.default) {
      if ((0, _has3.default)(reason, 'options.body.map')) {
        return _promise2.default.all(reason.options.body.map(function (item) {
          return _this5.getDeferredForRequest(item).then(function (defer) {
            defer.reject(reason);
          });
        }));
      }
    }
    this.logger.error('http error handler called without a SparkHttpError object', reason);
    return _promise2.default.reject(reason);
  },


  /**
   * Determines if the item succeeded or failed and delegates accordingly
   * @param {Object} item
   * @returns {Promise<undefined>}
   */
  acceptItem: function acceptItem(item) {
    var _this6 = this;

    return this.didItemFail(item).then(function (didFail) {
      if (didFail) {
        return _this6.handleItemFailure(item);
      }
      return _this6.handleItemSuccess(item);
    });
  },


  /**
   * Indicates if the specified response item implies a success or a failure
   * Intended to be overridden
   * @param {Object} item
   * @returns {Promise<Boolean>}
   */
  // eslint-disable-next-line no-unused-vars
  didItemFail: function didItemFail(item) {
    return _promise2.default.resolve(false);
  },


  /**
   * Finds the Defer for the specified item and rejects its promise
   * Intended to be overridden
   * @param {Object} item
   * @returns {Promise<undefined>}
   */
  handleItemFailure: function handleItemFailure(item) {
    return this.getDeferredForResponse(item).then(function (defer) {
      defer.reject(item);
    });
  },


  /**
   * Finds the Defer for the specified item and resolves its promise
   * Intended to be overridden
   * @param {Object} item
   * @returns {Promise<undefined>}
   */
  handleItemSuccess: function handleItemSuccess(item) {
    return this.getDeferredForResponse(item).then(function (defer) {
      defer.resolve(item);
    });
  },


  /**
   * Returns the Deferred for the specified request item
   * @param {Object} item
   * @returns {Promise<Defer>}
   */
  getDeferredForRequest: function getDeferredForRequest(item) {
    var _this7 = this;

    return this.fingerprintRequest(item).then(function (idx) {
      var defer = _this7.deferreds.get(idx);
      /* istanbul ignore if */
      if (!defer) {
        throw new Error('Could not find pending request for received response');
      }
      return defer;
    });
  },


  /**
   * Returns the Deferred for the specified response item
   * @param {Object} item
   * @returns {Promise<Defer>}
   */
  getDeferredForResponse: function getDeferredForResponse(item) {
    var _this8 = this;

    return this.fingerprintResponse(item).then(function (idx) {
      var defer = _this8.deferreds.get(idx);
      /* istanbul ignore if */
      if (!defer) {
        throw new Error('Could not find pending request for received response');
      }
      return defer;
    });
  },


  /**
   * Generates a unique identifier for the item in a request payload
   * Intended to be overridden
   * Note that overrides must return a primitive.
   * @param {Object} item
   * @returns {Promise<primitive>}
   */
  // eslint-disable-next-line no-unused-vars
  fingerprintRequest: function fingerprintRequest(item) {
    throw new Error('fingerprintRequest() must be implemented');
  },


  /**
   * Generates a unique identifier for the item in a response payload
   * Intended to be overridden
   * Note that overrides must return a primitive.
   * @param {Object} item
   * @returns {Promise<primitive>}
   */
  // eslint-disable-next-line no-unused-vars
  fingerprintResponse: function fingerprintResponse(item) {
    throw new Error('fingerprintResponse() must be implemented');
  },
  version: '1.32.23'
}); /*!
     * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
     */

exports.default = Batcher;
//# sourceMappingURL=batcher.js.map
