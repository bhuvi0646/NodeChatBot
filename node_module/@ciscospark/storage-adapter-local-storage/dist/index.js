'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _deleteProperty = require('babel-runtime/core-js/reflect/delete-property');

var _deleteProperty2 = _interopRequireDefault(_deleteProperty);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

var _sparkCore = require('@ciscospark/spark-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namespaces = new _weakMap2.default(); /*!
                                           * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
                                           */

/* eslint-env browser */

var loggers = new _weakMap2.default();

/**
 * localStorage adapter for spark-core storage layer
 */

var StorageAdapterLocalStorage = function () {
  /**
   * @constructs {StorageAdapterLocalStorage}
   * @param {string} basekey localStorage key underwhich all namespaces will be
   * stored
   */
  function StorageAdapterLocalStorage(basekey) {
    (0, _classCallCheck3.default)(this, StorageAdapterLocalStorage);

    /**
     * localStorage binding
     */
    this.Bound = function () {
      /**
       * @constructs {Bound}
       * @param {string} namespace
       * @param {Object} options
       */
      function _class(namespace, options) {
        (0, _classCallCheck3.default)(this, _class);

        namespaces.set(this, namespace);
        loggers.set(this, options.logger);
      }

      /**
       * @private
       * @returns {rawData}
       */


      (0, _createClass3.default)(_class, [{
        key: '_getRawData',
        value: function _getRawData() {
          var rawData = localStorage.getItem(basekey);
          return rawData ? JSON.parse(rawData) : {};
        }

        /**
         * @private
         * @returns {mixed}
         */

      }, {
        key: '_load',
        value: function _load() {
          var allData = this._getRawData();
          return allData[namespaces.get(this)] || {};
        }

        /**
         * @param {Object} data
         * @private
         * @returns {undefined}
         */

      }, {
        key: '_save',
        value: function _save(data) {
          var allData = this._getRawData();
          allData[namespaces.get(this)] = data;

          localStorage.setItem(basekey, (0, _stringify2.default)(allData));
        }

        /**
         * Clears the localStorage
         * @param {string} key
         * @returns {Promise}
         */

      }, {
        key: 'clear',
        value: function clear() {
          loggers.get(this).info('local-storage-store-adapter: clearing localStorage');
          return _promise2.default.resolve(localStorage.removeItem(basekey));
        }

        /**
         * Removes the specified key
         * @param {string} key
         * @returns {Promise}
         */

      }, {
        key: 'del',
        value: function del(key) {
          var _this = this;

          return new _promise2.default(function (resolve) {
            loggers.get(_this).info('local-storage-store-adapter: deleting `' + key + '`');
            var data = _this._load();
            (0, _deleteProperty2.default)(data, key);
            _this._save(data);
            resolve();
          });
        }

        /**
         * Retrieves the data at the specified key
         * @param {string} key
         * @returns {Promise<mixed>}
         */

      }, {
        key: 'get',
        value: function get(key) {
          var _this2 = this;

          return new _promise2.default(function (resolve, reject) {
            loggers.get(_this2).info('local-storage-store-adapter: reading `' + key + '`');
            var data = _this2._load();
            var value = data[key];
            if (typeof value !== 'undefined') {
              return resolve(value);
            }

            return reject(new _sparkCore.NotFoundError('No value found for ' + key));
          });
        }

        /**
         * Stores the specified value at the specified key
         * @param {string} key
         * @param {mixed} value
         * @returns {Promise}
         */

      }, {
        key: 'put',
        value: function put(key, value) {
          var _this3 = this;

          return new _promise2.default(function (resolve) {
            loggers.get(_this3).info('local-storage-store-adapter: writing `' + key + '`');
            var data = _this3._load();
            data[key] = value;
            _this3._save(data);
            resolve();
          });
        }
      }]);
      return _class;
    }();
  }

  /**
   * Returns an adapter bound to the specified namespace
   * @param {string} namespace
   * @param {Object} options
   * @returns {Promise<Bound>}
   */


  (0, _createClass3.default)(StorageAdapterLocalStorage, [{
    key: 'bind',
    value: function bind(namespace, options) {
      options = options || {};
      if (!namespace) {
        return _promise2.default.reject(new Error('`namespace` is required'));
      }

      if (!options.logger) {
        return _promise2.default.reject(new Error('`options.logger` is required'));
      }

      options.logger.info('local-storage-store-adapter: returning binding');

      return _promise2.default.resolve(new this.Bound(namespace, options));
    }
  }]);
  return StorageAdapterLocalStorage;
}();

exports.default = StorageAdapterLocalStorage;
//# sourceMappingURL=index.js.map
