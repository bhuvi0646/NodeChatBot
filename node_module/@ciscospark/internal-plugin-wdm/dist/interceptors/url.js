'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _deleteProperty = require('babel-runtime/core-js/reflect/delete-property');

var _deleteProperty2 = _interopRequireDefault(_deleteProperty);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var pattern = /(?:^\/)|(?:\/$)/;

/**
 * @class
 */
/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

var UrlInterceptor = function (_Interceptor) {
  (0, _inherits3.default)(UrlInterceptor, _Interceptor);

  function UrlInterceptor() {
    (0, _classCallCheck3.default)(this, UrlInterceptor);
    return (0, _possibleConstructorReturn3.default)(this, (UrlInterceptor.__proto__ || (0, _getPrototypeOf2.default)(UrlInterceptor)).apply(this, arguments));
  }

  (0, _createClass3.default)(UrlInterceptor, [{
    key: 'onRequest',


    /**
     * @see Interceptor#onRequest
     * @param {Object} options
     * @returns {Object}
     */
    value: function onRequest(options) {
      if (!options.uri) {
        this.checkOptions(options);
        this.normalizeOptions(options);

        return this.spark.internal.device.getServiceUrl(options.service).then(function (uri) {
          if (!uri) {
            return _promise2.default.reject(new Error('`' + options.service + '` is not a known service'));
          }

          // strip leading and trailing slashes before assembling the full uri
          if (options.resource) {
            uri = uri.replace(pattern, '') + '/' + options.resource.replace(pattern, '');
          }

          options.uri = uri;
          return options;
        });
      }

      return options;
    }

    /**
     * Verify that all required parameters have been specified.
     * @param {Object} options
     * @returns {Object}
     */

  }, {
    key: 'checkOptions',
    value: function checkOptions(options) {
      if (!options.api && !options.service) {
        throw new Error('A `service` or `uri` parameter is required');
      }

      if (!options.resource) {
        throw new Error('A `resource` parameter is required');
      }
    }

    /**
     * accept api or service and rename to service
     * @param {Object} options
     * @private
     * @returns {Object}
     */

  }, {
    key: 'normalizeOptions',
    value: function normalizeOptions(options) {
      if (options.service) {
        return;
      }

      (0, _assign2.default)(options, {
        service: options.service || options.api
      });

      (0, _deleteProperty2.default)(options, 'api');
    }
  }], [{
    key: 'create',

    /**
     * @returns {UrlInterceptor}
     */
    value: function create() {
      /* eslint no-invalid-this: [0] */
      return new UrlInterceptor({ spark: this });
    }
  }]);
  return UrlInterceptor;
}(_httpCore.Interceptor);

exports.default = UrlInterceptor;
//# sourceMappingURL=url.js.map
