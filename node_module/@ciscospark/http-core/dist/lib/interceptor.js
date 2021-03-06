'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty = require('babel-runtime/core-js/reflect/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

/**
 * @class
 */
var Interceptor = function () {
  /**
   * @constructor
   * @param {Object} attrs
   * @returns {UrlInterceptor}
   */
  function Interceptor(attrs) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Interceptor);

    if (attrs) {
      (0, _keys2.default)(attrs).forEach(function (key) {
        var value = attrs[key];
        (0, _defineProperty2.default)(_this, key, {
          enumerable: true,
          value: value
        });
      });
    }
  }

  /**
   * @abstract
   * @returns {Interceptor}
   */


  (0, _createClass3.default)(Interceptor, [{
    key: 'onRequest',


    /**
     * Transform request options before sending them
     * @param {Object} options
     * @returns {Promise<Object>}
     */
    value: function onRequest(options) {
      return _promise2.default.resolve(options);
    }

    /**
     * Handle request failures
     * @param {Object} options
     * @param {Error} reason
     * @returns {RejectedPromise<Error>}
     */

  }, {
    key: 'onRequestError',
    value: function onRequestError(options, reason) {
      return _promise2.default.reject(reason);
    }

    /**
     * Transform response before returning it
     * @param {Object} options
     * @param {HttpResponse} response
     * @returns {Promise<HttpResponse>}
     */

  }, {
    key: 'onResponse',
    value: function onResponse(options, response) {
      return _promise2.default.resolve(response);
    }

    /**
     * Handle response errors
     * @param {Object} options
     * @param {SparkHttpError} reason
     * @returns {Promise<SparkHttpError>}
     */

  }, {
    key: 'onResponseError',
    value: function onResponseError(options, reason) {
      return _promise2.default.reject(reason);
    }
  }], [{
    key: 'create',
    value: function create() {
      throw new Error('`Interceptor.create()` must be defined');
    }
  }]);
  return Interceptor;
}();

exports.default = Interceptor;
//# sourceMappingURL=interceptor.js.map
