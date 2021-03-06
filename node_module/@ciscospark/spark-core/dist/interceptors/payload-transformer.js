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
var PayloadTransformerInterceptor = function (_Interceptor) {
  (0, _inherits3.default)(PayloadTransformerInterceptor, _Interceptor);

  function PayloadTransformerInterceptor() {
    (0, _classCallCheck3.default)(this, PayloadTransformerInterceptor);
    return (0, _possibleConstructorReturn3.default)(this, (PayloadTransformerInterceptor.__proto__ || (0, _getPrototypeOf2.default)(PayloadTransformerInterceptor)).apply(this, arguments));
  }

  (0, _createClass3.default)(PayloadTransformerInterceptor, [{
    key: 'onRequest',


    /**
     * @see Interceptor#onRequest
     * @param {Object} options
     * @returns {Object}
     */
    value: function onRequest(options) {
      if (options.noTransform) {
        return options;
      }
      return this.spark.transform('outbound', options);
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
      return this.spark.transform('inbound', response);
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
      return this.spark.transform('inbound', reason).then(function (r) {
        return _promise2.default.reject(r || reason);
      });
    }
  }], [{
    key: 'create',

    /**
     * @param {Object} options
     * @returns {PayloadTransformerInterceptor}
     */
    value: function create() {
      return new PayloadTransformerInterceptor({ spark: this });
    }
  }]);
  return PayloadTransformerInterceptor;
}(_httpCore.Interceptor); /*!
                           * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
                           */

exports.default = PayloadTransformerInterceptor;
//# sourceMappingURL=payload-transformer.js.map
