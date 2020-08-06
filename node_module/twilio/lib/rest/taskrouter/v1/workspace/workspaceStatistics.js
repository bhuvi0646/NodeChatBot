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

var WorkspaceStatisticsList;
var WorkspaceStatisticsPage;
var WorkspaceStatisticsInstance;
var WorkspaceStatisticsContext;

/* jshint ignore:start */
/**
 * @description Initialize the WorkspaceStatisticsList
 *
 * @param {Twilio.Taskrouter.V1} version - Version of the resource
 * @param {string} workspaceSid - The workspace_sid
 */
/* jshint ignore:end */
WorkspaceStatisticsList = function WorkspaceStatisticsList(version,
                                                            workspaceSid) {
  /* jshint ignore:start */
  /**
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Taskrouter.V1.WorkspaceContext.WorkspaceStatisticsContext}
   */
  /* jshint ignore:end */
  function WorkspaceStatisticsListInstance(sid) {
    return WorkspaceStatisticsListInstance.get(sid);
  }

  WorkspaceStatisticsListInstance._version = version;
  // Path Solution
  WorkspaceStatisticsListInstance._solution = {workspaceSid: workspaceSid};
  /* jshint ignore:start */
  /**
   * Constructs a workspace_statistics
   *
   * @returns {Twilio.Taskrouter.V1.WorkspaceContext.WorkspaceStatisticsContext}
   */
  /* jshint ignore:end */
  WorkspaceStatisticsListInstance.get = function get() {
    return new WorkspaceStatisticsContext(this._version, this._solution.workspaceSid);
  };

  return WorkspaceStatisticsListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the WorkspaceStatisticsPage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {WorkspaceStatisticsSolution} solution - Path solution
 *
 * @returns WorkspaceStatisticsPage
 */
/* jshint ignore:end */
WorkspaceStatisticsPage = function WorkspaceStatisticsPage(version, response,
                                                            solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(WorkspaceStatisticsPage.prototype, Page.prototype);
WorkspaceStatisticsPage.prototype.constructor = WorkspaceStatisticsPage;

/* jshint ignore:start */
/**
 * Build an instance of WorkspaceStatisticsInstance
 *
 * @param {WorkspaceStatisticsPayload} payload - Payload response from the API
 *
 * @returns WorkspaceStatisticsInstance
 */
/* jshint ignore:end */
WorkspaceStatisticsPage.prototype.getInstance = function getInstance(payload) {
  return new WorkspaceStatisticsInstance(this._version, payload, this._solution.workspaceSid);
};


/* jshint ignore:start */
/**
 * Initialize the WorkspaceStatisticsContext
 *
 * @property {string} realtime - The realtime
 * @property {string} cumulative - The cumulative
 * @property {string} accountSid - The account_sid
 * @property {string} workspaceSid - The workspace_sid
 * @property {string} url - The url
 *
 * @param {V1} version - Version of the resource
 * @param {WorkspaceStatisticsPayload} payload - The instance payload
 * @param {sid} workspaceSid - The workspace_sid
 */
/* jshint ignore:end */
WorkspaceStatisticsInstance = function WorkspaceStatisticsInstance(version,
    payload, workspaceSid) {
  this._version = version;

  // Marshaled Properties
  this.realtime = payload.realtime; // jshint ignore:line
  this.cumulative = payload.cumulative; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.workspaceSid = payload.workspace_sid; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {workspaceSid: workspaceSid, };
};

Object.defineProperty(WorkspaceStatisticsInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new WorkspaceStatisticsContext(this._version, this._solution.workspaceSid);
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * fetch a WorkspaceStatisticsInstance
 *
 * @param {object} [opts] - Options for request
 * @param {number} [opts.minutes] -
 *          Filter cumulative statistics by up to 'x' minutes in the past.
 * @param {Date} [opts.startDate] - Filter cumulative statistics by a start date.
 * @param {Date} [opts.endDate] - Filter cumulative statistics by an end date.
 * @param {string} [opts.taskChannel] -
 *          Filter real-time and cumulative statistics by TaskChannel.
 * @param {string} [opts.splitByWaitTime] -
 *          A comma separated values for viewing splits of tasks canceled and accepted above the given threshold in seconds.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed WorkspaceStatisticsInstance
 */
/* jshint ignore:end */
WorkspaceStatisticsInstance.prototype.fetch = function fetch(opts, callback) {
  return this._proxy.fetch(opts, callback);
};

/* jshint ignore:start */
/**
 * Produce a plain JSON object version of the WorkspaceStatisticsInstance for serialization.
 * Removes any circular references in the object.
 *
 * @returns Object
 */
/* jshint ignore:end */
WorkspaceStatisticsInstance.prototype.toJSON = function toJSON() {
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
 * Initialize the WorkspaceStatisticsContext
 *
 * @param {V1} version - Version of the resource
 * @param {sid} workspaceSid - The workspace_sid
 */
/* jshint ignore:end */
WorkspaceStatisticsContext = function WorkspaceStatisticsContext(version,
    workspaceSid) {
  this._version = version;

  // Path Solution
  this._solution = {workspaceSid: workspaceSid, };
  this._uri = _.template(
    '/Workspaces/<%= workspaceSid %>/Statistics' // jshint ignore:line
  )(this._solution);
};

/* jshint ignore:start */
/**
 * fetch a WorkspaceStatisticsInstance
 *
 * @param {object} [opts] - Options for request
 * @param {number} [opts.minutes] -
 *          Filter cumulative statistics by up to 'x' minutes in the past.
 * @param {Date} [opts.startDate] - Filter cumulative statistics by a start date.
 * @param {Date} [opts.endDate] - Filter cumulative statistics by an end date.
 * @param {string} [opts.taskChannel] -
 *          Filter real-time and cumulative statistics by TaskChannel.
 * @param {string} [opts.splitByWaitTime] -
 *          A comma separated values for viewing splits of tasks canceled and accepted above the given threshold in seconds.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed WorkspaceStatisticsInstance
 */
/* jshint ignore:end */
WorkspaceStatisticsContext.prototype.fetch = function fetch(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'Minutes': _.get(opts, 'minutes'),
    'StartDate': serialize.iso8601DateTime(_.get(opts, 'startDate')),
    'EndDate': serialize.iso8601DateTime(_.get(opts, 'endDate')),
    'TaskChannel': _.get(opts, 'taskChannel'),
    'SplitByWaitTime': _.get(opts, 'splitByWaitTime')
  });

  var promise = this._version.fetch({uri: this._uri, method: 'GET', params: data});

  promise = promise.then(function(payload) {
    deferred.resolve(new WorkspaceStatisticsInstance(
      this._version,
      payload,
      this._solution.workspaceSid
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

module.exports = {
  WorkspaceStatisticsList: WorkspaceStatisticsList,
  WorkspaceStatisticsPage: WorkspaceStatisticsPage,
  WorkspaceStatisticsInstance: WorkspaceStatisticsInstance,
  WorkspaceStatisticsContext: WorkspaceStatisticsContext
};