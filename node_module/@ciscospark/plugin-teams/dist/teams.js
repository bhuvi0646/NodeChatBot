'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sparkCore = require('@ciscospark/spark-core');

/**
 * @typedef {Object} TeamObject
 * @property {string} id - (server generated) Unique identifier for the team
 * @property {string} name - The name of the team
 * @property {isoDate} created - (server generated) The date and time that the
 * team was created
 */

/**
* @class
 */
var Teams = _sparkCore.SparkPlugin.extend({
  /**
   * Create a new team.
   * @instance
   * @param {TeamObject} team
   * @returns {Promise<TeamObject>}
   * @memberof Teams
   * @example
   * ciscospark.teams.create({name: 'Create Team Example'})
   *   .then(function(team) {
   *     var assert = require('assert');
   *     assert(team.id);
   *     assert(team.name);
   *     assert(team.created);
   *     return 'success';
   *   });
   *   // => success
   */
  create: function create(team) {
    return this.request({
      method: 'POST',
      service: 'hydra',
      resource: 'teams',
      body: team
    }).then(function (res) {
      return res.body;
    });
  },


  /**
   * Returns a single team
   * @instance
   * @param {TeamObject|string} team
   * @param {Object} options
   * @returns {Promise<TeamObject>}
   * @memberof Teams
   * @example
   * var team;
   * ciscospark.teams.create({name: 'Get Team Example'})
   *   .then(function(r) {
   *     team = r;
   *     return ciscospark.teams.get(team.id);
   *   })
   *   .then(function(team2) {
   *     var assert = require('assert');
   *     assert.equal(team2.id, team.id);
   *     return 'success';
   *   });
   *   // => success
   */
  get: function get(team, options) {
    var id = team.id || team;

    return this.request({
      service: 'hydra',
      resource: 'teams/' + id,
      qs: options
    }).then(function (res) {
      return res.body.items || res.body;
    });
  },


  /**
   * List teams.
   * @instance
   * @param {object} options
   * @param {object} options.max Limit the maximum number of teams in the
   * response.
   * @returns {Promise<Page<TeamObject>>}
   * @memberof Teams
   * @example
   * var createdRooms;
   * Promise.all([
   *   ciscospark.teams.create({name: 'List Teams Example 1'}),
   *   ciscospark.teams.create({name: 'List Teams Example 2'}),
   *   ciscospark.teams.create({name: 'List Teams Example 3'})
   * ])
   *   .then(function(r) {
   *     createdRooms = r;
   *     return ciscospark.teams.list({max: 3});
   *   })
   *   .then(function(teams) {
   *     var assert = require('assert');
   *     assert(teams.length === 3);
   *     for (var i = 0; i < teams.items.length; i+= 1) {
   *       assert(createdRooms.filter(function(room) {
   *         return room.id === teams.items[i].id;
   *       }).length === 1);
   *     }
   *     return 'success';
   *   });
   *   // => success
   */
  list: function list(options) {
    var _this = this;

    return this.request({
      service: 'hydra',
      resource: 'teams/',
      qs: options
    }).then(function (res) {
      return new _sparkCore.Page(res, _this.spark);
    });
  },


  /**
   * Update a team.
   * @instance
   * @param {TeamObject} team
   * @returns {Promise<TeamObject>}
   * @memberof Teams
   * @example
   * var teams;
   * ciscospark.teams.create({name: 'Update Team Example'})
   *   .then(function(r) {
   *     teams = r;
   *     teams.name = 'Teams Example (Updated Title)';
   *     return ciscospark.teams.update(teams);
   *   })
   *   .then(function() {
   *     return ciscospark.teams.get(teams.id);
   *   })
   *   .then(function(teams) {
   *     var assert = require('assert');
   *     assert.equal(teams.name, 'Teams Example (Updated Title)');
   *     return 'success';
   *   });
   *   // => success
    */
  update: function update(team) {
    var id = team.id;
    return this.request({
      method: 'PUT',
      service: 'hydra',
      resource: 'teams/' + id,
      body: team
    }).then(function (res) {
      return res.body;
    });
  },
  version: '1.32.23'
}); /*!
     * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
     */

exports.default = Teams;
//# sourceMappingURL=teams.js.map
