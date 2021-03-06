'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Factory which produces a multi-keyed container based on the provided set of
 * constructors
 * @param {mixed} containers
 * @returns {Container}
 */
function make() {
  for (var _len = arguments.length, containers = Array(_len), _key = 0; _key < _len; _key++) {
    containers[_key] = arguments[_key];
  }

  var TopContainer = containers.shift();

  var data = new _weakMap2.default();
  var sizes = new _weakMap2.default();

  var ChildContainer = containers.length > 1 ? make.apply(undefined, containers) : containers[0];

  var name = '(' + [TopContainer.name].concat(containers.map(function (container) {
    return container.name;
  })).join(', ') + ')';

  /**
   * Container that wraps an arbitrary set of tupples to their values
   */

  var Container = function () {
    /**
     * @constructs Container
     */
    function Container() {
      (0, _classCallCheck3.default)(this, Container);

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      data.set(this, new (Function.prototype.bind.apply(TopContainer, [null].concat(args)))());
      sizes.set(this, 0);
    }

    /**
     * getter for .size
     * @returns {number}
     */


    (0, _createClass3.default)(Container, [{
      key: 'add',


      /**
       * Identical to Container#set() but leads slightly more intuitive code when
       * the container is based on a Set rather than a Map.
       * @returns {Container}
       */
      value: function add() {
        return this.set.apply(this, arguments);
      }

      /**
       * Removes all items from the container
       * @returns {undefined}
       */

    }, {
      key: 'clear',
      value: function clear() {
        var ret = data.get(this).clear();
        sizes.set(this, 0);
        return ret;
      }

      /**
       * Removes the specified item to the container
       * @param {mixed} key
       * @param {Array<mixed>} keys
       * @returns {boolean}
       */

    }, {
      key: 'delete',
      value: function _delete(key) {
        var mine = data.get(this);

        for (var _len3 = arguments.length, keys = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          keys[_key3 - 1] = arguments[_key3];
        }

        if (!keys.length) {
          return mine.delete(key);
        }

        var next = mine.get(key);
        if (!next) {
          return false;
        }

        var ret = next.delete.apply(next, keys);

        if (ret) {
          sizes.set(this, sizes.get(this) - 1);
        }

        if (next.size === 0) {
          mine.delete(key);
        }

        return ret;
      }

      /**
       * Retrieves the specified item from the container
       * @param {mixed} key
       * @param {Array<mixed>} keys
       * @returns {mixed}
       */

    }, {
      key: 'get',
      value: function get(key) {
        var mine = data.get(this);

        if (!mine.get) {
          return mine;
        }

        for (var _len4 = arguments.length, keys = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          keys[_key4 - 1] = arguments[_key4];
        }

        if (!keys.length) {
          return mine.get(key);
        }

        var next = mine.get(key);
        if (!next) {
          return undefined;
        }

        if (!next.get) {
          return next;
        }
        return next.get.apply(next, keys);
      }

      /**
       * Indicates whether the container holds the specified item
       * @param {mixed} key
       * @param {Array<mixed>} keys
       * @returns {Boolean}
       */

    }, {
      key: 'has',
      value: function has() {
        return typeof this.get.apply(this, arguments) !== 'undefined';
      }

      /**
       * Stores the specified item in the container
       * @param {mixed} key
       * @param {Array<mixed>} args
       * @param {mixed} value
       * @returns {Container}
       */

    }, {
      key: 'set',
      value: function set() {
        var overwrite = false;

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        if (this.has.apply(this, args)) {
          overwrite = true;
        }
        var mine = data.get(this);

        var key = args.shift();

        if (!mine.get) {
          insert.apply(undefined, [mine, key].concat(args));
          return this;
        }

        var next = mine.get(key);
        if (!next) {
          if (!ChildContainer) {
            insert.apply(undefined, [mine, key].concat(args));
            return this;
          }
          next = new ChildContainer();
          insert(mine, key, next);
        }
        insert.apply(undefined, [next].concat(args));

        if (!overwrite) {
          sizes.set(this, sizes.get(this) + 1);
        }
        return this;
      }

      /**
       * @private
       * @returns {string}
       */

    }, {
      key: 'inspect',
      value: function inspect() {
        return 'Container' + name + ' {\n  ' + _util2.default.inspect(data.get(this), { depth: null }) + '\n}';
      }
    }, {
      key: 'size',
      get: function get() {
        return sizes.get(this);
      }
    }]);
    return Container;
  }();

  return Container;
}

/**
 * Inserts into an arbitrary container
 * @param {Map|WeakMap|Set|WeakSet} container
 * @param {Array<mixed>} args
 * @private
 * @returns {undefined}
 */
/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

function insert(container) {
  for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    args[_key6 - 1] = arguments[_key6];
  }

  if (container.add) {
    container.add.apply(container, args);
    return;
  }

  if (container.set) {
    container.set.apply(container, args);
    return;
  }

  if (container.push) {
    container.push.apply(container, args);
    return;
  }
  throw new TypeError('Could not determine how to insert into the specified container');
}
exports.default = make;
//# sourceMappingURL=template-container.js.map
