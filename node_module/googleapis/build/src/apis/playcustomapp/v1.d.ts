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
export declare namespace playcustomapp_v1 {
    interface Options extends GlobalOptions {
        version: 'v1';
    }
    /**
     * Google Play Custom App Publishing API
     *
     * An API to publish custom Android apps.
     *
     * @example
     * const {google} = require('googleapis');
     * const playcustomapp = google.playcustomapp('v1');
     *
     * @namespace playcustomapp
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Playcustomapp
     */
    class Playcustomapp {
        _options: GlobalOptions;
        google?: GoogleConfigurable;
        root: this;
        accounts: Resource$Accounts;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
        getRoot(): this;
    }
    /**
     * This resource represents a custom app.
     */
    interface Schema$CustomApp {
        /**
         * Default listing language in BCP 47 format.
         */
        languageCode?: string;
        /**
         * Title for the Android app.
         */
        title?: string;
    }
    class Resource$Accounts {
        root: Playcustomapp;
        customApps: Resource$Accounts$Customapps;
        constructor(root: Playcustomapp);
        getRoot(): Playcustomapp;
    }
    class Resource$Accounts$Customapps {
        root: Playcustomapp;
        constructor(root: Playcustomapp);
        getRoot(): Playcustomapp;
        /**
         * playcustomapp.accounts.customApps.create
         * @desc Create and publish a new custom app.
         * @alias playcustomapp.accounts.customApps.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.account Developer account ID.
         * @param  {object} params.resource Media resource metadata
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params?: Params$Resource$Accounts$Customapps$Create, options?: MethodOptions): AxiosPromise<Schema$CustomApp>;
        create(params: Params$Resource$Accounts$Customapps$Create, options: MethodOptions | BodyResponseCallback<Schema$CustomApp>, callback: BodyResponseCallback<Schema$CustomApp>): void;
        create(params: Params$Resource$Accounts$Customapps$Create, callback: BodyResponseCallback<Schema$CustomApp>): void;
        create(callback: BodyResponseCallback<Schema$CustomApp>): void;
    }
    interface Params$Resource$Accounts$Customapps$Create {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Developer account ID.
         */
        account?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CustomApp;
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
