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

var _httpCore = require('@ciscospark/http-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 */
var RequestTimingInterceptor = function (_Interceptor) {
  (0, _inherits3.default)(RequestTimingInterceptor, _Interceptor);

  function RequestTimingInterceptor() {
    (0, _classCallCheck3.default)(this, RequestTimingInterceptor);
    return (0, _possibleConstructorReturn3.default)(this, (RequestTimingInterceptor.__proto__ || (0, _getPrototypeOf2.default)(RequestTimingInterceptor)).apply(this, arguments));
  }

  (0, _createClass3.default)(RequestTimingInterceptor, [{
    key: 'onRequest',


    /**
     * @see Interceptor#onRequest
     * @param {Object} options
     * @returns {Object}
     */
    value: function onRequest(options) {
      options.$timings = options.$timings || {};
      options.$timings.requestStart = Date.now();
      return options;
    }

    /**
     * @see Interceptor#onRequestError
     * @param {Object} options
     * @returns {Object}
     */

  }, {
    key: 'onRequestError',
    value: function onRequestError(options) {
      options.$timings.requestEnd = options.$timings.requestFail = Date.now();
      return _promise2.default.reject(options);
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
      options.$timings.requestEnd = Date.now();
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
      options.$timings.requestEnd = options.$timings.requestFail = Date.now();
      return _promise2.default.reject(reason);
    }
  }], [{
    key: 'create',

    /**
     * @param {Object} options
     * @returns {RequestTimingInterceptor}
     */
    value: function create(options) {
      return new RequestTimingInterceptor(this, options);
    }
  }]);
  return RequestTimingInterceptor;
}(_httpCore.Interceptor); /*!
                           * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
                           */

exports.default = RequestTimingInterceptor;
//# sourceMappingURL=request-timing.js.map
