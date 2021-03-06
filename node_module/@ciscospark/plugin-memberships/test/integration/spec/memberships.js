/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

import '@ciscospark/internal-plugin-wdm';
import '@ciscospark/plugin-logger';
import '@ciscospark/plugin-memberships';
import '@ciscospark/plugin-rooms';
import CiscoSpark from '@ciscospark/spark-core';
import {assert} from '@ciscospark/test-helper-chai';
import sinon from '@ciscospark/test-helper-sinon';
import testUsers from '@ciscospark/test-helper-test-users';

describe('plugin-memberships', function () {
  this.timeout(60000);

  let spark, user;
  before(() => testUsers.create({count: 1})
    .then(([u]) => {
      user = u;
      spark = new CiscoSpark({credentials: user.token});
    }));

  describe('#memberships', () => {
    const memberships = [];

    let user1;
    before(() => testUsers.create({count: 1})
      .then((users) => {
        user1 = users[0];
      }));

    afterEach(() => Promise.all(memberships.map((membership) => spark.memberships.remove(membership)
      .catch((reason) => {
        console.error('Failed to delete membership', reason);
      })))
      .then(() => {
        while (memberships.length) {
          memberships.pop();
        }
      }));

    let room;
    beforeEach(() => spark.rooms.create({title: 'Cisco Spark Test Room'})
      .then((r) => {
        room = r;
      }));

    describe('#create()', () => {
      it('creates a membership by user id', () => spark.memberships.create({
        roomId: room.id,
        personId: user1.id
      })
        .then((membership) => {
          assert.isMembership(membership);
        }));

      it('creates a membership by user email', () => spark.memberships.create({
        roomId: room.id,
        personEmail: user1.email
      })
        .then((membership) => {
          assert.isMembership(membership);
        }));

      it('creates a membership and sets moderator status', () => spark.memberships.create({
        roomId: room.id,
        personId: user1.id,
        isModerator: true
      })
        .then((membership) => {
          assert.isMembership(membership);
          assert.isTrue(membership.isModerator);
        }));
    });

    describe('#get()', () => {
      let membership;
      before(() =>
        // this could be in parallel once KMS always sends new keys
        spark.rooms.create({title: 'Membership A'})
          .then((room) => Promise.all([
            room,
            spark.rooms.create({title: 'Membership B'})
          ]))
          .then((rooms) => {
            const room = rooms[0];
            return spark.memberships.create({
              roomId: room.id,
              personId: user1.id
            });
          })
          .then((m) => {
            membership = m;
          }));

      it('retrieves a single membership', () => spark.memberships.get(membership)
        .then((m) => {
          assert.deepEqual(m, membership);
        }));
    });

    describe('#list()', () => {
      let room;
      before(() =>
        // this could be in parallel once KMS always sends new keys
        spark.rooms.create({title: 'Membership A'})
          .then((room) => Promise.all([
            room,
            spark.rooms.create({title: 'Membership B'})
          ]))
          .then((rooms) => {
            room = rooms[0];
            return spark.memberships.create({
              roomId: room.id,
              personId: user1.id
            });
          }));

      it('retrieves all memberships for a room', () => spark.memberships.list({roomId: room.id})
        .then((memberships) => {
          assert.isDefined(memberships);
          assert.isAbove(memberships.length, 0);
          for (const membership of memberships) {
            assert.isMembership(membership);
            assert.equal(membership.roomId, room.id);
          }
        }));

      it('retrieves a bounded set of memberships for a room', () => {
        const spy = sinon.spy();
        return spark.memberships.list({roomId: room.id, max: 1})
          .then((memberships) => {
            assert.lengthOf(memberships, 1);
            return (function f(page) {
              for (const membership of page) {
                spy(membership.id);
              }

              if (page.hasNext()) {
                return page.next().then(f);
              }

              return Promise.resolve();
            }(memberships));
          })
          .then(() => {
            assert.calledTwice(spy);
          });
      });

      it('retrieves all room memberships for a user', () => spark.memberships.list({
        personId: user.id,
        roomId: room.id
      })
        .then((memberships) => {
          const membership = memberships.items[0];
          return spark.memberships.list({
            personEmail: user.email
          })
            .then((memberships) => {
              assert.isDefined(memberships);
              assert.isAbove(memberships.length, 0);
              for (const membership of memberships) {
                assert.isMembership(membership);
                assert.equal(membership.personEmail, user.email);
              }
              assert.deepInclude(memberships.items, membership);
            });
        }));

      it('retrieves a bounded set of memberships for a user', () => {
        const spy = sinon.spy();
        return spark.memberships.list({personId: user.id, max: 1})
          .then((memberships) => {
            assert.lengthOf(memberships, 1);
            return (function f(page) {
              for (const membership of page) {
                assert.equal(membership.personEmail, user.email);
                spy(membership.id);
              }

              if (page.hasNext()) {
                return page.next().then(f);
              }

              return Promise.resolve();
            }(memberships));
          })
          .then(() => {
            assert.isAbove(spy.callCount, 0);
          });
      });
    });

    describe('#update()', () => {
      let membership;
      before(() => spark.rooms.create({title: 'Membership E'})
        .then((room) => spark.memberships.create({
          roomId: room.id,
          personId: user1.id
        }))
        .then((m) => {
          membership = m;
        }));

      it('updates the membership\'s moderator status', () => {
        assert.isFalse(membership.isModerator);
        membership.isModerator = true;
        return spark.memberships.update(membership)
          .then((m) => {
            assert.deepEqual(m, membership);
            assert.isTrue(m.isModerator);
          });
      });
    });

    describe('#remove()', () => {
      let membership, room;
      before(() => spark.rooms.create({title: 'Membership E'})
        .then((r) => {
          room = r;
          return spark.memberships.create({
            roomId: room.id,
            personId: user1.id
          });
        })
        .then((m) => {
          membership = m;
        }));

      it('deletes a single membership', () => spark.memberships.remove(membership)
        .then((body) => {
          assert.notOk(body);
          return spark.memberships.list(room);
        })
        .then((memberships) => {
          assert.notInclude(memberships, membership);
        }));
    });
  });
});
