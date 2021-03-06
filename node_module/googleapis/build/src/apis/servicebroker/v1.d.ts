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
export declare namespace servicebroker_v1 {
    interface Options extends GlobalOptions {
        version: 'v1';
    }
    /**
     * Service Broker API
     *
     * The Google Cloud Platform Service Broker API provides Google hosted
     * implementation of the Open Service Broker API
     * (https://www.openservicebrokerapi.org/).
     *
     * @example
     * const {google} = require('googleapis');
     * const servicebroker = google.servicebroker('v1');
     *
     * @namespace servicebroker
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Servicebroker
     */
    class Servicebroker {
        _options: GlobalOptions;
        google?: GoogleConfigurable;
        root: this;
        v1: Resource$V1;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
        getRoot(): this;
    }
    /**
     * Associates `members` with a `role`.
     */
    interface Schema$GoogleIamV1__Binding {
        /**
         * Unimplemented. The condition that is associated with this binding. NOTE:
         * an unsatisfied condition will not allow user access via current binding.
         * Different bindings, including their conditions, are examined
         * independently.
         */
        condition?: Schema$GoogleType__Expr;
        /**
         * Specifies the identities requesting access for a Cloud Platform resource.
         * `members` can have the following values:  * `allUsers`: A special
         * identifier that represents anyone who is    on the internet; with or
         * without a Google account.  * `allAuthenticatedUsers`: A special
         * identifier that represents anyone    who is authenticated with a Google
         * account or a service account.  * `user:{emailid}`: An email address that
         * represents a specific Google    account. For example, `alice@gmail.com` .
         * * `serviceAccount:{emailid}`: An email address that represents a service
         * account. For example, `my-other-app@appspot.gserviceaccount.com`.  *
         * `group:{emailid}`: An email address that represents a Google group. For
         * example, `admins@example.com`.   * `domain:{domain}`: A Google Apps
         * domain name that represents all the    users of that domain. For example,
         * `google.com` or `example.com`.
         */
        members?: string[];
        /**
         * Role that is assigned to `members`. For example, `roles/viewer`,
         * `roles/editor`, or `roles/owner`.
         */
        role?: string;
    }
    /**
     * Defines an Identity and Access Management (IAM) policy. It is used to
     * specify access control policies for Cloud Platform resources.   A `Policy`
     * consists of a list of `bindings`. A `binding` binds a list of `members` to
     * a `role`, where the members can be user accounts, Google groups, Google
     * domains, and service accounts. A `role` is a named list of permissions
     * defined by IAM.  **JSON Example**      {       &quot;bindings&quot;: [ {
     * &quot;role&quot;: &quot;roles/owner&quot;,           &quot;members&quot;: [
     * &quot;user:mike@example.com&quot;, &quot;group:admins@example.com&quot;,
     * &quot;domain:google.com&quot;,
     * &quot;serviceAccount:my-other-app@appspot.gserviceaccount.com&quot; ] }, {
     * &quot;role&quot;: &quot;roles/viewer&quot;,           &quot;members&quot;:
     * [&quot;user:sean@example.com&quot;]         }       ]     }  **YAML
     * Example**      bindings:     - members:       - user:mike@example.com -
     * group:admins@example.com       - domain:google.com       -
     * serviceAccount:my-other-app@appspot.gserviceaccount.com       role:
     * roles/owner     - members:       - user:sean@example.com       role:
     * roles/viewer   For a description of IAM and its features, see the [IAM
     * developer&#39;s guide](https://cloud.google.com/iam/docs).
     */
    interface Schema$GoogleIamV1__Policy {
        /**
         * Associates a list of `members` to a `role`. `bindings` with no members
         * will result in an error.
         */
        bindings?: Schema$GoogleIamV1__Binding[];
        /**
         * `etag` is used for optimistic concurrency control as a way to help
         * prevent simultaneous updates of a policy from overwriting each other. It
         * is strongly suggested that systems make use of the `etag` in the
         * read-modify-write cycle to perform policy updates in order to avoid race
         * conditions: An `etag` is returned in the response to `getIamPolicy`, and
         * systems are expected to put that etag in the request to `setIamPolicy` to
         * ensure that their change will be applied to the same version of the
         * policy.  If no `etag` is provided in the call to `setIamPolicy`, then the
         * existing policy is overwritten blindly.
         */
        etag?: string;
        /**
         * Deprecated.
         */
        version?: number;
    }
    /**
     * Request message for `SetIamPolicy` method.
     */
    interface Schema$GoogleIamV1__SetIamPolicyRequest {
        /**
         * REQUIRED: The complete policy to be applied to the `resource`. The size
         * of the policy is limited to a few 10s of KB. An empty policy is a valid
         * policy but certain Cloud Platform services (such as Projects) might
         * reject them.
         */
        policy?: Schema$GoogleIamV1__Policy;
    }
    /**
     * Request message for `TestIamPermissions` method.
     */
    interface Schema$GoogleIamV1__TestIamPermissionsRequest {
        /**
         * The set of permissions to check for the `resource`. Permissions with
         * wildcards (such as &#39;*&#39; or &#39;storage.*&#39;) are not allowed.
         * For more information see [IAM
         * Overview](https://cloud.google.com/iam/docs/overview#permissions).
         */
        permissions?: string[];
    }
    /**
     * Response message for `TestIamPermissions` method.
     */
    interface Schema$GoogleIamV1__TestIamPermissionsResponse {
        /**
         * A subset of `TestPermissionsRequest.permissions` that the caller is
         * allowed.
         */
        permissions?: string[];
    }
    /**
     * Represents an expression text. Example:      title: &quot;User account
     * presence&quot;     description: &quot;Determines whether the request has a
     * user account&quot;     expression: &quot;size(request.user) &gt; 0&quot;
     */
    interface Schema$GoogleType__Expr {
        /**
         * An optional description of the expression. This is a longer text which
         * describes the expression, e.g. when hovered over it in a UI.
         */
        description?: string;
        /**
         * Textual representation of an expression in Common Expression Language
         * syntax.  The application context of the containing message determines
         * which well-known feature set of CEL is supported.
         */
        expression?: string;
        /**
         * An optional string indicating the location of the expression for error
         * reporting, e.g. a file name and a position in the file.
         */
        location?: string;
        /**
         * An optional title for the expression, i.e. a short string describing its
         * purpose. This can be used e.g. in UIs which allow to enter the
         * expression.
         */
        title?: string;
    }
    class Resource$V1 {
        root: Servicebroker;
        constructor(root: Servicebroker);
        getRoot(): Servicebroker;
        /**
         * servicebroker.getIamPolicy
         * @desc Gets the access control policy for a resource. Returns an empty
         * policy if the resource exists and does not have a policy set.
         * @alias servicebroker.getIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being requested. See the operation documentation for the appropriate value for this field.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        getIamPolicy(params?: Params$Resource$V1$Getiampolicy, options?: MethodOptions): AxiosPromise<Schema$GoogleIamV1__Policy>;
        getIamPolicy(params: Params$Resource$V1$Getiampolicy, options: MethodOptions | BodyResponseCallback<Schema$GoogleIamV1__Policy>, callback: BodyResponseCallback<Schema$GoogleIamV1__Policy>): void;
        getIamPolicy(params: Params$Resource$V1$Getiampolicy, callback: BodyResponseCallback<Schema$GoogleIamV1__Policy>): void;
        getIamPolicy(callback: BodyResponseCallback<Schema$GoogleIamV1__Policy>): void;
        /**
         * servicebroker.setIamPolicy
         * @desc Sets the access control policy on the specified resource. Replaces
         * any existing policy.
         * @alias servicebroker.setIamPolicy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy is being specified. See the operation documentation for the appropriate value for this field.
         * @param {().GoogleIamV1__SetIamPolicyRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        setIamPolicy(params?: Params$Resource$V1$Setiampolicy, options?: MethodOptions): AxiosPromise<Schema$GoogleIamV1__Policy>;
        setIamPolicy(params: Params$Resource$V1$Setiampolicy, options: MethodOptions | BodyResponseCallback<Schema$GoogleIamV1__Policy>, callback: BodyResponseCallback<Schema$GoogleIamV1__Policy>): void;
        setIamPolicy(params: Params$Resource$V1$Setiampolicy, callback: BodyResponseCallback<Schema$GoogleIamV1__Policy>): void;
        setIamPolicy(callback: BodyResponseCallback<Schema$GoogleIamV1__Policy>): void;
        /**
         * servicebroker.testIamPermissions
         * @desc Returns permissions that a caller has on the specified resource. If
         * the resource does not exist, this will return an empty set of
         * permissions, not a NOT_FOUND error.  Note: This operation is designed to
         * be used for building permission-aware UIs and command-line tools, not for
         * authorization checking. This operation may "fail open" without warning.
         * @alias servicebroker.testIamPermissions
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.resource_ REQUIRED: The resource for which the policy detail is being requested. See the operation documentation for the appropriate value for this field.
         * @param {().GoogleIamV1__TestIamPermissionsRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        testIamPermissions(params?: Params$Resource$V1$Testiampermissions, options?: MethodOptions): AxiosPromise<Schema$GoogleIamV1__TestIamPermissionsResponse>;
        testIamPermissions(params: Params$Resource$V1$Testiampermissions, options: MethodOptions | BodyResponseCallback<Schema$GoogleIamV1__TestIamPermissionsResponse>, callback: BodyResponseCallback<Schema$GoogleIamV1__TestIamPermissionsResponse>): void;
        testIamPermissions(params: Params$Resource$V1$Testiampermissions, callback: BodyResponseCallback<Schema$GoogleIamV1__TestIamPermissionsResponse>): void;
        testIamPermissions(callback: BodyResponseCallback<Schema$GoogleIamV1__TestIamPermissionsResponse>): void;
    }
    interface Params$Resource$V1$Getiampolicy {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * REQUIRED: The resource for which the policy is being requested. See the
         * operation documentation for the appropriate value for this field.
         */
        resource?: string;
    }
    interface Params$Resource$V1$Setiampolicy {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * REQUIRED: The resource for which the policy is being specified. See the
         * operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleIamV1__SetIamPolicyRequest;
    }
    interface Params$Resource$V1$Testiampermissions {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * REQUIRED: The resource for which the policy detail is being requested.
         * See the operation documentation for the appropriate value for this field.
         */
        resource?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GoogleIamV1__TestIamPermissionsRequest;
    }
}
