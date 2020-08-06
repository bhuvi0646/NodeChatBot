/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { AxiosPromise } from 'axios';
import { Compute, JWT, OAuth2Client, UserRefreshClient } from 'google-auth-library';
import { BodyResponseCallback, GlobalOptions, GoogleConfigurable, MethodOptions } from 'googleapis-common';
export declare namespace analytics_v2_4 {
    interface Options extends GlobalOptions {
        version: 'v2_4';
    }
    /**
     * Google Analytics API
     *
     * Views and manages your Google Analytics data.
     *
     * @example
     * const {google} = require('googleapis');
     * const analytics = google.analytics('v2.4');
     *
     * @namespace analytics
     * @type {Function}
     * @version v2.4
     * @variation v2.4
     * @param {object=} options Options for Analytics
     */
    class Analytics {
        _options: GlobalOptions;
        google?: GoogleConfigurable;
        root: this;
        data: Resource$Data;
        management: Resource$Management;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
        getRoot(): this;
    }
    class Resource$Data {
        root: Analytics;
        constructor(root: Analytics);
        getRoot(): Analytics;
        /**
         * analytics.data.get
         * @desc Returns Analytics report data for a view (profile).
         * @alias analytics.data.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.dimensions A comma-separated list of Analytics dimensions. E.g., 'ga:browser,ga:city'.
         * @param {string} params.end-date End date for fetching report data. All requests should specify an end date formatted as YYYY-MM-DD.
         * @param {string=} params.filters A comma-separated list of dimension or metric filters to be applied to the report data.
         * @param {string} params.ids Unique table ID for retrieving report data. Table ID is of the form ga:XXXX, where XXXX is the Analytics view (profile) ID.
         * @param {integer=} params.max-results The maximum number of entries to include in this feed.
         * @param {string} params.metrics A comma-separated list of Analytics metrics. E.g., 'ga:sessions,ga:pageviews'. At least one metric must be specified to retrieve a valid Analytics report.
         * @param {string=} params.segment An Analytics advanced segment to be applied to the report data.
         * @param {string=} params.sort A comma-separated list of dimensions or metrics that determine the sort order for the report data.
         * @param {string} params.start-date Start date for fetching report data. All requests should specify a start date formatted as YYYY-MM-DD.
         * @param {integer=} params.start-index An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Data$Get, options?: MethodOptions): AxiosPromise<void>;
        get(params: Params$Resource$Data$Get, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        get(params: Params$Resource$Data$Get, callback: BodyResponseCallback<void>): void;
        get(callback: BodyResponseCallback<void>): void;
    }
    interface Params$Resource$Data$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * A comma-separated list of Analytics dimensions. E.g.,
         * 'ga:browser,ga:city'.
         */
        dimensions?: string;
        /**
         * End date for fetching report data. All requests should specify an end
         * date formatted as YYYY-MM-DD.
         */
        'end-date'?: string;
        /**
         * A comma-separated list of dimension or metric filters to be applied to
         * the report data.
         */
        filters?: string;
        /**
         * Unique table ID for retrieving report data. Table ID is of the form
         * ga:XXXX, where XXXX is the Analytics view (profile) ID.
         */
        ids?: string;
        /**
         * The maximum number of entries to include in this feed.
         */
        'max-results'?: number;
        /**
         * A comma-separated list of Analytics metrics. E.g.,
         * 'ga:sessions,ga:pageviews'. At least one metric must be specified to
         * retrieve a valid Analytics report.
         */
        metrics?: string;
        /**
         * An Analytics advanced segment to be applied to the report data.
         */
        segment?: string;
        /**
         * A comma-separated list of dimensions or metrics that determine the sort
         * order for the report data.
         */
        sort?: string;
        /**
         * Start date for fetching report data. All requests should specify a start
         * date formatted as YYYY-MM-DD.
         */
        'start-date'?: string;
        /**
         * An index of the first entity to retrieve. Use this parameter as a
         * pagination mechanism along with the max-results parameter.
         */
        'start-index'?: number;
    }
    class Resource$Management {
        root: Analytics;
        accounts: Resource$Management$Accounts;
        goals: Resource$Management$Goals;
        profiles: Resource$Management$Profiles;
        segments: Resource$Management$Segments;
        webproperties: Resource$Management$Webproperties;
        constructor(root: Analytics);
        getRoot(): Analytics;
    }
    class Resource$Management$Accounts {
        root: Analytics;
        constructor(root: Analytics);
        getRoot(): Analytics;
        /**
         * analytics.management.accounts.list
         * @desc Lists all accounts to which the user has access.
         * @alias analytics.management.accounts.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {integer=} params.max-results The maximum number of accounts to include in this response.
         * @param {integer=} params.start-index An index of the first account to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Management$Accounts$List, options?: MethodOptions): AxiosPromise<void>;
        list(params: Params$Resource$Management$Accounts$List, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        list(params: Params$Resource$Management$Accounts$List, callback: BodyResponseCallback<void>): void;
        list(callback: BodyResponseCallback<void>): void;
    }
    interface Params$Resource$Management$Accounts$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The maximum number of accounts to include in this response.
         */
        'max-results'?: number;
        /**
         * An index of the first account to retrieve. Use this parameter as a
         * pagination mechanism along with the max-results parameter.
         */
        'start-index'?: number;
    }
    class Resource$Management$Goals {
        root: Analytics;
        constructor(root: Analytics);
        getRoot(): Analytics;
        /**
         * analytics.management.goals.list
         * @desc Lists goals to which the user has access.
         * @alias analytics.management.goals.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.accountId Account ID to retrieve goals for. Can either be a specific account ID or '~all', which refers to all the accounts that user has access to.
         * @param {integer=} params.max-results The maximum number of goals to include in this response.
         * @param {string} params.profileId View (Profile) ID to retrieve goals for. Can either be a specific view (profile) ID or '~all', which refers to all the views (profiles) that user has access to.
         * @param {integer=} params.start-index An index of the first goal to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.
         * @param {string} params.webPropertyId Web property ID to retrieve goals for. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Management$Goals$List, options?: MethodOptions): AxiosPromise<void>;
        list(params: Params$Resource$Management$Goals$List, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        list(params: Params$Resource$Management$Goals$List, callback: BodyResponseCallback<void>): void;
        list(callback: BodyResponseCallback<void>): void;
    }
    interface Params$Resource$Management$Goals$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Account ID to retrieve goals for. Can either be a specific account ID or
         * '~all', which refers to all the accounts that user has access to.
         */
        accountId?: string;
        /**
         * The maximum number of goals to include in this response.
         */
        'max-results'?: number;
        /**
         * View (Profile) ID to retrieve goals for. Can either be a specific view
         * (profile) ID or '~all', which refers to all the views (profiles) that
         * user has access to.
         */
        profileId?: string;
        /**
         * An index of the first goal to retrieve. Use this parameter as a
         * pagination mechanism along with the max-results parameter.
         */
        'start-index'?: number;
        /**
         * Web property ID to retrieve goals for. Can either be a specific web
         * property ID or '~all', which refers to all the web properties that user
         * has access to.
         */
        webPropertyId?: string;
    }
    class Resource$Management$Profiles {
        root: Analytics;
        constructor(root: Analytics);
        getRoot(): Analytics;
        /**
         * analytics.management.profiles.list
         * @desc Lists views (profiles) to which the user has access.
         * @alias analytics.management.profiles.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.accountId Account ID for the views (profiles) to retrieve. Can either be a specific account ID or '~all', which refers to all the accounts to which the user has access.
         * @param {integer=} params.max-results The maximum number of views (profiles) to include in this response.
         * @param {integer=} params.start-index An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.
         * @param {string} params.webPropertyId Web property ID for the views (profiles) to retrieve. Can either be a specific web property ID or '~all', which refers to all the web properties to which the user has access.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Management$Profiles$List, options?: MethodOptions): AxiosPromise<void>;
        list(params: Params$Resource$Management$Profiles$List, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        list(params: Params$Resource$Management$Profiles$List, callback: BodyResponseCallback<void>): void;
        list(callback: BodyResponseCallback<void>): void;
    }
    interface Params$Resource$Management$Profiles$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Account ID for the views (profiles) to retrieve. Can either be a specific
         * account ID or '~all', which refers to all the accounts to which the user
         * has access.
         */
        accountId?: string;
        /**
         * The maximum number of views (profiles) to include in this response.
         */
        'max-results'?: number;
        /**
         * An index of the first entity to retrieve. Use this parameter as a
         * pagination mechanism along with the max-results parameter.
         */
        'start-index'?: number;
        /**
         * Web property ID for the views (profiles) to retrieve. Can either be a
         * specific web property ID or '~all', which refers to all the web
         * properties to which the user has access.
         */
        webPropertyId?: string;
    }
    class Resource$Management$Segments {
        root: Analytics;
        constructor(root: Analytics);
        getRoot(): Analytics;
        /**
         * analytics.management.segments.list
         * @desc Lists advanced segments to which the user has access.
         * @alias analytics.management.segments.list
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {integer=} params.max-results The maximum number of advanced segments to include in this response.
         * @param {integer=} params.start-index An index of the first advanced segment to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Management$Segments$List, options?: MethodOptions): AxiosPromise<void>;
        list(params: Params$Resource$Management$Segments$List, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        list(params: Params$Resource$Management$Segments$List, callback: BodyResponseCallback<void>): void;
        list(callback: BodyResponseCallback<void>): void;
    }
    interface Params$Resource$Management$Segments$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The maximum number of advanced segments to include in this response.
         */
        'max-results'?: number;
        /**
         * An index of the first advanced segment to retrieve. Use this parameter as
         * a pagination mechanism along with the max-results parameter.
         */
        'start-index'?: number;
    }
    class Resource$Management$Webproperties {
        root: Analytics;
        constructor(root: Analytics);
        getRoot(): Analytics;
        /**
         * analytics.management.webproperties.list
         * @desc Lists web properties to which the user has access.
         * @alias analytics.management.webproperties.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.accountId Account ID to retrieve web properties for. Can either be a specific account ID or '~all', which refers to all the accounts that user has access to.
         * @param {integer=} params.max-results The maximum number of web properties to include in this response.
         * @param {integer=} params.start-index An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Management$Webproperties$List, options?: MethodOptions): AxiosPromise<void>;
        list(params: Params$Resource$Management$Webproperties$List, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        list(params: Params$Resource$Management$Webproperties$List, callback: BodyResponseCallback<void>): void;
        list(callback: BodyResponseCallback<void>): void;
    }
    interface Params$Resource$Management$Webproperties$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Account ID to retrieve web properties for. Can either be a specific
         * account ID or '~all', which refers to all the accounts that user has
         * access to.
         */
        accountId?: string;
        /**
         * The maximum number of web properties to include in this response.
         */
        'max-results'?: number;
        /**
         * An index of the first entity to retrieve. Use this parameter as a
         * pagination mechanism along with the max-results parameter.
         */
        'start-index'?: number;
    }
}
