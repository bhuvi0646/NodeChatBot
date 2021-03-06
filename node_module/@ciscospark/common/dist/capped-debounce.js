'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apply = require('babel-runtime/core-js/reflect/apply');

var _apply2 = _interopRequireDefault(_apply);

exports.default = debounce;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

/**
 * Behaves like debounce, but additionally executes after a number of calls are
 * attempted, rather than just time
 * @param {Function} fn
 * @param {Number} wait
 * @param {Object} options
 * @returns {Function}
 */
function debounce(fn, wait, options) {
  /* eslint no-invalid-this: [0] */

  if (!fn) {
    throw new Error('`fn` must be a function');
  }

  if (!wait) {
    throw new Error('`wait` is required');
  }

  options = options || {};
  if (!options.maxWait) {
    throw new Error('`options.maxWait` is required');
  }
  if (!options.maxCalls) {
    throw new Error('`options.maxCalls` is required');
  }

  var _options = options,
      maxCalls = _options.maxCalls,
      maxWait = _options.maxWait;

  var count = 0;
  var maxWaitTimer = void 0,
      waitTimer = void 0;

  return function wrapper() {
    count += 1;

    clearTimeout(waitTimer);
    waitTimer = setTimeout(function () {
      return exec();
    }, wait);

    if (!maxWaitTimer) {
      maxWaitTimer = setTimeout(function () {
        return exec();
      }, maxWait);
    }

    if (count >= maxCalls) {
      (0, _apply2.default)(exec, this, []);
    }
  };

  /**
   * @private
   * @returns {undefined}
   */
  function exec() {
    clearTimeout(waitTimer);
    waitTimer = null;
    clearTimeout(maxWaitTimer);
    maxWaitTimer = null;
    count = 0;

    (0, _apply2.default)(fn, this, []);
  }
}
//# sourceMappingURL=capped-debounce.js.map
