'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _dec, _desc, _value, _obj; /*!
                                * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
                                */

/* eslint camelcase: [0] */

var _common = require('@ciscospark/common');

var _sparkCore = require('@ciscospark/spark-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * NodeJS support for OAuth2
 * @class
 * @name AuthorizationNode
 */
var Authorization = _sparkCore.SparkPlugin.extend((_dec = (0, _common.whileInFlight)('isAuthorizing'), (_obj = {
  derived: {
    /**
     * Alias of {@link AuthorizationNode#isAuthorizing}
     * @instance
     * @memberof AuthorizationNode
     * @type {boolean}
     */
    isAuthenticating: {
      deps: ['isAuthorizing'],
      fn: function fn() {
        return this.isAuthorizing;
      }
    }
  },

  session: {
    /**
     * Indicates if an Authorization Code exchange is inflight
     * @instance
     * @memberof AuthorizationNode
     * @type {boolean}
     */
    isAuthorizing: {
      default: false,
      type: 'boolean'
    }
  },

  namespace: 'Credentials',

  logout: function logout() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.spark.request({
      method: 'POST',
      uri: this.config.logoutUrl,
      body: {
        token: options.token,
        cisService: this.config.service
      }
    });
  },

  /**
   * Exchanges an authorization code for an access token
   * @instance
   * @memberof AuthorizationNode
   * @param {Object} options
   * @param {Object} options.code
   * @returns {Promise}
   */
  requestAuthorizationCodeGrant: function requestAuthorizationCodeGrant() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.logger.info('credentials: requesting authorization code grant');

    if (!options.code) {
      return _promise2.default.reject(new Error('`options.code` is required'));
    }

    return this.spark.request({
      method: 'POST',
      uri: this.config.tokenUrl,
      form: {
        grant_type: 'authorization_code',
        redirect_uri: this.config.redirect_uri,
        code: options.code,
        self_contained_token: true
      },
      auth: {
        user: this.config.client_id,
        pass: this.config.client_secret,
        sendImmediately: true
      },
      shouldRefreshAccessToken: false
    }).then(function (res) {
      _this.spark.credentials.set({ supertoken: res.body });
    }).catch(function (res) {
      if (res.statusCode !== 400) {
        return _promise2.default.reject(res);
      }

      var ErrorConstructor = _sparkCore.grantErrors.select(res.body.error);
      return _promise2.default.reject(new ErrorConstructor(res._res || res));
    });
  },

  /**
   * Requests a Cisco Spark access token for a user already authenticated into
   * your product.
   *
   * Note: You'll need to supply a jwtRefreshCallback of the form
   * `Promise<jwt> = jwtRefreshCallback(spark)` for automatic token refresh to
   * work.
   *
   * @instance
   * @memberof AuthorizationNode
   * @param {Object} options
   * @param {Object} options.jwt This is a jwt generated by your backend that
   * identifies a user in your system
   * @returns {Promise}
   */
  requestAccessTokenFromJwt: function requestAccessTokenFromJwt(_ref) {
    var _this2 = this;

    var jwt = _ref.jwt;

    return this.spark.request({
      method: 'POST',
      service: 'hydra',
      resource: 'jwt/login',
      headers: {
        authorization: jwt
      }
    }).then(function (_ref2) {
      var body = _ref2.body;
      return {
        access_token: body.token,
        token_type: 'Bearer',
        expires_in: body.expiresIn
      };
    }).then(function (token) {
      _this2.spark.credentials.set({
        supertoken: token
      });
    });
  },
  version: '1.32.23'
}, (_applyDecoratedDescriptor(_obj, 'requestAuthorizationCodeGrant', [_dec, _common.oneFlight], (0, _getOwnPropertyDescriptor2.default)(_obj, 'requestAuthorizationCodeGrant'), _obj), _applyDecoratedDescriptor(_obj, 'requestAccessTokenFromJwt', [_common.oneFlight], (0, _getOwnPropertyDescriptor2.default)(_obj, 'requestAccessTokenFromJwt'), _obj)), _obj)));

exports.default = Authorization;
//# sourceMappingURL=authorization.js.map
