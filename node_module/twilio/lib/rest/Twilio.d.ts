/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Accounts = require('./Accounts');
import Api = require('./Api');
import Authy = require('./Authy');
import Autopilot = require('./Autopilot');
import Chat = require('./Chat');
import Fax = require('./Fax');
import IpMessaging = require('./IpMessaging');
import Lookups = require('./Lookups');
import Messaging = require('./Messaging');
import Monitor = require('./Monitor');
import Notify = require('./Notify');
import Preview = require('./Preview');
import Pricing = require('./Pricing');
import Proxy = require('./Proxy');
import RequestClient = require('../base/RequestClient');
import Studio = require('./Studio');
import Sync = require('./Sync');
import Taskrouter = require('./Taskrouter');
import Trunking = require('./Trunking');
import Verify = require('./Verify');
import Video = require('./Video');
import Voice = require('./Voice');
import Wireless = require('./Wireless');

declare class Twilio {
  /**
   * Twilio Client to interact with the Rest API
   *
   * @param username - The username used for authentication. This is normally account sid, but if using key/secret auth will be the api key sid.
   * @param password - The password used for authentication. This is normally auth token, but if using key/secret auth will be the secret.
   * @param opts - The options argument
   */
  constructor(username: string, password: string, opts?: Twilio.TwilioClientOptions);

  accounts: Accounts;
  addresses: (typeof Api.prototype.account.addresses);
  api: Api;
  applications: (typeof Api.prototype.account.applications);
  authorizedConnectApps: (typeof Api.prototype.account.authorizedConnectApps);
  authy: Authy;
  autopilot: Autopilot;
  availablePhoneNumbers: (typeof Api.prototype.account.availablePhoneNumbers);
  balance: (typeof Api.prototype.account.balance);
  calls: (typeof Api.prototype.account.calls);
  chat: Chat;
  conferences: (typeof Api.prototype.account.conferences);
  connectApps: (typeof Api.prototype.account.connectApps);
  fax: Fax;
  incomingPhoneNumbers: (typeof Api.prototype.account.incomingPhoneNumbers);
  ipMessaging: IpMessaging;
  keys: (typeof Api.prototype.account.keys);
  lookups: Lookups;
  messages: (typeof Api.prototype.account.messages);
  messaging: Messaging;
  monitor: Monitor;
  newKeys: (typeof Api.prototype.account.newKeys);
  newSigningKeys: (typeof Api.prototype.account.newSigningKeys);
  notifications: (typeof Api.prototype.account.notifications);
  notify: Notify;
  outgoingCallerIds: (typeof Api.prototype.account.outgoingCallerIds);
  preview: Preview;
  pricing: Pricing;
  proxy: Proxy;
  queues: (typeof Api.prototype.account.queues);
  recordings: (typeof Api.prototype.account.recordings);
  /**
   * Makes a request to the Twilio API using the configured http client.
   * Authentication information is automatically added if none is provided.
   *
   * @param opts - The options argument
   */
  request(opts: Twilio.RequestOptions): Promise<any>;
  shortCodes: (typeof Api.prototype.account.shortCodes);
  signingKeys: (typeof Api.prototype.account.signingKeys);
  sip: (typeof Api.prototype.account.sip);
  studio: Studio;
  sync: Sync;
  taskrouter: Taskrouter;
  tokens: (typeof Api.prototype.account.tokens);
  transcriptions: (typeof Api.prototype.account.transcriptions);
  trunking: Trunking;
  usage: (typeof Api.prototype.account.usage);
  /**
   * Validate that a request to the new SSL certificate is successful.
   * @throws {RestException} if the request fails
   */
  validateSslCert(): Promise<any>;
  validationRequests: (typeof Api.prototype.account.validationRequests);
  verify: Verify;
  video: Video;
  voice: Voice;
  wireless: Wireless;
}

declare namespace Twilio {

  /**
   * Options for the request
   *
   * @property allowRedirects - Should the client follow redirects
   * @property data - The request data
   * @property headers - The request headers
   * @property method - The http method
   * @property params - The request params
   * @property password - The password used for auth
   * @property timeout - The request timeout in milliseconds
   * @property uri - The request uri
   * @property username - The username used for auth
   */
  export interface RequestOptions {
    allowRedirects?: boolean;
    data?: object;
    headers?: object;
    method: string;
    params?: object;
    password?: string;
    timeout?: number;
    uri: string;
    username?: string;
  }

  /**
   * Options to pass to the Twilio Client constructor
   *
   * @property accountSid - The default accountSid. This is set to username if not provided
   * @property env - The environment object. Defaults to process.env
   * @property httpClient - The client used for http requests. Defaults to RequestClient
   * @property region - Twilio region to use. Defaults to none
   */
  export interface TwilioClientOptions {
    accountSid?: string;
    env?: object;
    httpClient?: RequestClient;
    region?: string;
  }
}

export = Twilio;
