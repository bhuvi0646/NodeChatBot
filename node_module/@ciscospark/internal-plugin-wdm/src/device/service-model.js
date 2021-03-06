/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

import AmpState from 'ampersand-state';
import {defaults, isObject, some, find} from 'lodash';
import url from 'url';

/**
 * Represent a service parsed from wdm registration.services and
 * registration.serviceHostMap.hostCatalog
 * @param {string} service Service name
 * @param {string} defaultUrl Url provided in registration.services
 * @param {Array<Host>} availableHosts Available datacenters from
 * registration.serviceHostMap sorted by priority
 * @param {string} url Basically is the defaultUrl replaced with host provided in
 * the catalog
 * @class
 */
const ServiceModel = AmpState.extend({
  /**
    * @typedef {Object} Host - Represent a datacenter
    * @property {int} priority - Closer to 0 is higher priority.
    * @property {string} host - Host name.
    * @property {boolean} failed - True when cannot connect to url.
    */

  props: {
    service: 'string',
    defaultUrl: 'string',
    availableHosts: {
      type: 'array',
      default() {
        return [];
      }
    }
  },

  session: {
    currentHostIndex: {
      type: 'number',
      default: 0
    }
  },

  derived: {
    url: {
      deps: ['defaultUrl', 'availableHosts', 'currentHostIndex'],
      fn() {
        if (this.availableHosts.length === 0) {
          return this.defaultUrl;
        }
        let host;
        if (this.currentHostIndex >= this.availableHosts.length) {
          host = this.availableHosts[this.availableHosts.length - 1];
        }
        else {
          host = this.availableHosts[this.currentHostIndex];
        }

        return this._changeUrlHost(this.defaultUrl, host.host);
      }
    }
  },

  constructor(attrs, options) {
    options = options || {};
    defaults(options, {parse: true});
    return Reflect.apply(AmpState.prototype.constructor, this, [attrs, options]);
  },

  idAttribute: 'service',

  // Override AmpersandState.serialize so we can return the latest url
  serialize(...args) {
    const attrs = Reflect.apply(AmpState.prototype.serialize, this, args);
    attrs.url = this.url;
    return attrs;
  },

  // Override parse
  parse(attrs) {
    if (!attrs) {
      return {};
    }

    if (attrs.availableHosts) {
      // ensure highest priority is at the top
      // using number value here instead boolean for IE and Edge
      // https://github.com/tc39/ecma262/issues/902
      attrs.availableHosts.sort((a, b) => a.priority - b.priority);
    }

    return attrs;
  },

  // Override set to make sure we always run parse()
  // See https://github.com/AmpersandJS/ampersand-state/issues/146 for related
  // bug
  set(key, value, options) {
    let attrs;
    // Handle both `"key", value` and `{key: value}` -style arguments.
    // The next block is a direct copy from ampersand-state, so no need to test
    // both scenarios.
    /* istanbul ignore next */
    if (isObject(key) || key === null) {
      attrs = key;
      options = value;
    }
    else {
      attrs = {};
      attrs[key] = value;
    }

    attrs = this.parse(attrs, options);
    return Reflect.apply(AmpState.prototype.set, this, [attrs, options]);
  },


  /**
   * Mark the current host as failing or if a uri is provided, find the host
   * and mark it as fail
   * @param {string} uri Mark the host of this url as fail
   * @returns {undefined}
   */
  markHostFailed(uri) {
    let host = this.getCurrentHost();

    if (uri) {
      const urlObj = url.parse(uri);
      host = find(this.availableHosts, (h) => h.host === urlObj.host);
    }

    if (host) {
      host.failed = true;
    }
  },

  /**
   * Return the next available host, which is usually the next higher priority
   * host that has not yet been marked as failed
   * @returns {Promise<Host>}
   */
  cycleNextHost() {
    for (let i = 0; i < this.availableHosts.length; i += 1) {
      const host = this.availableHosts[i];
      if (!host.failed && this.currentHostIndex !== i) {
        this.currentHostIndex = i;
        return Promise.resolve(host);
      }
    }
    // this means all hosts have failed
    this.currentHostIndex = 0;
    return Promise.reject(new Error(`All hosts have failed for ${this.service}`));
  },

  /**
   * Check if a url comes from this service
   * @param {string} uri
   * @returns {Boolean}
   */
  doesUrlBelongToService(uri) {
    const urlObj = url.parse(uri);
    const hosts = this.availableHosts.map((h) => h.host);
    hosts.push(url.parse(this.defaultUrl).host);
    return some(hosts, (host) => host === urlObj.host);
  },

  /**
   * Return the current host/datacenter
   * @returns {Host}
   */
  getCurrentHost() {
    return this.availableHosts[this.currentHostIndex];
  },

  /**
   * Resets all host/datacenter for a retry
   * @returns {undefined}
   */
  resetAllHosts() {
    this.availableHosts.forEach((host) => {
      host.failed = false;
    });
  },

  /**
   * Replace provided url by the current active host
   * @param {string} uri
   * @returns {string} uri
   */
  replaceUrlWithCurrentHost(uri) {
    return this._changeUrlHost(uri, this.getCurrentHost().host);
  },

  _changeUrlHost(currentUrl, host) {
    const urlObj = url.parse(currentUrl);
    urlObj.host = host;
    return url.format(urlObj);
  }
});

export default ServiceModel;
