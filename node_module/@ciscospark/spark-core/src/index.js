/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

import './plugins/logger';
import './lib/credentials';

export {
  Credentials,
  filterScope,
  grantErrors,
  sortScope,
  Token
} from './lib/credentials';

export {
  makeSparkStore,
  makeSparkPluginStore,
  MemoryStoreAdapter,
  NotFoundError,
  persist,
  StorageError,
  waitForValue
} from './lib/storage';

export {
  children,
  default,
  registerPlugin,
  registerInternalPlugin
} from './spark-core';

export {default as SparkHttpError} from './lib/spark-http-error';
export {default as SparkPlugin} from './lib/spark-plugin';
export {default as AuthInterceptor} from './interceptors/auth';
export {default as NetworkTimingInterceptor} from './interceptors/network-timing';
export {default as PayloadTransformerInterceptor} from './interceptors/payload-transformer';
export {default as RedirectInterceptor} from './interceptors/redirect';
export {default as ResponseLoggerInterceptor} from './interceptors/response-logger';
export {default as RequestEventInterceptor} from './interceptors/request-event';
export {default as RequestLoggerInterceptor} from './interceptors/request-logger';
export {default as RequestTimingInterceptor} from './interceptors/request-timing';
export {default as SparkTrackingIdInterceptor} from './interceptors/spark-tracking-id';
export {default as SparkUserAgentInterceptor} from './interceptors/spark-user-agent';
export {default as RateLimitInterceptor} from './interceptors/rate-limit';

export {default as Batcher} from './lib/batcher';
export {default as Page} from './lib/page';
export {default as config} from './config';
