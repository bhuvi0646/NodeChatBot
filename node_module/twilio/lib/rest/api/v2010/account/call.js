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
var FeedbackList = require('./call/feedback').FeedbackList;
var FeedbackSummaryList = require('./call/feedbackSummary').FeedbackSummaryList;
var NotificationList = require('./call/notification').NotificationList;
var Page = require('../../../../base/Page');  /* jshint ignore:line */
var RecordingList = require('./call/recording').RecordingList;
var deserialize = require(
    '../../../../base/deserialize');  /* jshint ignore:line */
var serialize = require('../../../../base/serialize');  /* jshint ignore:line */
var values = require('../../../../base/values');  /* jshint ignore:line */

var CallList;
var CallPage;
var CallInstance;
var CallContext;

/* jshint ignore:start */
/**
 * @description Initialize the CallList
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {string} accountSid -
 *          The unique id of the Account responsible for creating this Call
 */
/* jshint ignore:end */
CallList = function CallList(version, accountSid) {
  /* jshint ignore:start */
  /**
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Api.V2010.AccountContext.CallContext}
   */
  /* jshint ignore:end */
  function CallListInstance(sid) {
    return CallListInstance.get(sid);
  }

  CallListInstance._version = version;
  // Path Solution
  CallListInstance._solution = {accountSid: accountSid};
  CallListInstance._uri = _.template(
    '/Accounts/<%= accountSid %>/Calls.json' // jshint ignore:line
  )(CallListInstance._solution);

  // Components
  CallListInstance._feedbackSummaries = undefined;

  /* jshint ignore:start */
  /**
   * create a CallInstance
   *
   * @param {object} opts - Options for request
   * @param {string} opts.to -
   *          Phone number, SIP address, or client identifier to call
   * @param {string} opts.from - Twilio number from which to originate the call
   * @param {string} [opts.method] - HTTP method to use to fetch TwiML
   * @param {string} [opts.fallbackUrl] - Fallback URL in case of error
   * @param {string} [opts.fallbackMethod] - HTTP Method to use with FallbackUrl
   * @param {string} [opts.statusCallback] - Status Callback URL
   * @param {string|list} [opts.statusCallbackEvent] -
   *          The call progress events that Twilio will send webhooks on.
   * @param {string} [opts.statusCallbackMethod] -
   *          HTTP Method to use with StatusCallback
   * @param {string} [opts.sendDigits] - Digits to send
   * @param {string} [opts.ifMachine] - The if_machine
   * @param {number} [opts.timeout] - Number of seconds to wait for an answer
   * @param {boolean} [opts.record] - Whether or not to record the Call
   * @param {string} [opts.recordingChannels] -
   *          mono or dualSet this parameter to specify the number of channels in the final recording.
   * @param {string} [opts.recordingStatusCallback] -
   *          A URL that Twilio will send a webhook request to when the recording is available for access.
   * @param {string} [opts.recordingStatusCallbackMethod] -
   *          The HTTP method Twilio should use when requesting the `RecordingStatusCallback` URL.
   * @param {string} [opts.sipAuthUsername] - The sip_auth_username
   * @param {string} [opts.sipAuthPassword] - The sip_auth_password
   * @param {string} [opts.machineDetection] -
   *          Enable machine detection or end of greeting detection
   * @param {number} [opts.machineDetectionTimeout] -
   *          Number of miliseconds to wait for machine detection
   * @param {string|list} [opts.recordingStatusCallbackEvent] -
   *          The recording status changes that Twilio will send webhooks on to the URL specified in RecordingStatusCallback.
   * @param {string} [opts.trim] -
   *          Set this parameter to control trimming of silence on the recording.
   * @param {string} [opts.callerId] -
   *          The phone number, SIP address, or Client identifier that made this Call. Phone numbers are in E.164 format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`.
   * @param {string} [opts.url] - Url from which to fetch TwiML
   * @param {string} [opts.applicationSid] -
   *          ApplicationSid that configures from where to fetch TwiML
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed CallInstance
   */
  /* jshint ignore:end */
  CallListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.to)) {
      throw new Error('Required parameter "opts.to" missing.');
    }
    if (_.isUndefined(opts.from)) {
      throw new Error('Required parameter "opts.from" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'To': _.get(opts, 'to'),
      'From': _.get(opts, 'from'),
      'Url': _.get(opts, 'url'),
      'ApplicationSid': _.get(opts, 'applicationSid'),
      'Method': _.get(opts, 'method'),
      'FallbackUrl': _.get(opts, 'fallbackUrl'),
      'FallbackMethod': _.get(opts, 'fallbackMethod'),
      'StatusCallback': _.get(opts, 'statusCallback'),
      'StatusCallbackEvent': serialize.map(_.get(opts, 'statusCallbackEvent'), function(e) { return e; }),
      'StatusCallbackMethod': _.get(opts, 'statusCallbackMethod'),
      'SendDigits': _.get(opts, 'sendDigits'),
      'IfMachine': _.get(opts, 'ifMachine'),
      'Timeout': _.get(opts, 'timeout'),
      'Record': serialize.bool(_.get(opts, 'record')),
      'RecordingChannels': _.get(opts, 'recordingChannels'),
      'RecordingStatusCallback': _.get(opts, 'recordingStatusCallback'),
      'RecordingStatusCallbackMethod': _.get(opts, 'recordingStatusCallbackMethod'),
      'SipAuthUsername': _.get(opts, 'sipAuthUsername'),
      'SipAuthPassword': _.get(opts, 'sipAuthPassword'),
      'MachineDetection': _.get(opts, 'machineDetection'),
      'MachineDetectionTimeout': _.get(opts, 'machineDetectionTimeout'),
      'RecordingStatusCallbackEvent': serialize.map(_.get(opts, 'recordingStatusCallbackEvent'), function(e) { return e; }),
      'Trim': _.get(opts, 'trim'),
      'CallerId': _.get(opts, 'callerId')
    });

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new CallInstance(
        this._version,
        payload,
        this._solution.accountSid,
        this._solution.sid
      ));
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
   * Streams CallInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.to] - Phone number or Client identifier to filter `to` on
   * @param {string} [opts.from] -
   *          Phone number or Client identifier to filter `from` on
   * @param {string} [opts.parentCallSid] - Parent Call Sid to filter on
   * @param {call.status} [opts.status] - Status to filter on
   * @param {Date} [opts.startTimeBefore] - StartTime to filter on
   * @param {Date} [opts.startTime] - StartTime to filter on
   * @param {Date} [opts.startTimeAfter] - StartTime to filter on
   * @param {Date} [opts.endTimeBefore] - EndTime to filter on
   * @param {Date} [opts.endTime] - EndTime to filter on
   * @param {Date} [opts.endTimeAfter] - EndTime to filter on
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
  CallListInstance.each = function each(opts, callback) {
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
   * Lists CallInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.to] - Phone number or Client identifier to filter `to` on
   * @param {string} [opts.from] -
   *          Phone number or Client identifier to filter `from` on
   * @param {string} [opts.parentCallSid] - Parent Call Sid to filter on
   * @param {call.status} [opts.status] - Status to filter on
   * @param {Date} [opts.startTimeBefore] - StartTime to filter on
   * @param {Date} [opts.startTime] - StartTime to filter on
   * @param {Date} [opts.startTimeAfter] - StartTime to filter on
   * @param {Date} [opts.endTimeBefore] - EndTime to filter on
   * @param {Date} [opts.endTime] - EndTime to filter on
   * @param {Date} [opts.endTimeAfter] - EndTime to filter on
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
  CallListInstance.list = function list(opts, callback) {
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
   * Retrieve a single page of CallInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.to] - Phone number or Client identifier to filter `to` on
   * @param {string} [opts.from] -
   *          Phone number or Client identifier to filter `from` on
   * @param {string} [opts.parentCallSid] - Parent Call Sid to filter on
   * @param {call.status} [opts.status] - Status to filter on
   * @param {Date} [opts.startTimeBefore] - StartTime to filter on
   * @param {Date} [opts.startTime] - StartTime to filter on
   * @param {Date} [opts.startTimeAfter] - StartTime to filter on
   * @param {Date} [opts.endTimeBefore] - EndTime to filter on
   * @param {Date} [opts.endTime] - EndTime to filter on
   * @param {Date} [opts.endTimeAfter] - EndTime to filter on
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  CallListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'To': _.get(opts, 'to'),
      'From': _.get(opts, 'from'),
      'ParentCallSid': _.get(opts, 'parentCallSid'),
      'Status': _.get(opts, 'status'),
      'StartTime<': serialize.iso8601DateTime(_.get(opts, 'startTimeBefore')),
      'StartTime': serialize.iso8601DateTime(_.get(opts, 'startTime')),
      'StartTime>': serialize.iso8601DateTime(_.get(opts, 'startTimeAfter')),
      'EndTime<': serialize.iso8601DateTime(_.get(opts, 'endTimeBefore')),
      'EndTime': serialize.iso8601DateTime(_.get(opts, 'endTime')),
      'EndTime>': serialize.iso8601DateTime(_.get(opts, 'endTimeAfter')),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new CallPage(this._version, payload, this._solution));
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
   * Retrieve a single target page of CallInstance records from the API.
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
  CallListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new CallPage(this._version, payload, this._solution));
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
   * Constructs a call
   *
   * @param {string} sid - Call Sid that uniquely identifies the Call to fetch
   *
   * @returns {Twilio.Api.V2010.AccountContext.CallContext}
   */
  /* jshint ignore:end */
  CallListInstance.get = function get(sid) {
    return new CallContext(this._version, this._solution.accountSid, sid);
  };

  Object.defineProperty(CallListInstance,
    'feedbackSummaries', {
    get: function feedbackSummaries() {
      if (!this._feedbackSummaries) {
        this._feedbackSummaries = new FeedbackSummaryList(this._version, this._solution.accountSid);
      }

      return this._feedbackSummaries;
    }
  });

  return CallListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the CallPage
 *
 * @param {V2010} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {CallSolution} solution - Path solution
 *
 * @returns CallPage
 */
/* jshint ignore:end */
CallPage = function CallPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(CallPage.prototype, Page.prototype);
CallPage.prototype.constructor = CallPage;

/* jshint ignore:start */
/**
 * Build an instance of CallInstance
 *
 * @param {CallPayload} payload - Payload response from the API
 *
 * @returns CallInstance
 */
/* jshint ignore:end */
CallPage.prototype.getInstance = function getInstance(payload) {
  return new CallInstance(this._version, payload, this._solution.accountSid);
};


/* jshint ignore:start */
/**
 * Initialize the CallContext
 *
 * @property {string} accountSid -
 *          The unique id of the Account responsible for creating this Call
 * @property {string} annotation - The annotation provided for the Call
 * @property {string} answeredBy -
 *          Either `human` or `machine` if this Call was initiated with answering machine detection. Empty otherwise.
 * @property {string} apiVersion - The API Version used to create the Call
 * @property {string} callerName -
 *          The caller's name if this Call was an incoming call to a phone number with Caller ID Lookup enabled. Empty otherwise.
 * @property {Date} dateCreated - The date that this resource was created
 * @property {Date} dateUpdated - The date that this resource was last updated
 * @property {string} direction -
 *          A string describing the direction of the Call. `inbound` for inbound calls, `outbound-api` for calls initiated via the REST API or `outbound-dial` for calls initiated by a `Dial` verb.
 * @property {string} duration - The length of the Call in seconds.
 * @property {Date} endTime -
 *          The end time of the Call. Null if the call did not complete successfully.
 * @property {string} forwardedFrom -
 *          The forwarding phone number if this Call was an incoming call forwarded from another number (depends on carrier supporting forwarding). Empty otherwise.
 * @property {string} from -
 *          The phone number, SIP address or Client identifier that made this Call. Phone numbers are in E.164 format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`.
 * @property {string} fromFormatted -
 *          The phone number, SIP address or Client identifier that made this Call. Formatted for display.
 * @property {string} groupSid -
 *          A 34-character Group Sid associated with this Call. Empty if no Group is associated with the Call.
 * @property {string} parentCallSid -
 *          A 34-character string that uniquely identifies the Call that created this leg.
 * @property {string} phoneNumberSid -
 *          If the call was inbound, this is the Sid of the `IncomingPhoneNumber` that received the call. If the call was outbound, it is the Sid of the `OutgoingCallerId` from which the call was placed.
 * @property {number} price -
 *          The charge for this Call, in the currency associated with the account. Populated after the call is completed. May not be immediately available.
 * @property {string} priceUnit - The currency in which `Price` is measured.
 * @property {string} sid -
 *          A 34-character string that uniquely identifies the Call resource.
 * @property {Date} startTime -
 *          The start time of the Call. Null if the call has not yet been dialed.
 * @property {call.status} status - A string representing the status of the Call.
 * @property {string} subresourceUris - Call Instance Subresources
 * @property {string} to -
 *          The phone number, SIP address or Client identifier that received this Call. Phone numbers are in E.164 format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`.
 * @property {string} toFormatted -
 *          The phone number, SIP address or Client identifier that received this Call. Formatted for display.
 * @property {string} uri -
 *          The URI for this resource, relative to `https://api.twilio.com`
 *
 * @param {V2010} version - Version of the resource
 * @param {CallPayload} payload - The instance payload
 * @param {sid} accountSid -
 *          The unique id of the Account responsible for creating this Call
 * @param {sid} sid - Call Sid that uniquely identifies the Call to fetch
 */
/* jshint ignore:end */
CallInstance = function CallInstance(version, payload, accountSid, sid) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.annotation = payload.annotation; // jshint ignore:line
  this.answeredBy = payload.answered_by; // jshint ignore:line
  this.apiVersion = payload.api_version; // jshint ignore:line
  this.callerName = payload.caller_name; // jshint ignore:line
  this.dateCreated = deserialize.rfc2822DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.rfc2822DateTime(payload.date_updated); // jshint ignore:line
  this.direction = payload.direction; // jshint ignore:line
  this.duration = payload.duration; // jshint ignore:line
  this.endTime = deserialize.rfc2822DateTime(payload.end_time); // jshint ignore:line
  this.forwardedFrom = payload.forwarded_from; // jshint ignore:line
  this.from = payload.from; // jshint ignore:line
  this.fromFormatted = payload.from_formatted; // jshint ignore:line
  this.groupSid = payload.group_sid; // jshint ignore:line
  this.parentCallSid = payload.parent_call_sid; // jshint ignore:line
  this.phoneNumberSid = payload.phone_number_sid; // jshint ignore:line
  this.price = deserialize.decimal(payload.price); // jshint ignore:line
  this.priceUnit = payload.price_unit; // jshint ignore:line
  this.sid = payload.sid; // jshint ignore:line
  this.startTime = deserialize.rfc2822DateTime(payload.start_time); // jshint ignore:line
  this.status = payload.status; // jshint ignore:line
  this.subresourceUris = payload.subresource_uris; // jshint ignore:line
  this.to = payload.to; // jshint ignore:line
  this.toFormatted = payload.to_formatted; // jshint ignore:line
  this.uri = payload.uri; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {accountSid: accountSid, sid: sid || this.sid, };
};

Object.defineProperty(CallInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new CallContext(this._version, this._solution.accountSid, this._solution.sid);
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * remove a CallInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CallInstance
 */
/* jshint ignore:end */
CallInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * fetch a CallInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CallInstance
 */
/* jshint ignore:end */
CallInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * update a CallInstance
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.url] - URL that returns TwiML
 * @param {string} [opts.method] - HTTP method to use to fetch TwiML
 * @param {call.update_status} [opts.status] - Status to update the Call with
 * @param {string} [opts.fallbackUrl] - Fallback URL in case of error
 * @param {string} [opts.fallbackMethod] - HTTP Method to use with FallbackUrl
 * @param {string} [opts.statusCallback] - Status Callback URL
 * @param {string} [opts.statusCallbackMethod] -
 *          HTTP Method to use with StatusCallback
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CallInstance
 */
/* jshint ignore:end */
CallInstance.prototype.update = function update(opts, callback) {
  return this._proxy.update(opts, callback);
};

/* jshint ignore:start */
/**
 * Access the recordings
 *
 * @returns {Twilio.Api.V2010.AccountContext.CallContext.RecordingList}
 */
/* jshint ignore:end */
CallInstance.prototype.recordings = function recordings() {
  return this._proxy.recordings;
};

/* jshint ignore:start */
/**
 * Access the notifications
 *
 * @returns {Twilio.Api.V2010.AccountContext.CallContext.NotificationList}
 */
/* jshint ignore:end */
CallInstance.prototype.notifications = function notifications() {
  return this._proxy.notifications;
};

/* jshint ignore:start */
/**
 * Access the feedback
 *
 * @returns {Twilio.Api.V2010.AccountContext.CallContext.FeedbackList}
 */
/* jshint ignore:end */
CallInstance.prototype.feedback = function feedback() {
  return this._proxy.feedback;
};

/* jshint ignore:start */
/**
 * Produce a plain JSON object version of the CallInstance for serialization.
 * Removes any circular references in the object.
 *
 * @returns Object
 */
/* jshint ignore:end */
CallInstance.prototype.toJSON = function toJSON() {
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
 * Initialize the CallContext
 *
 * @property {Twilio.Api.V2010.AccountContext.CallContext.RecordingList} recordings -
 *          recordings resource
 * @property {Twilio.Api.V2010.AccountContext.CallContext.NotificationList} notifications -
 *          notifications resource
 * @property {Twilio.Api.V2010.AccountContext.CallContext.FeedbackList} feedback -
 *          feedback resource
 *
 * @param {V2010} version - Version of the resource
 * @param {sid} accountSid - The account_sid
 * @param {sid} sid - Call Sid that uniquely identifies the Call to fetch
 */
/* jshint ignore:end */
CallContext = function CallContext(version, accountSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {accountSid: accountSid, sid: sid, };
  this._uri = _.template(
    '/Accounts/<%= accountSid %>/Calls/<%= sid %>.json' // jshint ignore:line
  )(this._solution);

  // Dependents
  this._recordings = undefined;
  this._notifications = undefined;
  this._feedback = undefined;
};

/* jshint ignore:start */
/**
 * remove a CallInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CallInstance
 */
/* jshint ignore:end */
CallContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({uri: this._uri, method: 'DELETE'});

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
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
 * fetch a CallInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CallInstance
 */
/* jshint ignore:end */
CallContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new CallInstance(
      this._version,
      payload,
      this._solution.accountSid,
      this._solution.sid
    ));
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
 * update a CallInstance
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.url] - URL that returns TwiML
 * @param {string} [opts.method] - HTTP method to use to fetch TwiML
 * @param {call.update_status} [opts.status] - Status to update the Call with
 * @param {string} [opts.fallbackUrl] - Fallback URL in case of error
 * @param {string} [opts.fallbackMethod] - HTTP Method to use with FallbackUrl
 * @param {string} [opts.statusCallback] - Status Callback URL
 * @param {string} [opts.statusCallbackMethod] -
 *          HTTP Method to use with StatusCallback
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed CallInstance
 */
/* jshint ignore:end */
CallContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'Url': _.get(opts, 'url'),
    'Method': _.get(opts, 'method'),
    'Status': _.get(opts, 'status'),
    'FallbackUrl': _.get(opts, 'fallbackUrl'),
    'FallbackMethod': _.get(opts, 'fallbackMethod'),
    'StatusCallback': _.get(opts, 'statusCallback'),
    'StatusCallbackMethod': _.get(opts, 'statusCallbackMethod')
  });

  var promise = this._version.update({uri: this._uri, method: 'POST', data: data});

  promise = promise.then(function(payload) {
    deferred.resolve(new CallInstance(
      this._version,
      payload,
      this._solution.accountSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

Object.defineProperty(CallContext.prototype,
  'recordings', {
  get: function() {
    if (!this._recordings) {
      this._recordings = new RecordingList(this._version, this._solution.accountSid, this._solution.sid);
    }
    return this._recordings;
  }
});

Object.defineProperty(CallContext.prototype,
  'notifications', {
  get: function() {
    if (!this._notifications) {
      this._notifications = new NotificationList(
        this._version,
        this._solution.accountSid,
        this._solution.sid
      );
    }
    return this._notifications;
  }
});

Object.defineProperty(CallContext.prototype,
  'feedback', {
  get: function() {
    if (!this._feedback) {
      this._feedback = new FeedbackList(this._version, this._solution.accountSid, this._solution.sid);
    }
    return this._feedback;
  }
});

module.exports = {
  CallList: CallList,
  CallPage: CallPage,
  CallInstance: CallInstance,
  CallContext: CallContext
};