'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

var itemsMap = new _weakMap2.default();
var linksMap = new _weakMap2.default();
var sparksMap = new _weakMap2.default();

/**
 * @class Page
 */

var Page = function () {
  (0, _createClass3.default)(Page, [{
    key: 'items',

    /**
     * @type {Array}
     */
    get: function get() {
      return itemsMap.get(this);
    }

    /**
     * @type {number}
     */

  }, {
    key: 'length',
    get: function get() {
      return this.items.length;
    }

    /**
     * @private
     * @type {Object}
     */

  }, {
    key: 'links',
    get: function get() {
      return linksMap.get(this);
    }

    /**
     * @private
     * @type {ProxySpark}
     */

  }, {
    key: 'spark',
    get: function get() {
      return sparksMap.get(this);
    }

    /**
     * @constructs {Page}
     * @param {HttpResponse} res
     * @param {ProxySpark} spark
     * @returns {Page}
     */

  }]);

  function Page(res, spark) {
    (0, _classCallCheck3.default)(this, Page);

    itemsMap.set(this, res.body.items);
    linksMap.set(this, Page.parseLinkHeaders(res.headers.link));
    sparksMap.set(this, spark);

    return this;
  }

  /**
   * Separate a single link header string into an actionable object
   * @param {string} linkHeaders
   * @private
   * @returns {Object}
   */


  (0, _createClass3.default)(Page, [{
    key: 'next',


    /**
     * Get next page
     * @returns {Function}
     */
    value: function next() {
      return this.getLink('next');
    }

    /**
     * Indicates if there's another page
     * @returns {Boolean}
     */

  }, {
    key: 'hasNext',
    value: function hasNext() {
      return this.hasLink('next');
    }

    /**
     * Get previous page
     * @returns {Page}
     */

  }, {
    key: 'previous',
    value: function previous() {
      return this.getLink('previous');
    }

    /**
     * Indicates if there is a previous Page
     * @returns {Boolean}
     */

  }, {
    key: 'hasPrevious',
    value: function hasPrevious() {
      return this.hasLink('previous');
    }

    /**
     * Retrieves the `Page` at url specified by `link`
     * @param {string} link Specifies which link header to return
     * @private
     * @returns {Promise<Page>}
     */

  }, {
    key: 'getLink',
    value: function getLink(link) {
      var _this = this;

      return this.spark.request({
        uri: this.links[link]
      }).then(function (res) {
        return new Page(res, _this.spark);
      });
    }

    /**
     * Indicates if the specified link is in the link header
     * @param {string} link
     * @private
     * @returns {Boolean}
     */

  }, {
    key: 'hasLink',
    value: function hasLink(link) {
      return Boolean(this.links[link]);
    }

    /**
     * Iterator
     * @returns {Object}
     */

  }, {
    key: _iterator2.default,
    value: function value() {
      var _this2 = this;

      var i = -1;
      return {
        next: function next() {
          i += 1;
          if (i < _this2.length) {
            return {
              value: _this2.items[i]
            };
          }

          return { done: true };
        }
      };
    }
  }], [{
    key: 'parseLinkHeaders',
    value: function parseLinkHeaders(linkHeaders) {
      if (!linkHeaders) {
        return {};
      }

      linkHeaders = Array.isArray(linkHeaders) ? linkHeaders : [linkHeaders];
      return linkHeaders.reduce(function (links, linkHeader) {
        linkHeader = linkHeader.split(';');
        var link = linkHeader[0].replace('<', '').replace('>', '');
        var rel = linkHeader[1].split('=')[1].replace(/"/g, '');
        links[rel] = link;
        return links;
      }, {});
    }
  }]);
  return Page;
}();

exports.default = Page;
//# sourceMappingURL=page.js.map
