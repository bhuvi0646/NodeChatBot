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
export declare namespace storage_v1beta1 {
    interface Options extends GlobalOptions {
        version: 'v1beta1';
    }
    /**
     * Cloud Storage JSON API
     *
     * Lets you store and retrieve potentially-large, immutable data objects.
     *
     * @example
     * const {google} = require('googleapis');
     * const storage = google.storage('v1beta1');
     *
     * @namespace storage
     * @type {Function}
     * @version v1beta1
     * @variation v1beta1
     * @param {object=} options Options for Storage
     */
    class Storage {
        _options: GlobalOptions;
        google?: GoogleConfigurable;
        root: this;
        bucketAccessControls: Resource$Bucketaccesscontrols;
        buckets: Resource$Buckets;
        objectAccessControls: Resource$Objectaccesscontrols;
        objects: Resource$Objects;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
        getRoot(): this;
    }
    /**
     * A bucket.
     */
    interface Schema$Bucket {
        /**
         * Access controls on the bucket.
         */
        acl?: Schema$BucketAccessControl[];
        /**
         * Default access controls to apply to new objects when no ACL is provided.
         */
        defaultObjectAcl?: Schema$ObjectAccessControl[];
        /**
         * The name of the bucket.
         */
        id?: string;
        /**
         * The kind of item this is. For buckets, this is always storage#bucket.
         */
        kind?: string;
        /**
         * The location of the bucket. Object data for objects in the bucket resides
         * in physical storage in this location. Can be US or EU. Defaults to US.
         */
        location?: string;
        /**
         * The owner of the bucket. This will always be the project team&#39;s owner
         * group.
         */
        owner?: any;
        /**
         * The project the bucket belongs to.
         */
        projectId?: string;
        /**
         * The URI of this bucket.
         */
        selfLink?: string;
        /**
         * Creation time of the bucket in RFC 3339 format.
         */
        timeCreated?: string;
        /**
         * The bucket&#39;s website configuration.
         */
        website?: any;
    }
    /**
     * An access-control entry.
     */
    interface Schema$BucketAccessControl {
        /**
         * The name of the bucket.
         */
        bucket?: string;
        /**
         * The domain associated with the entity, if any.
         */
        domain?: string;
        /**
         * The email address associated with the entity, if any.
         */
        email?: string;
        /**
         * The entity holding the permission, in one of the following forms:  -
         * user-userId  - user-email  - group-groupId  - group-email  -
         * domain-domain  - allUsers  - allAuthenticatedUsers Examples:  - The user
         * liz@example.com would be user-liz@example.com.  - The group
         * example@googlegroups.com would be group-example@googlegroups.com.  - To
         * refer to all members of the Google Apps for Business domain example.com,
         * the entity would be domain-example.com.
         */
        entity?: string;
        /**
         * The ID for the entity, if any.
         */
        entityId?: string;
        /**
         * The ID of the access-control entry.
         */
        id?: string;
        /**
         * The kind of item this is. For bucket access control entries, this is
         * always storage#bucketAccessControl.
         */
        kind?: string;
        /**
         * The access permission for the entity. Can be READER, WRITER, or OWNER.
         */
        role?: string;
        /**
         * The link to this access-control entry.
         */
        selfLink?: string;
    }
    /**
     * An access-control list.
     */
    interface Schema$BucketAccessControls {
        /**
         * The list of items.
         */
        items?: Schema$BucketAccessControl[];
        /**
         * The kind of item this is. For lists of bucket access control entries,
         * this is always storage#bucketAccessControls.
         */
        kind?: string;
    }
    /**
     * A list of buckets.
     */
    interface Schema$Buckets {
        /**
         * The list of items.
         */
        items?: Schema$Bucket[];
        /**
         * The kind of item this is. For lists of buckets, this is always
         * storage#buckets.
         */
        kind?: string;
        /**
         * The continuation token, used to page through large result sets. Provide
         * this value in a subsequent request to return the next page of results.
         */
        nextPageToken?: string;
    }
    /**
     * An object.
     */
    interface Schema$Object {
        /**
         * Access controls on the object.
         */
        acl?: Schema$ObjectAccessControl[];
        /**
         * The bucket containing this object.
         */
        bucket?: string;
        /**
         * Cache-Control directive for the object data.
         */
        cacheControl?: string;
        /**
         * Content-Disposition of the object data.
         */
        contentDisposition?: string;
        /**
         * Content-Encoding of the object data.
         */
        contentEncoding?: string;
        /**
         * Content-Language of the object data.
         */
        contentLanguage?: string;
        /**
         * The ID of the object.
         */
        id?: string;
        /**
         * The kind of item this is. For objects, this is always storage#object.
         */
        kind?: string;
        /**
         * Object media data. Provided on your behalf when uploading raw media or
         * multipart/related with an auxiliary media part.
         */
        media?: any;
        /**
         * User-provided metadata, in key/value pairs.
         */
        metadata?: any;
        /**
         * The name of this object. Required if not specified by URL parameter.
         */
        name?: string;
        /**
         * The owner of the object. This will always be the uploader of the object.
         */
        owner?: any;
        /**
         * The link to this object.
         */
        selfLink?: string;
    }
    /**
     * An access-control entry.
     */
    interface Schema$ObjectAccessControl {
        /**
         * The name of the bucket.
         */
        bucket?: string;
        /**
         * The domain associated with the entity, if any.
         */
        domain?: string;
        /**
         * The email address associated with the entity, if any.
         */
        email?: string;
        /**
         * The entity holding the permission, in one of the following forms:  -
         * user-userId  - user-email  - group-groupId  - group-email  -
         * domain-domain  - allUsers  - allAuthenticatedUsers Examples:  - The user
         * liz@example.com would be user-liz@example.com.  - The group
         * example@googlegroups.com would be group-example@googlegroups.com.  - To
         * refer to all members of the Google Apps for Business domain example.com,
         * the entity would be domain-example.com.
         */
        entity?: string;
        /**
         * The ID for the entity, if any.
         */
        entityId?: string;
        /**
         * The ID of the access-control entry.
         */
        id?: string;
        /**
         * The kind of item this is. For object access control entries, this is
         * always storage#objectAccessControl.
         */
        kind?: string;
        /**
         * The name of the object.
         */
        object?: string;
        /**
         * The access permission for the entity. Can be READER or OWNER.
         */
        role?: string;
        /**
         * The link to this access-control entry.
         */
        selfLink?: string;
    }
    /**
     * An access-control list.
     */
    interface Schema$ObjectAccessControls {
        /**
         * The list of items.
         */
        items?: Schema$ObjectAccessControl[];
        /**
         * The kind of item this is. For lists of object access control entries,
         * this is always storage#objectAccessControls.
         */
        kind?: string;
    }
    /**
     * A list of objects.
     */
    interface Schema$Objects {
        /**
         * The list of items.
         */
        items?: Schema$Object[];
        /**
         * The kind of item this is. For lists of objects, this is always
         * storage#objects.
         */
        kind?: string;
        /**
         * The continuation token, used to page through large result sets. Provide
         * this value in a subsequent request to return the next page of results.
         */
        nextPageToken?: string;
        /**
         * The list of prefixes of objects matching-but-not-listed up to and
         * including the requested delimiter.
         */
        prefixes?: string[];
    }
    class Resource$Bucketaccesscontrols {
        root: Storage;
        constructor(root: Storage);
        getRoot(): Storage;
        /**
         * storage.bucketAccessControls.delete
         * @desc Deletes the ACL entry for the specified entity on the specified
         * bucket.
         * @alias storage.bucketAccessControls.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params?: Params$Resource$Bucketaccesscontrols$Delete, options?: MethodOptions): AxiosPromise<void>;
        delete(params: Params$Resource$Bucketaccesscontrols$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Bucketaccesscontrols$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * storage.bucketAccessControls.get
         * @desc Returns the ACL entry for the specified entity on the specified
         * bucket.
         * @alias storage.bucketAccessControls.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Bucketaccesscontrols$Get, options?: MethodOptions): AxiosPromise<Schema$BucketAccessControl>;
        get(params: Params$Resource$Bucketaccesscontrols$Get, options: MethodOptions | BodyResponseCallback<Schema$BucketAccessControl>, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        get(params: Params$Resource$Bucketaccesscontrols$Get, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        get(callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        /**
         * storage.bucketAccessControls.insert
         * @desc Creates a new ACL entry on the specified bucket.
         * @alias storage.bucketAccessControls.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {().BucketAccessControl} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params?: Params$Resource$Bucketaccesscontrols$Insert, options?: MethodOptions): AxiosPromise<Schema$BucketAccessControl>;
        insert(params: Params$Resource$Bucketaccesscontrols$Insert, options: MethodOptions | BodyResponseCallback<Schema$BucketAccessControl>, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        insert(params: Params$Resource$Bucketaccesscontrols$Insert, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        insert(callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        /**
         * storage.bucketAccessControls.list
         * @desc Retrieves ACL entries on the specified bucket.
         * @alias storage.bucketAccessControls.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Bucketaccesscontrols$List, options?: MethodOptions): AxiosPromise<Schema$BucketAccessControls>;
        list(params: Params$Resource$Bucketaccesscontrols$List, options: MethodOptions | BodyResponseCallback<Schema$BucketAccessControls>, callback: BodyResponseCallback<Schema$BucketAccessControls>): void;
        list(params: Params$Resource$Bucketaccesscontrols$List, callback: BodyResponseCallback<Schema$BucketAccessControls>): void;
        list(callback: BodyResponseCallback<Schema$BucketAccessControls>): void;
        /**
         * storage.bucketAccessControls.patch
         * @desc Updates an ACL entry on the specified bucket. This method supports
         * patch semantics.
         * @alias storage.bucketAccessControls.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {().BucketAccessControl} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params?: Params$Resource$Bucketaccesscontrols$Patch, options?: MethodOptions): AxiosPromise<Schema$BucketAccessControl>;
        patch(params: Params$Resource$Bucketaccesscontrols$Patch, options: MethodOptions | BodyResponseCallback<Schema$BucketAccessControl>, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        patch(params: Params$Resource$Bucketaccesscontrols$Patch, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        patch(callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        /**
         * storage.bucketAccessControls.update
         * @desc Updates an ACL entry on the specified bucket.
         * @alias storage.bucketAccessControls.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {().BucketAccessControl} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params?: Params$Resource$Bucketaccesscontrols$Update, options?: MethodOptions): AxiosPromise<Schema$BucketAccessControl>;
        update(params: Params$Resource$Bucketaccesscontrols$Update, options: MethodOptions | BodyResponseCallback<Schema$BucketAccessControl>, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        update(params: Params$Resource$Bucketaccesscontrols$Update, callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
        update(callback: BodyResponseCallback<Schema$BucketAccessControl>): void;
    }
    interface Params$Resource$Bucketaccesscontrols$Delete {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress,
         * group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
    }
    interface Params$Resource$Bucketaccesscontrols$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress,
         * group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
    }
    interface Params$Resource$Bucketaccesscontrols$Insert {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$BucketAccessControl;
    }
    interface Params$Resource$Bucketaccesscontrols$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
    }
    interface Params$Resource$Bucketaccesscontrols$Patch {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress,
         * group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$BucketAccessControl;
    }
    interface Params$Resource$Bucketaccesscontrols$Update {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress,
         * group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$BucketAccessControl;
    }
    class Resource$Buckets {
        root: Storage;
        constructor(root: Storage);
        getRoot(): Storage;
        /**
         * storage.buckets.delete
         * @desc Deletes an empty bucket.
         * @alias storage.buckets.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params?: Params$Resource$Buckets$Delete, options?: MethodOptions): AxiosPromise<void>;
        delete(params: Params$Resource$Buckets$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Buckets$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * storage.buckets.get
         * @desc Returns metadata for the specified bucket.
         * @alias storage.buckets.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.projection Set of properties to return. Defaults to no_acl.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Buckets$Get, options?: MethodOptions): AxiosPromise<Schema$Bucket>;
        get(params: Params$Resource$Buckets$Get, options: MethodOptions | BodyResponseCallback<Schema$Bucket>, callback: BodyResponseCallback<Schema$Bucket>): void;
        get(params: Params$Resource$Buckets$Get, callback: BodyResponseCallback<Schema$Bucket>): void;
        get(callback: BodyResponseCallback<Schema$Bucket>): void;
        /**
         * storage.buckets.insert
         * @desc Creates a new bucket.
         * @alias storage.buckets.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.projection Set of properties to return. Defaults to no_acl, unless the bucket resource specifies acl or defaultObjectAcl properties, when it defaults to full.
         * @param {().Bucket} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params?: Params$Resource$Buckets$Insert, options?: MethodOptions): AxiosPromise<Schema$Bucket>;
        insert(params: Params$Resource$Buckets$Insert, options: MethodOptions | BodyResponseCallback<Schema$Bucket>, callback: BodyResponseCallback<Schema$Bucket>): void;
        insert(params: Params$Resource$Buckets$Insert, callback: BodyResponseCallback<Schema$Bucket>): void;
        insert(callback: BodyResponseCallback<Schema$Bucket>): void;
        /**
         * storage.buckets.list
         * @desc Retrieves a list of buckets for a given project.
         * @alias storage.buckets.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {integer=} params.max-results Maximum number of buckets to return.
         * @param {string=} params.pageToken A previously-returned page token representing part of the larger set of results to view.
         * @param {string} params.projectId A valid API project identifier.
         * @param {string=} params.projection Set of properties to return. Defaults to no_acl.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Buckets$List, options?: MethodOptions): AxiosPromise<Schema$Buckets>;
        list(params: Params$Resource$Buckets$List, options: MethodOptions | BodyResponseCallback<Schema$Buckets>, callback: BodyResponseCallback<Schema$Buckets>): void;
        list(params: Params$Resource$Buckets$List, callback: BodyResponseCallback<Schema$Buckets>): void;
        list(callback: BodyResponseCallback<Schema$Buckets>): void;
        /**
         * storage.buckets.patch
         * @desc Updates a bucket. This method supports patch semantics.
         * @alias storage.buckets.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.projection Set of properties to return. Defaults to full.
         * @param {().Bucket} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params?: Params$Resource$Buckets$Patch, options?: MethodOptions): AxiosPromise<Schema$Bucket>;
        patch(params: Params$Resource$Buckets$Patch, options: MethodOptions | BodyResponseCallback<Schema$Bucket>, callback: BodyResponseCallback<Schema$Bucket>): void;
        patch(params: Params$Resource$Buckets$Patch, callback: BodyResponseCallback<Schema$Bucket>): void;
        patch(callback: BodyResponseCallback<Schema$Bucket>): void;
        /**
         * storage.buckets.update
         * @desc Updates a bucket.
         * @alias storage.buckets.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.projection Set of properties to return. Defaults to full.
         * @param {().Bucket} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params?: Params$Resource$Buckets$Update, options?: MethodOptions): AxiosPromise<Schema$Bucket>;
        update(params: Params$Resource$Buckets$Update, options: MethodOptions | BodyResponseCallback<Schema$Bucket>, callback: BodyResponseCallback<Schema$Bucket>): void;
        update(params: Params$Resource$Buckets$Update, callback: BodyResponseCallback<Schema$Bucket>): void;
        update(callback: BodyResponseCallback<Schema$Bucket>): void;
    }
    interface Params$Resource$Buckets$Delete {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
    }
    interface Params$Resource$Buckets$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * Set of properties to return. Defaults to no_acl.
         */
        projection?: string;
    }
    interface Params$Resource$Buckets$Insert {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Set of properties to return. Defaults to no_acl, unless the bucket
         * resource specifies acl or defaultObjectAcl properties, when it defaults
         * to full.
         */
        projection?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Bucket;
    }
    interface Params$Resource$Buckets$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Maximum number of buckets to return.
         */
        'max-results'?: number;
        /**
         * A previously-returned page token representing part of the larger set of
         * results to view.
         */
        pageToken?: string;
        /**
         * A valid API project identifier.
         */
        projectId?: string;
        /**
         * Set of properties to return. Defaults to no_acl.
         */
        projection?: string;
    }
    interface Params$Resource$Buckets$Patch {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * Set of properties to return. Defaults to full.
         */
        projection?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Bucket;
    }
    interface Params$Resource$Buckets$Update {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * Set of properties to return. Defaults to full.
         */
        projection?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Bucket;
    }
    class Resource$Objectaccesscontrols {
        root: Storage;
        constructor(root: Storage);
        getRoot(): Storage;
        /**
         * storage.objectAccessControls.delete
         * @desc Deletes the ACL entry for the specified entity on the specified
         * object.
         * @alias storage.objectAccessControls.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string} params.object Name of the object.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params?: Params$Resource$Objectaccesscontrols$Delete, options?: MethodOptions): AxiosPromise<void>;
        delete(params: Params$Resource$Objectaccesscontrols$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Objectaccesscontrols$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * storage.objectAccessControls.get
         * @desc Returns the ACL entry for the specified entity on the specified
         * object.
         * @alias storage.objectAccessControls.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string} params.object Name of the object.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Objectaccesscontrols$Get, options?: MethodOptions): AxiosPromise<Schema$ObjectAccessControl>;
        get(params: Params$Resource$Objectaccesscontrols$Get, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        get(params: Params$Resource$Objectaccesscontrols$Get, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        get(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        /**
         * storage.objectAccessControls.insert
         * @desc Creates a new ACL entry on the specified object.
         * @alias storage.objectAccessControls.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.object Name of the object.
         * @param {().ObjectAccessControl} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params?: Params$Resource$Objectaccesscontrols$Insert, options?: MethodOptions): AxiosPromise<Schema$ObjectAccessControl>;
        insert(params: Params$Resource$Objectaccesscontrols$Insert, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        insert(params: Params$Resource$Objectaccesscontrols$Insert, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        insert(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        /**
         * storage.objectAccessControls.list
         * @desc Retrieves ACL entries on the specified object.
         * @alias storage.objectAccessControls.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.object Name of the object.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Objectaccesscontrols$List, options?: MethodOptions): AxiosPromise<Schema$ObjectAccessControls>;
        list(params: Params$Resource$Objectaccesscontrols$List, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControls>, callback: BodyResponseCallback<Schema$ObjectAccessControls>): void;
        list(params: Params$Resource$Objectaccesscontrols$List, callback: BodyResponseCallback<Schema$ObjectAccessControls>): void;
        list(callback: BodyResponseCallback<Schema$ObjectAccessControls>): void;
        /**
         * storage.objectAccessControls.patch
         * @desc Updates an ACL entry on the specified object. This method supports
         * patch semantics.
         * @alias storage.objectAccessControls.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string} params.object Name of the object.
         * @param {().ObjectAccessControl} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params?: Params$Resource$Objectaccesscontrols$Patch, options?: MethodOptions): AxiosPromise<Schema$ObjectAccessControl>;
        patch(params: Params$Resource$Objectaccesscontrols$Patch, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        patch(params: Params$Resource$Objectaccesscontrols$Patch, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        patch(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        /**
         * storage.objectAccessControls.update
         * @desc Updates an ACL entry on the specified object.
         * @alias storage.objectAccessControls.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string} params.object Name of the object.
         * @param {().ObjectAccessControl} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params?: Params$Resource$Objectaccesscontrols$Update, options?: MethodOptions): AxiosPromise<Schema$ObjectAccessControl>;
        update(params: Params$Resource$Objectaccesscontrols$Update, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        update(params: Params$Resource$Objectaccesscontrols$Update, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        update(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
    }
    interface Params$Resource$Objectaccesscontrols$Delete {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress,
         * group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * Name of the object.
         */
        object?: string;
    }
    interface Params$Resource$Objectaccesscontrols$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress,
         * group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * Name of the object.
         */
        object?: string;
    }
    interface Params$Resource$Objectaccesscontrols$Insert {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * Name of the object.
         */
        object?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ObjectAccessControl;
    }
    interface Params$Resource$Objectaccesscontrols$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * Name of the object.
         */
        object?: string;
    }
    interface Params$Resource$Objectaccesscontrols$Patch {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress,
         * group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * Name of the object.
         */
        object?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ObjectAccessControl;
    }
    interface Params$Resource$Objectaccesscontrols$Update {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * The entity holding the permission. Can be user-userId, user-emailAddress,
         * group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         */
        entity?: string;
        /**
         * Name of the object.
         */
        object?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ObjectAccessControl;
    }
    class Resource$Objects {
        root: Storage;
        constructor(root: Storage);
        getRoot(): Storage;
        /**
         * storage.objects.delete
         * @desc Deletes data blobs and associated metadata.
         * @alias storage.objects.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which the object resides.
         * @param {string} params.object Name of the object.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params?: Params$Resource$Objects$Delete, options?: MethodOptions): AxiosPromise<void>;
        delete(params: Params$Resource$Objects$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Objects$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * storage.objects.get
         * @desc Retrieves objects or their associated metadata.
         * @alias storage.objects.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which the object resides.
         * @param {string} params.object Name of the object.
         * @param {string=} params.projection Set of properties to return. Defaults to no_acl.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Objects$Get, options?: MethodOptions): AxiosPromise<Schema$Object>;
        get(params: Params$Resource$Objects$Get, options: MethodOptions | BodyResponseCallback<Schema$Object>, callback: BodyResponseCallback<Schema$Object>): void;
        get(params: Params$Resource$Objects$Get, callback: BodyResponseCallback<Schema$Object>): void;
        get(callback: BodyResponseCallback<Schema$Object>): void;
        /**
         * storage.objects.insert
         * @desc Stores new data blobs and associated metadata.
         * @alias storage.objects.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.
         * @param {string=} params.name Name of the object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any.
         * @param {string=} params.projection Set of properties to return. Defaults to no_acl, unless the object resource specifies the acl property, when it defaults to full.
         * @param  {object} params.resource Media resource metadata
         * @param {object} params.media Media object
         * @param {string} params.media.mimeType Media mime-type
         * @param {string|object} params.media.body Media body contents
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params?: Params$Resource$Objects$Insert, options?: MethodOptions): AxiosPromise<Schema$Object>;
        insert(params: Params$Resource$Objects$Insert, options: MethodOptions | BodyResponseCallback<Schema$Object>, callback: BodyResponseCallback<Schema$Object>): void;
        insert(params: Params$Resource$Objects$Insert, callback: BodyResponseCallback<Schema$Object>): void;
        insert(callback: BodyResponseCallback<Schema$Object>): void;
        /**
         * storage.objects.list
         * @desc Retrieves a list of objects matching the criteria.
         * @alias storage.objects.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which to look for objects.
         * @param {string=} params.delimiter Returns results in a directory-like mode. items will contain only objects whose names, aside from the prefix, do not contain delimiter. Objects whose names, aside from the prefix, contain delimiter will have their name, truncated after the delimiter, returned in prefixes. Duplicate prefixes are omitted.
         * @param {integer=} params.max-results Maximum number of items plus prefixes to return. As duplicate prefixes are omitted, fewer total results may be returned than requested.
         * @param {string=} params.pageToken A previously-returned page token representing part of the larger set of results to view.
         * @param {string=} params.prefix Filter results to objects whose names begin with this prefix.
         * @param {string=} params.projection Set of properties to return. Defaults to no_acl.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Objects$List, options?: MethodOptions): AxiosPromise<Schema$Objects>;
        list(params: Params$Resource$Objects$List, options: MethodOptions | BodyResponseCallback<Schema$Objects>, callback: BodyResponseCallback<Schema$Objects>): void;
        list(params: Params$Resource$Objects$List, callback: BodyResponseCallback<Schema$Objects>): void;
        list(callback: BodyResponseCallback<Schema$Objects>): void;
        /**
         * storage.objects.patch
         * @desc Updates a data blob's associated metadata. This method supports
         * patch semantics.
         * @alias storage.objects.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which the object resides.
         * @param {string} params.object Name of the object.
         * @param {string=} params.projection Set of properties to return. Defaults to full.
         * @param {().Object} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params?: Params$Resource$Objects$Patch, options?: MethodOptions): AxiosPromise<Schema$Object>;
        patch(params: Params$Resource$Objects$Patch, options: MethodOptions | BodyResponseCallback<Schema$Object>, callback: BodyResponseCallback<Schema$Object>): void;
        patch(params: Params$Resource$Objects$Patch, callback: BodyResponseCallback<Schema$Object>): void;
        patch(callback: BodyResponseCallback<Schema$Object>): void;
        /**
         * storage.objects.update
         * @desc Updates a data blob's associated metadata.
         * @alias storage.objects.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which the object resides.
         * @param {string} params.object Name of the object.
         * @param {string=} params.projection Set of properties to return. Defaults to full.
         * @param {().Object} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params?: Params$Resource$Objects$Update, options?: MethodOptions): AxiosPromise<Schema$Object>;
        update(params: Params$Resource$Objects$Update, options: MethodOptions | BodyResponseCallback<Schema$Object>, callback: BodyResponseCallback<Schema$Object>): void;
        update(params: Params$Resource$Objects$Update, callback: BodyResponseCallback<Schema$Object>): void;
        update(callback: BodyResponseCallback<Schema$Object>): void;
    }
    interface Params$Resource$Objects$Delete {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of the bucket in which the object resides.
         */
        bucket?: string;
        /**
         * Name of the object.
         */
        object?: string;
    }
    interface Params$Resource$Objects$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of the bucket in which the object resides.
         */
        bucket?: string;
        /**
         * Name of the object.
         */
        object?: string;
        /**
         * Set of properties to return. Defaults to no_acl.
         */
        projection?: string;
    }
    interface Params$Resource$Objects$Insert {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of the bucket in which to store the new object. Overrides the
         * provided object metadata's bucket value, if any.
         */
        bucket?: string;
        /**
         * Name of the object. Required when the object metadata is not otherwise
         * provided. Overrides the object metadata's name value, if any.
         */
        name?: string;
        /**
         * Set of properties to return. Defaults to no_acl, unless the object
         * resource specifies the acl property, when it defaults to full.
         */
        projection?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Object;
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
    interface Params$Resource$Objects$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of the bucket in which to look for objects.
         */
        bucket?: string;
        /**
         * Returns results in a directory-like mode. items will contain only objects
         * whose names, aside from the prefix, do not contain delimiter. Objects
         * whose names, aside from the prefix, contain delimiter will have their
         * name, truncated after the delimiter, returned in prefixes. Duplicate
         * prefixes are omitted.
         */
        delimiter?: string;
        /**
         * Maximum number of items plus prefixes to return. As duplicate prefixes
         * are omitted, fewer total results may be returned than requested.
         */
        'max-results'?: number;
        /**
         * A previously-returned page token representing part of the larger set of
         * results to view.
         */
        pageToken?: string;
        /**
         * Filter results to objects whose names begin with this prefix.
         */
        prefix?: string;
        /**
         * Set of properties to return. Defaults to no_acl.
         */
        projection?: string;
    }
    interface Params$Resource$Objects$Patch {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of the bucket in which the object resides.
         */
        bucket?: string;
        /**
         * Name of the object.
         */
        object?: string;
        /**
         * Set of properties to return. Defaults to full.
         */
        projection?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Object;
    }
    interface Params$Resource$Objects$Update {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of the bucket in which the object resides.
         */
        bucket?: string;
        /**
         * Name of the object.
         */
        object?: string;
        /**
         * Set of properties to return. Defaults to full.
         */
        projection?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Object;
    }
}
