/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../base/Page');
import V1 = require('../V1');

/**
 * @description Initialize the VoicePermissionList
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param version - Version of the resource
 */
declare function VoicePermissionList(version: V1): VoicePermissionListInstance;

interface VoicePermissionListInstance {
  bulkCountryUpdates?: object;
  countries?: object;
}

interface VoicePermissionPayload extends VoicePermissionResource, Page.TwilioResponsePayload {
}

interface VoicePermissionResource {
}

interface VoicePermissionSolution {
}

export { VoicePermissionList, VoicePermissionListInstance, VoicePermissionPayload, VoicePermissionResource, VoicePermissionSolution }
