'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _batcher = require('./batcher');

var _batcher2 = _interopRequireDefault(_batcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientMetricsBatcher = _batcher2.default.extend({
  namespace: 'Metrics',

  prepareItem: function prepareItem(item) {
    // Add more defaults to payload when the clientmetrics endpoint evolves to support richer payloads
    return _promise2.default.resolve(item);
  },
  prepareRequest: function prepareRequest(queue) {
    return _promise2.default.resolve(queue);
  },
  submitHttpRequest: function submitHttpRequest(payload) {
    return this.spark.request({
      method: 'POST',
      service: 'metrics',
      resource: 'clientmetrics',
      body: {
        metrics: payload
      }
    });
  }
}); /*!
     * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
     */

exports.default = ClientMetricsBatcher;
//# sourceMappingURL=client-metrics-batcher.js.map
