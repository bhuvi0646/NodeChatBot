'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _httpCore = require('@ciscospark/http-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 */
var RequestEventInterceptor = function (_Interceptor) {
  (0, _inherits3.default)(RequestEventInterceptor, _Interceptor);

  function RequestEventInterceptor() {
    (0, _classCallCheck3.default)(this, RequestEventInterceptor);
    return (0, _possibleConstructorReturn3.default)(this, (RequestEventInterceptor.__proto__ || (0, _getPrototypeOf2.default)(RequestEventInterceptor)).apply(this, arguments));
  }

  (0, _createClass3.default)(RequestEventInterceptor, [{
    key: 'onRequest',


    /**
     * @see Interceptor#onRequest
     * @param {Object} options
     * @returns {Object}
     */
    value: function onRequest(options) {
      var logger = (0, _get3.default)(this, 'spark.logger', console);
      try {
        this.spark.trigger('request:start', options);
      } catch (error) {
        logger.warn('event handler for request:start failed ', error);
      }
      return _promise2.default.resolve(options);
    }

    /**
     * @see Interceptor#onRequest
     * @param {Object} options
     * @param {Error} reason
     * @returns {Object}
     */

  }, {
    key: 'onRequestError',
    value: function onRequestError(options, reason) {
      // We need to do the normal onRequest logging, but then log how the request
      // failed since the response logger won't be called.
      var logger = (0, _get3.default)(this, 'spark.logger', console);
      try {
        this.spark.trigger('request:end', options, reason);
        this.spark.trigger('request:failure', options, reason);
      } catch (error) {
        logger.warn('event handler for request:end failed ', error);
      }
      return _promise2.default.reject(reason);
    }

    /**
     * @see Interceptor#onResponse
     * @param {Object} options
     * @param {HttpResponse} response
     * @returns {Object}
     */

  }, {
    key: 'onResponse',
    value: function onResponse(options, response) {
      var logger = (0, _get3.default)(this, 'spark.logger', console);
      try {
        this.spark.trigger('request:success', response.options, response);
      } catch (error) {
        logger.warn('event handler for request:success failed ', error);
      }
      return _promise2.default.resolve(response);
    }

    /**
     * @see Interceptor#onResponseError
     * @param {Object} options
     * @param {Error} reason
     * @returns {Object}
     */

  }, {
    key: 'onResponseError',
    value: function onResponseError(options, reason) {
      var logger = (0, _get3.default)(this, 'spark.logger', console);
      try {
        this.spark.trigger('request:end', options, reason);
        this.spark.trigger('request:failure', options, reason);
      } catch (error) {
        logger.warn('event handler for request:failure failed ', error);
      }
      return _promise2.default.reject(reason);
    }
  }], [{
    key: 'create',

    /**
     * @returns {RequestEventInterceptor}
     */
    value: function create() {
      return new RequestEventInterceptor({ spark: this });
    }
  }]);
  return RequestEventInterceptor;
}(_httpCore.Interceptor); /*!
                           * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
                           */

exports.default = RequestEventInterceptor;
//# sourceMappingURL=request-event.js.map
