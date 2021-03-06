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
export declare namespace oauth2_v1 {
    interface Options extends GlobalOptions {
        version: 'v1';
    }
    /**
     * Google OAuth2 API
     *
     * Obtains end-user authorization grants for use with other Google APIs.
     *
     * @example
     * const {google} = require('googleapis');
     * const oauth2 = google.oauth2('v1');
     *
     * @namespace oauth2
     * @type {Function}
     * @version v1
     * @variation v1
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
         * @memberOf! oauth2(v1)
         *
         * @param {object=} params Parameters for request
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getCertForOpenIdConnect(params?: Params$$Getcertforopenidconnect, options?: MethodOptions): AxiosPromise<Schema$X509>;
        getCertForOpenIdConnect(params: Params$$Getcertforopenidconnect, options: MethodOptions | BodyResponseCallback<Schema$X509>, callback: BodyResponseCallback<Schema$X509>): void;
        getCertForOpenIdConnect(params: Params$$Getcertforopenidconnect, callback: BodyResponseCallback<Schema$X509>): void;
        getCertForOpenIdConnect(callback: BodyResponseCallback<Schema$X509>): void;
        /**
         * oauth2.getCertForOpenIdConnectRaw
         * @alias oauth2.getCertForOpenIdConnectRaw
         * @memberOf! oauth2(v1)
         *
         * @param {object=} params Parameters for request
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getCertForOpenIdConnectRaw(params?: Params$$Getcertforopenidconnectraw, options?: MethodOptions): AxiosPromise<Schema$Raw>;
        getCertForOpenIdConnectRaw(params: Params$$Getcertforopenidconnectraw, options: MethodOptions | BodyResponseCallback<Schema$Raw>, callback: BodyResponseCallback<Schema$Raw>): void;
        getCertForOpenIdConnectRaw(params: Params$$Getcertforopenidconnectraw, callback: BodyResponseCallback<Schema$Raw>): void;
        getCertForOpenIdConnectRaw(callback: BodyResponseCallback<Schema$Raw>): void;
        /**
         * oauth2.getRobotJwk
         * @alias oauth2.getRobotJwk
         * @memberOf! oauth2(v1)
         *
         * @param {object} params Parameters for request
         * @param {string} params.robotEmail The email of robot account.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getRobotJwk(params?: Params$$Getrobotjwk, options?: MethodOptions): AxiosPromise<Schema$Jwk>;
        getRobotJwk(params: Params$$Getrobotjwk, options: MethodOptions | BodyResponseCallback<Schema$Jwk>, callback: BodyResponseCallback<Schema$Jwk>): void;
        getRobotJwk(params: Params$$Getrobotjwk, callback: BodyResponseCallback<Schema$Jwk>): void;
        getRobotJwk(callback: BodyResponseCallback<Schema$Jwk>): void;
        /**
         * oauth2.getRobotMetadataRaw
         * @alias oauth2.getRobotMetadataRaw
         * @memberOf! oauth2(v1)
         *
         * @param {object} params Parameters for request
         * @param {string} params.robotEmail The email of robot account.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getRobotMetadataRaw(params?: Params$$Getrobotmetadataraw, options?: MethodOptions): AxiosPromise<Schema$Raw>;
        getRobotMetadataRaw(params: Params$$Getrobotmetadataraw, options: MethodOptions | BodyResponseCallback<Schema$Raw>, callback: BodyResponseCallback<Schema$Raw>): void;
        getRobotMetadataRaw(params: Params$$Getrobotmetadataraw, callback: BodyResponseCallback<Schema$Raw>): void;
        getRobotMetadataRaw(callback: BodyResponseCallback<Schema$Raw>): void;
        /**
         * oauth2.getRobotMetadataX509
         * @alias oauth2.getRobotMetadataX509
         * @memberOf! oauth2(v1)
         *
         * @param {object} params Parameters for request
         * @param {string} params.robotEmail The email of robot account.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getRobotMetadataX509(params?: Params$$Getrobotmetadatax509, options?: MethodOptions): AxiosPromise<Schema$X509>;
        getRobotMetadataX509(params: Params$$Getrobotmetadatax509, options: MethodOptions | BodyResponseCallback<Schema$X509>, callback: BodyResponseCallback<Schema$X509>): void;
        getRobotMetadataX509(params: Params$$Getrobotmetadatax509, callback: BodyResponseCallback<Schema$X509>): void;
        getRobotMetadataX509(callback: BodyResponseCallback<Schema$X509>): void;
        /**
         * oauth2.tokeninfo
         * @desc Get token info
         * @alias oauth2.tokeninfo
         * @memberOf! oauth2(v1)
         *
         * @param {object=} params Parameters for request
         * @param {string=} params.access_token The oauth2 access token
         * @param {string=} params.id_token The ID token
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
    interface Schema$Raw {
        keyvalues?: any[];
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
         * Boolean flag which is true if the email address is verified. Present only
         * if the email scope is present in the request.
         */
        email_verified?: boolean;
        /**
         * The expiry time of the token, as number of seconds left until expiry.
         */
        expires_in?: number;
        /**
         * The issue time of the token, as number of seconds.
         */
        issued_at?: number;
        /**
         * To whom was the token issued to. In general the same as audience.
         */
        issued_to?: string;
        /**
         * Who issued the token.
         */
        issuer?: string;
        /**
         * Nonce of the id token.
         */
        nonce?: string;
        /**
         * The space separated list of scopes granted to this token.
         */
        scope?: string;
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
    interface Schema$X509 {
    }
    interface Params$$Getcertforopenidconnect {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
    }
    interface Params$$Getcertforopenidconnectraw {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
    }
    interface Params$$Getrobotjwk {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The email of robot account.
         */
        robotEmail?: string;
    }
    interface Params$$Getrobotmetadataraw {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The email of robot account.
         */
        robotEmail?: string;
    }
    interface Params$$Getrobotmetadatax509 {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The email of robot account.
         */
        robotEmail?: string;
    }
    interface Params$$Tokeninfo {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The oauth2 access token
         */
        access_token?: string;
        /**
         * The ID token
         */
        id_token?: string;
    }
    class Resource$Userinfo {
        root: Oauth2;
        v2: Resource$Userinfo$V2;
        constructor(root: Oauth2);
        getRoot(): Oauth2;
        /**
         * oauth2.userinfo.get
         * @desc Get user info
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
         * @desc Get user info
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
