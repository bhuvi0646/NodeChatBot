"use strict";
/**
 * Copyright 2012 Google Inc. All Rights Reserved.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const querystring = require("querystring");
const stream = require("stream");
const messages = require("../messages");
const pemverifier_1 = require("./../pemverifier");
const authclient_1 = require("./authclient");
const loginticket_1 = require("./loginticket");
var CodeChallengeMethod;
(function (CodeChallengeMethod) {
    CodeChallengeMethod["Plain"] = "plain";
    CodeChallengeMethod["S256"] = "S256";
})(CodeChallengeMethod = exports.CodeChallengeMethod || (exports.CodeChallengeMethod = {}));
class OAuth2Client extends authclient_1.AuthClient {
    constructor(optionsOrClientId, clientSecret, redirectUri) {
        super();
        this.certificateExpiry = null;
        this.refreshTokenPromises = new Map();
        const opts = (optionsOrClientId && typeof optionsOrClientId === 'object') ?
            optionsOrClientId :
            { clientId: optionsOrClientId, clientSecret, redirectUri };
        this._clientId = opts.clientId;
        this._clientSecret = opts.clientSecret;
        this.redirectUri = opts.redirectUri;
        this.eagerRefreshThresholdMillis =
            opts.eagerRefreshThresholdMillis || 5 * 60 * 1000;
    }
    /**
     * Generates URL for consent page landing.
     * @param opts Options.
     * @return URL to consent page.
     */
    generateAuthUrl(opts = {}) {
        if (opts.code_challenge_method && !opts.code_challenge) {
            throw new Error('If a code_challenge_method is provided, code_challenge must be included.');
        }
        opts.response_type = opts.response_type || 'code';
        opts.client_id = opts.client_id || this._clientId;
        opts.redirect_uri = opts.redirect_uri || this.redirectUri;
        // Allow scopes to be passed either as array or a string
        if (opts.scope instanceof Array) {
            opts.scope = opts.scope.join(' ');
        }
        const rootUrl = OAuth2Client.GOOGLE_OAUTH2_AUTH_BASE_URL_;
        return rootUrl + '?' + querystring.stringify(opts);
    }
    /**
     * Convenience method to automatically generate a code_verifier, and it's
     * resulting SHA256. If used, this must be paired with a S256
     * code_challenge_method.
     */
    generateCodeVerifier() {
        // base64 encoding uses 6 bits per character, and we want to generate128
        // characters. 6*128/8 = 96.
        const randomString = crypto.randomBytes(96).toString('base64');
        // The valid characters in the code_verifier are [A-Z]/[a-z]/[0-9]/
        // "-"/"."/"_"/"~". Base64 encoded strings are pretty close, so we're just
        // swapping out a few chars.
        const codeVerifier = randomString.replace(/\+/g, '~').replace(/=/g, '_').replace(/\//g, '-');
        // Generate the base64 encoded SHA256
        const unencodedCodeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64');
        // We need to use base64UrlEncoding instead of standard base64
        const codeChallenge = unencodedCodeChallenge.split('=')[0]
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
        return { codeVerifier, codeChallenge };
    }
    getToken(codeOrOptions, callback) {
        const options = (typeof codeOrOptions === 'string') ?
            { code: codeOrOptions } :
            codeOrOptions;
        if (callback) {
            this.getTokenAsync(options).then(r => callback(null, r.tokens, r.res), e => callback(e, null, e.response));
        }
        else {
            return this.getTokenAsync(options);
        }
    }
    getTokenAsync(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = OAuth2Client.GOOGLE_OAUTH2_TOKEN_URL_;
            const values = {
                code: options.code,
                client_id: options.client_id || this._clientId,
                client_secret: this._clientSecret,
                redirect_uri: options.redirect_uri || this.redirectUri,
                grant_type: 'authorization_code',
                code_verifier: options.codeVerifier
            };
            const res = yield this.transporter.request({
                method: 'POST',
                url,
                data: querystring.stringify(values),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            const tokens = res.data;
            if (res.data && res.data.expires_in) {
                tokens.expiry_date =
                    ((new Date()).getTime() + (res.data.expires_in * 1000));
                delete tokens.expires_in;
            }
            this.emit('tokens', tokens);
            return { tokens, res };
        });
    }
    /**
     * Refreshes the access token.
     * @param refresh_token Existing refresh token.
     * @private
     */
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                return this.refreshTokenNoCache(refreshToken);
            }
            // If a request to refresh using the same token has started,
            // return the same promise.
            if (this.refreshTokenPromises.has(refreshToken)) {
                return this.refreshTokenPromises.get(refreshToken);
            }
            const p = this.refreshTokenNoCache(refreshToken)
                .then(r => {
                this.refreshTokenPromises.delete(refreshToken);
                return r;
            }, e => {
                this.refreshTokenPromises.delete(refreshToken);
                throw e;
            });
            this.refreshTokenPromises.set(refreshToken, p);
            return p;
        });
    }
    refreshTokenNoCache(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = OAuth2Client.GOOGLE_OAUTH2_TOKEN_URL_;
            const data = {
                refresh_token: refreshToken,
                client_id: this._clientId,
                client_secret: this._clientSecret,
                grant_type: 'refresh_token'
            };
            // request for new token
            const res = yield this.transporter.request({
                method: 'POST',
                url,
                data: querystring.stringify(data),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            const tokens = res.data;
            // TODO: de-duplicate this code from a few spots
            if (res.data && res.data.expires_in) {
                tokens.expiry_date =
                    ((new Date()).getTime() + (res.data.expires_in * 1000));
                delete tokens.expires_in;
            }
            this.emit('tokens', tokens);
            return { tokens, res };
        });
    }
    refreshAccessToken(callback) {
        messages.warn(messages.REFRESH_ACCESS_TOKEN_DEPRECATED);
        if (callback) {
            this.refreshAccessTokenAsync().then(r => callback(null, r.credentials, r.res), callback);
        }
        else {
            return this.refreshAccessTokenAsync();
        }
    }
    refreshAccessTokenAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.credentials.refresh_token) {
                throw new Error('No refresh token is set.');
            }
            const r = yield this.refreshToken(this.credentials.refresh_token);
            const tokens = r.tokens;
            tokens.refresh_token = this.credentials.refresh_token;
            this.credentials = tokens;
            return { credentials: this.credentials, res: r.res };
        });
    }
    getAccessToken(callback) {
        if (callback) {
            this.getAccessTokenAsync().then(r => callback(null, r.token, r.res), callback);
        }
        else {
            return this.getAccessTokenAsync();
        }
    }
    getAccessTokenAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const shouldRefresh = !this.credentials.access_token || this.isTokenExpiring();
            if (shouldRefresh && this.credentials.refresh_token) {
                if (!this.credentials.refresh_token) {
                    throw new Error('No refresh token is set.');
                }
                const r = yield this.refreshAccessTokenAsync();
                if (!r.credentials || (r.credentials && !r.credentials.access_token)) {
                    throw new Error('Could not refresh access token.');
                }
                return { token: r.credentials.access_token, res: r.res };
            }
            else {
                return { token: this.credentials.access_token };
            }
        });
    }
    getRequestMetadata(url, callback) {
        messages.warn(messages.OAUTH_GET_REQUEST_METADATA_DEPRECATED);
        if (callback) {
            this.getRequestMetadataAsync(url).then(r => callback(null, r.headers, r.res), callback);
        }
        else {
            return this.getRequestMetadataAsync();
        }
    }
    /**
     * The main authentication interface.  It takes an optional url which when
     * present is the endpoint being accessed, and returns a Promise which
     * resolves with authorization header fields.
     *
     * In OAuth2Client, the result has the form:
     * { Authorization: 'Bearer <access_token_value>' }
     * @param url The optional url being authorized
     */
    getRequestHeaders(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.getRequestMetadataAsync(url);
            return res.headers;
        });
    }
    getRequestMetadataAsync(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const thisCreds = this.credentials;
            if (!thisCreds.access_token && !thisCreds.refresh_token && !this.apiKey) {
                throw new Error('No access, refresh token or API key is set.');
            }
            if (thisCreds.access_token && !this.isTokenExpiring()) {
                thisCreds.token_type = thisCreds.token_type || 'Bearer';
                const headers = {
                    Authorization: thisCreds.token_type + ' ' + thisCreds.access_token
                };
                return { headers };
            }
            if (this.apiKey) {
                return { headers: {} };
            }
            let r = null;
            let tokens = null;
            try {
                r = yield this.refreshToken(thisCreds.refresh_token);
                tokens = r.tokens;
            }
            catch (err) {
                const e = err;
                if (e.response &&
                    (e.response.status === 403 || e.response.status === 404)) {
                    e.message = 'Could not refresh access token.';
                }
                throw e;
            }
            const credentials = this.credentials;
            credentials.token_type = credentials.token_type || 'Bearer';
            tokens.refresh_token = credentials.refresh_token;
            this.credentials = tokens;
            const headers = {
                Authorization: credentials.token_type + ' ' + tokens.access_token
            };
            return { headers, res: r.res };
        });
    }
    revokeToken(token, callback) {
        const opts = {
            url: OAuth2Client.GOOGLE_OAUTH2_REVOKE_URL_ + '?' +
                querystring.stringify({ token }),
            method: 'POST'
        };
        if (callback) {
            this.transporter.request(opts).then(r => callback(null, r), callback);
        }
        else {
            return this.transporter.request(opts);
        }
    }
    revokeCredentials(callback) {
        if (callback) {
            this.revokeCredentialsAsync().then(res => callback(null, res), callback);
        }
        else {
            return this.revokeCredentialsAsync();
        }
    }
    revokeCredentialsAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.credentials.access_token;
            this.credentials = {};
            if (token) {
                return this.revokeToken(token);
            }
            else {
                throw new Error('No access token to revoke.');
            }
        });
    }
    request(opts, callback) {
        if (callback) {
            this.requestAsync(opts).then(r => callback(null, r), e => {
                return callback(e, e.response);
            });
        }
        else {
            return this.requestAsync(opts);
        }
    }
    requestAsync(opts, retry = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let r2;
            try {
                const r = yield this.getRequestMetadataAsync(opts.url);
                if (r.headers && r.headers.Authorization) {
                    opts.headers = opts.headers || {};
                    opts.headers.Authorization = r.headers.Authorization;
                }
                if (this.apiKey) {
                    opts.params = Object.assign(opts.params || {}, { key: this.apiKey });
                }
                r2 = yield this.transporter.request(opts);
            }
            catch (e) {
                const res = e.response;
                if (res) {
                    const statusCode = res.status;
                    // Retry the request for metadata if the following criteria are true:
                    // - We haven't already retried.  It only makes sense to retry once.
                    // - The response was a 401 or a 403
                    // - The request didn't send a readableStream
                    // - An access_token and refresh_token were available, but no
                    //   expiry_date was availabe. This can happen when developers stash
                    //   the access_token and refresh_token for later use, but the
                    //   access_token fails on the first try because it's expired.
                    const mayRequireRefresh = this.credentials &&
                        this.credentials.access_token && this.credentials.refresh_token &&
                        !this.credentials.expiry_date;
                    const isReadableStream = res.config.data instanceof stream.Readable;
                    const isAuthErr = statusCode === 401 || statusCode === 403;
                    if (!retry && isAuthErr && !isReadableStream && mayRequireRefresh) {
                        yield this.refreshAccessTokenAsync();
                        return this.requestAsync(opts, true);
                    }
                }
                throw e;
            }
            return r2;
        });
    }
    verifyIdToken(options, callback) {
        // This function used to accept two arguments instead of an options object.
        // Check the types to help users upgrade with less pain.
        // This check can be removed after a 2.0 release.
        if (callback && typeof callback !== 'function') {
            throw new Error('This method accepts an options object as the first parameter, which includes the idToken, audience, and maxExpiry.');
        }
        if (callback) {
            this.verifyIdTokenAsync(options).then(r => callback(null, r), callback);
        }
        else {
            return this.verifyIdTokenAsync(options);
        }
    }
    verifyIdTokenAsync(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.idToken) {
                throw new Error('The verifyIdToken method requires an ID Token');
            }
            const response = yield this.getFederatedSignonCertsAsync();
            const login = this.verifySignedJwtWithCerts(options.idToken, response.certs, options.audience, OAuth2Client.ISSUERS_, options.maxExpiry);
            return login;
        });
    }
    /**
     * Obtains information about the provisioned access token.  Especially useful
     * if you want to check the scopes that were provisioned to a given token.
     *
     * @param accessToken Required.  The Access Token for which you want to get
     * user info.
     */
    getTokenInfo(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.transporter.request({
                method: 'GET',
                url: OAuth2Client.GOOGLE_TOKEN_INFO_URL,
                params: { access_token: accessToken }
            });
            const info = Object.assign({
                expiry_date: ((new Date()).getTime() + (data.expires_in * 1000)),
                scopes: data.scope.split(' ')
            }, data);
            delete info.expires_in;
            delete info.scope;
            return info;
        });
    }
    getFederatedSignonCerts(callback) {
        if (callback) {
            this.getFederatedSignonCertsAsync().then(r => callback(null, r.certs, r.res), callback);
        }
        else {
            return this.getFederatedSignonCertsAsync();
        }
    }
    getFederatedSignonCertsAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const nowTime = (new Date()).getTime();
            if (this.certificateExpiry &&
                (nowTime < this.certificateExpiry.getTime())) {
                return { certs: this.certificateCache };
            }
            let res;
            try {
                res = yield this.transporter.request({ url: OAuth2Client.GOOGLE_OAUTH2_FEDERATED_SIGNON_CERTS_URL_ });
            }
            catch (e) {
                throw new Error('Failed to retrieve verification certificates: ' + e);
            }
            const cacheControl = res ? res.headers['cache-control'] : undefined;
            let cacheAge = -1;
            if (cacheControl) {
                const pattern = new RegExp('max-age=([0-9]*)');
                const regexResult = pattern.exec(cacheControl);
                if (regexResult && regexResult.length === 2) {
                    // Cache results with max-age (in seconds)
                    cacheAge = Number(regexResult[1]) * 1000; // milliseconds
                }
            }
            const now = new Date();
            this.certificateExpiry =
                cacheAge === -1 ? null : new Date(now.getTime() + cacheAge);
            this.certificateCache = res.data;
            return { certs: res.data, res };
        });
    }
    /**
     * Verify the id token is signed with the correct certificate
     * and is from the correct audience.
     * @param jwt The jwt to verify (The ID Token in this case).
     * @param certs The array of certs to test the jwt against.
     * @param requiredAudience The audience to test the jwt against.
     * @param issuers The allowed issuers of the jwt (Optional).
     * @param maxExpiry The max expiry the certificate can be (Optional).
     * @return Returns a LoginTicket on verification.
     */
    verifySignedJwtWithCerts(jwt, certs, requiredAudience, issuers, maxExpiry) {
        if (!maxExpiry) {
            maxExpiry = OAuth2Client.MAX_TOKEN_LIFETIME_SECS_;
        }
        const segments = jwt.split('.');
        if (segments.length !== 3) {
            throw new Error('Wrong number of segments in token: ' + jwt);
        }
        const signed = segments[0] + '.' + segments[1];
        const signature = segments[2];
        let envelope;
        let payload;
        try {
            envelope = JSON.parse(this.decodeBase64(segments[0]));
        }
        catch (err) {
            throw new Error('Can\'t parse token envelope: ' + segments[0]);
        }
        if (!envelope) {
            throw new Error('Can\'t parse token envelope: ' + segments[0]);
        }
        try {
            payload = JSON.parse(this.decodeBase64(segments[1]));
        }
        catch (err) {
            throw new Error('Can\'t parse token payload: ' + segments[0]);
        }
        if (!payload) {
            throw new Error('Can\'t parse token payload: ' + segments[1]);
        }
        if (!certs.hasOwnProperty(envelope.kid)) {
            // If this is not present, then there's no reason to attempt verification
            throw new Error('No pem found for envelope: ' + JSON.stringify(envelope));
        }
        const pem = certs[envelope.kid];
        const pemVerifier = new pemverifier_1.PemVerifier();
        const verified = pemVerifier.verify(pem, signed, signature, 'base64');
        if (!verified) {
            throw new Error('Invalid token signature: ' + jwt);
        }
        if (!payload.iat) {
            throw new Error('No issue time in token: ' + JSON.stringify(payload));
        }
        if (!payload.exp) {
            throw new Error('No expiration time in token: ' + JSON.stringify(payload));
        }
        const iat = Number(payload.iat);
        if (isNaN(iat))
            throw new Error('iat field using invalid format');
        const exp = Number(payload.exp);
        if (isNaN(exp))
            throw new Error('exp field using invalid format');
        const now = new Date().getTime() / 1000;
        if (exp >= now + maxExpiry) {
            throw new Error('Expiration time too far in future: ' + JSON.stringify(payload));
        }
        const earliest = iat - OAuth2Client.CLOCK_SKEW_SECS_;
        const latest = exp + OAuth2Client.CLOCK_SKEW_SECS_;
        if (now < earliest) {
            throw new Error('Token used too early, ' + now + ' < ' + earliest + ': ' +
                JSON.stringify(payload));
        }
        if (now > latest) {
            throw new Error('Token used too late, ' + now + ' > ' + latest + ': ' +
                JSON.stringify(payload));
        }
        if (issuers && issuers.indexOf(payload.iss) < 0) {
            throw new Error('Invalid issuer, expected one of [' + issuers + '], but got ' +
                payload.iss);
        }
        // Check the audience matches if we have one
        if (typeof requiredAudience !== 'undefined' && requiredAudience !== null) {
            const aud = payload.aud;
            let audVerified = false;
            // If the requiredAudience is an array, check if it contains token
            // audience
            if (requiredAudience.constructor === Array) {
                audVerified = (requiredAudience.indexOf(aud) > -1);
            }
            else {
                audVerified = (aud === requiredAudience);
            }
            if (!audVerified) {
                throw new Error('Wrong recipient, payload audience != requiredAudience');
            }
        }
        return new loginticket_1.LoginTicket(envelope, payload);
    }
    /**
     * This is a utils method to decode a base64 string
     * @param b64String The string to base64 decode
     * @return The decoded string
     */
    decodeBase64(b64String) {
        const buffer = Buffer.from(b64String, 'base64');
        return buffer.toString('utf8');
    }
    /**
     * Returns true if a token is expired or will expire within
     * eagerRefreshThresholdMillismilliseconds.
     * If there is no expiry time, assumes the token is not expired or expiring.
     */
    isTokenExpiring() {
        const expiryDate = this.credentials.expiry_date;
        return expiryDate ? expiryDate <=
            ((new Date()).getTime() + this.eagerRefreshThresholdMillis) :
            false;
    }
}
OAuth2Client.GOOGLE_TOKEN_INFO_URL = 'https://oauth2.googleapis.com/tokeninfo';
/**
 * The base URL for auth endpoints.
 */
OAuth2Client.GOOGLE_OAUTH2_AUTH_BASE_URL_ = 'https://accounts.google.com/o/oauth2/v2/auth';
/**
 * The base endpoint for token retrieval.
 */
OAuth2Client.GOOGLE_OAUTH2_TOKEN_URL_ = 'https://oauth2.googleapis.com/token';
/**
 * The base endpoint to revoke tokens.
 */
OAuth2Client.GOOGLE_OAUTH2_REVOKE_URL_ = 'https://oauth2.googleapis.com/revoke';
/**
 * Google Sign on certificates.
 */
OAuth2Client.GOOGLE_OAUTH2_FEDERATED_SIGNON_CERTS_URL_ = 'https://www.googleapis.com/oauth2/v1/certs';
/**
 * Clock skew - five minutes in seconds
 */
OAuth2Client.CLOCK_SKEW_SECS_ = 300;
/**
 * Max Token Lifetime is one day in seconds
 */
OAuth2Client.MAX_TOKEN_LIFETIME_SECS_ = 86400;
/**
 * The allowed oauth token issuers.
 */
OAuth2Client.ISSUERS_ = ['accounts.google.com', 'https://accounts.google.com'];
exports.OAuth2Client = OAuth2Client;
//# sourceMappingURL=oauth2client.js.map