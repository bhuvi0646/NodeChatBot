'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levels = exports.default = undefined;

var _logger = require('./logger');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_logger).default;
  }
});
Object.defineProperty(exports, 'levels', {
  enumerable: true,
  get: function get() {
    return _logger.levels;
  }
});

var _sparkCore = require('@ciscospark/spark-core');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _sparkCore.registerPlugin)('logger', _logger2.default, {
  config: _config2.default,
  replace: true
}); /*!
     * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
     */
//# sourceMappingURL=index.js.map
