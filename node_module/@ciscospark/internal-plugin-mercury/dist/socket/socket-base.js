'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty = require('babel-runtime/core-js/reflect/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _defaults2 = require('lodash/defaults');

var _defaults3 = _interopRequireDefault(_defaults2);

var _events = require('events');

var _errors = require('../errors');

var _common = require('@ciscospark/common');

var _commonTimers = require('@ciscospark/common-timers');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sockets = new _weakMap2.default();

/**
 * Generalized socket abstraction
 */
/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

var Socket = function (_EventEmitter) {
  (0, _inherits3.default)(Socket, _EventEmitter);

  /**
   * constructor
   * @returns {Socket}
   */
  function Socket() {
    (0, _classCallCheck3.default)(this, Socket);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Socket.__proto__ || (0, _getPrototypeOf2.default)(Socket)).call(this));

    _this.onmessage = _this.onmessage.bind(_this);
    _this.onclose = _this.onclose.bind(_this);
    return _this;
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
   * @returns {string}
   */


  (0, _createClass3.default)(Socket, [{
    key: 'close',


    /**
     * Closes the socket
     * @param {Object} options
     * @param {string} options.reason
     * @param {number} options.code
     * @returns {Promise}
     */
    value: function close(options) {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        _this2.logger.info('socket: closing');
        var socket = sockets.get(_this2);
        if (socket.readyState === 2 || socket.readyState === 3) {
          _this2.logger.info('socket: already closed');
          resolve();
          return;
        }

        options = options || {};
        if (options.code && options.code !== 1000 && (options.code < 3000 || options.code > 4999)) {
          reject(new Error('`options.code` must be 1000 or between 3000 and 4999 (inclusive)'));
          return;
        }

        options = (0, _defaults3.default)(options, {
          code: 1000,
          reason: 'Done'
        });

        var closeTimer = (0, _commonTimers.safeSetTimeout)(function () {
          try {
            _this2.logger.info('socket: no close event received, forcing closure');
            resolve(_this2.onclose({
              code: 1000,
              reason: 'Done (forced)'
            }));
          } catch (error) {
            _this2.logger.warn('socket: force-close failed', error);
          }
        }, _this2.forceCloseDelay);

        socket.onclose = function (event) {
          _this2.logger.info('socket: close event fired', event.code, event.reason);
          clearTimeout(closeTimer);
          _this2.onclose(event);
          resolve(event);
        };

        socket.close(options.code, options.reason);
      });
    }

    /**
     * Opens a WebSocket
     * @param {string} url
     * @param {options} options
     * @param {number} options.forceCloseDelay (required)
     * @param {number} options.pingInterval (required)
     * @param {number} options.pongTimeout (required)
     * @param {string} options.token (required)
     * @param {string} options.trackingId (required)
     * @param {Logger} options.logger (required)
     * @param {string} options.logLevelToken
     * @returns {Promise}
     */

  }, {
    key: 'open',
    value: function open(url, options) {
      var _this3 = this;

      return new _promise2.default(function (resolve, reject) {
        /* eslint complexity: [0] */
        if (!url) {
          reject(new Error('`url` is required'));
          return;
        }

        if (sockets.get(_this3)) {
          reject(new Error('Socket#open() can only be called once per instance'));
          return;
        }

        options = options || {};

        (0, _common.checkRequired)(['forceCloseDelay', 'pingInterval', 'pongTimeout', 'token', 'trackingId', 'logger'], options);

        (0, _keys2.default)(options).forEach(function (key) {
          (0, _defineProperty2.default)(_this3, key, {
            enumerable: false,
            value: options[key]
          });
        });

        var WebSocket = Socket.getWebSocketConstructor();

        _this3.logger.info('socket: creating WebSocket');
        var socket = new WebSocket(url);
        socket.binaryType = 'arraybuffer';
        socket.onmessage = _this3.onmessage;

        socket.onclose = function (event) {
          event = _this3._fixCloseCode(event);
          switch (event.code) {
            case 1005:
              // IE 11 doesn't seem to allow 4XXX codes, so if we get a 1005, assume
              // it's a bad websocket url. That'll trigger a device refresh; if it
              // turns out we had a bad token, the device refresh should 401 and
              // trigger a token refresh.
              return reject(new _errors.UnknownResponse(event));
            case 4400:
              return reject(new _errors.BadRequest(event));
            case 4401:
              return reject(new _errors.NotAuthorized(event));
            case 4403:
              return reject(new _errors.Forbidden(event));
            // case 4404:
            //   return reject(new NotFound(event));
            default:
              return reject(new _errors.ConnectionError(event));
          }
        };

        socket.onopen = function () {
          _this3.logger.info('socket: connected');
          _this3._authorize().then(function () {
            _this3.logger.info('socket: authorized');
            socket.onclose = _this3.onclose;
            resolve();
          }).catch(reject);
        };

        socket.onerror = function (event) {
          _this3.logger.warn('socket: error event fired', event);
        };

        sockets.set(_this3, socket);
        _this3.logger.info('socket: waiting for server');
      });
    }

    /**
     * Handles incoming CloseEvents
     * @param {CloseEvent} event
     * @returns {undefined}
     */

  }, {
    key: 'onclose',
    value: function onclose(event) {
      this.logger.info('socket: closed', event.code, event.reason);
      clearTimeout(this.pongTimer);
      clearTimeout(this.pingTimer);

      event = this._fixCloseCode(event);
      this.emit('close', event);

      // Remove all listeners to (a) avoid reacting to late pongs and (b) ensure
      // we don't have a retain cycle.
      this.removeAllListeners();
    }

    /**
     * Handles incoming message events
     * @param {MessageEvent} event
     * @returns {undefined}
     */

  }, {
    key: 'onmessage',
    value: function onmessage(event) {
      try {
        var data = JSON.parse(event.data);
        var sequenceNumber = parseInt(data.sequenceNumber, 10);
        this.logger.debug('socket: sequence number: ', sequenceNumber);
        if (this.expectedSequenceNumber && sequenceNumber !== this.expectedSequenceNumber) {
          this.logger.debug('socket: sequence number mismatch indicates lost mercury message. expected: ' + this.expectedSequenceNumber + ', actual: ' + sequenceNumber);
          this.emit('sequence-mismatch', sequenceNumber, this.expectedSequenceNumber);
        }
        this.expectedSequenceNumber = sequenceNumber + 1;

        // Yes, it's a little weird looking; we want to emit message events that
        // look like normal socket message events, but event.data cannot be
        // modified and we don't actually care about anything but the data property
        var processedEvent = { data: data };
        this._acknowledge(processedEvent);
        if (data.type === 'pong') {
          this.emit('pong', processedEvent);
        } else {
          this.emit('message', processedEvent);
        }
      } catch (error) {
        // The above code should only be able to throw if we receive an unparsable
        // message from Mercury. At this time, the only action we have is to
        // ignore it and move on.
        /* istanbul ignore next */
        this.logger.warn('socket: error while receiving WebSocket message', error);
      }
    }

    /**
     * Sends a message up the socket
     * @param {mixed} data
     * @returns {Promise}
     */

  }, {
    key: 'send',
    value: function send(data) {
      var _this4 = this;

      return new _promise2.default(function (resolve, reject) {
        if (_this4.readyState !== 1) {
          return reject(new Error('INVALID_STATE_ERROR'));
        }

        if ((0, _isObject3.default)(data)) {
          data = (0, _stringify2.default)(data);
        }

        var socket = sockets.get(_this4);
        socket.send(data);
        return resolve();
      });
    }

    /**
     * Sends an acknowledgment for a specific event
     * @param {MessageEvent} event
     * @returns {Promise}
     */

  }, {
    key: '_acknowledge',
    value: function _acknowledge(event) {
      if (!event) {
        return _promise2.default.reject(new Error('`event` is required'));
      }

      if (!(0, _has3.default)(event, 'data.id')) {
        return _promise2.default.reject(new Error('`event.data.id` is required'));
      }

      return this.send({
        messageId: event.data.id,
        type: 'ack'
      });
    }

    /**
     * Sends an auth message up the socket
     * @private
     * @returns {Promise}
     */

  }, {
    key: '_authorize',
    value: function _authorize() {
      var _this5 = this;

      return new _promise2.default(function (resolve) {
        _this5.logger.info('socket: authorizing');
        _this5.send({
          id: _uuid2.default.v4(),
          type: 'authorization',
          data: {
            token: _this5.token
          },
          trackingId: _this5.trackingId,
          logLevelToken: _this5.logLevelToken
        });

        var waitForBufferState = function waitForBufferState(event) {
          if (!event.data.type && (event.data.data.eventType === 'mercury.buffer_state' || event.data.data.eventType === 'mercury.registration_status')) {
            _this5.removeListener('message', waitForBufferState);
            _this5._ping();
            resolve();
          }
        };
        _this5.once('message', waitForBufferState);
      });
    }

    /**
     * Deals with the fact that some browsers drop some close codes (but not
     * close reasons).
     * @param {CloseEvent} event
     * @private
     * @returns {CloseEvent}
     */

  }, {
    key: '_fixCloseCode',
    value: function _fixCloseCode(event) {
      if (event.code === 1005 && event.reason) {
        switch (event.reason.toLowerCase()) {
          case 'replaced':
            this.logger.info('socket: fixing CloseEvent code for reason: ', event.reason);
            event.code = 4000;
            break;
          case 'authentication failed':
          case 'authentication did not happen within the timeout window of 30000 seconds.':
            this.logger.info('socket: fixing CloseEvent code for reason: ', event.reason);
            event.code = 1008;
            break;
          default:
          // do nothing
        }
      }

      return event;
    }

    /**
     * Sends a ping up the socket and confirms we get it back
     * @param {[type]} id
     * @private
     * @returns {[type]}
     */

  }, {
    key: '_ping',
    value: function _ping(id) {
      var _this6 = this;

      var confirmPongId = function confirmPongId(event) {
        try {
          _this6.logger.debug('socket: pong', event.data.id);
          if (event.data && event.data.id !== id) {
            _this6.logger.info('socket: received pong for wrong ping id, closing socket');
            _this6.logger.debug('socket: expected', id, 'received', event.data.id);
            _this6.close({
              code: 1000,
              reason: 'Pong mismatch'
            });
          }
        } catch (error) {
          // This try/catch block was added as a debugging step; to the best of my
          // knowledge, the above can never throw.
          /* istanbul ignore next */
          _this6.logger.error('socket: error occurred in confirmPongId', error);
        }
      };

      var onPongNotReceived = function onPongNotReceived() {
        try {
          _this6.logger.info('socket: pong not receive in expected period, closing socket');
          _this6.close({
            code: 1000,
            reason: 'Pong not received'
          }).catch(function (reason) {
            _this6.logger.warn('socket: failed to close socket after missed pong', reason);
          });
        } catch (error) {
          // This try/catch block was added as a debugging step; to the best of my
          // knowledge, the above can never throw.
          /* istanbul ignore next */
          _this6.logger.error('socket: error occurred in onPongNotReceived', error);
        }
      };

      var scheduleNextPingAndCancelPongTimer = function scheduleNextPingAndCancelPongTimer() {
        try {
          clearTimeout(_this6.pongTimer);
          _this6.pingTimer = (0, _commonTimers.safeSetTimeout)(function () {
            return _this6._ping();
          }, _this6.pingInterval);
        } catch (error) {
          // This try/catch block was added as a debugging step; to the best of my
          // knowledge, the above can never throw.
          /* istanbul ignore next */
          _this6.logger.error('socket: error occurred in scheduleNextPingAndCancelPongTimer', error);
        }
      };

      id = id || _uuid2.default.v4();
      this.pongTimer = (0, _commonTimers.safeSetTimeout)(onPongNotReceived, this.pongTimeout);
      this.once('pong', scheduleNextPingAndCancelPongTimer);
      this.once('pong', confirmPongId);

      this.logger.debug('socket: ping ' + id);
      return this.send({
        id: id,
        type: 'ping'
      });
    }
  }, {
    key: 'binaryType',
    get: function get() {
      return sockets.get(this).binaryType;
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
     * @returns {number}
     */

  }, {
    key: 'bufferedAmount',
    get: function get() {
      return sockets.get(this).bufferedAmount;
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
     * @returns {string}
     */

  }, {
    key: 'extensions',
    get: function get() {
      return sockets.get(this).extensions;
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
     * @returns {string}
     */

  }, {
    key: 'protocol',
    get: function get() {
      return sockets.get(this).protocol;
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
     * @returns {number}
     */

  }, {
    key: 'readyState',
    get: function get() {
      return sockets.get(this).readyState;
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
     * @returns {string}
     */

  }, {
    key: 'url',
    get: function get() {
      return sockets.get(this).url;
    }

    /**
     * Provides the environmentally appropriate constructor (ws in NodeJS,
     * WebSocket in browsers)
     * @returns {WebSocket}
     */

  }], [{
    key: 'getWebSocketConstructor',
    value: function getWebSocketConstructor() {
      throw new Error('Socket.getWebSocketConstructor() must be implemented in an environmentally appropriate way');
    }
  }]);
  return Socket;
}(_events.EventEmitter);

exports.default = Socket;
//# sourceMappingURL=socket-base.js.map
