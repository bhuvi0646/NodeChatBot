/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

import {assert} from '@ciscospark/test-helper-chai';
import Metrics, {config} from '@ciscospark/internal-plugin-metrics';
import MockSpark from '@ciscospark/test-helper-mock-spark';
import lolex from 'lolex';
import sinon from '@ciscospark/test-helper-sinon';

function promiseTick(count) {
  let promise = Promise.resolve();
  while (count > 1) {
    promise = promise.then(() => promiseTick(1));
    count -= 1;
  }
  return promise;
}

describe('plugin-metrics', () => {
  describe('Metrics', () => {
    let spark;
    let metrics;
    let clock;

    const eventName = 'test_event';
    const mockPayload = {
      fields: {
        testField: 123
      },
      tags: {
        testTag: 'tag value'
      },
      metricName: eventName,
      test: 'this field should not be included in final payload',
      type: 'behavioral'
    };
    const transformedProps = {
      fields: {
        testField: 123
      },
      tags: {
        testTag: 'tag value'
      },
      metricName: eventName,
      type: 'behavioral',
      timestamp: Date.now()
    };
    const preLoginId = '1b90cf5e-27a6-41aa-a208-1f6eb6b9e6b6';
    const preLoginProps = {
      metrics: [
        transformedProps
      ]
    };
    const mockCallDiagnosticEvent = {
      originTime: {
        triggered: 'mock triggered timestamp'
      }
    };

    beforeEach(() => {
      clock = lolex.install({now: Date.now()});
    });

    afterEach(() => {
      clock.uninstall();
    });

    beforeEach(() => {
      spark = new MockSpark({
        children: {
          metrics: Metrics
        }
      });

      spark.config.metrics = config.metrics;
      metrics = spark.internal.metrics;

      spark.request = function (options) {
        return Promise.resolve({
          statusCode: 204,
          body: undefined,
          options
        });
      };
      sinon.spy(spark, 'request');
      sinon.spy(metrics, 'postPreLoginMetric');
      sinon.spy(metrics, 'aliasUser');
      sinon.spy(metrics, 'submitCallDiagnosticEvents');
    });

    describe('#submit()', () => {
      it('submits a metric', () => {
        const promise = metrics.submit('testMetric');
        return promiseTick(50)
          .then(() => clock.tick(config.metrics.batcherWait))
          .then(() => promise)
          .then(() => {
            assert.calledOnce(spark.request);
            const req = spark.request.args[0][0];
            const metric = req.body.metrics[0];

            assert.property(metric, 'key');
            assert.property(metric, 'version');
            assert.property(metric, 'appType');
            assert.property(metric, 'env');
            assert.property(metric, 'time');
            assert.property(metric, 'version');

            assert.equal(metric.key, 'testMetric');
            assert.equal(metric.version, spark.version);
            assert.equal(metric.env, 'TEST');
          });
      });
    });

    describe('#submitClientMetrics()', () => {
      describe('before login', () => {
        it('posts pre-login metric', () => {
          const date = Date.now();
          const promise = metrics.submitClientMetrics(eventName, mockPayload, preLoginId);
          return promiseTick(50)
            .then(() => clock.tick(config.metrics.batcherWait))
            .then(() => promise)
            .then(() => {
              assert.called(metrics.postPreLoginMetric);
              assert.calledOnce(spark.credentials.getClientToken);
              assert.calledOnce(spark.request);
              const req = spark.request.args[0][0];
              const metric = req.body.metrics[0];

              assert.property(metric, 'metricName');
              assert.property(metric, 'tags');
              assert.property(metric, 'fields');
              assert.property(metric, 'timestamp');
              assert.property(metric, 'type');

              assert.equal(metric.timestamp, date);
              assert.equal(metric.metricName, 'test_event');
              assert.equal(metric.type, 'behavioral');
              assert.equal(metric.fields.testField, 123);
              assert.equal(metric.tags.testTag, 'tag value');
            });
        });
      });
      describe('after login', () => {
        it('submits a metric to clientmetrics', () => {
          const testPayload = {
            tags: {success: true},
            fields: {perceivedDurationInMillis: 314}
          };
          const date = Date.now();
          const promise = metrics.submitClientMetrics('test', testPayload);
          return promiseTick(50)
            .then(() => clock.tick(config.metrics.batcherWait))
            .then(() => promise)
            .then(() => {
              assert.calledOnce(spark.request);
              const req = spark.request.args[0][0];
              const metric = req.body.metrics[0];

              assert.property(metric, 'metricName');
              assert.property(metric, 'tags');
              assert.property(metric, 'fields');
              assert.property(metric, 'timestamp');

              assert.equal(metric.timestamp, date);
              assert.equal(metric.metricName, 'test');
              assert.equal(metric.tags.success, true);
              assert.equal(metric.fields.perceivedDurationInMillis, 314);
            });
        });
      });
    });

    describe('#postPreLoginMetric()', () => {
      it('returns an HttpResponse object', () => {
        const promise = metrics.postPreLoginMetric(preLoginProps, preLoginId);
        return promiseTick(50)
          .then(() => clock.tick(config.metrics.batcherWait))
          .then(() => promise)
          .then(() => {
            assert.calledOnce(spark.request);
            const req = spark.request.args[0][0];
            const metric = req.body.metrics[0];
            const headers = req.headers;

            assert.property(headers, 'x-prelogin-userid');
            assert.property(metric, 'metricName');
            assert.property(metric, 'tags');
            assert.property(metric, 'fields');
            assert.property(metric, 'timestamp');

            assert.equal(metric.timestamp, transformedProps.timestamp);
            assert.equal(metric.metricName, eventName);
            assert.equal(metric.tags.testTag, 'tag value');
            assert.equal(metric.fields.testField, 123);
          });
      });
    });

    describe('#aliasUser()', () => {
      it('returns an HttpResponse object', () => metrics.aliasUser(preLoginId)
        .then(() => {
          assert.calledOnce(spark.request);
          const req = spark.request.args[0][0];
          const params = req.qs;

          sinon.match(params, {alias: true});
        }));
    });

    describe('#submitCallDiagnosticEvents()', () => {
      it('submits a call diagnostic event', () => {
        const promise = metrics.submitCallDiagnosticEvents(mockCallDiagnosticEvent);
        return promiseTick(50)
          .then(() => clock.tick(config.metrics.batcherWait))
          .then(() => promise)
          .then(() => {
            assert.calledOnce(spark.request);
            const req = spark.request.args[0][0];
            const metric = req.body.metrics[0];

            assert.property(metric.eventPayload, 'origin');
            assert.property(metric.eventPayload, 'originTime');
            assert.property(metric.eventPayload.origin, 'buildType');
            assert.property(metric.eventPayload.origin, 'networkType');
            assert.property(metric.eventPayload.originTime, 'sent');
          });
      });
    });
  });
});
