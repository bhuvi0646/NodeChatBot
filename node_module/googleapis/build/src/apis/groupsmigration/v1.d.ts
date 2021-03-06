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
export declare namespace groupsmigration_v1 {
    interface Options extends GlobalOptions {
        version: 'v1';
    }
    /**
     * Groups Migration API
     *
     * Groups Migration Api.
     *
     * @example
     * const {google} = require('googleapis');
     * const groupsmigration = google.groupsmigration('v1');
     *
     * @namespace groupsmigration
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Groupsmigration
     */
    class Groupsmigration {
        _options: GlobalOptions;
        google?: GoogleConfigurable;
        root: this;
        archive: Resource$Archive;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
        getRoot(): this;
    }
    /**
     * JSON response template for groups migration API.
     */
    interface Schema$Groups {
        /**
         * The kind of insert resource this is.
         */
        kind?: string;
        /**
         * The status of the insert request.
         */
        responseCode?: string;
    }
    class Resource$Archive {
        root: Groupsmigration;
        constructor(root: Groupsmigration);
        getRoot(): Groupsmigration;
        /**
         * groupsmigration.archive.insert
         * @desc Inserts a new mail into the archive of the Google group.
         * @alias groupsmigration.archive.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.groupId The group ID
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params?: Params$Resource$Archive$Insert, options?: MethodOptions): AxiosPromise<Schema$Groups>;
        insert(params: Params$Resource$Archive$Insert, options: MethodOptions | BodyResponseCallback<Schema$Groups>, callback: BodyResponseCallback<Schema$Groups>): void;
        insert(params: Params$Resource$Archive$Insert, callback: BodyResponseCallback<Schema$Groups>): void;
        insert(callback: BodyResponseCallback<Schema$Groups>): void;
    }
    interface Params$Resource$Archive$Insert {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The group ID
         */
        groupId?: string;
        /**
         * Media metadata
         */
        media?: {
            /**
             * Media mime-type
             */
            mediaType?: string;
            /**
             * Media body contents
             */
            body?: any;
        };
    }
}
