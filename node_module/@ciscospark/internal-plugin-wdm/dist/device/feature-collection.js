'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ampersandCollection = require('ampersand-collection');

var _ampersandCollection2 = _interopRequireDefault(_ampersandCollection);

var _featureModel = require('./feature-model');

var _featureModel2 = _interopRequireDefault(_featureModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

var FeatureCollection = _ampersandCollection2.default.extend({
  mainIndex: 'key',
  model: _featureModel2.default
});

exports.default = FeatureCollection;
//# sourceMappingURL=feature-collection.js.map
