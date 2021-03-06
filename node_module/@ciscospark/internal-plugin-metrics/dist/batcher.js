'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _apply = require('babel-runtime/core-js/reflect/apply');

var _apply2 = _interopRequireDefault(_apply);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _sparkCore = require('@ciscospark/spark-core');

var _commonTimers = require('@ciscospark/common-timers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

var sym = (0, _symbol2.default)('metric id');

var MetricsBatcher = _sparkCore.Batcher.extend({
  namespace: 'Metrics',

  prepareItem: function prepareItem(item) {
    // Keep non-prod data out of metrics
    var env = process.env.NODE_ENV === 'production' ? null : 'TEST';

    item.appType = item.appType || this.config.appType;
    item.env = item.env || env;
    item.time = item.time || Date.now();
    item.version = item.version || this.spark.version;

    return _promise2.default.resolve(item);
  },
  prepareRequest: function prepareRequest(queue) {
    return _promise2.default.resolve(queue.map(function (item) {
      item.postTime = item.postTime || Date.now();
      return item;
    }));
  },
  submitHttpRequest: function submitHttpRequest(payload) {
    return this.spark.request({
      method: 'POST',
      service: 'metrics',
      resource: 'metrics',
      body: {
        metrics: payload
      }
    });
  },
  handleHttpSuccess: function handleHttpSuccess(res) {
    var _this = this;

    return _promise2.default.all(res.options.body.metrics.map(function (item) {
      return _this.acceptItem(item);
    }));
  },
  handleHttpError: function handleHttpError(reason) {
    var _this2 = this;

    if (reason instanceof _sparkCore.SparkHttpError.NetworkOrCORSError) {
      this.logger.warn('metrics-batcher: received network error submitting metrics, reenqueuing payload');
      return _promise2.default.all(reason.options.body.metrics.map(function (item) {
        return new _promise2.default(function (resolve) {
          var delay = item[sym].nextDelay;
          if (delay < _this2.config.batcherRetryPlateau) {
            item[sym].nextDelay *= 2;
          }
          (0, _commonTimers.safeSetTimeout)(function () {
            resolve(_this2.rerequest(item));
          }, delay);
        });
      }));
    }

    return (0, _apply2.default)(_sparkCore.Batcher.prototype.handleHttpError, this, [reason]);
  },
  rerequest: function rerequest(item) {
    var _this3 = this;

    return _promise2.default.all([this.getDeferredForRequest(item), this.prepareItem(item)]).then(function (_ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          defer = _ref2[0],
          req = _ref2[1];

      _this3.enqueue(req).then(function () {
        return _this3.bounce();
      }).catch(function (reason) {
        return defer.reject(reason);
      });
    });
  },
  fingerprintRequest: function fingerprintRequest(item) {
    item[sym] = item[sym] || {
      nextDelay: 1000
    };

    return _promise2.default.resolve(item[sym]);
  },
  fingerprintResponse: function fingerprintResponse(item) {
    return _promise2.default.resolve(item[sym]);
  }
});

exports.default = MetricsBatcher;
//# sourceMappingURL=batcher.js.map
