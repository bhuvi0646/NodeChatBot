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
export declare namespace oauth2_v2 {
    interface Options extends GlobalOptions {
        version: 'v2';
    }
    /**
     * Google OAuth2 API
     *
     * Obtains end-user authorization grants for use with other Google APIs.
     *
     * @example
     * const {google} = require('googleapis');
     * const oauth2 = google.oauth2('v2');
     *
     * @namespace oauth2
     * @type {Function}
     * @version v2
     * @variation v2
     * @param {object=} options Options for Oauth2
     */
    class Oauth2 {
        _options: GlobalOptions;
        google?: GoogleConfigurable;
        root: this;
        userinfo: Resource$Userinfo;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
        getRoot(): this;
        /**
         * oauth2.getCertForOpenIdConnect
         * @alias oauth2.getCertForOpenIdConnect
         * @memberOf! oauth2(v2)
         *
         * @param {object=} params Parameters for request
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getCertForOpenIdConnect(params?: Params$$Getcertforopenidconnect, options?: MethodOptions): AxiosPromise<Schema$Jwk>;
        getCertForOpenIdConnect(params: Params$$Getcertforopenidconnect, options: MethodOptions | BodyResponseCallback<Schema$Jwk>, callback: BodyResponseCallback<Schema$Jwk>): void;
        getCertForOpenIdConnect(params: Params$$Getcertforopenidconnect, callback: BodyResponseCallback<Schema$Jwk>): void;
        getCertForOpenIdConnect(callback: BodyResponseCallback<Schema$Jwk>): void;
        /**
         * oauth2.tokeninfo
         * @alias oauth2.tokeninfo
         * @memberOf! oauth2(v2)
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.access_token
         * @param {string=} params.id_token
         * @param {string=} params.token_handle
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        tokeninfo(params?: Params$$Tokeninfo, options?: MethodOptions): AxiosPromise<Schema$Tokeninfo>;
        tokeninfo(params: Params$$Tokeninfo, options: MethodOptions | BodyResponseCallback<Schema$Tokeninfo>, callback: BodyResponseCallback<Schema$Tokeninfo>): void;
        tokeninfo(params: Params$$Tokeninfo, callback: BodyResponseCallback<Schema$Tokeninfo>): void;
        tokeninfo(callback: BodyResponseCallback<Schema$Tokeninfo>): void;
    }
    interface Schema$Jwk {
        keys?: any[];
    }
    interface Schema$Tokeninfo {
        /**
         * The access type granted with this token. It can be offline or online.
         */
        access_type?: string;
        /**
         * Who is the intended audience for this token. In general the same as
         * issued_to.
         */
        audience?: string;
        /**
         * The email address of the user. Present only if the email scope is present
         * in the request.
         */
        email?: string;
        /**
         * The expiry time of the token, as number of seconds left until expiry.
         */
        expires_in?: number;
        /**
         * To whom was the token issued to. In general the same as audience.
         */
        issued_to?: string;
        /**
         * The space separated list of scopes granted to this token.
         */
        scope?: string;
        /**
         * The token handle associated with this token.
         */
        token_handle?: string;
        /**
         * The obfuscated user id.
         */
        user_id?: string;
        /**
         * Boolean flag which is true if the email address is verified. Present only
         * if the email scope is present in the request.
         */
        verified_email?: boolean;
    }
    interface Schema$Userinfoplus {
        /**
         * The user&#39;s email address.
         */
        email?: string;
        /**
         * The user&#39;s last name.
         */
        family_name?: string;
        /**
         * The user&#39;s gender.
         */
        gender?: string;
        /**
         * The user&#39;s first name.
         */
        given_name?: string;
        /**
         * The hosted domain e.g. example.com if the user is Google apps user.
         */
        hd?: string;
        /**
         * The obfuscated ID of the user.
         */
        id?: string;
        /**
         * URL of the profile page.
         */
        link?: string;
        /**
         * The user&#39;s preferred locale.
         */
        locale?: string;
        /**
         * The user&#39;s full name.
         */
        name?: string;
        /**
         * URL of the user&#39;s picture image.
         */
        picture?: string;
        /**
         * Boolean flag which is true if the email address is verified. Always
         * verified because we only return the user&#39;s primary email address.
         */
        verified_email?: boolean;
    }
    interface Params$$Getcertforopenidconnect {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
    }
    interface Params$$Tokeninfo {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         *
         */
        access_token?: string;
        /**
         *
         */
        id_token?: string;
        /**
         *
         */
        token_handle?: string;
    }
    class Resource$Userinfo {
        root: Oauth2;
        v2: Resource$Userinfo$V2;
        constructor(root: Oauth2);
        getRoot(): Oauth2;
        /**
         * oauth2.userinfo.get
         * @alias oauth2.userinfo.get
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Userinfo$Get, options?: MethodOptions): AxiosPromise<Schema$Userinfoplus>;
        get(params: Params$Resource$Userinfo$Get, options: MethodOptions | BodyResponseCallback<Schema$Userinfoplus>, callback: BodyResponseCallback<Schema$Userinfoplus>): void;
        get(params: Params$Resource$Userinfo$Get, callback: BodyResponseCallback<Schema$Userinfoplus>): void;
        get(callback: BodyResponseCallback<Schema$Userinfoplus>): void;
    }
    interface Params$Resource$Userinfo$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
    }
    class Resource$Userinfo$V2 {
        root: Oauth2;
        me: Resource$Userinfo$V2$Me;
        constructor(root: Oauth2);
        getRoot(): Oauth2;
    }
    class Resource$Userinfo$V2$Me {
        root: Oauth2;
        constructor(root: Oauth2);
        getRoot(): Oauth2;
        /**
         * oauth2.userinfo.v2.me.get
         * @alias oauth2.userinfo.v2.me.get
         * @memberOf! ()
         *
         * @param {object=} params Parameters for request
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Userinfo$V2$Me$Get, options?: MethodOptions): AxiosPromise<Schema$Userinfoplus>;
        get(params: Params$Resource$Userinfo$V2$Me$Get, options: MethodOptions | BodyResponseCallback<Schema$Userinfoplus>, callback: BodyResponseCallback<Schema$Userinfoplus>): void;
        get(params: Params$Resource$Userinfo$V2$Me$Get, callback: BodyResponseCallback<Schema$Userinfoplus>): void;
        get(callback: BodyResponseCallback<Schema$Userinfoplus>): void;
    }
    interface Params$Resource$Userinfo$V2$Me$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
    }
}
