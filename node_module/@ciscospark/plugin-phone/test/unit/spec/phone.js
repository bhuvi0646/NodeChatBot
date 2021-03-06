/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

import Phone from '@ciscospark/plugin-phone';
import {assert} from '@ciscospark/test-helper-chai';
import sinon from '@ciscospark/test-helper-sinon';
import CiscoSpark from '@ciscospark/spark-core';
import Locus from '@ciscospark/internal-plugin-locus';
import MockSpark from '@ciscospark/test-helper-mock-spark';
import AmpState from 'ampersand-state';
import {browserOnly} from '@ciscospark/test-helper-mocha';
import Mercury from '@ciscospark/internal-plugin-mercury';
import Device from '@ciscospark/internal-plugin-wdm';

import {makeLocusEvent} from '../../lib/locus';

browserOnly(describe)('plugin-phone', () => {
  describe('Phone', () => {
    describe('#isCallingSupported()', () => {
      let spark;
      beforeEach(() => {
        spark = new CiscoSpark();
      });
      // This is sort of a silly test since we only actually run this test in
      // browsers that support calling...
      it('returns true', () => spark.phone.isCallingSupported()
        .then((result) => assert.deepEqual(result, true)));
    });

    describe('#defaultFacingMode', () => {
      let spark;
      beforeEach(() => {
        spark = new MockSpark({
          children: {
            device: AmpState.extend({}),
            locus: Locus,
            mercury: AmpState.extend({
              connect() {
                return Promise.resolve();
              },
              when() {
                return Promise.resolve([{
                  data: {
                    bufferState: {
                      locus: 'BUFFERED'
                    }
                  }
                }]);
              }
            }),
            phone: Phone
          }
        });

        sinon.stub(spark.internal.locus, 'join');
        sinon.stub(spark.internal.locus, 'create');
        sinon.stub(spark.internal.locus, 'list').returns(Promise.resolve([]));

        spark.internal.device = {
          refresh: () => Promise.resolve()
        };
        spark.config.phone = {
          audioBandwidthLimit: 64000,
          videoBandwidthLimit: 1000000
        };
      });

      it('defaults to user', () => {
        assert.equal(spark.phone.defaultFacingMode, 'user');
      });

      describe('when video constraints are not specified', () => {
        it('gets passed as the video constraint', (done) => {
          const call = spark.phone.dial('blarg');
          call.once('error', done);
          sinon.stub(call.media, 'createOffer').callsFake(() => {
            try {
              assert.isTrue(call.media.constraints.audio);
              assert.deepEqual(call.media.constraints.video, {
                facingMode: {
                  ideal: 'user'
                }
              });
              done();
            }
            catch (err) {
              done(err);
            }
          });
        });
      });

      describe('when video constraints are specified', () => {
        it('does not get passed as the video constraint', (done) => {
          const call = spark.phone.dial('blarg', {
            constraints: {
              audio: true
            }
          });
          call.once('error', done);
          sinon.stub(call.media, 'createOffer').callsFake(() => {
            try {
              assert.isTrue(call.media.constraints.audio);
              assert.notOk(call.media.constraints.video);
              done();
            }
            catch (err) {
              done(err);
            }
          });
        });
      });
    });

    describe('when two events arrive for the same locus', () => {
      let spark;
      beforeEach(() => {
        spark = new MockSpark({
          children: {
            device: Device,
            mercury: Mercury,
            locus: Locus,
            phone: Phone
          }
        });
        spark.people = {
          inferPersonIdFromUuid(id) {
            return id;
          }
        };
        spark.config.phone = {audioBandwidthLimit: 64000, videoBandwidthLimit: 1000000};
      });

      it('only emits a single call:incoming event', () => {
        const spy = sinon.spy();
        spark.phone.on('call:incoming', spy);
        const id = Date.now();
        spark.internal.mercury._onmessage(makeLocusEvent({
          id,
          lastActive: 1
        }));
        return Promise.resolve()
          .then(() => {
            assert.calledOnce(spy);
            spark.internal.mercury._onmessage(makeLocusEvent({
              id,
              lastActive: 1
            }));
          })
          .then(() => {
            assert.calledOnce(spy);
          });
      });
    });
  });
});
