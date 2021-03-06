'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

exports.default = makeSparkStore;

var _ampersandEvents = require('ampersand-events');

var _ampersandEvents2 = _interopRequireDefault(_ampersandEvents);

var _common = require('@ciscospark/common');

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

var bindings = new _weakMap2.default();

/**
 * Makes a SparkStore for the specified type bound to the specified spark instance
 * @param {string} type
 * @param {ProxySpark} spark
 * @private
 * @returns {SparkStore}
 */
function makeSparkStore(type, spark) {
  var _dec, _desc, _value, _class;

  /**
   * Lazy Key-Value Store Interface
   */
  var SparkStore = (_dec = (0, _common.oneFlight)({ keyFactory: function keyFactory(namespace) {
      return namespace;
    } }), (_class = function () {
    /**
     * @param {Object} attrs
     * @param {Object} options
     * @returns {Store}
     */
    function SparkStore() {
      (0, _classCallCheck3.default)(this, SparkStore);

      spark.logger.debug('spark-store: constructing ' + type + 'Storage');
      bindings.set(this, new _map2.default());
    }

    /**
     * Provides easy access to the storage adapter identified in config.
     * @returns {Object}
     */


    (0, _createClass3.default)(SparkStore, [{
      key: 'clear',


      /**
       * Clears the store
       * @returns {Promise}
       */
      value: function clear() {
        var promises = [];
        this.bindings.forEach(function (binding) {
          promises.push(binding.clear());
        });

        return _promise2.default.all(promises);
      }

      /**
       * Deletes the specified key from the store
       * @param {string} namespace
       * @param {string} key
       * @returns {[type]}
       */

    }, {
      key: 'del',
      value: function del(namespace, key) {
        spark.logger.debug('spark-store: removing ' + namespace + ':' + key);
        return this._getBinding(namespace).then(function (binding) {
          return binding.del(key);
        });
      }

      /**
       * Retrieves the value specified by key from the store. Rejects with
       * NotFoundError if no value can be found
       * @param {string} namespace
       * @param {string} key
       * @returns {Promise}
       */

    }, {
      key: 'get',
      value: function get(namespace, key) {
        spark.logger.debug('spark-store: retrieving ' + namespace + ':' + key);
        return this._getBinding(namespace).then(function (binding) {
          return binding.get(key);
        });
      }

      /**
       * Writes a value to the store. Deletes the specified key from the store
       * if passed `undefined`
       * @param {string} namespace
       * @param {string} key
       * @param {any} value
       * @returns {Promise} Resolves with value (to simplify write-through caching)
       */

    }, {
      key: 'put',
      value: function put(namespace, key, value) {
        if (typeof value === 'undefined') {
          return this.del(namespace, key);
        }
        spark.logger.debug('spark-store: setting ' + namespace + ':' + key);
        return this._getBinding(namespace).then(function (binding) {
          return binding.put(key, value.serialize ? value.serialize() : value);
        }).then(function () {
          return value;
        });
      }
    }, {
      key: '_getBinding',

      /**
       * Creates an interface bound to the specified namespace
       * @param {string} namespace
       * @private
       * @returns {Promise}
       */
      // suppress doc warning because decorators confuse eslint
      // eslint-disable-next-line require-jsdoc
      value: function _getBinding(namespace) {
        var _this = this;

        return new _promise2.default(function (resolve) {
          spark.logger.debug('storage: getting binding for `' + namespace + '`');
          var binding = _this.bindings.get(namespace);
          if (binding) {
            spark.logger.debug('storage: found binding for `' + namespace + '`');
            return resolve(binding);
          }

          return resolve(_this.adapter.bind(namespace, { logger: spark.logger }).then(function (_binding) {
            spark.logger.debug('storage: made binding for `' + namespace + '`');
            _this.bindings.set(namespace, _binding);
            return _binding;
          }));
        });
      }
    }, {
      key: 'adapter',
      get: function get() {
        return spark.config.storage[type + 'Adapter'];
      }

      /**
       * @returns {WeakMap}
       */

    }, {
      key: 'bindings',
      get: function get() {
        return bindings.get(this);
      }
    }]);
    return SparkStore;
  }(), (_applyDecoratedDescriptor(_class.prototype, '_getBinding', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_getBinding'), _class.prototype)), _class));


  (0, _assign2.default)(SparkStore.prototype, _ampersandEvents2.default);

  return new SparkStore();
}
//# sourceMappingURL=make-spark-store.js.map
