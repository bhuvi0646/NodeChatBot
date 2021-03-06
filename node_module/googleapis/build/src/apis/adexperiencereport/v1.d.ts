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
export declare namespace adexperiencereport_v1 {
    interface Options extends GlobalOptions {
        version: 'v1';
    }
    /**
     * Ad Experience Report API
     *
     * View Ad Experience Report data, and get a list of sites that have a
     * significant number of annoying ads.
     *
     * @example
     * const {google} = require('googleapis');
     * const adexperiencereport = google.adexperiencereport('v1');
     *
     * @namespace adexperiencereport
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Adexperiencereport
     */
    class Adexperiencereport {
        _options: GlobalOptions;
        google?: GoogleConfigurable;
        root: this;
        sites: Resource$Sites;
        violatingSites: Resource$Violatingsites;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
        getRoot(): this;
    }
    /**
     * Summary of the ad experience rating of a site for a specific platform.
     */
    interface Schema$PlatformSummary {
        /**
         * The status of the site reviewed for the Better Ads Standards.
         */
        betterAdsStatus?: string;
        /**
         * The date on which ad filtering begins.
         */
        enforcementTime?: string;
        /**
         * The ad filtering status of the site.
         */
        filterStatus?: string;
        /**
         * The last time that the site changed status.
         */
        lastChangeTime?: string;
        /**
         * The assigned regions for the site and platform.
         */
        region?: string[];
        /**
         * A link that leads to a full ad experience report.
         */
        reportUrl?: string;
        /**
         * Whether the site is currently under review.
         */
        underReview?: boolean;
    }
    /**
     * Response message for GetSiteSummary.
     */
    interface Schema$SiteSummaryResponse {
        /**
         * Summary for the desktop review of the site.
         */
        desktopSummary?: Schema$PlatformSummary;
        /**
         * Summary for the mobile review of the site.
         */
        mobileSummary?: Schema$PlatformSummary;
        /**
         * The name of the site reviewed.
         */
        reviewedSite?: string;
    }
    /**
     * Response message for ListViolatingSites.
     */
    interface Schema$ViolatingSitesResponse {
        /**
         * A list of summaries of violating sites.
         */
        violatingSites?: Schema$SiteSummaryResponse[];
    }
    class Resource$Sites {
        root: Adexperiencereport;
        constructor(root: Adexperiencereport);
        getRoot(): Adexperiencereport;
        /**
         * adexperiencereport.sites.get
         * @desc Gets a summary of the ad experience rating of a site.
         * @alias adexperiencereport.sites.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The required site name. It should be the site property whose ad experiences may have been reviewed, and it should be URL-encoded. For example, sites/https%3A%2F%2Fwww.google.com. The server will return an error of BAD_REQUEST if this field is not filled in. Note that if the site property is not yet verified in Search Console, the reportUrl field returned by the API will lead to the verification page, prompting the user to go through that process before they can gain access to the Ad Experience Report.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Sites$Get, options?: MethodOptions): AxiosPromise<Schema$SiteSummaryResponse>;
        get(params: Params$Resource$Sites$Get, options: MethodOptions | BodyResponseCallback<Schema$SiteSummaryResponse>, callback: BodyResponseCallback<Schema$SiteSummaryResponse>): void;
        get(params: Params$Resource$Sites$Get, callback: BodyResponseCallback<Schema$SiteSummaryResponse>): void;
        get(callback: BodyResponseCallback<Schema$SiteSummaryResponse>): void;
    }
    interface Params$Resource$Sites$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The required site name. It should be the site property whose ad
         * experiences may have been reviewed, and it should be URL-encoded. For
         * example, sites/https%3A%2F%2Fwww.google.com. The server will return an
         * error of BAD_REQUEST if this field is not filled in. Note that if the
         * site property is not yet verified in Search Console, the reportUrl field
         * returned by the API will lead to the verification page, prompting the
         * user to go through that process before they can gain access to the Ad
         * Experience Report.
         */
        name?: string;
    }
    class Resource$Violatingsites {
        root: Adexperiencereport;
        constructor(root: Adexperiencereport);
        getRoot(): Adexperiencereport;
        /**
         * adexperiencereport.violatingSites.list
         * @desc Lists sites with Ad Experience Report statuses of "Failing" or
         * "Warning".
         * @alias adexperiencereport.violatingSites.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Violatingsites$List, options?: MethodOptions): AxiosPromise<Schema$ViolatingSitesResponse>;
        list(params: Params$Resource$Violatingsites$List, options: MethodOptions | BodyResponseCallback<Schema$ViolatingSitesResponse>, callback: BodyResponseCallback<Schema$ViolatingSitesResponse>): void;
        list(params: Params$Resource$Violatingsites$List, callback: BodyResponseCallback<Schema$ViolatingSitesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ViolatingSitesResponse>): void;
    }
    interface Params$Resource$Violatingsites$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
    }
}
