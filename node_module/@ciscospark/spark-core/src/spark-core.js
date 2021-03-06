/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

import {proxyEvents, retry, transferEvents} from '@ciscospark/common';
import {HttpStatusInterceptor, defaults as requestDefaults} from '@ciscospark/http-core';
import {defaults, get, has, isFunction, isString, last, merge, omit, set, unset} from 'lodash';
import AmpState from 'ampersand-state';
import AuthInterceptor from './interceptors/auth';
import NetworkTimingInterceptor from './interceptors/network-timing';
import PayloadTransformerInterceptor from './interceptors/payload-transformer';
import RedirectInterceptor from './interceptors/redirect';
import RequestEventInterceptor from './interceptors/request-event';
import RequestLoggerInterceptor from './interceptors/request-logger';
import RequestTimingInterceptor from './interceptors/request-timing';
import ResponseLoggerInterceptor from './interceptors/response-logger';
import SparkHttpError from './lib/spark-http-error';
import SparkTrackingIdInterceptor from './interceptors/spark-tracking-id';
import SparkUserAgentInterceptor from './interceptors/spark-user-agent';
import RateLimitInterceptor from './interceptors/rate-limit';
import config from './config';
import {makeSparkStore} from './lib/storage';
import util from 'util';
import uuid from 'uuid';
import {EventEmitter} from 'events';
import mixinSparkCorePlugins from './lib/spark-core-plugin-mixin';
import mixinSparkInternalCorePlugins from './lib/spark-internal-core-plugin-mixin';
import SparkInternalCore from './spark-internal-core';

// TODO replace the Interceptor.create with Reflect.construct (
// Interceptor.create exists because new was really hard to call on an array of
// constructors)
const interceptors = {
  SparkTrackingIdInterceptor: SparkTrackingIdInterceptor.create,
  RequestEventInterceptor: RequestEventInterceptor.create,
  RateLimitInterceptor: RateLimitInterceptor.create,
  /* eslint-disable no-extra-parens */
  RequestLoggerInterceptor: (process.env.ENABLE_NETWORK_LOGGING || process.env.ENABLE_VERBOSE_NETWORK_LOGGING) ? RequestLoggerInterceptor.create : undefined,
  ResponseLoggerInterceptor: (process.env.ENABLE_NETWORK_LOGGING || process.env.ENABLE_VERBOSE_NETWORK_LOGGING) ? ResponseLoggerInterceptor.create : undefined,
  /* eslint-enable no-extra-parens */
  RequestTimingInterceptor: RequestTimingInterceptor.create,
  UrlInterceptor: undefined,
  SparkUserAgentInterceptor: SparkUserAgentInterceptor.create,
  AuthInterceptor: AuthInterceptor.create,
  KmsDryErrorInterceptor: undefined,
  PayloadTransformerInterceptor: PayloadTransformerInterceptor.create,
  ConversationInterceptor: undefined,
  RedirectInterceptor: RedirectInterceptor.create,
  HttpStatusInterceptor() {
    return HttpStatusInterceptor.create({
      error: SparkHttpError
    });
  },
  NetworkTimingInterceptor: NetworkTimingInterceptor.create
};

const preInterceptors = [
  'ResponseLoggerInterceptor',
  'RequestTimingInterceptor',
  'RequestEventInterceptor',
  'SparkTrackingIdInterceptor',
  'RateLimitInterceptor'
];

const postInterceptors = [
  'HttpStatusInterceptor',
  'NetworkTimingInterceptor',
  'RequestLoggerInterceptor',
  'RateLimitInterceptor'
];

/**
 * @class
 */
const SparkCore = AmpState.extend({
  version: PACKAGE_VERSION,

  children: {
    internal: SparkInternalCore
  },

  constructor(attrs = {}, options) {
    if (typeof attrs === 'string') {
      attrs = {
        credentials: {
          supertoken: {
            // eslint-disable-next-line camelcase
            access_token: attrs
          }
        }
      };
    }
    else {
      // Reminder: order is important here
      [
        'credentials.authorization',
        'authorization',
        'credentials.supertoken.supertoken',
        'supertoken',
        'access_token',
        'credentials.authorization.supertoken'
      ].forEach((path) => {
        const val = get(attrs, path);
        if (val) {
          unset(attrs, path);
          set(attrs, 'credentials.supertoken', val);
        }
      });

      [
        'credentials',
        'credentials.authorization'
      ]
        .forEach((path) => {
          const val = get(attrs, path);
          if (typeof val === 'string') {
            unset(attrs, path);
            set(attrs, 'credentials.supertoken', val);
          }
        });

      if (typeof get(attrs, 'credentials.access_token') === 'string') {
        set(attrs, 'credentials.supertoken', attrs.credentials);
      }
    }

    return Reflect.apply(AmpState, this, [attrs, options]);
  },

  derived: {
    boundedStorage: {
      deps: [],
      fn() {
        return makeSparkStore('bounded', this);
      }
    },
    unboundedStorage: {
      deps: [],
      fn() {
        return makeSparkStore('unbounded', this);
      }
    },
    ready: {
      deps: ['loaded', 'internal.ready'],
      fn() {
        return this.loaded && Object.keys(this._children).reduce((ready, name) => ready && this[name] && this[name].ready !== false, true);
      }
    }
  },

  session: {
    config: {
      type: 'object'
    },
    /**
     * When true, indicates that the initial load from the storage layer is
     * complete
     * @instance
     * @memberof SparkCore
     * @type {boolean}
     */
    loaded: {
      default: false,
      type: 'boolean'
    },
    request: {
      setOnce: true,
      // It's supposed to be a function, but that's not a type defined in
      // Ampersand
      type: 'any'
    },
    sessionId: {
      setOnce: true,
      type: 'string'
    }
  },

  /**
   * @instance
   * @memberof SparkCore
   * @param {[type]} args
   * @returns {[type]}
   */
  refresh(...args) {
    return this.credentials.refresh(...args);
  },

  /**
   * Applies the directionally appropriate transforms to the specified object
   * @param {string} direction
   * @param {Object} object
   * @returns {Promise}
   */
  transform(direction, object) {
    const predicates = this.config.payloadTransformer.predicates.filter((p) => !p.direction || p.direction === direction);
    const ctx = {
      spark: this
    };
    return Promise.all(predicates.map((p) => p.test(ctx, object)
      .then((shouldTransform) => {
        if (!shouldTransform) {
          return undefined;
        }
        return p.extract(object)
          // eslint-disable-next-line max-nested-callbacks
          .then((target) => ({
            name: p.name,
            target
          }));
      })))
      .then((data) => data
        .filter((d) => Boolean(d))
        // eslint-disable-next-line max-nested-callbacks
        .reduce((promise, {name, target, alias}) => promise.then(() => {
          if (alias) {
            return this.applyNamedTransform(direction, alias, target);
          }
          return this.applyNamedTransform(direction, name, target);
        }), Promise.resolve()))
      .then(() => object);
  },

  /**
   * Applies the directionally appropriate transform to the specified parameters
   * @param {string} direction
   * @param {Object} ctx
   * @param {string} name
   * @returns {Promise}
   */
  applyNamedTransform(direction, ctx, name, ...rest) {
    if (isString(ctx)) {
      rest.unshift(name);
      name = ctx;
      ctx = {
        spark: this,
        transform: (...args) => this.applyNamedTransform(direction, ctx, ...args)
      };
    }

    const transforms = ctx.spark.config.payloadTransformer.transforms.filter((tx) => tx.name === name && (!tx.direction || tx.direction === direction));
    // too many implicit returns on the same line is difficult to interpret
    // eslint-disable-next-line arrow-body-style
    return transforms.reduce((promise, tx) => promise.then(() => {
      if (tx.alias) {
        return ctx.transform(tx.alias, ...rest);
      }
      return Promise.resolve(tx.fn(ctx, ...rest));
    }), Promise.resolve())
      .then(() => last(rest));
  },

  /**
   * @private
   * @returns {Window}
   */
  getWindow() {
    // eslint-disable-next-line
    return window;
  },

  /**
   * Initializer
   *
   * @emits SparkCore#loaded
   * @emits SparkCore#ready
   * @instance
   * @memberof SparkCore
   * @param {Object} attrs
   * @returns {SparkCore}
   */
  initialize(attrs = {}) {
    this.config = merge({}, config, attrs.config);

    // There's some unfortunateness with the way {@link AmpersandState#children}
    // get initialized. We'll fire the change:config event so that
    // {@link SparkPlugin#initialize()} can use
    // `this.listenToOnce(parent, 'change:config', () => {});` to act on config
    // during initialization
    this.trigger('change:config');

    const onLoaded = () => {
      if (this.loaded) {
        /**
         * Fires when all data has been loaded from the storage layer
         * @event loaded
         * @instance
         * @memberof SparkCore
         */
        this.trigger('loaded');

        this.stopListening(this, 'change:loaded', onLoaded);
      }
    };

    // This needs to run on nextTick or we'll never be able to wire up listeners
    process.nextTick(() => {
      this.listenToAndRun(this, 'change:loaded', onLoaded);
    });

    const onReady = () => {
      if (this.ready) {
        /**
         * Fires when all plugins have fully initialized
         * @event ready
         * @instance
         * @memberof SparkCore
         */
        this.trigger('ready');

        this.stopListening(this, 'change:ready', onReady);
      }
    };

    // This needs to run on nextTick or we'll never be able to wire up listeners
    process.nextTick(() => {
      this.listenToAndRun(this, 'change:ready', onReady);
    });

    // Make nested events propagate in a consistent manner
    Object.keys(this.constructor.prototype._children).forEach((key) => {
      this.listenTo(this[key], 'change', (...args) => {
        args.unshift(`change:${key}`);
        this.trigger(...args);
      });
    });

    const addInterceptor = (ints, key) => {
      const interceptor = interceptors[key];

      if (!isFunction(interceptor)) {
        return ints;
      }

      ints.push(Reflect.apply(interceptor, this, []));

      return ints;
    };

    let ints = [];
    ints = preInterceptors.reduce(addInterceptor, ints);
    ints = Object.keys(interceptors).filter((key) => !(preInterceptors.includes(key) || postInterceptors.includes(key))).reduce(addInterceptor, ints);
    ints = postInterceptors.reduce(addInterceptor, ints);

    this.request = requestDefaults({
      json: true,
      interceptors: ints
    });

    let sessionId = `${get(this, 'config.trackingIdPrefix', 'spark-js-sdk')}_${get(this, 'config.trackingIdBase', uuid.v4())}`;
    if (has(this, 'config.trackingIdPrefix')) {
      sessionId += `_${get(this, 'config.trackingIdPrefix')}`;
    }

    this.sessionId = sessionId;
  },

  /**
   * @instance
   * @memberof SparkPlugin
   * @param {number} depth
   * @private
   * @returns {Object}
   */
  inspect(depth) {
    return util.inspect(omit(this.serialize({
      props: true,
      session: true,
      derived: true
    }), 'boundedStorage', 'unboundedStorage', 'request', 'config'), {depth});
  },

  /**
   * Invokes all `onBeforeLogout` handlers in the scope of their plugin, clears
   * all stores, and revokes the access token
   * Note: If you're using the sdk in a server environment, you may be more
   * interested in {@link `spark.internal.mercury.disconnect()`| Mercury#disconnect()}
   * and {@link `spark.internal.device.unregister()`|Device#unregister()}
   * or {@link `spark.phone.unregister()`|Phone#unregister}
   * @instance
   * @memberof SparkCore
   * @param {Object} options Passed as the first argument to all
   * `onBeforeLogout` handlers
   * @returns {Promise}
   */
  logout(options, ...rest) {
    // prefer the refresh token, but for clients that don't have one, fallback
    // to the access token
    const token = this.credentials.supertoken && (this.credentials.supertoken.refresh_token || this.credentials.supertoken.access_token);
    options = Object.assign({token}, options);
    // onBeforeLogout should be executed in the opposite order in which handlers
    // were registered. In that way, wdm unregister() will be above mercury
    // disconnect(), but disconnect() will execute first.
    // eslint-disable-next-line arrow-body-style
    return this.config.onBeforeLogout.reverse().reduce((promise, {plugin, fn}) => promise.then(() => {
      return Promise.resolve(Reflect.apply(fn, this[plugin] || this.internal[plugin], [options, ...rest]))
        // eslint-disable-next-line max-nested-callbacks
        .catch((err) => {
          this.logger.warn(`onBeforeLogout from plugin ${plugin}: failed`, err);
        });
    }), Promise.resolve())
      .then(() => Promise.all([
        this.boundedStorage.clear(),
        this.unboundedStorage.clear()
      ]))
      .then(() => this.credentials.invalidate(...rest))
      .then(() => this.authorization && this.authorization.logout && this.authorization.logout(options, ...rest))
      .then(() => this.trigger('client:logout'));
  },

  /**
   * General purpose wrapper to submit metrics via the metrics plugin (if the
   * metrics plugin is installed)
   * @instance
   * @memberof SparkCore
   * @returns {Promise}
   */
  measure(...args) {
    if (this.metrics) {
      return this.metrics.sendUnstructured(...args);
    }

    return Promise.resolve();
  },

  upload(options) {
    if (!options.file) {
      return Promise.reject(new Error('`options.file` is required'));
    }

    options.phases = options.phases || {};
    options.phases.initialize = options.phases.initialize || {};
    options.phases.upload = options.phases.upload || {};
    options.phases.finalize = options.phases.finalize || {};

    defaults(options.phases.initialize, {
      method: 'POST'
    }, omit(options, 'file', 'phases'));

    defaults(options.phases.upload, {
      method: 'PUT',
      json: false,
      withCredentials: false,
      body: options.file,
      headers: {
        'x-trans-id': uuid.v4(),
        authorization: undefined
      }
    });

    defaults(options.phases.finalize, {
      method: 'POST'
    }, omit(options, 'file', 'phases'));

    const shunt = new EventEmitter();

    const promise = this._uploadPhaseInitialize(options)
      .then(() => {
        const p = this._uploadPhaseUpload(options);
        transferEvents('progress', p, shunt);
        return p;
      })
      .then((...args) => this._uploadPhaseFinalize(options, ...args))
      .then((res) => res.body);

    proxyEvents(shunt, promise);

    return promise;
  },

  _uploadPhaseInitialize: function _uploadPhaseInitialize(options) {
    this.logger.debug('client: initiating upload session');

    return this.request(options.phases.initialize)
      .then((...args) => this._uploadApplySession(options, ...args))
      .then((res) => {
        this.logger.debug('client: initiated upload session');
        return res;
      });
  },

  _uploadApplySession(options, res) {
    const session = res.body;
    ['upload', 'finalize'].reduce((opts, key) => {
      opts[key] = Object.keys(opts[key]).reduce((phaseOptions, phaseKey) => {
        if (phaseKey.startsWith('$')) {
          phaseOptions[phaseKey.substr(1)] = phaseOptions[phaseKey](session);
          Reflect.deleteProperty(phaseOptions, phaseKey);
        }

        return phaseOptions;
      }, opts[key]);

      return opts;
    }, options.phases);
  },

  @retry
  _uploadPhaseUpload(options) {
    this.logger.debug('client: uploading file');

    const promise = this.request(options.phases.upload)
      .then((res) => {
        this.logger.debug('client: uploaded file');
        return res;
      });

    proxyEvents(options.phases.upload.upload, promise);

    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'test') {
      promise.on('progress', (event) => {
        this.logger.info('upload progress', event.loaded, event.total);
      });
    }

    return promise;
  },

  _uploadPhaseFinalize: function _uploadPhaseFinalize(options) {
    this.logger.debug('client: finalizing upload session');

    return this.request(options.phases.finalize)
      .then((res) => {
        this.logger.debug('client: finalized upload session');
        return res;
      });
  }
});

SparkCore.version = PACKAGE_VERSION;

mixinSparkInternalCorePlugins(SparkInternalCore, config, interceptors);
mixinSparkCorePlugins(SparkCore, config, interceptors);

export default SparkCore;

/**
 * @method registerPlugin
 * @param {string} name
 * @param {function} constructor
 * @param {Object} options
 * @param {Array<string>} options.proxies
 * @param {Object} options.interceptors
 * @returns {null}
 */
export function registerPlugin(name, constructor, options) {
  SparkCore.registerPlugin(name, constructor, options);
}

/**
 * Registers plugins used by internal products that do not talk to public APIs.
 * @method registerInternalPlugin
 * @param {string} name
 * @param {function} constructor
 * @param {Object} options
 * @param {Object} options.interceptors
 * @private
 * @returns {null}
 */
export function registerInternalPlugin(name, constructor, options) {
  SparkInternalCore.registerPlugin(name, constructor, options);
}
