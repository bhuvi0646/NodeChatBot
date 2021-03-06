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
var EmbargoInterceptor = function (_Interceptor) {
  (0, _inherits3.default)(EmbargoInterceptor, _Interceptor);

  function EmbargoInterceptor() {
    (0, _classCallCheck3.default)(this, EmbargoInterceptor);
    return (0, _possibleConstructorReturn3.default)(this, (EmbargoInterceptor.__proto__ || (0, _getPrototypeOf2.default)(EmbargoInterceptor)).apply(this, arguments));
  }

  (0, _createClass3.default)(EmbargoInterceptor, [{
    key: 'onResponseError',


    /**
     * @see Interceptor#onResponseError
     * @param {Object} options
     * @param {Error} reason
     * @returns {Promise}
     */
    value: function onResponseError(options, reason) {
      if (reason.statusCode === 451) {
        this.spark.internal.device.clear();
        this.spark.credentials.clear();
        this.spark.logger.info('Received `HTTP 451 Unavailable For Legal Reasons`, discarding credentials and device registration');
      }

      return _promise2.default.reject(reason);
    }
  }], [{
    key: 'create',

    /**
     * @returns {EmbargoInterceptor}
     */
    value: function create() {
      /* eslint no-invalid-this: [0] */
      return new EmbargoInterceptor({ spark: this });
    }
  }]);
  return EmbargoInterceptor;
}(_httpCore.Interceptor); /*!
                           * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
                           */

exports.default = EmbargoInterceptor;
//# sourceMappingURL=embargo.js.map
