'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _deleteProperty = require('babel-runtime/core-js/reflect/delete-property');

var _deleteProperty2 = _interopRequireDefault(_deleteProperty);

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

var _httpCore = require('@ciscospark/http-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequenceNumbers = new _weakMap2.default();

/**
 * @class
 */
/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

var SparkTrackingIdInterceptor = function (_Interceptor) {
  (0, _inherits3.default)(SparkTrackingIdInterceptor, _Interceptor);

  function SparkTrackingIdInterceptor() {
    (0, _classCallCheck3.default)(this, SparkTrackingIdInterceptor);
    return (0, _possibleConstructorReturn3.default)(this, (SparkTrackingIdInterceptor.__proto__ || (0, _getPrototypeOf2.default)(SparkTrackingIdInterceptor)).apply(this, arguments));
  }

  (0, _createClass3.default)(SparkTrackingIdInterceptor, [{
    key: 'onRequest',


    /**
     * @see Interceptor#onRequest
     * @param {Object} options
     * @returns {Object}
     */
    value: function onRequest(options) {
      options.headers = options.headers || {};
      // If trackingid is already set, don't overwrite it
      if ('trackingid' in options.headers) {
        // If trackingid is set to null, false, or undefined, delete it to
        // prevent a CORS preflight.
        if (!options.headers.trackingid) {
          (0, _deleteProperty2.default)(options.headers, 'trackingid');
        }
        return options;
      }

      if (this.requiresTrackingId(options)) {
        options.headers.trackingid = this.spark.sessionId + '_' + this.sequence;
      }

      if (options.headers.trackingid && options.replayCount) {
        var tid = options.headers.trackingid.split('+');
        tid[1] = options.replayCount;
        options.headers.trackingid = tid.join('+');
      }

      return options;
    }

    /**
     * Determines whether or not include a tracking id
     * @param {Object} options
     * @returns {boolean}
     */

  }, {
    key: 'requiresTrackingId',
    value: function requiresTrackingId(options) {
      return !options.headers.trackingid;
    }
  }, {
    key: 'sequence',

    /**
     * Sequence number; increments on access
     * @type {Number}
     */
    get: function get() {
      var sq = sequenceNumbers.get(this) || 0;
      sq += 1;
      sequenceNumbers.set(this, sq);
      return sq;
    }

    /**
     * @returns {SparkTrackingIdInterceptor}
     */

  }], [{
    key: 'create',
    value: function create() {
      return new SparkTrackingIdInterceptor({ spark: this });
    }
  }]);
  return SparkTrackingIdInterceptor;
}(_httpCore.Interceptor);

exports.default = SparkTrackingIdInterceptor;
//# sourceMappingURL=spark-tracking-id.js.map
