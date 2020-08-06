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
var FieldList = require('./task/field').FieldList;
var Page = require('../../../../base/Page');  /* jshint ignore:line */
var SampleList = require('./task/sample').SampleList;
var TaskActionsList = require('./task/taskActions').TaskActionsList;
var TaskStatisticsList = require('./task/taskStatistics').TaskStatisticsList;
var deserialize = require(
    '../../../../base/deserialize');  /* jshint ignore:line */
var serialize = require('../../../../base/serialize');  /* jshint ignore:line */
var values = require('../../../../base/values');  /* jshint ignore:line */

var TaskList;
var TaskPage;
var TaskInstance;
var TaskContext;

/* jshint ignore:start */
/**
 * @description Initialize the TaskList
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param {Twilio.Autopilot.V1} version - Version of the resource
 * @param {string} assistantSid - The unique ID of the Assistant.
 */
/* jshint ignore:end */
TaskList = function TaskList(version, assistantSid) {
  /* jshint ignore:start */
  /**
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Autopilot.V1.AssistantContext.TaskContext}
   */
  /* jshint ignore:end */
  function TaskListInstance(sid) {
    return TaskListInstance.get(sid);
  }

  TaskListInstance._version = version;
  // Path Solution
  TaskListInstance._solution = {assistantSid: assistantSid};
  TaskListInstance._uri = _.template(
    '/Assistants/<%= assistantSid %>/Tasks' // jshint ignore:line
  )(TaskListInstance._solution);
  /* jshint ignore:start */
  /**
   * Streams TaskInstance records from the API.
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
  TaskListInstance.each = function each(opts, callback) {
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
   * Lists TaskInstance records from the API as a list.
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
  TaskListInstance.list = function list(opts, callback) {
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
   * Retrieve a single page of TaskInstance records from the API.
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
  TaskListInstance.page = function page(opts, callback) {
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
      deferred.resolve(new TaskPage(this._version, payload, this._solution));
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
   * Retrieve a single target page of TaskInstance records from the API.
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
  TaskListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new TaskPage(this._version, payload, this._solution));
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
   * create a TaskInstance
   *
   * @param {object} opts - Options for request
   * @param {string} opts.uniqueName -
   *          A user-provided string that uniquely identifies this resource as an alternative to the sid. Unique up to 64 characters long.
   * @param {string} [opts.friendlyName] -
   *          A user-provided string that identifies this resource. It is non-unique and can be up to 255 characters long.
   * @param {string} [opts.actions] -
   *          A user-provided JSON object encoded as a string to specify the actions for this task. It is optional and non-unique.
   * @param {string} [opts.actionsUrl] -
   *          User-provided HTTP endpoint where the assistant can fetch actions.
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed TaskInstance
   */
  /* jshint ignore:end */
  TaskListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.uniqueName)) {
      throw new Error('Required parameter "opts.uniqueName" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'UniqueName': _.get(opts, 'uniqueName'),
      'FriendlyName': _.get(opts, 'friendlyName'),
      'Actions': serialize.object(_.get(opts, 'actions')),
      'ActionsUrl': _.get(opts, 'actionsUrl')
    });

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new TaskInstance(
        this._version,
        payload,
        this._solution.assistantSid,
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
   * Constructs a task
   *
   * @param {string} sid -
   *          A 34-character string that uniquely identifies this resource.
   *
   * @returns {Twilio.Autopilot.V1.AssistantContext.TaskContext}
   */
  /* jshint ignore:end */
  TaskListInstance.get = function get(sid) {
    return new TaskContext(this._version, this._solution.assistantSid, sid);
  };

  return TaskListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the TaskPagePLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {TaskSolution} solution - Path solution
 *
 * @returns TaskPage
 */
/* jshint ignore:end */
TaskPage = function TaskPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(TaskPage.prototype, Page.prototype);
TaskPage.prototype.constructor = TaskPage;

/* jshint ignore:start */
/**
 * Build an instance of TaskInstance
 *
 * @param {TaskPayload} payload - Payload response from the API
 *
 * @returns TaskInstance
 */
/* jshint ignore:end */
TaskPage.prototype.getInstance = function getInstance(payload) {
  return new TaskInstance(this._version, payload, this._solution.assistantSid);
};


/* jshint ignore:start */
/**
 * Initialize the TaskContextPLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @property {string} accountSid -
 *          The unique ID of the Account that created this Task.
 * @property {Date} dateCreated - The date that this resource was created
 * @property {Date} dateUpdated - The date that this resource was last updated
 * @property {string} friendlyName -
 *          A user-provided string that identifies this resource. It is non-unique and can be up to 255 characters long.
 * @property {string} links - The links
 * @property {string} assistantSid - The unique ID of the Assistant.
 * @property {string} sid -
 *          A 34-character string that uniquely identifies this resource.
 * @property {string} uniqueName -
 *          A user-provided string that uniquely identifies this resource as an alternative to the sid. Unique up to 64 characters long.
 * @property {string} actionsUrl -
 *          A user-provided HTTP endpoint where the assistant can fetch actions.
 * @property {string} url - The url
 *
 * @param {V1} version - Version of the resource
 * @param {TaskPayload} payload - The instance payload
 * @param {sid} assistantSid - The unique ID of the Assistant.
 * @param {sid_like} sid -
 *          A 34-character string that uniquely identifies this resource.
 */
/* jshint ignore:end */
TaskInstance = function TaskInstance(version, payload, assistantSid, sid) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.iso8601DateTime(payload.date_updated); // jshint ignore:line
  this.friendlyName = payload.friendly_name; // jshint ignore:line
  this.links = payload.links; // jshint ignore:line
  this.assistantSid = payload.assistant_sid; // jshint ignore:line
  this.sid = payload.sid; // jshint ignore:line
  this.uniqueName = payload.unique_name; // jshint ignore:line
  this.actionsUrl = payload.actions_url; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {assistantSid: assistantSid, sid: sid || this.sid, };
};

Object.defineProperty(TaskInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new TaskContext(this._version, this._solution.assistantSid, this._solution.sid);
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * fetch a TaskInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TaskInstance
 */
/* jshint ignore:end */
TaskInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * update a TaskInstance
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.friendlyName] -
 *          A user-provided string that identifies this resource. It is non-unique and can be up to 255 characters long.
 * @param {string} [opts.uniqueName] -
 *          A user-provided string that uniquely identifies this resource as an alternative to the sid. Unique up to 64 characters long.
 * @param {string} [opts.actions] -
 *          A user-provided JSON object encoded as a string to specify the actions for this task. It is optional and non-unique.
 * @param {string} [opts.actionsUrl] -
 *          User-provided HTTP endpoint where the assistant can fetch actions.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TaskInstance
 */
/* jshint ignore:end */
TaskInstance.prototype.update = function update(opts, callback) {
  return this._proxy.update(opts, callback);
};

/* jshint ignore:start */
/**
 * remove a TaskInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TaskInstance
 */
/* jshint ignore:end */
TaskInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * Access the fields
 *
 * @returns {Twilio.Autopilot.V1.AssistantContext.TaskContext.FieldList}
 */
/* jshint ignore:end */
TaskInstance.prototype.fields = function fields() {
  return this._proxy.fields;
};

/* jshint ignore:start */
/**
 * Access the samples
 *
 * @returns {Twilio.Autopilot.V1.AssistantContext.TaskContext.SampleList}
 */
/* jshint ignore:end */
TaskInstance.prototype.samples = function samples() {
  return this._proxy.samples;
};

/* jshint ignore:start */
/**
 * Access the taskActions
 *
 * @returns {Twilio.Autopilot.V1.AssistantContext.TaskContext.TaskActionsList}
 */
/* jshint ignore:end */
TaskInstance.prototype.taskActions = function taskActions() {
  return this._proxy.taskActions;
};

/* jshint ignore:start */
/**
 * Access the statistics
 *
 * @returns {Twilio.Autopilot.V1.AssistantContext.TaskContext.TaskStatisticsList}
 */
/* jshint ignore:end */
TaskInstance.prototype.statistics = function statistics() {
  return this._proxy.statistics;
};

/* jshint ignore:start */
/**
 * Produce a plain JSON object version of the TaskInstance for serialization.
 * Removes any circular references in the object.
 *
 * @returns Object
 */
/* jshint ignore:end */
TaskInstance.prototype.toJSON = function toJSON() {
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
 * Initialize the TaskContextPLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @property {Twilio.Autopilot.V1.AssistantContext.TaskContext.FieldList} fields -
 *          fields resource
 * @property {Twilio.Autopilot.V1.AssistantContext.TaskContext.SampleList} samples -
 *          samples resource
 * @property {Twilio.Autopilot.V1.AssistantContext.TaskContext.TaskActionsList} taskActions -
 *          taskActions resource
 * @property {Twilio.Autopilot.V1.AssistantContext.TaskContext.TaskStatisticsList} statistics -
 *          statistics resource
 *
 * @param {V1} version - Version of the resource
 * @param {sid_like} assistantSid - The unique ID of the Assistant.
 * @param {sid_like} sid -
 *          A 34-character string that uniquely identifies this resource.
 */
/* jshint ignore:end */
TaskContext = function TaskContext(version, assistantSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {assistantSid: assistantSid, sid: sid, };
  this._uri = _.template(
    '/Assistants/<%= assistantSid %>/Tasks/<%= sid %>' // jshint ignore:line
  )(this._solution);

  // Dependents
  this._fields = undefined;
  this._samples = undefined;
  this._taskActions = undefined;
  this._statistics = undefined;
};

/* jshint ignore:start */
/**
 * fetch a TaskInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TaskInstance
 */
/* jshint ignore:end */
TaskContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new TaskInstance(
      this._version,
      payload,
      this._solution.assistantSid,
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
 * update a TaskInstance
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.friendlyName] -
 *          A user-provided string that identifies this resource. It is non-unique and can be up to 255 characters long.
 * @param {string} [opts.uniqueName] -
 *          A user-provided string that uniquely identifies this resource as an alternative to the sid. Unique up to 64 characters long.
 * @param {string} [opts.actions] -
 *          A user-provided JSON object encoded as a string to specify the actions for this task. It is optional and non-unique.
 * @param {string} [opts.actionsUrl] -
 *          User-provided HTTP endpoint where the assistant can fetch actions.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TaskInstance
 */
/* jshint ignore:end */
TaskContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'FriendlyName': _.get(opts, 'friendlyName'),
    'UniqueName': _.get(opts, 'uniqueName'),
    'Actions': serialize.object(_.get(opts, 'actions')),
    'ActionsUrl': _.get(opts, 'actionsUrl')
  });

  var promise = this._version.update({uri: this._uri, method: 'POST', data: data});

  promise = promise.then(function(payload) {
    deferred.resolve(new TaskInstance(
      this._version,
      payload,
      this._solution.assistantSid,
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
 * remove a TaskInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TaskInstance
 */
/* jshint ignore:end */
TaskContext.prototype.remove = function remove(callback) {
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

Object.defineProperty(TaskContext.prototype,
  'fields', {
  get: function() {
    if (!this._fields) {
      this._fields = new FieldList(this._version, this._solution.assistantSid, this._solution.sid);
    }
    return this._fields;
  }
});

Object.defineProperty(TaskContext.prototype,
  'samples', {
  get: function() {
    if (!this._samples) {
      this._samples = new SampleList(this._version, this._solution.assistantSid, this._solution.sid);
    }
    return this._samples;
  }
});

Object.defineProperty(TaskContext.prototype,
  'taskActions', {
  get: function() {
    if (!this._taskActions) {
      this._taskActions = new TaskActionsList(
        this._version,
        this._solution.assistantSid,
        this._solution.sid
      );
    }
    return this._taskActions;
  }
});

Object.defineProperty(TaskContext.prototype,
  'statistics', {
  get: function() {
    if (!this._statistics) {
      this._statistics = new TaskStatisticsList(
        this._version,
        this._solution.assistantSid,
        this._solution.sid
      );
    }
    return this._statistics;
  }
});

module.exports = {
  TaskList: TaskList,
  TaskPage: TaskPage,
  TaskInstance: TaskInstance,
  TaskContext: TaskContext
};
