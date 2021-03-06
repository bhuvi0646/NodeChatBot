'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = _request;

var _detect = require('../lib/detect');

var _progressEvent = require('../progress-event');

var _progressEvent2 = _interopRequireDefault(_progressEvent);

var _request2 = require('request');

var _request3 = _interopRequireDefault(_request2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} options
 * @private
 * @returns {Promise}
 */
function prepareOptions(options) {
  if (options.responseType === 'buffer' || options.responseType === 'blob') {
    options.encoding = null;
  }

  if (options.withCredentials) {
    options.jar = true;
  }

  if (Buffer.isBuffer(options.body)) {
    return (0, _detect.detect)(options.body).then(function (type) {
      options.headers['content-type'] = type;
      return options;
    });
  }

  return _promise2.default.resolve(options);
}

/**
 * @param {Object} options
 * @private
 * @returns {Promise}
 */
/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

function doRequest(options) {
  return new _promise2.default(function (resolve) {
    var logger = options.logger;

    var r = (0, _request3.default)(options, function (error, response) {
      if (error) {
        logger.warn(error);
      }

      if (response) {
        response.options = options;

        // I'm not sure why this line is necessary. request seems to be creating
        // buffers that aren't Buffers.
        if (options.responseType === 'buffer' && response.body.type === 'Buffer' && !Buffer.isBuffer(response.body)) {
          response.body = Buffer.from(response.body);
        }

        if (Buffer.isBuffer(response.body) && !response.body.type) {
          resolve((0, _detect.detect)(response.body).then(function (type) {
            response.body.type = type;
            return response;
          }));

          return;
        }

        resolve(response);
      } else {
        // Make a network error behave like a browser network error.
        resolve({
          statusCode: 0,
          options: options,
          headers: options.headers,
          method: options.method,
          url: options.url,
          body: error
        });
      }
    });

    r.on('response', function (response) {
      var total = parseInt(response.headers['content-length'], 10);
      var loaded = 0;
      response.on('data', function (data) {
        loaded += data.length;
        options.download.emit('progress', new _progressEvent2.default(loaded, total));
      });
    });
  });
}

/**
 * @name request
 * @param {Object} options
 * @returns {Promise}
 */
function _request(options) {
  return prepareOptions(options).then(doRequest);
}
//# sourceMappingURL=request.js.map
