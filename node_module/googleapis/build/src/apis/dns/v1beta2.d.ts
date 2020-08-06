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
export declare namespace dns_v1beta2 {
    interface Options extends GlobalOptions {
        version: 'v1beta2';
    }
    /**
     * Google Cloud DNS API
     *
     * Configures and serves authoritative DNS records.
     *
     * @example
     * const {google} = require('googleapis');
     * const dns = google.dns('v1beta2');
     *
     * @namespace dns
     * @type {Function}
     * @version v1beta2
     * @variation v1beta2
     * @param {object=} options Options for Dns
     */
    class Dns {
        _options: GlobalOptions;
        google?: GoogleConfigurable;
        root: this;
        changes: Resource$Changes;
        dnsKeys: Resource$Dnskeys;
        managedZoneOperations: Resource$Managedzoneoperations;
        managedZones: Resource$Managedzones;
        projects: Resource$Projects;
        resourceRecordSets: Resource$Resourcerecordsets;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
        getRoot(): this;
    }
    /**
     * An atomic update to a collection of ResourceRecordSets.
     */
    interface Schema$Change {
        /**
         * Which ResourceRecordSets to add?
         */
        additions?: Schema$ResourceRecordSet[];
        /**
         * Which ResourceRecordSets to remove? Must match existing data exactly.
         */
        deletions?: Schema$ResourceRecordSet[];
        /**
         * Unique identifier for the resource; defined by the server (output only).
         */
        id?: string;
        /**
         * If the DNS queries for the zone will be served.
         */
        isServing?: boolean;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;dns#change&quot;.
         */
        kind?: string;
        /**
         * The time that this operation was started by the server (output only).
         * This is in RFC3339 text format.
         */
        startTime?: string;
        /**
         * Status of the operation (output only).
         */
        status?: string;
    }
    /**
     * The response to a request to enumerate Changes to a ResourceRecordSets
     * collection.
     */
    interface Schema$ChangesListResponse {
        /**
         * The requested changes.
         */
        changes?: Schema$Change[];
        header?: Schema$ResponseHeader;
        /**
         * Type of resource.
         */
        kind?: string;
        /**
         * The presence of this field indicates that there exist more results
         * following your last page of results in pagination order. To fetch them,
         * make another list request using this value as your pagination token.  In
         * this way you can retrieve the complete contents of even very large
         * collections one page at a time. However, if the contents of the
         * collection change between the first and last paginated list request, the
         * set of all elements returned will be an inconsistent view of the
         * collection. There is no way to retrieve a &quot;snapshot&quot; of
         * collections larger than the maximum page size.
         */
        nextPageToken?: string;
    }
    /**
     * A DNSSEC key pair.
     */
    interface Schema$DnsKey {
        /**
         * String mnemonic specifying the DNSSEC algorithm of this key. Immutable
         * after creation time.
         */
        algorithm?: string;
        /**
         * The time that this resource was created in the control plane. This is in
         * RFC3339 text format. Output only.
         */
        creationTime?: string;
        /**
         * A mutable string of at most 1024 characters associated with this resource
         * for the user&#39;s convenience. Has no effect on the resource&#39;s
         * function.
         */
        description?: string;
        /**
         * Cryptographic hashes of the DNSKEY resource record associated with this
         * DnsKey. These digests are needed to construct a DS record that points at
         * this DNS key. Output only.
         */
        digests?: Schema$DnsKeyDigest[];
        /**
         * Unique identifier for the resource; defined by the server (output only).
         */
        id?: string;
        /**
         * Active keys will be used to sign subsequent changes to the ManagedZone.
         * Inactive keys will still be present as DNSKEY Resource Records for the
         * use of resolvers validating existing signatures.
         */
        isActive?: boolean;
        /**
         * Length of the key in bits. Specified at creation time then immutable.
         */
        keyLength?: number;
        /**
         * The key tag is a non-cryptographic hash of the a DNSKEY resource record
         * associated with this DnsKey. The key tag can be used to identify a DNSKEY
         * more quickly (but it is not a unique identifier). In particular, the key
         * tag is used in a parent zone&#39;s DS record to point at the DNSKEY in
         * this child ManagedZone. The key tag is a number in the range [0, 65535]
         * and the algorithm to calculate it is specified in RFC4034 Appendix B.
         * Output only.
         */
        keyTag?: number;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;dns#dnsKey&quot;.
         */
        kind?: string;
        /**
         * Base64 encoded public half of this key. Output only.
         */
        publicKey?: string;
        /**
         * One of &quot;KEY_SIGNING&quot; or &quot;ZONE_SIGNING&quot;. Keys of type
         * KEY_SIGNING have the Secure Entry Point flag set and, when active, will
         * be used to sign only resource record sets of type DNSKEY. Otherwise, the
         * Secure Entry Point flag will be cleared and this key will be used to sign
         * only resource record sets of other types. Immutable after creation time.
         */
        type?: string;
    }
    interface Schema$DnsKeyDigest {
        /**
         * The base-16 encoded bytes of this digest. Suitable for use in a DS
         * resource record.
         */
        digest?: string;
        /**
         * Specifies the algorithm used to calculate this digest.
         */
        type?: string;
    }
    /**
     * The response to a request to enumerate DnsKeys in a ManagedZone.
     */
    interface Schema$DnsKeysListResponse {
        /**
         * The requested resources.
         */
        dnsKeys?: Schema$DnsKey[];
        header?: Schema$ResponseHeader;
        /**
         * Type of resource.
         */
        kind?: string;
        /**
         * The presence of this field indicates that there exist more results
         * following your last page of results in pagination order. To fetch them,
         * make another list request using this value as your pagination token.  In
         * this way you can retrieve the complete contents of even very large
         * collections one page at a time. However, if the contents of the
         * collection change between the first and last paginated list request, the
         * set of all elements returned will be an inconsistent view of the
         * collection. There is no way to retrieve a &quot;snapshot&quot; of
         * collections larger than the maximum page size.
         */
        nextPageToken?: string;
    }
    /**
     * Parameters for DnsKey key generation. Used for generating initial keys for
     * a new ManagedZone and as default when adding a new DnsKey.
     */
    interface Schema$DnsKeySpec {
        /**
         * String mnemonic specifying the DNSSEC algorithm of this key.
         */
        algorithm?: string;
        /**
         * Length of the keys in bits.
         */
        keyLength?: number;
        /**
         * One of &quot;KEY_SIGNING&quot; or &quot;ZONE_SIGNING&quot;. Keys of type
         * KEY_SIGNING have the Secure Entry Point flag set and, when active, will
         * be used to sign only resource record sets of type DNSKEY. Otherwise, the
         * Secure Entry Point flag will be cleared and this key will be used to sign
         * only resource record sets of other types.
         */
        keyType?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;dns#dnsKeySpec&quot;.
         */
        kind?: string;
    }
    /**
     * A zone is a subtree of the DNS namespace under one administrative
     * responsibility. A ManagedZone is a resource that represents a DNS zone
     * hosted by the Cloud DNS service.
     */
    interface Schema$ManagedZone {
        /**
         * The time that this resource was created on the server. This is in RFC3339
         * text format. Output only.
         */
        creationTime?: string;
        /**
         * A mutable string of at most 1024 characters associated with this resource
         * for the user&#39;s convenience. Has no effect on the managed zone&#39;s
         * function.
         */
        description?: string;
        /**
         * The DNS name of this managed zone, for instance &quot;example.com.&quot;.
         */
        dnsName?: string;
        /**
         * DNSSEC configuration.
         */
        dnssecConfig?: Schema$ManagedZoneDnsSecConfig;
        /**
         * Unique identifier for the resource; defined by the server (output only)
         */
        id?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;dns#managedZone&quot;.
         */
        kind?: string;
        /**
         * User labels.
         */
        labels?: any;
        /**
         * User assigned name for this resource. Must be unique within the project.
         * The name must be 1-63 characters long, must begin with a letter, end with
         * a letter or digit, and only contain lowercase letters, digits or dashes.
         */
        name?: string;
        /**
         * Delegate your managed_zone to these virtual name servers; defined by the
         * server (output only)
         */
        nameServers?: string[];
        /**
         * Optionally specifies the NameServerSet for this ManagedZone. A
         * NameServerSet is a set of DNS name servers that all host the same
         * ManagedZones. Most users will leave this field unset.
         */
        nameServerSet?: string;
    }
    interface Schema$ManagedZoneDnsSecConfig {
        /**
         * Specifies parameters that will be used for generating initial DnsKeys for
         * this ManagedZone. Output only while state is not OFF.
         */
        defaultKeySpecs?: Schema$DnsKeySpec[];
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;dns#managedZoneDnsSecConfig&quot;.
         */
        kind?: string;
        /**
         * Specifies the mechanism used to provide authenticated denial-of-existence
         * responses. Output only while state is not OFF.
         */
        nonExistence?: string;
        /**
         * Specifies whether DNSSEC is enabled, and what mode it is in.
         */
        state?: string;
    }
    interface Schema$ManagedZoneOperationsListResponse {
        header?: Schema$ResponseHeader;
        /**
         * Type of resource.
         */
        kind?: string;
        /**
         * The presence of this field indicates that there exist more results
         * following your last page of results in pagination order. To fetch them,
         * make another list request using this value as your page token.  In this
         * way you can retrieve the complete contents of even very large collections
         * one page at a time. However, if the contents of the collection change
         * between the first and last paginated list request, the set of all
         * elements returned will be an inconsistent view of the collection. There
         * is no way to retrieve a consistent snapshot of a collection larger than
         * the maximum page size.
         */
        nextPageToken?: string;
        /**
         * The operation resources.
         */
        operations?: Schema$Operation[];
    }
    interface Schema$ManagedZonesListResponse {
        header?: Schema$ResponseHeader;
        /**
         * Type of resource.
         */
        kind?: string;
        /**
         * The managed zone resources.
         */
        managedZones?: Schema$ManagedZone[];
        /**
         * The presence of this field indicates that there exist more results
         * following your last page of results in pagination order. To fetch them,
         * make another list request using this value as your page token.  In this
         * way you can retrieve the complete contents of even very large collections
         * one page at a time. However, if the contents of the collection change
         * between the first and last paginated list request, the set of all
         * elements returned will be an inconsistent view of the collection. There
         * is no way to retrieve a consistent snapshot of a collection larger than
         * the maximum page size.
         */
        nextPageToken?: string;
    }
    /**
     * An operation represents a successful mutation performed on a Cloud DNS
     * resource. Operations provide: - An audit log of server resource mutations.
     * - A way to recover/retry API calls in the case where the response is never
     * received by the caller. Use the caller specified client_operation_id.
     */
    interface Schema$Operation {
        /**
         * Only populated if the operation targeted a DnsKey (output only).
         */
        dnsKeyContext?: Schema$OperationDnsKeyContext;
        /**
         * Unique identifier for the resource. This is the client_operation_id if
         * the client specified it when the mutation was initiated, otherwise, it is
         * generated by the server. The name must be 1-63 characters long and match
         * the regular expression [-a-z0-9]? (output only)
         */
        id?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;dns#operation&quot;.
         */
        kind?: string;
        /**
         * The time that this operation was started by the server. This is in
         * RFC3339 text format (output only).
         */
        startTime?: string;
        /**
         * Status of the operation. Can be one of the following: &quot;PENDING&quot;
         * or &quot;DONE&quot; (output only).
         */
        status?: string;
        /**
         * Type of the operation. Operations include insert, update, and delete
         * (output only).
         */
        type?: string;
        /**
         * User who requested the operation, for example: user@example.com.
         * cloud-dns-system for operations automatically done by the system. (output
         * only)
         */
        user?: string;
        /**
         * Only populated if the operation targeted a ManagedZone (output only).
         */
        zoneContext?: Schema$OperationManagedZoneContext;
    }
    interface Schema$OperationDnsKeyContext {
        /**
         * The post-operation DnsKey resource.
         */
        newValue?: Schema$DnsKey;
        /**
         * The pre-operation DnsKey resource.
         */
        oldValue?: Schema$DnsKey;
    }
    interface Schema$OperationManagedZoneContext {
        /**
         * The post-operation ManagedZone resource.
         */
        newValue?: Schema$ManagedZone;
        /**
         * The pre-operation ManagedZone resource.
         */
        oldValue?: Schema$ManagedZone;
    }
    /**
     * A project resource. The project is a top level container for resources
     * including Cloud DNS ManagedZones. Projects can be created only in the APIs
     * console.
     */
    interface Schema$Project {
        /**
         * User assigned unique identifier for the resource (output only).
         */
        id?: string;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;dns#project&quot;.
         */
        kind?: string;
        /**
         * Unique numeric identifier for the resource; defined by the server (output
         * only).
         */
        number?: string;
        /**
         * Quotas assigned to this project (output only).
         */
        quota?: Schema$Quota;
    }
    /**
     * Limits associated with a Project.
     */
    interface Schema$Quota {
        /**
         * Maximum allowed number of DnsKeys per ManagedZone.
         */
        dnsKeysPerManagedZone?: number;
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;dns#quota&quot;.
         */
        kind?: string;
        /**
         * Maximum allowed number of managed zones in the project.
         */
        managedZones?: number;
        /**
         * Maximum allowed number of ResourceRecords per ResourceRecordSet.
         */
        resourceRecordsPerRrset?: number;
        /**
         * Maximum allowed number of ResourceRecordSets to add per
         * ChangesCreateRequest.
         */
        rrsetAdditionsPerChange?: number;
        /**
         * Maximum allowed number of ResourceRecordSets to delete per
         * ChangesCreateRequest.
         */
        rrsetDeletionsPerChange?: number;
        /**
         * Maximum allowed number of ResourceRecordSets per zone in the project.
         */
        rrsetsPerManagedZone?: number;
        /**
         * Maximum allowed size for total rrdata in one ChangesCreateRequest in
         * bytes.
         */
        totalRrdataSizePerChange?: number;
        /**
         * DNSSEC algorithm and key length types that can be used for DnsKeys.
         */
        whitelistedKeySpecs?: Schema$DnsKeySpec[];
    }
    /**
     * A unit of data that will be returned by the DNS servers.
     */
    interface Schema$ResourceRecordSet {
        /**
         * Identifies what kind of resource this is. Value: the fixed string
         * &quot;dns#resourceRecordSet&quot;.
         */
        kind?: string;
        /**
         * For example, www.example.com.
         */
        name?: string;
        /**
         * As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1).
         */
        rrdatas?: string[];
        /**
         * As defined in RFC 4034 (section 3.2).
         */
        signatureRrdatas?: string[];
        /**
         * Number of seconds that this ResourceRecordSet can be cached by resolvers.
         */
        ttl?: number;
        /**
         * The identifier of a supported record type, for example, A, AAAA, MX, TXT,
         * and so on.
         */
        type?: string;
    }
    interface Schema$ResourceRecordSetsListResponse {
        header?: Schema$ResponseHeader;
        /**
         * Type of resource.
         */
        kind?: string;
        /**
         * The presence of this field indicates that there exist more results
         * following your last page of results in pagination order. To fetch them,
         * make another list request using this value as your pagination token.  In
         * this way you can retrieve the complete contents of even very large
         * collections one page at a time. However, if the contents of the
         * collection change between the first and last paginated list request, the
         * set of all elements returned will be an inconsistent view of the
         * collection. There is no way to retrieve a consistent snapshot of a
         * collection larger than the maximum page size.
         */
        nextPageToken?: string;
        /**
         * The resource record set resources.
         */
        rrsets?: Schema$ResourceRecordSet[];
    }
    /**
     * Elements common to every response.
     */
    interface Schema$ResponseHeader {
        /**
         * For mutating operation requests that completed successfully. This is the
         * client_operation_id if the client specified it, otherwise it is generated
         * by the server (output only).
         */
        operationId?: string;
    }
    class Resource$Changes {
        root: Dns;
        constructor(root: Dns);
        getRoot(): Dns;
        /**
         * dns.changes.create
         * @desc Atomically update the ResourceRecordSet collection.
         * @alias dns.changes.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.
         * @param {string} params.managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or id.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {().Change} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params?: Params$Resource$Changes$Create, options?: MethodOptions): AxiosPromise<Schema$Change>;
        create(params: Params$Resource$Changes$Create, options: MethodOptions | BodyResponseCallback<Schema$Change>, callback: BodyResponseCallback<Schema$Change>): void;
        create(params: Params$Resource$Changes$Create, callback: BodyResponseCallback<Schema$Change>): void;
        create(callback: BodyResponseCallback<Schema$Change>): void;
        /**
         * dns.changes.get
         * @desc Fetch the representation of an existing Change.
         * @alias dns.changes.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.changeId The identifier of the requested change, from a previous ResourceRecordSetsChangeResponse.
         * @param {string=} params.clientOperationId For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.
         * @param {string} params.managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or id.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Changes$Get, options?: MethodOptions): AxiosPromise<Schema$Change>;
        get(params: Params$Resource$Changes$Get, options: MethodOptions | BodyResponseCallback<Schema$Change>, callback: BodyResponseCallback<Schema$Change>): void;
        get(params: Params$Resource$Changes$Get, callback: BodyResponseCallback<Schema$Change>): void;
        get(callback: BodyResponseCallback<Schema$Change>): void;
        /**
         * dns.changes.list
         * @desc Enumerate Changes to a ResourceRecordSet collection.
         * @alias dns.changes.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or id.
         * @param {integer=} params.maxResults Optional. Maximum number of results to be returned. If unspecified, the server will decide how many results to return.
         * @param {string=} params.pageToken Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {string=} params.sortBy Sorting criterion. The only supported value is change sequence.
         * @param {string=} params.sortOrder Sorting order direction: 'ascending' or 'descending'.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Changes$List, options?: MethodOptions): AxiosPromise<Schema$ChangesListResponse>;
        list(params: Params$Resource$Changes$List, options: MethodOptions | BodyResponseCallback<Schema$ChangesListResponse>, callback: BodyResponseCallback<Schema$ChangesListResponse>): void;
        list(params: Params$Resource$Changes$List, callback: BodyResponseCallback<Schema$ChangesListResponse>): void;
        list(callback: BodyResponseCallback<Schema$ChangesListResponse>): void;
    }
    interface Params$Resource$Changes$Create {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * For mutating operation requests only. An optional identifier specified by
         * the client. Must be unique for operation resources in the Operations
         * collection.
         */
        clientOperationId?: string;
        /**
         * Identifies the managed zone addressed by this request. Can be the managed
         * zone name or id.
         */
        managedZone?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Change;
    }
    interface Params$Resource$Changes$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * The identifier of the requested change, from a previous
         * ResourceRecordSetsChangeResponse.
         */
        changeId?: string;
        /**
         * For mutating operation requests only. An optional identifier specified by
         * the client. Must be unique for operation resources in the Operations
         * collection.
         */
        clientOperationId?: string;
        /**
         * Identifies the managed zone addressed by this request. Can be the managed
         * zone name or id.
         */
        managedZone?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
    }
    interface Params$Resource$Changes$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Identifies the managed zone addressed by this request. Can be the managed
         * zone name or id.
         */
        managedZone?: string;
        /**
         * Optional. Maximum number of results to be returned. If unspecified, the
         * server will decide how many results to return.
         */
        maxResults?: number;
        /**
         * Optional. A tag returned by a previous list request that was truncated.
         * Use this parameter to continue a previous list request.
         */
        pageToken?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
        /**
         * Sorting criterion. The only supported value is change sequence.
         */
        sortBy?: string;
        /**
         * Sorting order direction: 'ascending' or 'descending'.
         */
        sortOrder?: string;
    }
    class Resource$Dnskeys {
        root: Dns;
        constructor(root: Dns);
        getRoot(): Dns;
        /**
         * dns.dnsKeys.get
         * @desc Fetch the representation of an existing DnsKey.
         * @alias dns.dnsKeys.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.
         * @param {string=} params.digestType An optional comma-separated list of digest types to compute and display for key signing keys. If omitted, the recommended digest type will be computed and displayed.
         * @param {string} params.dnsKeyId The identifier of the requested DnsKey.
         * @param {string} params.managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or id.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Dnskeys$Get, options?: MethodOptions): AxiosPromise<Schema$DnsKey>;
        get(params: Params$Resource$Dnskeys$Get, options: MethodOptions | BodyResponseCallback<Schema$DnsKey>, callback: BodyResponseCallback<Schema$DnsKey>): void;
        get(params: Params$Resource$Dnskeys$Get, callback: BodyResponseCallback<Schema$DnsKey>): void;
        get(callback: BodyResponseCallback<Schema$DnsKey>): void;
        /**
         * dns.dnsKeys.list
         * @desc Enumerate DnsKeys to a ResourceRecordSet collection.
         * @alias dns.dnsKeys.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.digestType An optional comma-separated list of digest types to compute and display for key signing keys. If omitted, the recommended digest type will be computed and displayed.
         * @param {string} params.managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or id.
         * @param {integer=} params.maxResults Optional. Maximum number of results to be returned. If unspecified, the server will decide how many results to return.
         * @param {string=} params.pageToken Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Dnskeys$List, options?: MethodOptions): AxiosPromise<Schema$DnsKeysListResponse>;
        list(params: Params$Resource$Dnskeys$List, options: MethodOptions | BodyResponseCallback<Schema$DnsKeysListResponse>, callback: BodyResponseCallback<Schema$DnsKeysListResponse>): void;
        list(params: Params$Resource$Dnskeys$List, callback: BodyResponseCallback<Schema$DnsKeysListResponse>): void;
        list(callback: BodyResponseCallback<Schema$DnsKeysListResponse>): void;
    }
    interface Params$Resource$Dnskeys$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * For mutating operation requests only. An optional identifier specified by
         * the client. Must be unique for operation resources in the Operations
         * collection.
         */
        clientOperationId?: string;
        /**
         * An optional comma-separated list of digest types to compute and display
         * for key signing keys. If omitted, the recommended digest type will be
         * computed and displayed.
         */
        digestType?: string;
        /**
         * The identifier of the requested DnsKey.
         */
        dnsKeyId?: string;
        /**
         * Identifies the managed zone addressed by this request. Can be the managed
         * zone name or id.
         */
        managedZone?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
    }
    interface Params$Resource$Dnskeys$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * An optional comma-separated list of digest types to compute and display
         * for key signing keys. If omitted, the recommended digest type will be
         * computed and displayed.
         */
        digestType?: string;
        /**
         * Identifies the managed zone addressed by this request. Can be the managed
         * zone name or id.
         */
        managedZone?: string;
        /**
         * Optional. Maximum number of results to be returned. If unspecified, the
         * server will decide how many results to return.
         */
        maxResults?: number;
        /**
         * Optional. A tag returned by a previous list request that was truncated.
         * Use this parameter to continue a previous list request.
         */
        pageToken?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
    }
    class Resource$Managedzoneoperations {
        root: Dns;
        constructor(root: Dns);
        getRoot(): Dns;
        /**
         * dns.managedZoneOperations.get
         * @desc Fetch the representation of an existing Operation.
         * @alias dns.managedZoneOperations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.
         * @param {string} params.managedZone Identifies the managed zone addressed by this request.
         * @param {string} params.operation Identifies the operation addressed by this request.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Managedzoneoperations$Get, options?: MethodOptions): AxiosPromise<Schema$Operation>;
        get(params: Params$Resource$Managedzoneoperations$Get, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        get(params: Params$Resource$Managedzoneoperations$Get, callback: BodyResponseCallback<Schema$Operation>): void;
        get(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dns.managedZoneOperations.list
         * @desc Enumerate Operations for the given ManagedZone.
         * @alias dns.managedZoneOperations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.managedZone Identifies the managed zone addressed by this request.
         * @param {integer=} params.maxResults Optional. Maximum number of results to be returned. If unspecified, the server will decide how many results to return.
         * @param {string=} params.pageToken Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {string=} params.sortBy Sorting criterion. The only supported values are START_TIME and ID.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Managedzoneoperations$List, options?: MethodOptions): AxiosPromise<Schema$ManagedZoneOperationsListResponse>;
        list(params: Params$Resource$Managedzoneoperations$List, options: MethodOptions | BodyResponseCallback<Schema$ManagedZoneOperationsListResponse>, callback: BodyResponseCallback<Schema$ManagedZoneOperationsListResponse>): void;
        list(params: Params$Resource$Managedzoneoperations$List, callback: BodyResponseCallback<Schema$ManagedZoneOperationsListResponse>): void;
        list(callback: BodyResponseCallback<Schema$ManagedZoneOperationsListResponse>): void;
    }
    interface Params$Resource$Managedzoneoperations$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * For mutating operation requests only. An optional identifier specified by
         * the client. Must be unique for operation resources in the Operations
         * collection.
         */
        clientOperationId?: string;
        /**
         * Identifies the managed zone addressed by this request.
         */
        managedZone?: string;
        /**
         * Identifies the operation addressed by this request.
         */
        operation?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
    }
    interface Params$Resource$Managedzoneoperations$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Identifies the managed zone addressed by this request.
         */
        managedZone?: string;
        /**
         * Optional. Maximum number of results to be returned. If unspecified, the
         * server will decide how many results to return.
         */
        maxResults?: number;
        /**
         * Optional. A tag returned by a previous list request that was truncated.
         * Use this parameter to continue a previous list request.
         */
        pageToken?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
        /**
         * Sorting criterion. The only supported values are START_TIME and ID.
         */
        sortBy?: string;
    }
    class Resource$Managedzones {
        root: Dns;
        constructor(root: Dns);
        getRoot(): Dns;
        /**
         * dns.managedZones.create
         * @desc Create a new ManagedZone.
         * @alias dns.managedZones.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {().ManagedZone} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params?: Params$Resource$Managedzones$Create, options?: MethodOptions): AxiosPromise<Schema$ManagedZone>;
        create(params: Params$Resource$Managedzones$Create, options: MethodOptions | BodyResponseCallback<Schema$ManagedZone>, callback: BodyResponseCallback<Schema$ManagedZone>): void;
        create(params: Params$Resource$Managedzones$Create, callback: BodyResponseCallback<Schema$ManagedZone>): void;
        create(callback: BodyResponseCallback<Schema$ManagedZone>): void;
        /**
         * dns.managedZones.delete
         * @desc Delete a previously created ManagedZone.
         * @alias dns.managedZones.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.
         * @param {string} params.managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or id.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params?: Params$Resource$Managedzones$Delete, options?: MethodOptions): AxiosPromise<void>;
        delete(params: Params$Resource$Managedzones$Delete, options: MethodOptions | BodyResponseCallback<void>, callback: BodyResponseCallback<void>): void;
        delete(params: Params$Resource$Managedzones$Delete, callback: BodyResponseCallback<void>): void;
        delete(callback: BodyResponseCallback<void>): void;
        /**
         * dns.managedZones.get
         * @desc Fetch the representation of an existing ManagedZone.
         * @alias dns.managedZones.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.
         * @param {string} params.managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or id.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Managedzones$Get, options?: MethodOptions): AxiosPromise<Schema$ManagedZone>;
        get(params: Params$Resource$Managedzones$Get, options: MethodOptions | BodyResponseCallback<Schema$ManagedZone>, callback: BodyResponseCallback<Schema$ManagedZone>): void;
        get(params: Params$Resource$Managedzones$Get, callback: BodyResponseCallback<Schema$ManagedZone>): void;
        get(callback: BodyResponseCallback<Schema$ManagedZone>): void;
        /**
         * dns.managedZones.list
         * @desc Enumerate ManagedZones that have been created but not yet deleted.
         * @alias dns.managedZones.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.dnsName Restricts the list to return only zones with this domain name.
         * @param {integer=} params.maxResults Optional. Maximum number of results to be returned. If unspecified, the server will decide how many results to return.
         * @param {string=} params.pageToken Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Managedzones$List, options?: MethodOptions): AxiosPromise<Schema$ManagedZonesListResponse>;
        list(params: Params$Resource$Managedzones$List, options: MethodOptions | BodyResponseCallback<Schema$ManagedZonesListResponse>, callback: BodyResponseCallback<Schema$ManagedZonesListResponse>): void;
        list(params: Params$Resource$Managedzones$List, callback: BodyResponseCallback<Schema$ManagedZonesListResponse>): void;
        list(callback: BodyResponseCallback<Schema$ManagedZonesListResponse>): void;
        /**
         * dns.managedZones.patch
         * @desc Apply a partial update to an existing ManagedZone.
         * @alias dns.managedZones.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.
         * @param {string} params.managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or id.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {().ManagedZone} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params?: Params$Resource$Managedzones$Patch, options?: MethodOptions): AxiosPromise<Schema$Operation>;
        patch(params: Params$Resource$Managedzones$Patch, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(params: Params$Resource$Managedzones$Patch, callback: BodyResponseCallback<Schema$Operation>): void;
        patch(callback: BodyResponseCallback<Schema$Operation>): void;
        /**
         * dns.managedZones.update
         * @desc Update an existing ManagedZone.
         * @alias dns.managedZones.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.
         * @param {string} params.managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or id.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {().ManagedZone} params.resource Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params?: Params$Resource$Managedzones$Update, options?: MethodOptions): AxiosPromise<Schema$Operation>;
        update(params: Params$Resource$Managedzones$Update, options: MethodOptions | BodyResponseCallback<Schema$Operation>, callback: BodyResponseCallback<Schema$Operation>): void;
        update(params: Params$Resource$Managedzones$Update, callback: BodyResponseCallback<Schema$Operation>): void;
        update(callback: BodyResponseCallback<Schema$Operation>): void;
    }
    interface Params$Resource$Managedzones$Create {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * For mutating operation requests only. An optional identifier specified by
         * the client. Must be unique for operation resources in the Operations
         * collection.
         */
        clientOperationId?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ManagedZone;
    }
    interface Params$Resource$Managedzones$Delete {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * For mutating operation requests only. An optional identifier specified by
         * the client. Must be unique for operation resources in the Operations
         * collection.
         */
        clientOperationId?: string;
        /**
         * Identifies the managed zone addressed by this request. Can be the managed
         * zone name or id.
         */
        managedZone?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
    }
    interface Params$Resource$Managedzones$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * For mutating operation requests only. An optional identifier specified by
         * the client. Must be unique for operation resources in the Operations
         * collection.
         */
        clientOperationId?: string;
        /**
         * Identifies the managed zone addressed by this request. Can be the managed
         * zone name or id.
         */
        managedZone?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
    }
    interface Params$Resource$Managedzones$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Restricts the list to return only zones with this domain name.
         */
        dnsName?: string;
        /**
         * Optional. Maximum number of results to be returned. If unspecified, the
         * server will decide how many results to return.
         */
        maxResults?: number;
        /**
         * Optional. A tag returned by a previous list request that was truncated.
         * Use this parameter to continue a previous list request.
         */
        pageToken?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
    }
    interface Params$Resource$Managedzones$Patch {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * For mutating operation requests only. An optional identifier specified by
         * the client. Must be unique for operation resources in the Operations
         * collection.
         */
        clientOperationId?: string;
        /**
         * Identifies the managed zone addressed by this request. Can be the managed
         * zone name or id.
         */
        managedZone?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ManagedZone;
    }
    interface Params$Resource$Managedzones$Update {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * For mutating operation requests only. An optional identifier specified by
         * the client. Must be unique for operation resources in the Operations
         * collection.
         */
        clientOperationId?: string;
        /**
         * Identifies the managed zone addressed by this request. Can be the managed
         * zone name or id.
         */
        managedZone?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ManagedZone;
    }
    class Resource$Projects {
        root: Dns;
        constructor(root: Dns);
        getRoot(): Dns;
        /**
         * dns.projects.get
         * @desc Fetch the representation of an existing Project.
         * @alias dns.projects.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.clientOperationId For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params?: Params$Resource$Projects$Get, options?: MethodOptions): AxiosPromise<Schema$Project>;
        get(params: Params$Resource$Projects$Get, options: MethodOptions | BodyResponseCallback<Schema$Project>, callback: BodyResponseCallback<Schema$Project>): void;
        get(params: Params$Resource$Projects$Get, callback: BodyResponseCallback<Schema$Project>): void;
        get(callback: BodyResponseCallback<Schema$Project>): void;
    }
    interface Params$Resource$Projects$Get {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * For mutating operation requests only. An optional identifier specified by
         * the client. Must be unique for operation resources in the Operations
         * collection.
         */
        clientOperationId?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
    }
    class Resource$Resourcerecordsets {
        root: Dns;
        constructor(root: Dns);
        getRoot(): Dns;
        /**
         * dns.resourceRecordSets.list
         * @desc Enumerate ResourceRecordSets that have been created but not yet
         * deleted.
         * @alias dns.resourceRecordSets.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or id.
         * @param {integer=} params.maxResults Optional. Maximum number of results to be returned. If unspecified, the server will decide how many results to return.
         * @param {string=} params.name Restricts the list to return only records with this fully qualified domain name.
         * @param {string=} params.pageToken Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request.
         * @param {string} params.project Identifies the project addressed by this request.
         * @param {string=} params.type Restricts the list to return only records of this type. If present, the "name" parameter must also be present.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params?: Params$Resource$Resourcerecordsets$List, options?: MethodOptions): AxiosPromise<Schema$ResourceRecordSetsListResponse>;
        list(params: Params$Resource$Resourcerecordsets$List, options: MethodOptions | BodyResponseCallback<Schema$ResourceRecordSetsListResponse>, callback: BodyResponseCallback<Schema$ResourceRecordSetsListResponse>): void;
        list(params: Params$Resource$Resourcerecordsets$List, callback: BodyResponseCallback<Schema$ResourceRecordSetsListResponse>): void;
        list(callback: BodyResponseCallback<Schema$ResourceRecordSetsListResponse>): void;
    }
    interface Params$Resource$Resourcerecordsets$List {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;
        /**
         * Identifies the managed zone addressed by this request. Can be the managed
         * zone name or id.
         */
        managedZone?: string;
        /**
         * Optional. Maximum number of results to be returned. If unspecified, the
         * server will decide how many results to return.
         */
        maxResults?: number;
        /**
         * Restricts the list to return only records with this fully qualified
         * domain name.
         */
        name?: string;
        /**
         * Optional. A tag returned by a previous list request that was truncated.
         * Use this parameter to continue a previous list request.
         */
        pageToken?: string;
        /**
         * Identifies the project addressed by this request.
         */
        project?: string;
        /**
         * Restricts the list to return only records of this type. If present, the
         * "name" parameter must also be present.
         */
        type?: string;
    }
}