'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var _ = require('lodash');  /* jshint ignore:line */
var Version = require('../../base/Version');  /* jshint ignore:line */
var VoicePermissionList = require('./v1/voicePermission').VoicePermissionList;


/* jshint ignore:start */
/**
 * Initialize the V1 version of Voice
 *
 * @property {Twilio.Voice.V1.VoicePermissionList} voicePermissions -
 *          voicePermissions resource
 *
 * @param {Twilio.Voice} domain - The twilio domain
 */
/* jshint ignore:end */
function V1(domain) {
  Version.prototype.constructor.call(this, domain, 'v1');

  // Resources
  this._voicePermissions = undefined;
}

_.extend(V1.prototype, Version.prototype);
V1.prototype.constructor = V1;

Object.defineProperty(V1.prototype,
  'voicePermissions', {
  get: function() {
    this._voicePermissions = this._voicePermissions || new VoicePermissionList(this);
    return this._voicePermissions;
  }
});

module.exports = V1;
