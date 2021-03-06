"use strict";
/**
 * Copyright 2013 Google Inc. All Rights Reserved.
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
const gtoken_1 = require("gtoken");
const messages = require("../messages");
const jwtaccess_1 = require("./jwtaccess");
const oauth2client_1 = require("./oauth2client");
class JWT extends oauth2client_1.OAuth2Client {
    constructor(optionsOrEmail, keyFile, key, scopes, subject, keyId) {
        const opts = (optionsOrEmail && typeof optionsOrEmail === 'object') ?
            optionsOrEmail :
            { email: optionsOrEmail, keyFile, key, keyId, scopes, subject };
        super({ eagerRefreshThresholdMillis: opts.eagerRefreshThresholdMillis });
        this.email = opts.email;
        this.keyFile = opts.keyFile;
        this.key = opts.key;
        this.keyId = opts.keyId;
        this.scopes = opts.scopes;
        this.subject = opts.subject;
        this.additionalClaims = opts.additionalClaims;
        this.credentials = { refresh_token: 'jwt-placeholder', expiry_date: 1 };
    }
    /**
     * Creates a copy of the credential with the specified scopes.
     * @param scopes List of requested scopes or a single scope.
     * @return The cloned instance.
     */
    createScoped(scopes) {
        return new JWT({
            email: this.email,
            keyFile: this.keyFile,
            key: this.key,
            keyId: this.keyId,
            scopes,
            subject: this.subject,
            additionalClaims: this.additionalClaims
        });
    }
    /**
     * Obtains the metadata to be sent with the request.
     *
     * @param url the URI being authorized.
     */
    getRequestMetadataAsync(url) {
        const _super = Object.create(null, {
            getRequestMetadataAsync: { get: () => super.getRequestMetadataAsync }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.apiKey && !this.hasScopes() && url) {
                if (this.additionalClaims && this.additionalClaims.target_audience) {
                    const { tokens } = yield this.refreshToken();
                    return { headers: { Authorization: `Bearer ${tokens.id_token}` } };
                }
                else {
                    // no scopes have been set, but a uri has been provided. Use JWTAccess
                    // credentials.
                    if (!this.access) {
                        this.access = new jwtaccess_1.JWTAccess(this.email, this.key, this.keyId);
                    }
                    const headers = yield this.access.getRequestHeaders(url, this.additionalClaims);
                    return { headers };
                }
            }
            else {
                return _super.getRequestMetadataAsync.call(this, url);
            }
        });
    }
    /**
     * Indicates whether the credential requires scopes to be created by calling
     * createScoped before use.
     * @deprecated
     * @return false if createScoped does not need to be called.
     */
    createScopedRequired() {
        messages.warn(messages.JWT_CREATE_SCOPED_DEPRECATED);
        return !this.hasScopes();
    }
    /**
     * Determine if there are currently scopes available.
     */
    hasScopes() {
        if (!this.scopes) {
            return false;
        }
        // For arrays, check the array length.
        if (this.scopes instanceof Array) {
            return this.scopes.length > 0;
        }
        // For others, convert to a string and check the length.
        return String(this.scopes).length > 0;
    }
    authorize(callback) {
        if (callback) {
            this.authorizeAsync().then(r => callback(null, r), callback);
        }
        else {
            return this.authorizeAsync();
        }
    }
    authorizeAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.refreshToken();
            if (!result) {
                throw new Error('No result returned');
            }
            this.credentials = result.tokens;
            this.credentials.refresh_token = 'jwt-placeholder';
            this.key = this.gtoken.key;
            this.email = this.gtoken.iss;
            return result.tokens;
        });
    }
    /**
     * Refreshes the access token.
     * @param refreshToken ignored
     * @private
     */
    refreshTokenNoCache(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const gtoken = this.createGToken();
            const token = yield gtoken.getToken();
            const tokens = {
                access_token: token,
                token_type: 'Bearer',
                expiry_date: gtoken.expiresAt,
                // tslint:disable-next-line no-any
                id_token: gtoken.rawToken.id_token
            };
            this.emit('tokens', tokens);
            return { res: null, tokens };
        });
    }
    /**
     * Create a gToken if it doesn't already exist.
     */
    createGToken() {
        if (!this.gtoken) {
            this.gtoken = new gtoken_1.GoogleToken({
                iss: this.email,
                sub: this.subject,
                scope: this.scopes,
                keyFile: this.keyFile,
                key: this.key,
                additionalClaims: this.additionalClaims
            });
        }
        return this.gtoken;
    }
    /**
     * Create a JWT credentials instance using the given input options.
     * @param json The input object.
     */
    fromJSON(json) {
        if (!json) {
            throw new Error('Must pass in a JSON object containing the service account auth settings.');
        }
        if (!json.client_email) {
            throw new Error('The incoming JSON object does not contain a client_email field');
        }
        if (!json.private_key) {
            throw new Error('The incoming JSON object does not contain a private_key field');
        }
        // Extract the relevant information from the json key file.
        this.email = json.client_email;
        this.key = json.private_key;
        this.keyId = json.private_key_id;
        this.projectId = json.project_id;
    }
    fromStream(inputStream, callback) {
        if (callback) {
            this.fromStreamAsync(inputStream).then(r => callback(), callback);
        }
        else {
            return this.fromStreamAsync(inputStream);
        }
    }
    fromStreamAsync(inputStream) {
        return new Promise((resolve, reject) => {
            if (!inputStream) {
                throw new Error('Must pass in a stream containing the service account auth settings.');
            }
            let s = '';
            inputStream.setEncoding('utf8')
                .on('error', reject)
                .on('data', (chunk) => s += chunk)
                .on('end', () => {
                try {
                    const data = JSON.parse(s);
                    this.fromJSON(data);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    /**
     * Creates a JWT credentials instance using an API Key for authentication.
     * @param apiKey The API Key in string form.
     */
    fromAPIKey(apiKey) {
        if (typeof apiKey !== 'string') {
            throw new Error('Must provide an API Key string.');
        }
        this.apiKey = apiKey;
    }
    /**
     * Using the key or keyFile on the JWT client, obtain an object that contains
     * the key and the client email.
     */
    getCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.key) {
                return { private_key: this.key, client_email: this.email };
            }
            else if (this.keyFile) {
                const gtoken = this.createGToken();
                const creds = yield gtoken.getCredentials(this.keyFile);
                return { private_key: creds.privateKey, client_email: creds.clientEmail };
            }
            throw new Error('A key or a keyFile must be provided to getCredentials.');
        });
    }
}
exports.JWT = JWT;
//# sourceMappingURL=jwtclient.js.map