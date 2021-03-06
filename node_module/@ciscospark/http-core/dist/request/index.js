'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = request;

var _request2 = require('./request');

var _request3 = _interopRequireDefault(_request2);

var _common = require('@ciscospark/common');

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} options
 * @returns {Promise}
 */
function request(options) {
  if (options.url) {
    options.uri = options.url;
    options.url = null;
  }

  options.headers = options.headers || {};
  if (!_common.inBrowser && !options.headers['user-agent']) {
    options.headers['user-agent'] = '@ciscospark/http-core';
  }

  options.download = new _events.EventEmitter();
  options.upload = new _events.EventEmitter();

  return intercept(options.interceptors, 'Request').then(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _request3.default.apply(undefined, [options].concat(args));
  }).then(function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return intercept.apply(undefined, [options.interceptors.slice().reverse(), 'Response'].concat(args));
  });

  /**
   * @param {Array} interceptors
   * @param {string} key
   * @param {Object} res
   * @private
   * @returns {Promise}
   */
  function intercept(interceptors, key, res) {
    var successKey = 'on' + key;
    var errorKey = 'on' + key + 'Error';

    return interceptors.reduce(function (promise, interceptor) {
      return promise.then(function (result) {
        if (interceptor[successKey]) {
          return interceptor[successKey](options, result);
        }
        return _promise2.default.resolve(result);
      }, function (reason) {
        if (interceptor[errorKey]) {
          return interceptor[errorKey](options, reason);
        }
        return _promise2.default.reject(reason);
      });
    }, _promise2.default.resolve(res));
  }
} /*!
   * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
   */
//# sourceMappingURL=index.js.map
