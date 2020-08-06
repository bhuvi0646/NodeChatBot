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
var Page = require('../../../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../../../base/values');  /* jshint ignore:line */

var DependentPhoneNumberList;
var DependentPhoneNumberPage;
var DependentPhoneNumberInstance;

/* jshint ignore:start */
/**
 * @description Initialize the DependentPhoneNumberList
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {string} accountSid - The account_sid
 * @param {string} addressSid -
 *          A 34 character string that uniquely identifies this address.
 */
/* jshint ignore:end */
DependentPhoneNumberList = function DependentPhoneNumberList(version,
    accountSid, addressSid) {
  /* jshint ignore:start */
  /**
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Api.V2010.AccountContext.AddressContext.DependentPhoneNumberContext}
   */
  /* jshint ignore:end */
  function DependentPhoneNumberListInstance(sid) {
    return DependentPhoneNumberListInstance.get(sid);
  }

  DependentPhoneNumberListInstance._version = version;
  // Path Solution
  DependentPhoneNumberListInstance._solution = {accountSid: accountSid, addressSid: addressSid};
  DependentPhoneNumberListInstance._uri = _.template(
    '/Accounts/<%= accountSid %>/Addresses/<%= addressSid %>/DependentPhoneNumbers.json' // jshint ignore:line
  )(DependentPhoneNumberListInstance._solution);
  /* jshint ignore:start */
  /**
   * Streams DependentPhoneNumberInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {object} [opts] - Options for request
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   *         callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  DependentPhoneNumberListInstance.each = function each(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    if (opts.callback) {
      callback = opts.callback;
    }
    if (_.isUndefined(callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var currentResource = 0;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done || (!_.isUndefined(opts.limit) && currentResource >= opts.limit)) {
            done = true;
            return false;
          }

          currentResource++;
          callback(instance, onComplete);
        });

        if ((limits.pageLimit && limits.pageLimit <= currentPage)) {
          onComplete();
        } else if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, _.merge(opts, limits)));
  };

  /* jshint ignore:start */
  /**
   * Lists DependentPhoneNumberInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {object} [opts] - Options for request
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  DependentPhoneNumberListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource, done) {
      allResources.push(resource);

      if (!_.isUndefined(opts.limit) && allResources.length === opts.limit) {
        done();
      }
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of DependentPhoneNumberInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  DependentPhoneNumberListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new DependentPhoneNumberPage(this._version, payload, this._solution));
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
   * Retrieve a single target page of DependentPhoneNumberInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  DependentPhoneNumberListInstance.getPage = function getPage(targetUrl, callback)
                                                               {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new DependentPhoneNumberPage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  return DependentPhoneNumberListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the DependentPhoneNumberPage
 *
 * @param {V2010} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {DependentPhoneNumberSolution} solution - Path solution
 *
 * @returns DependentPhoneNumberPage
 */
/* jshint ignore:end */
DependentPhoneNumberPage = function DependentPhoneNumberPage(version, response,
    solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(DependentPhoneNumberPage.prototype, Page.prototype);
DependentPhoneNumberPage.prototype.constructor = DependentPhoneNumberPage;

/* jshint ignore:start */
/**
 * Build an instance of DependentPhoneNumberInstance
 *
 * @param {DependentPhoneNumberPayload} payload - Payload response from the API
 *
 * @returns DependentPhoneNumberInstance
 */
/* jshint ignore:end */
DependentPhoneNumberPage.prototype.getInstance = function getInstance(payload) {
  return new DependentPhoneNumberInstance(
    this._version,
    payload,
    this._solution.accountSid,
    this._solution.addressSid
  );
};


/* jshint ignore:start */
/**
 * Initialize the DependentPhoneNumberContext
 *
 * @property {string} sid - The sid
 * @property {string} accountSid - The account_sid
 * @property {string} friendlyName - The friendly_name
 * @property {string} phoneNumber - The phone_number
 * @property {string} voiceUrl - The voice_url
 * @property {string} voiceMethod - The voice_method
 * @property {string} voiceFallbackMethod - The voice_fallback_method
 * @property {string} voiceFallbackUrl - The voice_fallback_url
 * @property {boolean} voiceCallerIdLookup - The voice_caller_id_lookup
 * @property {Date} dateCreated - The date_created
 * @property {Date} dateUpdated - The date_updated
 * @property {string} smsFallbackMethod - The sms_fallback_method
 * @property {string} smsFallbackUrl - The sms_fallback_url
 * @property {string} smsMethod - The sms_method
 * @property {string} smsUrl - The sms_url
 * @property {dependent_phone_number.address_requirement} addressRequirements -
 *          The address_requirements
 * @property {string} capabilities - The capabilities
 * @property {string} statusCallback - The status_callback
 * @property {string} statusCallbackMethod - The status_callback_method
 * @property {string} apiVersion - The api_version
 * @property {string} smsApplicationSid - The sms_application_sid
 * @property {string} voiceApplicationSid - The voice_application_sid
 * @property {string} trunkSid - The trunk_sid
 * @property {dependent_phone_number.emergency_status} emergencyStatus -
 *          The emergency_status
 * @property {string} emergencyAddressSid - The emergency_address_sid
 * @property {string} uri - The uri
 *
 * @param {V2010} version - Version of the resource
 * @param {DependentPhoneNumberPayload} payload - The instance payload
 * @param {sid} accountSid - The account_sid
 * @param {sid} addressSid -
 *          A 34 character string that uniquely identifies this address.
 */
/* jshint ignore:end */
DependentPhoneNumberInstance = function DependentPhoneNumberInstance(version,
    payload, accountSid, addressSid) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.friendlyName = payload.friendly_name; // jshint ignore:line
  this.phoneNumber = payload.phone_number; // jshint ignore:line
  this.voiceUrl = payload.voice_url; // jshint ignore:line
  this.voiceMethod = payload.voice_method; // jshint ignore:line
  this.voiceFallbackMethod = payload.voice_fallback_method; // jshint ignore:line
  this.voiceFallbackUrl = payload.voice_fallback_url; // jshint ignore:line
  this.voiceCallerIdLookup = payload.voice_caller_id_lookup; // jshint ignore:line
  this.dateCreated = deserialize.rfc2822DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.rfc2822DateTime(payload.date_updated); // jshint ignore:line
  this.smsFallbackMethod = payload.sms_fallback_method; // jshint ignore:line
  this.smsFallbackUrl = payload.sms_fallback_url; // jshint ignore:line
  this.smsMethod = payload.sms_method; // jshint ignore:line
  this.smsUrl = payload.sms_url; // jshint ignore:line
  this.addressRequirements = payload.address_requirements; // jshint ignore:line
  this.capabilities = payload.capabilities; // jshint ignore:line
  this.statusCallback = payload.status_callback; // jshint ignore:line
  this.statusCallbackMethod = payload.status_callback_method; // jshint ignore:line
  this.apiVersion = payload.api_version; // jshint ignore:line
  this.smsApplicationSid = payload.sms_application_sid; // jshint ignore:line
  this.voiceApplicationSid = payload.voice_application_sid; // jshint ignore:line
  this.trunkSid = payload.trunk_sid; // jshint ignore:line
  this.emergencyStatus = payload.emergency_status; // jshint ignore:line
  this.emergencyAddressSid = payload.emergency_address_sid; // jshint ignore:line
  this.uri = payload.uri; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {accountSid: accountSid, addressSid: addressSid, };
};

/* jshint ignore:start */
/**
 * Produce a plain JSON object version of the DependentPhoneNumberInstance for serialization.
 * Removes any circular references in the object.
 *
 * @returns Object
 */
/* jshint ignore:end */
DependentPhoneNumberInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

module.exports = {
  DependentPhoneNumberList: DependentPhoneNumberList,
  DependentPhoneNumberPage: DependentPhoneNumberPage,
  DependentPhoneNumberInstance: DependentPhoneNumberInstance
};