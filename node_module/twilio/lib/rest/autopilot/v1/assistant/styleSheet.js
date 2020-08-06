'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var Page = require('../../../../base/Page');  /* jshint ignore:line */
var serialize = require('../../../../base/serialize');  /* jshint ignore:line */
var values = require('../../../../base/values');  /* jshint ignore:line */

var StyleSheetList;
var StyleSheetPage;
var StyleSheetInstance;
var StyleSheetContext;

/* jshint ignore:start */
/**
 * @description Initialize the StyleSheetList
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param {Twilio.Autopilot.V1} version - Version of the resource
 * @param {string} assistantSid - The unique ID of the Assistant
 */
/* jshint ignore:end */
StyleSheetList = function StyleSheetList(version, assistantSid) {
  /* jshint ignore:start */
  /**
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Autopilot.V1.AssistantContext.StyleSheetContext}
   */
  /* jshint ignore:end */
  function StyleSheetListInstance(sid) {
    return StyleSheetListInstance.get(sid);
  }

  StyleSheetListInstance._version = version;
  // Path Solution
  StyleSheetListInstance._solution = {assistantSid: assistantSid};
  /* jshint ignore:start */
  /**
   * Constructs a style_sheet
   *
   * @returns {Twilio.Autopilot.V1.AssistantContext.StyleSheetContext}
   */
  /* jshint ignore:end */
  StyleSheetListInstance.get = function get() {
    return new StyleSheetContext(this._version, this._solution.assistantSid);
  };

  return StyleSheetListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the StyleSheetPagePLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {StyleSheetSolution} solution - Path solution
 *
 * @returns StyleSheetPage
 */
/* jshint ignore:end */
StyleSheetPage = function StyleSheetPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(StyleSheetPage.prototype, Page.prototype);
StyleSheetPage.prototype.constructor = StyleSheetPage;

/* jshint ignore:start */
/**
 * Build an instance of StyleSheetInstance
 *
 * @param {StyleSheetPayload} payload - Payload response from the API
 *
 * @returns StyleSheetInstance
 */
/* jshint ignore:end */
StyleSheetPage.prototype.getInstance = function getInstance(payload) {
  return new StyleSheetInstance(this._version, payload, this._solution.assistantSid);
};


/* jshint ignore:start */
/**
 * Initialize the StyleSheetContextPLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @property {string} accountSid -
 *          The unique ID of the Account that created this Assistant
 * @property {string} assistantSid - The unique ID of the Assistant
 * @property {string} url - The url
 * @property {string} data - The JSON style sheet object
 *
 * @param {V1} version - Version of the resource
 * @param {StyleSheetPayload} payload - The instance payload
 * @param {sid} assistantSid - The unique ID of the Assistant
 */
/* jshint ignore:end */
StyleSheetInstance = function StyleSheetInstance(version, payload, assistantSid)
                                                  {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.assistantSid = payload.assistant_sid; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line
  this.data = payload.data; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {assistantSid: assistantSid, };
};

Object.defineProperty(StyleSheetInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new StyleSheetContext(this._version, this._solution.assistantSid);
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * fetch a StyleSheetInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed StyleSheetInstance
 */
/* jshint ignore:end */
StyleSheetInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * update a StyleSheetInstance
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.styleSheet] - The JSON Style sheet string
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed StyleSheetInstance
 */
/* jshint ignore:end */
StyleSheetInstance.prototype.update = function update(opts, callback) {
  return this._proxy.update(opts, callback);
};

/* jshint ignore:start */
/**
 * Produce a plain JSON object version of the StyleSheetInstance for serialization.
 * Removes any circular references in the object.
 *
 * @returns Object
 */
/* jshint ignore:end */
StyleSheetInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};


/* jshint ignore:start */
/**
 * Initialize the StyleSheetContextPLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param {V1} version - Version of the resource
 * @param {sid_like} assistantSid - The unique ID of the Assistant
 */
/* jshint ignore:end */
StyleSheetContext = function StyleSheetContext(version, assistantSid) {
  this._version = version;

  // Path Solution
  this._solution = {assistantSid: assistantSid, };
  this._uri = _.template(
    '/Assistants/<%= assistantSid %>/StyleSheet' // jshint ignore:line
  )(this._solution);
};

/* jshint ignore:start */
/**
 * fetch a StyleSheetInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed StyleSheetInstance
 */
/* jshint ignore:end */
StyleSheetContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new StyleSheetInstance(this._version, payload, this._solution.assistantSid));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * update a StyleSheetInstance
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.styleSheet] - The JSON Style sheet string
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed StyleSheetInstance
 */
/* jshint ignore:end */
StyleSheetContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({'StyleSheet': serialize.object(_.get(opts, 'styleSheet'))});

  var promise = this._version.update({uri: this._uri, method: 'POST', data: data});

  promise = promise.then(function(payload) {
    deferred.resolve(new StyleSheetInstance(this._version, payload, this._solution.assistantSid));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

module.exports = {
  StyleSheetList: StyleSheetList,
  StyleSheetPage: StyleSheetPage,
  StyleSheetInstance: StyleSheetInstance,
  StyleSheetContext: StyleSheetContext
};
