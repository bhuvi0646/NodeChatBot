"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = resolveWith;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

/**
 * Sugar method for returning the desired object at the end of a promise chain
 * @param {any} object the item with which to resolve the promise chain
 * @returns {function}
 * @example
 * var item = {
 *   prop: 2
 * };
 * Promise
 *  .resolve(item.prop)
 *  .then(resolveWith(item))
 *  .then(function(res) {
 *    require('assert').deepEqual(res, {prop:2});
 *    return 'success'
 *  })
 *  // => success
 *
 */
function resolveWith(object) {
  return function resolver() {
    return _promise2.default.resolve(object);
  };
}
//# sourceMappingURL=resolve-with.js.map
