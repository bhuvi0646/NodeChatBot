"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = Defer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

/**
 * Creates a new `Defer`red object,
 * @returns {Defer}
 */
function Defer() {
  var _this = this;

  this.promise = new _promise2.default(function (resolve, reject) {
    /**
     * @instance
     * @memberof Defer
     * @type {function}
     */
    _this.resolve = resolve;
    /**
     * @instance
     * @memberof Defer
     * @type {function}
     */
    _this.reject = reject;
  });
}
//# sourceMappingURL=defer.js.map
