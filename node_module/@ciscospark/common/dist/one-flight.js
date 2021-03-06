'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _apply = require('babel-runtime/core-js/reflect/apply');

var _apply2 = _interopRequireDefault(_apply);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

var _wrap2 = require('lodash/wrap');

var _wrap3 = _interopRequireDefault(_wrap2);

exports.default = oneFlight;

var _templateContainer = require('./template-container');

var _templateContainer2 = _interopRequireDefault(_templateContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Alias Map and WeakMap to get around a babel compiler bug
var W = _weakMap2.default; /*!
                            * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
                            */

var M = _map2.default;
var WeakMappedMappedMap = (0, _templateContainer2.default)(W, M, M);

var flights = new WeakMappedMappedMap();

/**
 * @memberof Util
 * @param {Object} options
 * @param {Function} options.keyFactory
 * @param {boolean} options.cacheFailures
 * @param {boolean} options.cacheSuccesses
 * @returns {Function}
 */
function oneFlight() {
  for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  if (params.length === 3) {
    return (0, _apply2.default)(oneFlightDecorator, null, params);
  }

  var options = params[0] || {};

  var cacheFailures = options.cacheFailures,
      cacheSuccesses = options.cacheSuccesses,
      keyFactory = options.keyFactory;


  return oneFlightDecorator;

  /**
   * @param {Object} target
   * @param {string} prop
   * @param {Object} descriptor
   * @private
   * @returns {Object}
   */
  function oneFlightDecorator(target, prop, descriptor) {
    var key = prop;

    descriptor.value = (0, _wrap3.default)(descriptor.value, function oneFlightExecutor(fn) {
      var _this = this;

      var innerKey = key;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (keyFactory) {
        innerKey = innerKey + '_' + keyFactory.apply(undefined, args);
      }

      /* eslint no-invalid-this: [0] */
      var flight = flights.get(this, target, innerKey);
      if (flight) {
        return flight;
      }

      flight = (0, _apply2.default)(fn, this, args);
      if (!cacheFailures && flight && flight.catch) {
        flight = flight.catch(function (reason) {
          flights.delete(_this, target, innerKey);
          return _promise2.default.reject(reason);
        });
      }

      if (!cacheSuccesses && flight && flight.then) {
        flight = flight.then(function (result) {
          flights.delete(_this, target, innerKey);
          return result;
        });
      }

      flights.set(this, target, innerKey, flight);

      return flight;
    });

    // This *should* make decorators compatible with AmpersandState class
    // definitions
    if ((typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target)) === 'object' && !target.prototype) {
      target[prop] = descriptor.value;
    }

    return descriptor;
  }
}
//# sourceMappingURL=one-flight.js.map
