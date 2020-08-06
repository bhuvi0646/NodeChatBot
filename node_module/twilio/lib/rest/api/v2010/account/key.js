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
var deserialize = require(
    '../../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../../base/values');  /* jshint ignore:line */

var KeyList;
var KeyPage;
var KeyInstance;
var KeyContext;

/* jshint ignore:start */
/**
 * @description Initialize the KeyList
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {string} accountSid -
 *          A 34 character string that uniquely identifies this resource.
 */
/* jshint ignore:end */
KeyList = function KeyList(version, accountSid) {
  /* jshint ignore:start */
  /**
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Api.V2010.AccountContext.KeyContext}
   */
  /* jshint ignore:end */
  function KeyListInstance(sid) {
    return KeyListInstance.get(sid);
  }

  KeyListInstance._version = version;
  // Path Solution
  KeyListInstance._solution = {accountSid: accountSid};
  KeyListInstance._uri = _.template(
    '/Accounts/<%= accountSid %>/Keys.json' // jshint ignore:line
  )(KeyListInstance._solution);
  /* jshint ignore:start */
  /**
   * Streams KeyInstance records from the API.
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
  KeyListInstance.each = function each(opts, callback) {
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
   * Lists KeyInstance records from the API as a list.
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
  KeyListInstance.list = function list(opts, callback) {
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
   * Retrieve a single page of KeyInstance records from the API.
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
  KeyListInstance.page = function page(opts, callback) {
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
      deferred.resolve(new KeyPage(this._version, payload, this._solution));
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
   * Retrieve a single target page of KeyInstance records from the API.
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
  KeyListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new KeyPage(this._version, payload, this._solution));
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
   * Constructs a key
   *
   * @param {string} sid - The sid
   *
   * @returns {Twilio.Api.V2010.AccountContext.KeyContext}
   */
  /* jshint ignore:end */
  KeyListInstance.get = function get(sid) {
    return new KeyContext(this._version, this._solution.accountSid, sid);
  };

  return KeyListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the KeyPage
 *
 * @param {V2010} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {KeySolution} solution - Path solution
 *
 * @returns KeyPage
 */
/* jshint ignore:end */
KeyPage = function KeyPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(KeyPage.prototype, Page.prototype);
KeyPage.prototype.constructor = KeyPage;

/* jshint ignore:start */
/**
 * Build an instance of KeyInstance
 *
 * @param {KeyPayload} payload - Payload response from the API
 *
 * @returns KeyInstance
 */
/* jshint ignore:end */
KeyPage.prototype.getInstance = function getInstance(payload) {
  return new KeyInstance(this._version, payload, this._solution.accountSid);
};


/* jshint ignore:start */
/**
 * Initialize the KeyContext
 *
 * @property {string} sid -
 *          A 34 character string that uniquely identifies this API Key.
 * @property {string} friendlyName -
 *          A descriptive string for this resource, chosen by your application, up to 64 characters long.
 * @property {Date} dateCreated -
 *          The date-time this API Key was created, given as a RFC 2822 Timestamp.
 * @property {Date} dateUpdated -
 *          The date-time this API Key was most recently updated, given as a  RFC 2822 Timestamp.
 *
 * @param {V2010} version - Version of the resource
 * @param {KeyPayload} payload - The instance payload
 * @param {sid} accountSid -
 *          A 34 character string that uniquely identifies this resource.
 * @param {sid} sid - The sid
 */
/* jshint ignore:end */
KeyInstance = function KeyInstance(version, payload, accountSid, sid) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.friendlyName = payload.friendly_name; // jshint ignore:line
  this.dateCreated = deserialize.rfc2822DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.rfc2822DateTime(payload.date_updated); // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {accountSid: accountSid, sid: sid || this.sid, };
};

Object.defineProperty(KeyInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new KeyContext(this._version, this._solution.accountSid, this._solution.sid);
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * fetch a KeyInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed KeyInstance
 */
/* jshint ignore:end */
KeyInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * update a KeyInstance
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.friendlyName] -
 *          A descriptive string for this resource, chosen by your application, up to 64 characters long.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed KeyInstance
 */
/* jshint ignore:end */
KeyInstance.prototype.update = function update(opts, callback) {
  return this._proxy.update(opts, callback);
};

/* jshint ignore:start */
/**
 * remove a KeyInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed KeyInstance
 */
/* jshint ignore:end */
KeyInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * Produce a plain JSON object version of the KeyInstance for serialization.
 * Removes any circular references in the object.
 *
 * @returns Object
 */
/* jshint ignore:end */
KeyInstance.prototype.toJSON = function toJSON() {
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
 * Initialize the KeyContext
 *
 * @param {V2010} version - Version of the resource
 * @param {sid} accountSid - The account_sid
 * @param {sid} sid - The sid
 */
/* jshint ignore:end */
KeyContext = function KeyContext(version, accountSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {accountSid: accountSid, sid: sid, };
  this._uri = _.template(
    '/Accounts/<%= accountSid %>/Keys/<%= sid %>.json' // jshint ignore:line
  )(this._solution);
};

/* jshint ignore:start */
/**
 * fetch a KeyInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed KeyInstance
 */
/* jshint ignore:end */
KeyContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new KeyInstance(
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
 * update a KeyInstance
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.friendlyName] -
 *          A descriptive string for this resource, chosen by your application, up to 64 characters long.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed KeyInstance
 */
/* jshint ignore:end */
KeyContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({'FriendlyName': _.get(opts, 'friendlyName')});

  var promise = this._version.update({uri: this._uri, method: 'POST', data: data});

  promise = promise.then(function(payload) {
    deferred.resolve(new KeyInstance(
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
 * remove a KeyInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed KeyInstance
 */
/* jshint ignore:end */
KeyContext.prototype.remove = function remove(callback) {
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

module.exports = {
  KeyList: KeyList,
  KeyPage: KeyPage,
  KeyInstance: KeyInstance,
  KeyContext: KeyContext
};
