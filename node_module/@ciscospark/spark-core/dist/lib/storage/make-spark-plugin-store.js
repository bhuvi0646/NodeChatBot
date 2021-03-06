'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

var _result2 = require('lodash/result');

var _result3 = _interopRequireDefault(_result2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

exports.default = makeSparkPluginStorage;

var _common = require('@ciscospark/common');

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
} /*!
   * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
   */

var defers = new _weakMap2.default();

/**
 * Walks an object before writing it to the store and omits empty arrays
 * @private
 * @param {Object} value
 * @returns {Object}
 */
function serialize(value) {
  if (!(0, _isObject3.default)(value)) {
    return value;
  }

  var serialized = value.serialize ? value.serialize() : value;

  (0, _keys2.default)(serialized).forEach(function (key) {
    var val = serialized[key];
    if ((0, _isArray3.default)(val)) {
      if (val.length === 0) {
        serialized[key] = undefined;
      } else {
        serialized[key] = val.map(serialize);
      }
    } else if ((0, _isObject3.default)(val)) {
      (0, _keys2.default)(val).forEach(function (k) {
        val[k] = serialize(val[k]);
      });
    }
  });

  var empty = (0, _keys2.default)(serialized).reduce(function (acc, key) {
    return acc && !serialized[key];
  }, true);

  if (empty) {
    return undefined;
  }
  return serialized;
}

/**
 * [makeSparkPluginStorage description]
 * @param {[type]} type
 * @param {[type]} context
 * @private
 * @returns {[type]}
 */
function makeSparkPluginStorage(type, context) {
  var _dec, _desc, _value, _class;

  /**
   * Interface between SparkPlugin and Spark#boundeStorage or
   * Spark#unboundedStorage
   */
  var SparkPluginStorage = (_dec = (0, _common.oneFlight)({ keyFactory: function keyFactory(key) {
      return 'initValue-' + key;
    } }), (_class = function () {
    /**
     * @param {Object} attrs
     * @param {Object} options
     * @returns {SparkPluginStorage}
     */
    function SparkPluginStorage() {
      (0, _classCallCheck3.default)(this, SparkPluginStorage);

      defers.set(this, new _map2.default());
    }

    /**
     * Clears an entire namespace
     * @returns {Promise}
     */


    (0, _createClass3.default)(SparkPluginStorage, [{
      key: 'clear',
      value: function clear() {
        return context.spark[type + 'Storage'].del(context.getNamespace());
      }

      /**
       * Deletes the specified key from the store
       * @param {string} key
       * @returns {[type]}
       */

    }, {
      key: 'del',
      value: function del() {
        var _context$spark$;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_context$spark$ = context.spark[type + 'Storage']).del.apply(_context$spark$, [context.getNamespace()].concat(args));
      }

      /**
       * Retrieves the value specified by key from the store. Rejects with
       * NotFoundError if no value can be found
       * @param {string} key
       * @returns {Promise}
       */

    }, {
      key: 'get',
      value: function get(key) {
        var defer = defers.get(this).get(key);
        if (!defer) {
          defer = new _common.Defer();
          defers.get(this).set(key, defer);
        }

        return context.spark[type + 'Storage'].get(context.getNamespace(), key).then(function (res) {
          defer.resolve();
          return res;
        });
      }

      /**
       * Writes a value to the store
       * @param {string} key
       * @param {any} value
       * @returns {Promise}
       */

    }, {
      key: 'put',
      value: function put(key, value) {
        return context.spark[type + 'Storage'].put(context.getNamespace(), key, serialize(value));
      }

      /**
       * Returns a Promise that won't resolve until the value specified by key has
       * been attempted to be loaded from the store. This allows us to lazily
       * prevent certain method from executing until the specified keys have been
       * retrieved from the store.
       * @param {string} key
       * @returns {Promise}
       */

    }, {
      key: 'waitFor',
      value: function waitFor(key) {
        context.logger.debug('plugin-storage(' + context.getNamespace() + '): waiting to init key `' + key + '`');
        var defer = defers.get(this).get(key);
        if (defer) {
          context.logger.debug('plugin-storage(' + context.getNamespace() + '): already inited `' + key + '`');
          return defer.promise;
        }

        context.logger.debug('plugin-storage(' + context.getNamespace() + '): initing `' + key + '`');
        return this.initValue(key);
      }
    }, {
      key: 'initValue',

      /**
       * Attempts to load the specified key from the store and set it on the parent
       * object.
       * @param {string} key
       * @returns {Promise} Resolves (but not with the retrieved value) when
       * the value retrieval complete
       */
      // suppress doc warning because decorators confuse eslint
      // eslint-disable-next-line require-jsdoc
      value: function initValue(key) {
        var defer = new _common.Defer();
        defers.get(this).set(key, defer);

        // Intentionally bypasses this.get so we don't resolve the promise until
        // after the parent value is set.
        context.spark[type + 'Storage'].get(context.getNamespace(), key).then(function (value) {
          context.logger.debug('plugin-storage(' + context.getNamespace() + '): got `' + key + '` for first time');
          if (key === '@') {
            context.parent.set(value);
          } else if ((0, _result3.default)(context[key], 'isState')) {
            context[key].set(value);
          } else {
            context.set(key, value);
          }
          context.logger.debug('plugin-storage(' + context.getNamespace() + '): set `' + key + '` for first time');
          defer.resolve();
          context.logger.debug('plugin-storage(' + context.getNamespace() + '): inited `' + key + '`');
        }).catch(function (reason) {
          // The  next conditional is a bit of an unfortunate solution to deal
          // with circular dependencies in unit tests. It should not effect
          // integration tests or production code.
          if (reason instanceof _errors.NotFoundError || process.env.NODE_ENV !== 'production' && reason.toString().includes('MockNotFoundError')) {
            context.logger.debug('plugin-storage(' + context.getNamespace() + '): no data for `' + key + '`, continuing');
            return defer.resolve();
          }
          context.logger.warn('plugin-storage(' + context.getNamespace() + '): failed to init `' + key + '`', reason);
          return defer.reject(reason);
        });

        return defer.promise;
      }
    }]);
    return SparkPluginStorage;
  }(), (_applyDecoratedDescriptor(_class.prototype, 'initValue', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'initValue'), _class.prototype)), _class));


  return new SparkPluginStorage();
}
//# sourceMappingURL=make-spark-plugin-store.js.map
