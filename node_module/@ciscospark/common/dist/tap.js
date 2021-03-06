"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = tap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

/**
 * Injects code into a promise chain without modifying the promise chain's result
 * @param {Function} fn
 * @returns {Promise}
 * @example
 * function f() {
 *   return Promise.resolve(5);
 * }
 *
 * f()
 *   .then(tap(() => 12))
 *   // => 5
 */
function tap(fn) {
  return function (r) {
    return new _promise2.default(function (resolve) {
      resolve(fn(r));
    }).then(function () {
      return r;
    }).catch(function () {
      return r;
    });
  };
}
//# sourceMappingURL=tap.js.map
