/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../../base/Page');
import Response = require('../../../../http/response');
import Understand = require('../../Understand');
import { SerializableClass } from '../../../../interfaces';

/**
 * @description Initialize the DialogueList
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param version - Version of the resource
 * @param assistantSid - The unique ID of the parent Assistant.
 */
declare function DialogueList(version: Understand, assistantSid: string): DialogueListInstance;

interface DialogueListInstance {
  /**
   * @param sid - sid of instance
   */
  (sid: string): DialogueContext;
  /**
   * Constructs a dialogue
   *
   * @param sid - The sid
   */
  get(sid: string): DialogueContext;
}

interface DialoguePayload extends DialogueResource, Page.TwilioResponsePayload {
}

interface DialogueResource {
  account_sid: string;
  assistant_sid: string;
  data: string;
  sid: string;
  url: string;
}

interface DialogueSolution {
  assistantSid?: string;
}


declare class DialogueContext {
  /**
   * Initialize the DialogueContextPLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param assistantSid - The assistant_sid
   * @param sid - The sid
   */
  constructor(version: Understand, assistantSid: string, sid: string);

  /**
   * fetch a DialogueInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: DialogueInstance) => any): Promise<DialogueInstance>;
}


declare class DialogueInstance extends SerializableClass {
  /**
   * Initialize the DialogueContextPLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
   *
   * @property accountSid - The unique ID of the Account that created this Field.
   * @property assistantSid - The unique ID of the parent Assistant.
   * @property sid - The unique ID of the Dialogue
   * @property data - The dialogue memory object as json
   * @property url - The url
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   * @param assistantSid - The unique ID of the parent Assistant.
   * @param sid - The sid
   */
  constructor(version: Understand, payload: DialoguePayload, assistantSid: string, sid: string);

  private _proxy: DialogueContext;
  accountSid: string;
  assistantSid: string;
  data: string;
  /**
   * fetch a DialogueInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: DialogueInstance) => any): void;
  sid: string;
  /**
   * Produce a plain JSON object version of the DialogueInstance for serialization.
   * Removes any circular references in the object.
   */
  toJSON(): any;
  url: string;
}


declare class DialoguePage extends Page<Understand, DialoguePayload, DialogueResource, DialogueInstance> {
  /**
   * Initialize the DialoguePagePLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: Understand, response: Response<string>, solution: DialogueSolution);

  /**
   * Build an instance of DialogueInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: DialoguePayload): DialogueInstance;
}

export { DialogueContext, DialogueInstance, DialogueList, DialogueListInstance, DialoguePage, DialoguePayload, DialogueResource, DialogueSolution }
