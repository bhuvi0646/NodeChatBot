/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

import '@ciscospark/internal-plugin-wdm';

import {assert} from '@ciscospark/test-helper-chai';
import CiscoSpark from '@ciscospark/spark-core';
import testUsers from '@ciscospark/test-helper-test-users';

describe('plugin-wdm', function () {
  this.timeout(30000);
  describe('Device', () => {
    let spark;

    beforeEach('create users', () => testUsers.create({count: 1})
      .then((users) => {
        spark = new CiscoSpark({
          credentials: {
            supertoken: users[0].token
          }
        });
      }));

    describe('#register()', () => {
      it('registers a device', () => spark.internal.device.register()
        .then(() => {
          assert.property(spark.internal.device, 'modificationTime');
          assert.property(spark.internal.device, 'services');
          assert.property(spark.internal.device, 'url');
          assert.property(spark.internal.device, 'userId');
          assert.property(spark.internal.device, 'webSocketUrl');
          assert.property(spark.internal.device, 'serviceHostMap');
          assert.property(spark.internal.device.serviceHostMap, 'serviceLinks');
          assert.property(spark.internal.device.serviceHostMap, 'hostCatalog');
        }));
    });

    describe('#refresh()', () => {
      let modificationTime;
      beforeEach(() => spark.internal.device.register()
        .then(() => {
          modificationTime = spark.internal.device.modificationTime;
        }));

      it('refreshes a device', () => {
        const url = spark.internal.device.url;
        return spark.internal.device.refresh()
          .then(() => {
            assert.property(spark.internal.device, 'modificationTime');
            assert.property(spark.internal.device, 'services');
            assert.property(spark.internal.device, 'url');
            assert.property(spark.internal.device, 'userId');
            assert.property(spark.internal.device, 'webSocketUrl');
            assert.property(spark.internal.device, 'serviceHostMap');
            assert.property(spark.internal.device.serviceHostMap, 'hostCatalog');
            assert.property(spark.internal.device.serviceHostMap, 'serviceLinks');
            assert.notEqual(spark.internal.device.modificationTime, modificationTime);
            assert.equal(spark.internal.device.url, url, 'Refreshing the device without sending the entire original payload must not give us a new registration');
          });
      });

      it('refreshes the device even if the device has expired', () => {
        const url = spark.internal.device.url;
        return spark.request({
          url,
          method: 'DELETE'
        })
          .then(() => spark.internal.device.refresh())
          .then(() => {
            assert.equal(spark.internal.device.url, url);
          });
      });
    });

    describe('#unregister()', () => {
      it('unregisters the device', () => spark.internal.device.register()
        .then(() => spark.internal.device.unregister())
        .then(() => assert.isUndefined(spark.internal.device.url)));
    });
  });
});
