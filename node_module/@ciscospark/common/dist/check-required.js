"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkRequired;
/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

/**
 * Check object for the specified keys
 * @param {Array<string>} keys
 * @param {Object} object
 * @returns {undefined}
 * @throws Error
 */
function checkRequired(keys, object) {
  keys.forEach(function (key) {
    if (!object[key]) {
      throw new Error("missing required property " + key + " from " + object);
    }
  });
}
//# sourceMappingURL=check-required.js.map
