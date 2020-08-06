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
var WorkflowCumulativeStatisticsList = require(
    './workflow/workflowCumulativeStatistics').WorkflowCumulativeStatisticsList;
var WorkflowRealTimeStatisticsList = require(
    './workflow/workflowRealTimeStatistics').WorkflowRealTimeStatisticsList;
var WorkflowStatisticsList = require(
    './workflow/workflowStatistics').WorkflowStatisticsList;
var deserialize = require(
    '../../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../../base/values');  /* jshint ignore:line */

var WorkflowList;
var WorkflowPage;
var WorkflowInstance;
var WorkflowContext;

/* jshint ignore:start */
/**
 * @description Initialize the WorkflowList
 *
 * @param {Twilio.Taskrouter.V1} version - Version of the resource
 * @param {string} workspaceSid -
 *          The ID of the Workspace that contains this Workflow
 */
/* jshint ignore:end */
WorkflowList = function WorkflowList(version, workspaceSid) {
  /* jshint ignore:start */
  /**
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext}
   */
  /* jshint ignore:end */
  function WorkflowListInstance(sid) {
    return WorkflowListInstance.get(sid);
  }

  WorkflowListInstance._version = version;
  // Path Solution
  WorkflowListInstance._solution = {workspaceSid: workspaceSid};
  WorkflowListInstance._uri = _.template(
    '/Workspaces/<%= workspaceSid %>/Workflows' // jshint ignore:line
  )(WorkflowListInstance._solution);
  /* jshint ignore:start */
  /**
   * Streams WorkflowInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.friendlyName] -
   *          Human readable description of this Workflow
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
  WorkflowListInstance.each = function each(opts, callback) {
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
   * Lists WorkflowInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.friendlyName] -
   *          Human readable description of this Workflow
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
  WorkflowListInstance.list = function list(opts, callback) {
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
   * Retrieve a single page of WorkflowInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.friendlyName] -
   *          Human readable description of this Workflow
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  WorkflowListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'FriendlyName': _.get(opts, 'friendlyName'),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new WorkflowPage(this._version, payload, this._solution));
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
   * Retrieve a single target page of WorkflowInstance records from the API.
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
  WorkflowListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new WorkflowPage(this._version, payload, this._solution));
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
   * create a WorkflowInstance
   *
   * @param {object} opts - Options for request
   * @param {string} opts.friendlyName -
   *          A string representing a human readable name for this Workflow.
   * @param {string} opts.configuration -
   *          JSON document configuring the rules for this Workflow.
   * @param {string} [opts.assignmentCallbackUrl] -
   *          A valid URL for the application that will process task assignment events.
   * @param {string} [opts.fallbackAssignmentCallbackUrl] -
   *          If the request to the AssignmentCallbackUrl fails, the assignment callback will be made to this URL.
   * @param {number} [opts.taskReservationTimeout] -
   *          An integer value controlling how long in seconds TaskRouter will wait for a confirmation response from your application after assigning a Task to a worker.
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed WorkflowInstance
   */
  /* jshint ignore:end */
  WorkflowListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.friendlyName)) {
      throw new Error('Required parameter "opts.friendlyName" missing.');
    }
    if (_.isUndefined(opts.configuration)) {
      throw new Error('Required parameter "opts.configuration" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'FriendlyName': _.get(opts, 'friendlyName'),
      'Configuration': _.get(opts, 'configuration'),
      'AssignmentCallbackUrl': _.get(opts, 'assignmentCallbackUrl'),
      'FallbackAssignmentCallbackUrl': _.get(opts, 'fallbackAssignmentCallbackUrl'),
      'TaskReservationTimeout': _.get(opts, 'taskReservationTimeout')
    });

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new WorkflowInstance(
        this._version,
        payload,
        this._solution.workspaceSid,
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
   * Constructs a workflow
   *
   * @param {string} sid - The sid
   *
   * @returns {Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext}
   */
  /* jshint ignore:end */
  WorkflowListInstance.get = function get(sid) {
    return new WorkflowContext(this._version, this._solution.workspaceSid, sid);
  };

  return WorkflowListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the WorkflowPage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {WorkflowSolution} solution - Path solution
 *
 * @returns WorkflowPage
 */
/* jshint ignore:end */
WorkflowPage = function WorkflowPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(WorkflowPage.prototype, Page.prototype);
WorkflowPage.prototype.constructor = WorkflowPage;

/* jshint ignore:start */
/**
 * Build an instance of WorkflowInstance
 *
 * @param {WorkflowPayload} payload - Payload response from the API
 *
 * @returns WorkflowInstance
 */
/* jshint ignore:end */
WorkflowPage.prototype.getInstance = function getInstance(payload) {
  return new WorkflowInstance(this._version, payload, this._solution.workspaceSid);
};


/* jshint ignore:start */
/**
 * Initialize the WorkflowContext
 *
 * @property {string} accountSid - The ID of the account that owns this Workflow
 * @property {string} assignmentCallbackUrl -
 *          The URL that will be called whenever a task managed by this Workflow is assigned to a Worker.
 * @property {string} configuration -
 *          JSON document configuring the rules for this Workflow.
 * @property {Date} dateCreated - The date this workflow was created.
 * @property {Date} dateUpdated - The date this workflow was last updated.
 * @property {string} documentContentType - The document_content_type
 * @property {string} fallbackAssignmentCallbackUrl -
 *          If the request to the AssignmentCallbackUrl fails, the assignment callback will be made to this URL.
 * @property {string} friendlyName - Human readable description of this Workflow
 * @property {string} sid - The unique ID of the Workflow
 * @property {number} taskReservationTimeout -
 *          Determines how long TaskRouter will wait for a confirmation response from your application after assigning a Task to a worker.
 * @property {string} workspaceSid -
 *          The ID of the Workspace that contains this Workflow
 * @property {string} url - The url
 * @property {string} links - The links
 *
 * @param {V1} version - Version of the resource
 * @param {WorkflowPayload} payload - The instance payload
 * @param {sid} workspaceSid - The ID of the Workspace that contains this Workflow
 * @param {sid} sid - The sid
 */
/* jshint ignore:end */
WorkflowInstance = function WorkflowInstance(version, payload, workspaceSid,
                                              sid) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.assignmentCallbackUrl = payload.assignment_callback_url; // jshint ignore:line
  this.configuration = payload.configuration; // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.iso8601DateTime(payload.date_updated); // jshint ignore:line
  this.documentContentType = payload.document_content_type; // jshint ignore:line
  this.fallbackAssignmentCallbackUrl = payload.fallback_assignment_callback_url; // jshint ignore:line
  this.friendlyName = payload.friendly_name; // jshint ignore:line
  this.sid = payload.sid; // jshint ignore:line
  this.taskReservationTimeout = deserialize.integer(payload.task_reservation_timeout); // jshint ignore:line
  this.workspaceSid = payload.workspace_sid; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line
  this.links = payload.links; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {workspaceSid: workspaceSid, sid: sid || this.sid, };
};

Object.defineProperty(WorkflowInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new WorkflowContext(this._version, this._solution.workspaceSid, this._solution.sid);
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * fetch a WorkflowInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed WorkflowInstance
 */
/* jshint ignore:end */
WorkflowInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * update a WorkflowInstance
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.friendlyName] -
 *          A string representing a human readable name for this Workflow.
 * @param {string} [opts.assignmentCallbackUrl] -
 *          A valid URL for the application that will process task assignment events.
 * @param {string} [opts.fallbackAssignmentCallbackUrl] -
 *          If the request to the AssignmentCallbackUrl fails, the assignment callback will be made to this URL.
 * @param {string} [opts.configuration] -
 *          JSON document configuring the rules for this Workflow.
 * @param {number} [opts.taskReservationTimeout] -
 *          An integer value controlling how long in seconds TaskRouter will wait for a confirmation response from your application after assigning a Task to a worker.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed WorkflowInstance
 */
/* jshint ignore:end */
WorkflowInstance.prototype.update = function update(opts, callback) {
  return this._proxy.update(opts, callback);
};

/* jshint ignore:start */
/**
 * remove a WorkflowInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed WorkflowInstance
 */
/* jshint ignore:end */
WorkflowInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * Access the statistics
 *
 * @returns {Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowStatisticsList}
 */
/* jshint ignore:end */
WorkflowInstance.prototype.statistics = function statistics() {
  return this._proxy.statistics;
};

/* jshint ignore:start */
/**
 * Access the realTimeStatistics
 *
 * @returns {Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowRealTimeStatisticsList}
 */
/* jshint ignore:end */
WorkflowInstance.prototype.realTimeStatistics = function realTimeStatistics() {
  return this._proxy.realTimeStatistics;
};

/* jshint ignore:start */
/**
 * Access the cumulativeStatistics
 *
 * @returns {Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowCumulativeStatisticsList}
 */
/* jshint ignore:end */
WorkflowInstance.prototype.cumulativeStatistics = function
    cumulativeStatistics() {
  return this._proxy.cumulativeStatistics;
};

/* jshint ignore:start */
/**
 * Produce a plain JSON object version of the WorkflowInstance for serialization.
 * Removes any circular references in the object.
 *
 * @returns Object
 */
/* jshint ignore:end */
WorkflowInstance.prototype.toJSON = function toJSON() {
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
 * Initialize the WorkflowContext
 *
 * @property {Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowStatisticsList} statistics -
 *          statistics resource
 * @property {Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowRealTimeStatisticsList} realTimeStatistics -
 *          realTimeStatistics resource
 * @property {Twilio.Taskrouter.V1.WorkspaceContext.WorkflowContext.WorkflowCumulativeStatisticsList} cumulativeStatistics -
 *          cumulativeStatistics resource
 *
 * @param {V1} version - Version of the resource
 * @param {sid} workspaceSid - The workspace_sid
 * @param {sid} sid - The sid
 */
/* jshint ignore:end */
WorkflowContext = function WorkflowContext(version, workspaceSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {workspaceSid: workspaceSid, sid: sid, };
  this._uri = _.template(
    '/Workspaces/<%= workspaceSid %>/Workflows/<%= sid %>' // jshint ignore:line
  )(this._solution);

  // Dependents
  this._statistics = undefined;
  this._realTimeStatistics = undefined;
  this._cumulativeStatistics = undefined;
};

/* jshint ignore:start */
/**
 * fetch a WorkflowInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed WorkflowInstance
 */
/* jshint ignore:end */
WorkflowContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new WorkflowInstance(
      this._version,
      payload,
      this._solution.workspaceSid,
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
 * update a WorkflowInstance
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.friendlyName] -
 *          A string representing a human readable name for this Workflow.
 * @param {string} [opts.assignmentCallbackUrl] -
 *          A valid URL for the application that will process task assignment events.
 * @param {string} [opts.fallbackAssignmentCallbackUrl] -
 *          If the request to the AssignmentCallbackUrl fails, the assignment callback will be made to this URL.
 * @param {string} [opts.configuration] -
 *          JSON document configuring the rules for this Workflow.
 * @param {number} [opts.taskReservationTimeout] -
 *          An integer value controlling how long in seconds TaskRouter will wait for a confirmation response from your application after assigning a Task to a worker.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed WorkflowInstance
 */
/* jshint ignore:end */
WorkflowContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'FriendlyName': _.get(opts, 'friendlyName'),
    'AssignmentCallbackUrl': _.get(opts, 'assignmentCallbackUrl'),
    'FallbackAssignmentCallbackUrl': _.get(opts, 'fallbackAssignmentCallbackUrl'),
    'Configuration': _.get(opts, 'configuration'),
    'TaskReservationTimeout': _.get(opts, 'taskReservationTimeout')
  });

  var promise = this._version.update({uri: this._uri, method: 'POST', data: data});

  promise = promise.then(function(payload) {
    deferred.resolve(new WorkflowInstance(
      this._version,
      payload,
      this._solution.workspaceSid,
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
 * remove a WorkflowInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed WorkflowInstance
 */
/* jshint ignore:end */
WorkflowContext.prototype.remove = function remove(callback) {
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

Object.defineProperty(WorkflowContext.prototype,
  'statistics', {
  get: function() {
    if (!this._statistics) {
      this._statistics = new WorkflowStatisticsList(
        this._version,
        this._solution.workspaceSid,
        this._solution.sid
      );
    }
    return this._statistics;
  }
});

Object.defineProperty(WorkflowContext.prototype,
  'realTimeStatistics', {
  get: function() {
    if (!this._realTimeStatistics) {
      this._realTimeStatistics = new WorkflowRealTimeStatisticsList(
        this._version,
        this._solution.workspaceSid,
        this._solution.sid
      );
    }
    return this._realTimeStatistics;
  }
});

Object.defineProperty(WorkflowContext.prototype,
  'cumulativeStatistics', {
  get: function() {
    if (!this._cumulativeStatistics) {
      this._cumulativeStatistics = new WorkflowCumulativeStatisticsList(
        this._version,
        this._solution.workspaceSid,
        this._solution.sid
      );
    }
    return this._cumulativeStatistics;
  }
});

module.exports = {
  WorkflowList: WorkflowList,
  WorkflowPage: WorkflowPage,
  WorkflowInstance: WorkflowInstance,
  WorkflowContext: WorkflowContext
};