'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apply = require('babel-runtime/core-js/reflect/apply');

var _apply2 = _interopRequireDefault(_apply);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

exports.proxyEvents = proxyEvents;
exports.transferEvents = transferEvents;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Proxies the event binding methods of emitter onto proxy
 * @param {EventEmitter|EventEmitterProxy} emitter
 * @param {mixed} proxy (probably a promise)
 * @returns {EventEmitter} Returns the source emitter to ease use in promise chains
 */
/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

function proxyEvents(emitter, proxy) {
  ['on', 'once'].forEach(function (key) {
    proxy[key] = function () {
      emitter[key].apply(emitter, arguments);
      return proxy;
    };
  });

  return emitter;
}

/**
 * Given a list of events, fires them on drain when they're emitted from source
 * @param {Array|string} events
 * @param {EventEmitter} source
 * @param {EventEmitter} drain
 * @returns {undefined}
 */
function transferEvents(events, source, drain) {
  events = (0, _isArray3.default)(events) ? events : [events];
  events.forEach(function (event) {
    if (source.on) {
      source.on(event, function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return emit.apply(undefined, [drain, event].concat(args));
      });
    }
  });
}

/**
 * Emits an event
 * @param {EventEmitter} target The EventEmitter from which to emit an event
 * @returns {mixed}
 */
function emit(target) {
  var method = target.trigger || target.emit;
  /* istanbul ignore if */
  if (!method) {
    throw new Error('count not determine emit method');
  }

  for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    rest[_key2 - 1] = arguments[_key2];
  }

  return (0, _apply2.default)(method, target, rest);
}
//# sourceMappingURL=events.js.map
