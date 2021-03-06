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
export declare namespace storage_v1beta2 {
    interface Options extends GlobalOptions {
        version: 'v1beta2';
    }
    /**
     * Cloud Storage JSON API
     *
     * Lets you store and retrieve potentially-large, immutable data objects.
     *
     * @example
     * const {google} = require('googleapis');
     * const storage = google.storage('v1beta2');
     *
     * @namespace storage
     * @type {Function}
     * @version v1beta2
     * @variation v1beta2
     * @param {object=} options Options for Storage
     */
    class Storage {
        _options: GlobalOptions;
        google?: GoogleConfigurable;
        root: this;
        bucketAccessControls: Resource$Bucketaccesscontrols;
        buckets: Resource$Buckets;
        channels: Resource$Channels;
        defaultObjectAccessControls: Resource$Defaultobjectaccesscontrols;
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
         * The bucket&#39;s Cross-Origin Resource Sharing (CORS) configuration.
         */
        cors?: any[];
        /**
         * Default access controls to apply to new objects when no ACL is provided.
         */
        defaultObjectAcl?: Schema$ObjectAccessControl[];
        /**
         * HTTP 1.1 Entity tag for the bucket.
         */
        etag?: string;
        /**
         * The ID of the bucket.
         */
        id?: string;
        /**
         * The kind of item this is. For buckets, this is always storage#bucket.
         */
        kind?: string;
        /**
         * The bucket&#39;s lifecycle configuration. See object lifecycle management
         * for more information.
         */
        lifecycle?: any;
        /**
         * The location of the bucket. Object data for objects in the bucket resides
         * in physical storage within this region. Typical values are US and EU.
         * Defaults to US. See the developer&#39;s guide for the authoritative list.
         */
        location?: string;
        /**
         * The bucket&#39;s logging configuration, which defines the destination
         * bucket and optional name prefix for the current bucket&#39;s logs.
         */
        logging?: any;
        /**
         * The metadata generation of this bucket.
         */
        metageneration?: string;
        /**
         * The name of the bucket.
         */
        name?: string;
        /**
         * The owner of the bucket. This is always the project team&#39;s owner
         * group.
         */
        owner?: any;
        /**
         * The URI of this bucket.
         */
        selfLink?: string;
        /**
         * The bucket&#39;s storage class. This defines how objects in the bucket
         * are stored and determines the SLA and the cost of storage. Typical values
         * are STANDARD and DURABLE_REDUCED_AVAILABILITY. Defaults to STANDARD. See
         * the developer&#39;s guide for the authoritative list.
         */
        storageClass?: string;
        /**
         * Creation time of the bucket in RFC 3339 format.
         */
        timeCreated?: string;
        /**
         * The bucket&#39;s versioning configuration.
         */
        versioning?: any;
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
         * HTTP 1.1 Entity tag for the access-control entry.
         */
        etag?: string;
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
     * An notification channel used to watch for resource changes.
     */
    interface Schema$Channel {
        /**
         * The address where notifications are delivered for this channel.
         */
        address?: string;
        /**
         * Date and time of notification channel expiration, expressed as a Unix
         * timestamp, in milliseconds. Optional.
         */
        expiration?: string;
        /**
         * A UUID or similar unique string that identifies this channel.
         */
        id?: string;
        /**
         * Identifies this as a notification channel used to watch for changes to a
         * resource. Value: the fixed string &quot;api#channel&quot;.
         */
        kind?: string;
        /**
         * Additional parameters controlling delivery channel behavior. Optional.
         */
        params?: any;
        /**
         * A Boolean value to indicate whether payload is wanted. Optional.
         */
        payload?: boolean;
        /**
         * An opaque ID that identifies the resource being watched on this channel.
         * Stable across different API versions.
         */
        resourceId?: string;
        /**
         * A version-specific identifier for the watched resource.
         */
        resourceUri?: string;
        /**
         * An arbitrary string delivered to the target address with each
         * notification delivered over this channel. Optional.
         */
        token?: string;
        /**
         * The type of delivery mechanism used for this channel.
         */
        type?: string;
    }
    /**
     * A Compose request.
     */
    interface Schema$ComposeRequest {
        /**
         * Properties of the resulting object
         */
        destination?: Schema$Object;
        /**
         * The kind of item this is.
         */
        kind?: string;
        /**
         * The list of source objects that will be concatenated into a single
         * object.
         */
        sourceObjects?: any[];
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
         * Number of underlying components that make up this object. Components are
         * accumulated by compose operations and are limited to a count of 32.
         */
        componentCount?: number;
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
         * Content-Type of the object data.
         */
        contentType?: string;
        /**
         * CRC32c checksum, as described in RFC 4960, Appendix B; encoded using
         * base64.
         */
        crc32c?: string;
        /**
         * HTTP 1.1 Entity tag for the object.
         */
        etag?: string;
        /**
         * The content generation of this object. Used for object versioning.
         */
        generation?: string;
        /**
         * The ID of the object.
         */
        id?: string;
        /**
         * The kind of item this is. For objects, this is always storage#object.
         */
        kind?: string;
        /**
         * MD5 hash of the data; encoded using base64.
         */
        md5Hash?: string;
        /**
         * Media download link.
         */
        mediaLink?: string;
        /**
         * User-provided metadata, in key/value pairs.
         */
        metadata?: any;
        /**
         * The generation of the metadata for this object at this generation. Used
         * for metadata versioning. Has no meaning outside of the context of this
         * generation.
         */
        metageneration?: string;
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
        /**
         * Content-Length of the data in bytes.
         */
        size?: string;
        /**
         * Storage class of the object.
         */
        storageClass?: string;
        /**
         * Deletion time of the object in RFC 3339 format. Will be returned if and
         * only if this version of the object has been deleted.
         */
        timeDeleted?: string;
        /**
         * Modification time of the object metadata in RFC 3339 format.
         */
        updated?: string;
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
         * HTTP 1.1 Entity tag for the access-control entry.
         */
        etag?: string;
        /**
         * The content generation of the object.
         */
        generation?: string;
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
        items?: any[];
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
         * @desc Permanently deletes the ACL entry for the specified entity on the
         * specified bucket.
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
         * @desc Permanently deletes an empty bucket.
         * @alias storage.buckets.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.ifMetagenerationMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
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
         * @param {string=} params.ifMetagenerationMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl.
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
         * @param {string} params.project A valid API project identifier.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl, unless the bucket resource specifies acl or defaultObjectAcl properties, when it defaults to full.
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
         * @param {integer=} params.maxResults Maximum number of buckets to return.
         * @param {string=} params.pageToken A previously-returned page token representing part of the larger set of results to view.
         * @param {string} params.project A valid API project identifier.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl.
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
         * @param {string=} params.ifMetagenerationMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
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
         * @param {string=} params.ifMetagenerationMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the return of the bucket metadata conditional on whether the bucket's current metageneration does not match the given value.
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
        /**
         * Makes the return of the bucket metadata conditional on whether the
         * bucket's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the return of the bucket metadata conditional on whether the
         * bucket's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
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
         * Makes the return of the bucket metadata conditional on whether the
         * bucket's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the return of the bucket metadata conditional on whether the
         * bucket's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Set of properties to return. Defaults to noAcl.
         */
        projection?: string;
    }
    interface Params$Resource$Buckets$Insert {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * A valid API project identifier.
         */
        project?: string;
        /**
         * Set of properties to return. Defaults to noAcl, unless the bucket
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
        maxResults?: number;
        /**
         * A previously-returned page token representing part of the larger set of
         * results to view.
         */
        pageToken?: string;
        /**
         * A valid API project identifier.
         */
        project?: string;
        /**
         * Set of properties to return. Defaults to noAcl.
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
         * Makes the return of the bucket metadata conditional on whether the
         * bucket's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the return of the bucket metadata conditional on whether the
         * bucket's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
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
         * Makes the return of the bucket metadata conditional on whether the
         * bucket's current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the return of the bucket metadata conditional on whether the
         * bucket's current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Set of properties to return. Defaults to full.
         */
        projection?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Bucket;
    }
    class Resource$Channels {
        root: Storage;
        constructor(root: Storage);
        getRoot(): Storage;
        /**
         * storage.channels.stop
         * @desc Stop watching resources through this channel
         * @alias storage.channels.stop
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().Channel} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        stop(params?: Params$Resource$Channels$Stop, options?: MethodOptions): AxiosPromise<void>;
        stop(params: Params$Resource$Channels$Stop, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        stop(params: Params$Resource$Channels$Stop, callback: BodyResponseCallback<void>): void;
        stop(callback: BodyResponseCallback<void>): void;
    }
    interface Params$Resource$Channels$Stop {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Channel;
    }
    class Resource$Defaultobjectaccesscontrols {
        root: Storage;
        constructor(root: Storage);
        getRoot(): Storage;
        /**
         * storage.defaultObjectAccessControls.delete
         * @desc Permanently deletes the default object ACL entry for the specified
         * entity on the specified bucket.
         * @alias storage.defaultObjectAccessControls.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params?: Params$Resource$Defaultobjectaccesscontrols$Delete, options?: MethodOptions): AxiosPromise<void>;
        delete(params: Params$Resource$Defaultobjectaccesscontrols$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Defaultobjectaccesscontrols$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * storage.defaultObjectAccessControls.get
         * @desc Returns the default object ACL entry for the specified entity on
         * the specified bucket.
         * @alias storage.defaultObjectAccessControls.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Defaultobjectaccesscontrols$Get, options?: MethodOptions): AxiosPromise<Schema$ObjectAccessControl>;
        get(params: Params$Resource$Defaultobjectaccesscontrols$Get, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        get(params: Params$Resource$Defaultobjectaccesscontrols$Get, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        get(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        /**
         * storage.defaultObjectAccessControls.insert
         * @desc Creates a new default object ACL entry on the specified bucket.
         * @alias storage.defaultObjectAccessControls.insert
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {().ObjectAccessControl} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        insert(params?: Params$Resource$Defaultobjectaccesscontrols$Insert, options?: MethodOptions): AxiosPromise<Schema$ObjectAccessControl>;
        insert(params: Params$Resource$Defaultobjectaccesscontrols$Insert, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        insert(params: Params$Resource$Defaultobjectaccesscontrols$Insert, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        insert(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        /**
         * storage.defaultObjectAccessControls.list
         * @desc Retrieves default object ACL entries on the specified bucket.
         * @alias storage.defaultObjectAccessControls.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string=} params.ifMetagenerationMatch If present, only return default ACL listing if the bucket's current metageneration matches this value.
         * @param {string=} params.ifMetagenerationNotMatch If present, only return default ACL listing if the bucket's current metageneration does not match the given value.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Defaultobjectaccesscontrols$List, options?: MethodOptions): AxiosPromise<Schema$ObjectAccessControls>;
        list(params: Params$Resource$Defaultobjectaccesscontrols$List, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControls>, callback: BodyResponseCallback<Schema$ObjectAccessControls>): void;
        list(params: Params$Resource$Defaultobjectaccesscontrols$List, callback: BodyResponseCallback<Schema$ObjectAccessControls>): void;
        list(callback: BodyResponseCallback<Schema$ObjectAccessControls>): void;
        /**
         * storage.defaultObjectAccessControls.patch
         * @desc Updates a default object ACL entry on the specified bucket. This
         * method supports patch semantics.
         * @alias storage.defaultObjectAccessControls.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {().ObjectAccessControl} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params?: Params$Resource$Defaultobjectaccesscontrols$Patch, options?: MethodOptions): AxiosPromise<Schema$ObjectAccessControl>;
        patch(params: Params$Resource$Defaultobjectaccesscontrols$Patch, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        patch(params: Params$Resource$Defaultobjectaccesscontrols$Patch, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        patch(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        /**
         * storage.defaultObjectAccessControls.update
         * @desc Updates a default object ACL entry on the specified bucket.
         * @alias storage.defaultObjectAccessControls.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {().ObjectAccessControl} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params?: Params$Resource$Defaultobjectaccesscontrols$Update, options?: MethodOptions): AxiosPromise<Schema$ObjectAccessControl>;
        update(params: Params$Resource$Defaultobjectaccesscontrols$Update, options: MethodOptions | BodyResponseCallback<Schema$ObjectAccessControl>, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        update(params: Params$Resource$Defaultobjectaccesscontrols$Update, callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
        update(callback: BodyResponseCallback<Schema$ObjectAccessControl>): void;
    }
    interface Params$Resource$Defaultobjectaccesscontrols$Delete {
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
    interface Params$Resource$Defaultobjectaccesscontrols$Get {
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
    interface Params$Resource$Defaultobjectaccesscontrols$Insert {
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
        requestBody?: Schema$ObjectAccessControl;
    }
    interface Params$Resource$Defaultobjectaccesscontrols$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of a bucket.
         */
        bucket?: string;
        /**
         * If present, only return default ACL listing if the bucket's current
         * metageneration matches this value.
         */
        ifMetagenerationMatch?: string;
        /**
         * If present, only return default ACL listing if the bucket's current
         * metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
    }
    interface Params$Resource$Defaultobjectaccesscontrols$Patch {
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
        requestBody?: Schema$ObjectAccessControl;
    }
    interface Params$Resource$Defaultobjectaccesscontrols$Update {
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
        requestBody?: Schema$ObjectAccessControl;
    }
    class Resource$Objectaccesscontrols {
        root: Storage;
        constructor(root: Storage);
        getRoot(): Storage;
        /**
         * storage.objectAccessControls.delete
         * @desc Permanently deletes the ACL entry for the specified entity on the
         * specified object.
         * @alias storage.objectAccessControls.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of a bucket.
         * @param {string} params.entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
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
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
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
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
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
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
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
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
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
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
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
         * If present, selects a specific revision of this object (as opposed to the
         * latest version, the default).
         */
        generation?: string;
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
         * If present, selects a specific revision of this object (as opposed to the
         * latest version, the default).
         */
        generation?: string;
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
         * If present, selects a specific revision of this object (as opposed to the
         * latest version, the default).
         */
        generation?: string;
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
         * If present, selects a specific revision of this object (as opposed to the
         * latest version, the default).
         */
        generation?: string;
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
         * If present, selects a specific revision of this object (as opposed to the
         * latest version, the default).
         */
        generation?: string;
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
         * If present, selects a specific revision of this object (as opposed to the
         * latest version, the default).
         */
        generation?: string;
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
         * storage.objects.compose
         * @desc Concatenates a list of existing objects into a new object in the
         * same bucket.
         * @alias storage.objects.compose
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.destinationBucket Name of the bucket containing the source objects. The destination object is stored in this bucket.
         * @param {string} params.destinationObject Name of the new object.
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's current generation matches the given value.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the object's current metageneration matches the given value.
         * @param {().ComposeRequest} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        compose(params?: Params$Resource$Objects$Compose, options?: MethodOptions): AxiosPromise<Schema$Object>;
        compose(params: Params$Resource$Objects$Compose, options: MethodOptions | BodyResponseCallback<Schema$Object>, callback: BodyResponseCallback<Schema$Object>): void;
        compose(params: Params$Resource$Objects$Compose, callback: BodyResponseCallback<Schema$Object>): void;
        compose(callback: BodyResponseCallback<Schema$Object>): void;
        /**
         * storage.objects.copy
         * @desc Copies an object to a destination in the same location. Optionally
         * overrides metadata.
         * @alias storage.objects.copy
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.destinationBucket Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.
         * @param {string} params.destinationObject Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any.
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the destination object's current generation matches the given value.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the destination object's current generation does not match the given value.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the destination object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the destination object's current metageneration does not match the given value.
         * @param {string=} params.ifSourceGenerationMatch Makes the operation conditional on whether the source object's generation matches the given value.
         * @param {string=} params.ifSourceGenerationNotMatch Makes the operation conditional on whether the source object's generation does not match the given value.
         * @param {string=} params.ifSourceMetagenerationMatch Makes the operation conditional on whether the source object's current metageneration matches the given value.
         * @param {string=} params.ifSourceMetagenerationNotMatch Makes the operation conditional on whether the source object's current metageneration does not match the given value.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full.
         * @param {string} params.sourceBucket Name of the bucket in which to find the source object.
         * @param {string=} params.sourceGeneration If present, selects a specific revision of the source object (as opposed to the latest version, the default).
         * @param {string} params.sourceObject Name of the source object.
         * @param {().Object} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        copy(params?: Params$Resource$Objects$Copy, options?: MethodOptions): AxiosPromise<Schema$Object>;
        copy(params: Params$Resource$Objects$Copy, options: MethodOptions | BodyResponseCallback<Schema$Object>, callback: BodyResponseCallback<Schema$Object>): void;
        copy(params: Params$Resource$Objects$Copy, callback: BodyResponseCallback<Schema$Object>): void;
        copy(callback: BodyResponseCallback<Schema$Object>): void;
        /**
         * storage.objects.delete
         * @desc Deletes data blobs and associated metadata. Deletions are permanent
         * if versioning is not enabled for the bucket, or if the generation
         * parameter is used.
         * @alias storage.objects.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which the object resides.
         * @param {string=} params.generation If present, permanently deletes a specific revision of this object (as opposed to the latest version, the default).
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's current generation matches the given value.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the object's current generation does not match the given value.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the object's current metageneration does not match the given value.
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
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's generation matches the given value.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the object's generation does not match the given value.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the object's current metageneration does not match the given value.
         * @param {string} params.object Name of the object.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl.
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
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's current generation matches the given value.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the object's current generation does not match the given value.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the object's current metageneration does not match the given value.
         * @param {string=} params.name Name of the object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl, unless the object resource specifies the acl property, when it defaults to full.
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
         * @param {integer=} params.maxResults Maximum number of items plus prefixes to return. As duplicate prefixes are omitted, fewer total results may be returned than requested.
         * @param {string=} params.pageToken A previously-returned page token representing part of the larger set of results to view.
         * @param {string=} params.prefix Filter results to objects whose names begin with this prefix.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl.
         * @param {boolean=} params.versions If true, lists all versions of a file as distinct results.
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
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's current generation matches the given value.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the object's current generation does not match the given value.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the object's current metageneration does not match the given value.
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
         * @param {string=} params.generation If present, selects a specific revision of this object (as opposed to the latest version, the default).
         * @param {string=} params.ifGenerationMatch Makes the operation conditional on whether the object's current generation matches the given value.
         * @param {string=} params.ifGenerationNotMatch Makes the operation conditional on whether the object's current generation does not match the given value.
         * @param {string=} params.ifMetagenerationMatch Makes the operation conditional on whether the object's current metageneration matches the given value.
         * @param {string=} params.ifMetagenerationNotMatch Makes the operation conditional on whether the object's current metageneration does not match the given value.
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
        /**
         * storage.objects.watchAll
         * @desc Watch for changes on all objects in a bucket.
         * @alias storage.objects.watchAll
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.bucket Name of the bucket in which to look for objects.
         * @param {string=} params.delimiter Returns results in a directory-like mode. items will contain only objects whose names, aside from the prefix, do not contain delimiter. Objects whose names, aside from the prefix, contain delimiter will have their name, truncated after the delimiter, returned in prefixes. Duplicate prefixes are omitted.
         * @param {integer=} params.maxResults Maximum number of items plus prefixes to return. As duplicate prefixes are omitted, fewer total results may be returned than requested.
         * @param {string=} params.pageToken A previously-returned page token representing part of the larger set of results to view.
         * @param {string=} params.prefix Filter results to objects whose names begin with this prefix.
         * @param {string=} params.projection Set of properties to return. Defaults to noAcl.
         * @param {boolean=} params.versions If true, lists all versions of a file as distinct results.
         * @param {().Channel} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        watchAll(params?: Params$Resource$Objects$Watchall, options?: MethodOptions): AxiosPromise<Schema$Channel>;
        watchAll(params: Params$Resource$Objects$Watchall, options: MethodOptions | BodyResponseCallback<Schema$Channel>, callback: BodyResponseCallback<Schema$Channel>): void;
        watchAll(params: Params$Resource$Objects$Watchall, callback: BodyResponseCallback<Schema$Channel>): void;
        watchAll(callback: BodyResponseCallback<Schema$Channel>): void;
    }
    interface Params$Resource$Objects$Compose {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of the bucket containing the source objects. The destination object
         * is stored in this bucket.
         */
        destinationBucket?: string;
        /**
         * Name of the new object.
         */
        destinationObject?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * generation matches the given value.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ComposeRequest;
    }
    interface Params$Resource$Objects$Copy {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Name of the bucket in which to store the new object. Overrides the
         * provided object metadata's bucket value, if any.
         */
        destinationBucket?: string;
        /**
         * Name of the new object. Required when the object metadata is not
         * otherwise provided. Overrides the object metadata's name value, if any.
         */
        destinationObject?: string;
        /**
         * Makes the operation conditional on whether the destination object's
         * current generation matches the given value.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the destination object's
         * current generation does not match the given value.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the destination object's
         * current metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the destination object's
         * current metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the source object's generation
         * matches the given value.
         */
        ifSourceGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the source object's generation
         * does not match the given value.
         */
        ifSourceGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the source object's current
         * metageneration matches the given value.
         */
        ifSourceMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the source object's current
         * metageneration does not match the given value.
         */
        ifSourceMetagenerationNotMatch?: string;
        /**
         * Set of properties to return. Defaults to noAcl, unless the object
         * resource specifies the acl property, when it defaults to full.
         */
        projection?: string;
        /**
         * Name of the bucket in which to find the source object.
         */
        sourceBucket?: string;
        /**
         * If present, selects a specific revision of the source object (as opposed
         * to the latest version, the default).
         */
        sourceGeneration?: string;
        /**
         * Name of the source object.
         */
        sourceObject?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Object;
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
         * If present, permanently deletes a specific revision of this object (as
         * opposed to the latest version, the default).
         */
        generation?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * generation matches the given value.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * generation does not match the given value.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
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
         * If present, selects a specific revision of this object (as opposed to the
         * latest version, the default).
         */
        generation?: string;
        /**
         * Makes the operation conditional on whether the object's generation
         * matches the given value.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's generation does
         * not match the given value.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Name of the object.
         */
        object?: string;
        /**
         * Set of properties to return. Defaults to noAcl.
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
         * Makes the operation conditional on whether the object's current
         * generation matches the given value.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * generation does not match the given value.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
        /**
         * Name of the object. Required when the object metadata is not otherwise
         * provided. Overrides the object metadata's name value, if any.
         */
        name?: string;
        /**
         * Set of properties to return. Defaults to noAcl, unless the object
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
        maxResults?: number;
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
         * Set of properties to return. Defaults to noAcl.
         */
        projection?: string;
        /**
         * If true, lists all versions of a file as distinct results.
         */
        versions?: boolean;
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
         * If present, selects a specific revision of this object (as opposed to the
         * latest version, the default).
         */
        generation?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * generation matches the given value.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * generation does not match the given value.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
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
         * If present, selects a specific revision of this object (as opposed to the
         * latest version, the default).
         */
        generation?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * generation matches the given value.
         */
        ifGenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * generation does not match the given value.
         */
        ifGenerationNotMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * metageneration matches the given value.
         */
        ifMetagenerationMatch?: string;
        /**
         * Makes the operation conditional on whether the object's current
         * metageneration does not match the given value.
         */
        ifMetagenerationNotMatch?: string;
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
    interface Params$Resource$Objects$Watchall {
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
        maxResults?: number;
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
         * Set of properties to return. Defaults to noAcl.
         */
        projection?: string;
        /**
         * If true, lists all versions of a file as distinct results.
         */
        versions?: boolean;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Channel;
    }
}
