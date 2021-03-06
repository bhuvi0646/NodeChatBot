'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _ampersandState = require('ampersand-state');

var _ampersandState2 = _interopRequireDefault(_ampersandState);

var _featureCollection = require('./feature-collection');

var _featureCollection2 = _interopRequireDefault(_featureCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

var FeaturesModel = _ampersandState2.default.extend({
  collections: {
    developer: _featureCollection2.default,
    entitlement: _featureCollection2.default,
    user: _featureCollection2.default
  },

  /**
   * Recursively clear children/collections;
   * @param {Object} options
   * @returns {SparkPlugin}
   */
  clear: function clear(options) {
    var _this = this;

    (0, _keys2.default)(this.attributes).forEach(function (key) {
      _this.unset(key, options);
    });

    (0, _keys2.default)(this._children).forEach(function (key) {
      _this[key].clear();
    });

    (0, _keys2.default)(this._collections).forEach(function (key) {
      _this[key].reset();
    });

    return this;
  },
  initialize: function initialize() {
    var _this2 = this;

    /* eslint max-nested-callbacks: [0] */
    // Propagate change(:[attribute]) events from collections
    ['change:value', 'add', 'remove'].forEach(function (collectionEventName) {
      ['developer', 'entitlement', 'user'].forEach(function (collectionName) {
        _this2[collectionName].on(collectionEventName, function (model, options) {
          _this2.trigger('change:' + collectionName, _this2, _this2[collectionName], options);
        });
      });
    });
  }
});

exports.default = FeaturesModel;
//# sourceMappingURL=features-model.js.map
