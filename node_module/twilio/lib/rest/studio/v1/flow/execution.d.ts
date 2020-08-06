/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import Page = require('../../../../base/Page');
import Response = require('../../../../http/response');
import V1 = require('../../V1');
import serialize = require('../../../../base/serialize');
import { ExecutionContextList } from './execution/executionContext';
import { ExecutionContextListInstance } from './execution/executionContext';
import { ExecutionStepList } from './execution/executionStep';
import { ExecutionStepListInstance } from './execution/executionStep';
import { SerializableClass } from '../../../../interfaces';

type ExecutionStatus = 'active'|'ended';

/**
 * @description Initialize the ExecutionList
 *
 * @param version - Version of the resource
 * @param flowSid - Flow Sid.
 */
declare function ExecutionList(version: V1, flowSid: string): ExecutionListInstance;

interface ExecutionListInstance {
  /**
   * @param sid - sid of instance
   */
  (sid: string): ExecutionContext;
  /**
   * create a ExecutionInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  create(opts: ExecutionListInstanceCreateOptions, callback?: (error: Error | null, item: ExecutionInstance) => any): Promise<ExecutionInstance>;
  /**
   * Streams ExecutionInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param opts - Options for request
   * @param callback - Function to process each record
   */
  each(opts?: ExecutionListInstanceEachOptions, callback?: (item: ExecutionInstance, done: (err?: Error) => void) => void): void;
  /**
   * Constructs a execution
   *
   * @param sid - Execution Sid.
   */
  get(sid: string): ExecutionContext;
  /**
   * Retrieve a single target page of ExecutionInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param targetUrl - API-generated URL for the requested results page
   * @param callback - Callback to handle list of records
   */
  getPage(targetUrl?: string, callback?: (error: Error | null, items: ExecutionPage) => any): Promise<ExecutionPage>;
  /**
   * Lists ExecutionInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param opts - Options for request
   * @param callback - Callback to handle list of records
   */
  list(opts?: ExecutionListInstanceOptions, callback?: (error: Error | null, items: ExecutionInstance[]) => any): Promise<ExecutionInstance[]>;
  /**
   * Retrieve a single page of ExecutionInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param opts - Options for request
   * @param callback - Callback to handle list of records
   */
  page(opts?: ExecutionListInstancePageOptions, callback?: (error: Error | null, items: ExecutionPage) => any): Promise<ExecutionPage>;
}

/**
 * Options to pass to create
 *
 * @property from - The Twilio phone number to send messages or initiate calls from during the Flow Execution.
 * @property parameters - JSON data that will be added to your flow's context and can accessed as variables inside your flow.
 * @property to - The Contact phone number to start a Studio Flow Execution.
 */
interface ExecutionListInstanceCreateOptions {
  from: string;
  parameters?: string;
  to: string;
}

/**
 * Options to pass to each
 *
 * @property callback -
 *                         Function to process each record. If this and a positional
 *                         callback are passed, this one will be used
 * @property dateCreatedFrom - Only show Executions that started on or after this ISO8601 date-time.
 * @property dateCreatedTo - Only show Executions that started before this this ISO8601 date-time.
 * @property done - Function to be called upon completion of streaming
 * @property limit -
 *                         Upper limit for the number of records to return.
 *                         each() guarantees never to return more than limit.
 *                         Default is no limit
 * @property pageSize -
 *                         Number of records to fetch per request,
 *                         when not set will use the default value of 50 records.
 *                         If no pageSize is defined but a limit is defined,
 *                         each() will attempt to read the limit with the most efficient
 *                         page size, i.e. min(limit, 1000)
 */
interface ExecutionListInstanceEachOptions {
  callback?: (item: ExecutionInstance, done: (err?: Error) => void) => void;
  dateCreatedFrom?: Date;
  dateCreatedTo?: Date;
  done?: Function;
  limit?: number;
  pageSize?: number;
}

/**
 * Options to pass to list
 *
 * @property dateCreatedFrom - Only show Executions that started on or after this ISO8601 date-time.
 * @property dateCreatedTo - Only show Executions that started before this this ISO8601 date-time.
 * @property limit -
 *                         Upper limit for the number of records to return.
 *                         list() guarantees never to return more than limit.
 *                         Default is no limit
 * @property pageSize -
 *                         Number of records to fetch per request,
 *                         when not set will use the default value of 50 records.
 *                         If no page_size is defined but a limit is defined,
 *                         list() will attempt to read the limit with the most
 *                         efficient page size, i.e. min(limit, 1000)
 */
interface ExecutionListInstanceOptions {
  dateCreatedFrom?: Date;
  dateCreatedTo?: Date;
  limit?: number;
  pageSize?: number;
}

/**
 * Options to pass to page
 *
 * @property dateCreatedFrom - Only show Executions that started on or after this ISO8601 date-time.
 * @property dateCreatedTo - Only show Executions that started before this this ISO8601 date-time.
 * @property pageNumber - Page Number, this value is simply for client state
 * @property pageSize - Number of records to return, defaults to 50
 * @property pageToken - PageToken provided by the API
 */
interface ExecutionListInstancePageOptions {
  dateCreatedFrom?: Date;
  dateCreatedTo?: Date;
  pageNumber?: number;
  pageSize?: number;
  pageToken?: string;
}

interface ExecutionPayload extends ExecutionResource, Page.TwilioResponsePayload {
}

interface ExecutionResource {
  account_sid: string;
  contact_channel_address: string;
  contact_sid: string;
  context: string;
  date_created: Date;
  date_updated: Date;
  flow_sid: string;
  links: string;
  sid: string;
  status: ExecutionStatus;
  url: string;
}

interface ExecutionSolution {
  flowSid?: string;
}


declare class ExecutionContext {
  /**
   * Initialize the ExecutionContext
   *
   * @property steps - steps resource
   * @property executionContext - executionContext resource
   *
   * @param version - Version of the resource
   * @param flowSid - Flow Sid.
   * @param sid - Execution Sid.
   */
  constructor(version: V1, flowSid: string, sid: string);

  executionContext: ExecutionContextListInstance;
  /**
   * fetch a ExecutionInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: ExecutionInstance) => any): Promise<ExecutionInstance>;
  /**
   * remove a ExecutionInstance
   *
   * @param callback - Callback to handle processed record
   */
  remove(callback?: (error: Error | null, items: ExecutionInstance) => any): void;
  steps: ExecutionStepListInstance;
}


declare class ExecutionInstance extends SerializableClass {
  /**
   * Initialize the ExecutionContext
   *
   * @property sid - A string that uniquely identifies this Execution.
   * @property accountSid - Account Sid.
   * @property flowSid - Flow Sid.
   * @property contactSid - Contact Sid.
   * @property contactChannelAddress - The phone number, SIP address or Client identifier that triggered this Execution.
   * @property context - The context
   * @property status - The Status of this Execution
   * @property dateCreated - The date this Execution was created
   * @property dateUpdated - The date this Execution was updated
   * @property url - The URL of this resource.
   * @property links - Nested resource URLs.
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   * @param flowSid - Flow Sid.
   * @param sid - Execution Sid.
   */
  constructor(version: V1, payload: ExecutionPayload, flowSid: string, sid: string);

  private _proxy: ExecutionContext;
  accountSid: string;
  contactChannelAddress: string;
  contactSid: string;
  context: string;
  dateCreated: Date;
  dateUpdated: Date;
  /**
   * Access the executionContext
   */
  executionContext(): ExecutionContextListInstance;
  /**
   * fetch a ExecutionInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: ExecutionInstance) => any): void;
  flowSid: string;
  links: string;
  /**
   * remove a ExecutionInstance
   *
   * @param callback - Callback to handle processed record
   */
  remove(callback?: (error: Error | null, items: ExecutionInstance) => any): void;
  sid: string;
  status: ExecutionStatus;
  /**
   * Access the steps
   */
  steps(): ExecutionStepListInstance;
  /**
   * Produce a plain JSON object version of the ExecutionInstance for serialization.
   * Removes any circular references in the object.
   */
  toJSON(): any;
  url: string;
}


declare class ExecutionPage extends Page<V1, ExecutionPayload, ExecutionResource, ExecutionInstance> {
  /**
   * Initialize the ExecutionPage
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: V1, response: Response<string>, solution: ExecutionSolution);

  /**
   * Build an instance of ExecutionInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: ExecutionPayload): ExecutionInstance;
}

export { ExecutionContext, ExecutionInstance, ExecutionList, ExecutionListInstance, ExecutionListInstanceCreateOptions, ExecutionListInstanceEachOptions, ExecutionListInstanceOptions, ExecutionListInstancePageOptions, ExecutionPage, ExecutionPayload, ExecutionResource, ExecutionSolution }
