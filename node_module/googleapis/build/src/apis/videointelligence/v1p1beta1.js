"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_common_1 = require("googleapis-common");
// tslint:disable: no-any
// tslint:disable: class-name
// tslint:disable: variable-name
// tslint:disable: jsdoc-format
// tslint:disable: no-namespace
var videointelligence_v1p1beta1;
(function (videointelligence_v1p1beta1) {
    /**
     * Cloud Video Intelligence API
     *
     * Cloud Video Intelligence API.
     *
     * @example
     * const {google} = require('googleapis');
     * const videointelligence = google.videointelligence('v1p1beta1');
     *
     * @namespace videointelligence
     * @type {Function}
     * @version v1p1beta1
     * @variation v1p1beta1
     * @param {object=} options Options for Videointelligence
     */
    class Videointelligence {
        constructor(options, google) {
            this.root = this;
            this._options = options || {};
            this.google = google;
            this.getRoot.bind(this);
            this.videos = new Resource$Videos(this);
        }
        getRoot() {
            return this.root;
        }
    }
    videointelligence_v1p1beta1.Videointelligence = Videointelligence;
    class Resource$Videos {
        constructor(root) {
            this.root = root;
            this.getRoot.bind(this);
        }
        getRoot() {
            return this.root;
        }
        annotate(paramsOrCallback, optionsOrCallback, callback) {
            let params = (paramsOrCallback || {});
            let options = (optionsOrCallback || {});
            if (typeof paramsOrCallback === 'function') {
                callback = paramsOrCallback;
                params = {};
                options = {};
            }
            if (typeof optionsOrCallback === 'function') {
                callback = optionsOrCallback;
                options = {};
            }
            const rootUrl = options.rootUrl || 'https://videointelligence.googleapis.com/';
            const parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1p1beta1/videos:annotate')
                        .replace(/([^:]\/)\/+/g, '$1'),
                    method: 'POST'
                }, options),
                params,
                requiredParams: [],
                pathParams: [],
                context: this.getRoot()
            };
            if (callback) {
                googleapis_common_1.createAPIRequest(parameters, callback);
            }
            else {
                return googleapis_common_1.createAPIRequest(parameters);
            }
        }
    }
    videointelligence_v1p1beta1.Resource$Videos = Resource$Videos;
})(videointelligence_v1p1beta1 = exports.videointelligence_v1p1beta1 || (exports.videointelligence_v1p1beta1 = {}));
//# sourceMappingURL=v1p1beta1.js.map