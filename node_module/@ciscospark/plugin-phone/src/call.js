/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

/* eslint-env browser: true */

import {defaults, find, get, wrap} from 'lodash';
import {debounce} from 'lodash-decorators';
import {parse} from 'sdp-transform';
import uuid from 'uuid';
import {SparkPlugin} from '@ciscospark/spark-core';
import {
  base64,
  deprecated,
  oneFlight,
  retry,
  tap,
  whileInFlight
} from '@ciscospark/common';
import {
  USE_INCOMING,
  FETCH
} from '@ciscospark/internal-plugin-locus';
import WebRTCMediaEngine, {webrtcHelpers} from '@ciscospark/media-engine-webrtc';

import {
  waitForMediaShare,
  getState,
  getStatus,
  getThisDevice,
  isCall,
  activeParticipants,
  direction,
  isActive,
  joinedOnThisDevice,
  makeInternalCallId,
  participantsToCallMemberships
} from './state-parsers';
import boolToStatus from './bool-to-status';
import CallMemberships from './call-memberships';
import StatsFilter from './stats/filter';
import StatsStream from './stats/stream';

const {
  boolToDirection
} = webrtcHelpers;

const deprecatedCallEventNames = [
  'ringing',
  'connected',
  'disconnected',
  'replaced'
];

/**
 * Pulls the direction line for the specified media kind from an sdp
 * @param {string} kind
 * @param {string} sdp
 * @private
 * @returns {string}
 */
function getMediaDirectionFromSDP(kind, sdp) {
  const parsed = typeof sdp === 'string' ? parse(sdp) : sdp;

  let media;
  if (kind === 'screen') {
    media = parsed.media.find((m) => m.type === 'video' && m.content);
  }
  else {
    media = parsed.media.find((m) => m.type === kind);
  }
  if (!media || !media.direction) {
    return 'inactive';
  }

  return media.direction;
}

/**
 * Reverses a media direction from offer to answer (e.g. sendonly -> recvonly)
 * @param {string} dir
 * @private
 * @returns {string}
 */
function reverseMediaDirection(dir) {
  switch (dir) {
    case 'inactive':
    case 'sendrecv':
      return dir;
    case 'sendonly':
      return 'recvonly';
    case 'recvonly':
      return 'sendonly';
    default:
      throw new Error(`direction "${dir}" is not valid`);
  }
}

const capitalize = {
  audio: 'Audio',
  video: 'Video'
};

/**
 * @event ringing
 * @instance
 * @memberof Call
 * @deprecated with {@link PhoneConfig.enableExperimentalGroupCallingSupport}
 * enabled; instead, listen for {@link Call.membership:notified}
 */

/**
 * @event connected
 * @instance
 * @memberof Call
 * @deprecated with {@link PhoneConfig.enableExperimentalGroupCallingSupport}
 * enabled; instead, listen for {@link Call.active}
 */

/**
 * @event disconnected
 * @instance
 * @memberof Call
 * @deprecated with {@link PhoneConfig.enableExperimentalGroupCallingSupport}
 * enabled; instead, listen for {@link Call.inactive}
 */

/**
 * @event active
 * @instance
 * @memberof Call
 * @description only emitted if enableExperimentalGroupCallingSupport is enabled
 */

/**
 * @event initializing
 * @instance
 * @memberof Call
 * @description only emitted if enableExperimentalGroupCallingSupport is enabled
 */

/**
 * @event inactive
 * @instance
 * @memberof Call
 * @description only emitted if enableExperimentalGroupCallingSupport is enabled
 */

/**
 * @event terminating
 * @instance
 * @memberof Call
 * @description only emitted if enableExperimentalGroupCallingSupport is enabled
 */

/**
 * @event localMediaStream:change
 * @instance
 * @memberof Call
 */

/**
 * @event remoteMediaStream:change
 * @instance
 * @memberof Call
 */

/**
 * @event error
 * @instance
 * @memberof Call
 */

/**
 * @event membership:notified
 * @instance
 * @memberof Call
 * @type {CallMembership}
 * @description This replaces the {@link Call.ringing} event, but note that it's
 * subtly different. {@link Call.ringing} is emitted when the remote party calls
 * {@link Call#acknowledge()} whereas {@link Call.membership:notified} emits
 * shortly after (but as a direct result of) locally calling
 * {@link Phone#dial()}
 */

/**
 * @event membership:connected
 * @instance
 * @memberof Call
 * @type {CallMembership}
 */

/**
 * @event membership:declined
 * @instance
 * @memberof Call
 * @type {CallMembership}
 */

/**
 * @event membership:disconnected
 * @instance
 * @memberof Call
 * @type {CallMembership}
 */

/**
 * @event membership:waiting
 * @instance
 * @memberof Call
 * @type {CallMembership}
 */

/**
 * @event membership:change
 * @instance
 * @memberof Call
 * @type {CallMembership}
 */

/**
 * @event memberships:add
 * @instance
 * @memberof Call
 * @description Emitted when a new {@link CallMembership} is added to
 * {@link Call#memberships}. Note that {@link CallMembership#state} still needs
 * to be read to determine if the instance represents someone actively
 * participating the call.
 */

/**
 * @event memberships:remove
 * @instance
 * @memberof Call
 * @description Emitted when a {@link CallMembership} is removed from
 * {@link Call#memberships}.
 */

/**
 * Payload for {@link Call#sendFeedback}
 * @typedef {Object} FeedbackObject
 * @property {number} userRating Number between 1 and 5 (5 being best) to let
 * the user score the call
 * @property {string} userComments Freeform feedback from the user about the
 * call
 * @property {Boolean} includeLogs set to true to submit client logs to the
 * Cisco Spark cloud. Note: at this time, all logs, not just call logs,
 * generated by the sdk will be uploaded to the Spark Cloud. Care has been taken
 * to avoid including PII in these logs, but if you've taken advantage of the
 * SDK's logger, you should make sure to avoid logging PII as well.
 */

/**
 * @class
 */
const Call = SparkPlugin.extend({
  namespace: 'Phone',

  children: {
    media: WebRTCMediaEngine
  },

  collections: {
    /**
     * @instance
     * @memberof Call
     * @type CallMemberships
     */
    memberships: CallMemberships
  },

  session: {
    activeParticipantsCount: {
      default: 0,
      required: true,
      type: 'number'
    },
    /**
     * Indicates if the other party in the call has turned off their microphone.
     * `undefined` for multiparty calls
     * @instance
     * @memberof Call
     * @readonly
     * @type {boolean}
     */
    remoteAudioMuted: {
      default: false,
      required: false,
      type: 'boolean'
    },

    /**
     * Indicates if the other party in the call has turned off their camera.
     * `undefined` for multiparty calls
     * @instance
     * @memberof Call
     * @readonly
     * @type {boolean}
     */
    remoteVideoMuted: {
      default: false,
      required: false,
      type: 'boolean'
    },

    correlationId: 'string',
    /**
     * @instance
     * @memberof Call
     * @readonly
     * @type {string}
     */
    facingMode: {
      type: 'string',
      values: ['user', 'environment']
    },
    /**
     * Derived from locus.id and locus.fullState.lastActive. Not actually a
     * "derived" property because it shouldn't be reset in event a locus
     * replacement. Marked as private because this isn't necessarily the callId
     * that we'll eventually expose as a first-class feature.
     * @instance
     * @memberof Call
     * @private
     * @readonly
     * @type {string}
     */
    internalCallId: {
      setOnce: true,
      type: 'string'
    },
    locus: 'object',
    /**
     * Returns the local MediaStream for the call. May initially be `null`
     * between the time @{Phone#dial is invoked and the  media stream is
     * acquired if {@link Phone#dial} is invoked without a `localMediaStream`
     * option.
     *
     * This property can also be set mid-call in which case the streams sent to
     * the remote party are replaced by this stream. On success, the
     * {@link Call}'s {@link localMediaStream:change} event fires, notifying any
     * listeners that we are now sending media from a new source.
     * @instance
     * @memberof Call
     * @type {MediaStream}
     */
    localMediaStream: 'object',

    locusJoinInFlight: {
      default: false,
      type: 'boolean'
    },
    locusLeaveInFlight: {
      default: false,
      type: 'boolean'
    },
    /**
     * Test helper. Shortcut to the current user's membership object. not
     * official for now, but may get published at some point
     * @instance
     * @memberof Call
     * @private
     * @type {CallMembership}
     */
    me: {
      type: 'object'
    }
  },

  // Note, in its current form, any derived property that is an object will emit
  // a change event everytime a locus gets replaced, even if no values change.
  // For the moment, this is probably ok; once we have multi-party, regular
  // change events on activeParticipants may be a problem.
  derived: {
    id: {
      deps: ['locus'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return get(this, 'locus.url');
      }
    },
    isActive: {
      deps: ['locus'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return !!(this.locus && isActive(this.locus));
      }
    },
    joinedOnThisDevice: {
      deps: ['locus'],
      default: false,
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return !!(this.locus && joinedOnThisDevice(this.spark, this.locus));
      }
    },
    locusUrl: {
      deps: ['locus'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return get(this, 'locus.url');
      }
    },
    device: {
      deps: ['locus'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return getThisDevice(this.spark, this.locus);
      }
    },
    mediaConnection: {
      deps: ['locus'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        const device = getThisDevice(this.spark, this.locus);
        return get(device, 'mediaConnections[0]');
      }
    },
    mediaId: {
      deps: ['locus'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        const device = getThisDevice(this.spark, this.locus);
        return get(device, 'mediaConnections[0].mediaId');
      }
    },
    /**
     * The other participant in a two-party call. `undefined` for multiparty
     * calls
     * @instance
     * @memberof Call
     * @readyonly
     * @type {CallMembership}
     */
    remoteMember: {
      deps: [
        'memberships',
        'locus'
      ],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        if (isCall(this.locus)) {
          return this.memberships.find((m) => !m.isSelf);
        }

        return undefined;
      }
    },
    direction: {
      deps: ['locus'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        // This seems brittle, but I can't come up with a better way. The only
        // way we should have a Call without a locus is if we just initiated a
        // call but haven't got the response from locus yet.
        if (!this.locus) {
          return 'out';
        }
        return direction(this.locus);
      }
    },
    from: {
      deps: [
        'memberships'
      ],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        if (this.isCall) {
          return this.memberships.find((m) => m.isInitiator);
        }
        return undefined;
      }
    },
    to: {
      deps: [
        'memberships'
      ],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        if (this.isCall) {
          return this.memberships.find((m) => !m.isInitiator);
        }
        return undefined;
      }
    },
    /**
     * <b>active</b> - At least one person (not necessarily this user) is
     * participating in the call<br/>
     * <b>inactive</b> - No one is participating in the call<br/>
     * <b>initializing</b> - reserved for future use<br/>
     * <b>terminating</b> - reserved for future use<br/>
     * Only defined if
     * {@link PhoneConfig.enableExperimentalGroupCallingSupport} has been
     * enabled
     * @instance
     * @memberof Call
     * @member {string}
     * @readonly
     */
    state: {
      deps: [
        'locus'
      ],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        if (this.config.enableExperimentalGroupCallingSupport) {
          return getState(this.locus);
        }

        return undefined;
      }
    },
    /**
     * <b>initiated</b> - Offer was sent to remote party but they have not yet
     * accepted <br>
     * <b>ringing</b> - Remote party has acknowledged the call <br>
     * <b>connected</b> - At least one party is still on the call <br>
     * <b>disconnected</b> - All parties have dropped <br>
     * <b>replaced</b> - In (hopefully) rare cases, the underlying data backing
     * a Call instance may change in such a way that further interaction with
     * that Call is handled by a different instance. In such cases, the first
     * Call's status, will transition to `replaced`, which is almost the same
     * state as `disconnected`. Generally speaking, such a transition should not
     * happen for a Call instance that is actively sending/receiving media.
     * @deprecated The {@link Call#status} attribute will likely be replaced by
     * the {@link Call#state}.
     * @instance
     * @memberof Call
     * @member {string}
     * @readonly
     */
    status: {
      deps: [
        'locus'
      ],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return getStatus(this.spark, this.locus, this.previousAttributes().locus);
      }
    },
    /**
     * Access to the remote party’s `MediaStream`.
     * @instance
     * @memberof Call
     * @member {MediaStream}
     * @readonly
     */
    remoteMediaStream: {
      deps: ['media.remoteMediaStream'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return this.media.remoteMediaStream;
      }
    },
    /**
     * Access to the local party’s screen share `MediaStream`.
     * @instance
     * @memberof Call
     * @member {MediaStream}
     * @readonly
     */
    localScreenShare: {
      deps: ['media.localScreenShare'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return this.media.localScreenShare;
      }
    },
    receivingAudio: {
      deps: ['media.receivingAudio'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return this.media.receivingAudio;
      }
    },
    receivingVideo: {
      deps: ['media.receivingVideo'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return this.media.receivingVideo;
      }
    },
    sendingAudio: {
      deps: ['media.sendingAudio'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return this.media.sendingAudio;
      }
    },
    sendingVideo: {
      deps: ['media.sendingVideo'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return this.media.sendingVideo;
      }
    },
    isCall: {
      deps: ['locus'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return isCall(this.locus);
      }
    },
    supportsDtmf: {
      deps: ['locus'],
      /**
       * @private
       * @returns {mixed}
       */
      fn() {
        return get(this, 'locus.self.enableDTMF');
      }
    }
  },

  @oneFlight
  /**
   * Use to acknowledge (without answering) an incoming call. Will cause the
   * initiator's Call instance to emit the ringing event.
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  acknowledge() {
    this.logger.info('call: acknowledging');
    return this.spark.internal.locus.alert(this.locus)
      .then((locus) => this.setLocus(locus))
      .then(tap(() => this.logger.info('call: acknowledged')));
  },

  @oneFlight
  @whileInFlight('locusJoinInFlight')
  // Note: the `whileInFlight` decorator screws up name inferrence, so we need
  // to include @name below.
  /**
   * Answers an incoming call.
   * @instance
   * @name answer
   * @memberof Call
   * @param {Object} options
   * @param {MediaStreamConstraints} options.constraints
   * @returns {Promise}
   */
  answer(options) {
    this.logger.info('call: answering');
    if (!this.locus) {
      this.logger.info('call: no locus provided, answer() is a noop');
      return Promise.resolve();
    }
    // Locus may think we're joined on this device if we e.g. reload the page,
    // so, we need to check if we also have a working peer connection
    // this.media.pc.remoteDescription.sdp is a temporary proxy for
    // pc.connectionState until chrome catches up to the spec
    if (this.joinedOnThisDevice && this.media.pc.remoteDescription && this.media.pc.remoteDescription.sdp) {
      this.logger.info('call: already joined on this device');
      return Promise.resolve();
    }
    return this.createOrJoinLocus(this.locus, options)
      .then(tap(() => this.logger.info('call: answered')));
  },

  /**
   * Change the receiving media state. may induce a renegoatiation
   * @instance
   * @memberof Call
   * @param {string} kind one of "audio" or "video"
   * @param {boolean} value
   * @private
   * @returns {Promise}
   */
  changeReceivingMedia(kind, value) {
    return new Promise((resolve) => {
      const sdp = parse(this.media.offerSdp);
      const section = find(sdp.media, {type: kind});
      // If the current offer is going to trigger a renegotiation, then we don't
      // need to renegotiate here.
      if (!section || !section.direction.includes('recv')) {
        this.logger.info('changeReceivingMedia: expecting to renegotiate, waiting for media to emit "answeraccepted"');
        this.media.once('answeraccepted', () => resolve());
      }
      else {
        this.logger.info(`changeReceivingMedia: expecting to renegotiate, waiting for call to emit "change:receiving${capitalize[kind]}"`);
        this.once(`change:receiving${capitalize[kind]}`, () => resolve());
      }

      const newDirection = boolToStatus(this.media[`sending${capitalize[kind]}`], value);
      console.warn(`starting to setMedia ${kind} to ${newDirection}`);
      this.media.setMedia(kind, newDirection);
    });
  },

  /**
   * Change the receiving media state. may induce a renegoatiation
   * @instance
   * @memberof Call
   * @param {string} kind one of "audio" or "video"
   * @param {boolean} value
   * @private
   * @returns {Promise}
   */
  changeSendingMedia(kind, value) {
    // Changing media direction only should not trigger renegotiation as long as a new
    // track is not introduced. If that is the case we would expect renegotiation to happen.
    this.logger.info(`changeSendingMedia: changing sending "${kind}" to "${value}"`);
    if (['audio', 'video'].includes(kind)) {
      const tracks = this.media.senderTracks.filter((t) => t.kind === kind);
      const newDirection = boolToStatus(value, this.media[`receiving${capitalize[kind]}`]);

      if (tracks.length > 0) {
        // track already exists, we only need to toggle direction
        return this.media.setMedia(kind, newDirection)
          .then(() => this.updateMuteToggles(kind, value));
      }

      // adding a new track and needs renegotiation
      return new Promise((resolve) => {
        this.once('mediaNegotiationCompleted', () => resolve());
        this.media.setMedia(kind, newDirection);
      });
    }

    return Promise.reject(new Error('kind must be one of "audio" or "video"'));
  },


  /**
   * Does the cleanup after a call has ended
   * @instance
   * @memberof Call
   * @private
   * @returns {Promise}
   */
  cleanup() {
    return new Promise((resolve) => {
      // need to do this on next tick otherwise this.off() prevents remaining
      // events from being received (e.g. other listeners for `disconnected`
      // won't execute)
      process.nextTick(() => {
        this.media.stop();
        this.stopListening(this.spark.internal.mercury);
        this.off();
        resolve();
      });
    });
  },

  // The complexity in createOrJoinLocus is largely driven up by fairly readable `||`s
  /* eslint-disable complexity */
  @oneFlight
  /**
   * Call and answer require nearly identical logic, so this method unifies them.
   * @instance
   * @memberof Call
   * @param {Object|locus} target
   * @param {Object} options
   * @todo remove 'locusMethodName' and move that logic to locus plugin
   * @todo move options and target processing to separate function
   * @todo rename to join()?
   * @returns {Promise}
   */
  createOrJoinLocus(target, options = {}) {
    if (options.localMediaStream) {
      this.localMediaStream = options.localMediaStream;
    }
    else {
      if (!options.constraints) {
        options.constraints = {
          audio: true,
          video: {
            facingMode: {
              ideal: this.spark.phone.defaultFacingMode
            }
          }
        };
      }

      const mode = get(options, 'constraints.video.facingMode.ideal', get(options, 'constraints.video.facingMode.exact'));
      if (mode === 'user' || mode === 'environment') {
        this.facingMode = mode;
      }

      const recvOnly = !options.constraints.audio && !options.constraints.video;
      options.offerOptions = defaults(options.offerOptions, {
        offerToReceiveAudio: recvOnly || !!options.constraints.audio,
        offerToReceiveVideo: recvOnly || !!options.constraints.video
      });

      if (options.constraints.fake) {
        this.media.constraints.fake = true;
      }

      this.media.setMedia('audio', boolToStatus(options.constraints.audio, options.offerOptions.offerToReceiveAudio), options.constraints.audio);
      if (get(options, 'constraints.video.mediaSource') === 'screen' || get(options, 'constraints.video.mediaSource') === 'application') {
        this.media.setMedia('screen', 'sendonly');
      }
      else {
        this.media.setMedia('video', boolToStatus(options.constraints.video, options.offerOptions.offerToReceiveVideo), options.constraints.video);
      }
    }

    if (!target.correlationId) {
      options.correlationId = uuid.v4();
      this.correlationId = options.correlationId;
    }

    if (!this.correlationId) {
      this.correlationId = target.correlationId;
    }

    // reminder: not doing this copy in initialize() because config may not yet
    // be available
    this.media.bandwidthLimit = {
      audioBandwidthLimit: this.config.audioBandwidthLimit,
      videoBandwidthLimit: this.config.videoBandwidthLimit
    };

    return this.media.createOffer()
      .then(tap(() => this.logger.info('created offer')))
      .then(() => this.spark.internal.locus.createOrJoin(target, Object.assign({
        localSdp: this.media.offerSdp,
        correlationId: this.correlationId
      }, options)))
      .then(tap(() => this.logger.info('sent offer to locus')))
      .then(tap(() => this.logger.info('setting locus')))
      .then((locus) => this.setLocus(locus))
      .then(tap(() => this.logger.info('successfully set locus')))
      .then(() => {
        const answer = JSON.parse(this.mediaConnection.remoteSdp).sdp;
        this.logger.info('accepting answer');
        this.logger.info('peer state', this.media.pc && this.media.pc.signalingState);
        if (!this.media.ended) {
          return this.media.acceptAnswer(answer)
            .then(() => this.logger.info('answer accepted'))
            .catch((err) => {
              this.logger.error('failed to accept answer', err);
              return Promise.reject(err);
            });
        }
        this.logger.info('call: already ended, not accepting answer');
        return Promise.resolve();
      });
  },
  /* eslint-enable complexity */

  @deprecated('Please use Call#reject()')
  /**
   * Alias of {@link Call#reject}
   * @see {@link Call#reject}
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  decline() {
    return this.reject();
  },

  @oneFlight
  /**
   * Used by {@link Phone#dial} to initiate an outbound call
   * @instance
   * @memberof Call
   * @param {[type]} invitee
   * @param {[type]} options
   * @private
   * @returns {[type]}
   */
  dial(invitee, options) {
    this.locusJoinInFlight = true;
    this.logger.info('call: dialing');

    let target = invitee;

    if (base64.validate(invitee)) {
      // eslint-disable-next-line no-unused-vars
      const parsed = base64.decode(invitee).split('/');
      const resourceType = parsed[3];
      const id = parsed[4];
      if (resourceType === 'PEOPLE') {
        target = id;
      }

      if (resourceType === 'ROOM') {
        if (!get(this, 'config.enableExperimentalGroupCallingSupport')) {
          throw new Error('Group calling is not enabled. Please enable config.phone.enableExperimentalGroupCallingSupport');
        }

        target = {
          url: `${this.spark.internal.device.services.conversationServiceUrl}/conversations/${id}/locus`
        };
      }
    }

    // Note: mercury.connect() will call device.register() if needed. We're not
    // using phone.register() here because it guarantees a device refresh, which
    // is probably unnecessary.
    this.spark.internal.mercury.connect()
      .then(() => this.createOrJoinLocus(target, options))
      .then(tap(() => this.logger.info('call: dialed')))
      .catch((reason) => {
        this.trigger('error', reason);
      })
      .then(() => {
        this.locusJoinInFlight = false;
      });

    return this;
  },

  /**
   * Returns a {@link Readable} that emits {@link Call#media.pc}'s
   * {@link RTCStatsReport} every second.
   * @instance
   * @memberof Call
   * @returns {StatsStream}
   */
  getRawStatsStream() {
    return new StatsStream(this.media.pc);
  },

  /**
   * Returns a {@link StatsStream} piped through a {@link StatsFilter}
   * @instance
   * @memberof Call
   * @returns {Readable}
   */
  getStatsStream() {
    return this.getRawStatsStream()
      .pipe(new StatsFilter());
  },

  /**
   * Disconnects the active call. Applies to both incoming and outgoing calls.
   * This method may be invoked in any call state and the SDK should take care
   * to tear down the call and free up all resources regardless of the state.
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  hangup() {
    // Note: not a @oneFlight because this function must call itself
    if (this.direction === 'in' && !this.joinedOnThisDevice) {
      return this.reject();
    }

    this.logger.info('call: hanging up');

    this.media.stop();

    if (this.locusJoinInFlight) {
      this.logger.info('call: locus join in flight, waiting for rest call to complete before hanging up');
      return this.when('change:locusJoinInFlight')
        .then(() => this.hangup());
    }

    if (!this.locus) {
      return this.cleanup()
        .then(() => this.logger.info('call: hang up complete, call never created'));
    }

    return this.leave();
  },

  /**
   * Initializer
   * @instance
   * @memberof Call
   * @private
   * @param {Object} attrs
   * @param {Object} options
   * @returns {undefined}
   */
  initialize(...initArgs) {
    Reflect.apply(SparkPlugin.prototype.initialize, this, initArgs);

    this.on('change:activeParticipantsCount', (...args) => this.onChangeActiveParticipantsCount(...args));
    // This handler is untested because there's no way to provoke it. It's
    // probably actually only relevant for group calls.
    this.on('change:isActive', (...args) => this.onChangeIsActive(...args));
    this.on('change:localMediaStream', (...args) => this.onChangeLocalMediaStream(...args));
    // Reminder: this is not a derived property so that we can reassign the
    // stream midcall
    this.on('change:media.localMediaStream', () => {
      this.localMediaStream = this.media.localMediaStream;
    });
    this.on('change:remoteMember', (...args) => this.onChangeRemoteMember(...args));
    [
      'localMediaStream',
      'remoteAudioMuted',
      'remoteMediaStream',
      'remoteVideoMuted',
      'localScreenShare'
    ].forEach((key) => {
      this.on(`change:${key}`, () => this.trigger(`${key}:change`));
    });
    this.on('replaced', () => this.cleanup());

    this.listenTo(this.memberships, 'add', (...args) => this.trigger('memberships:add', ...args));
    this.listenTo(this.memberships, 'change', (...args) => this.trigger('membership:change', ...args));
    this.listenTo(this.memberships, 'change:audioMuted', (...args) => this.onMembershipsAudioMuted(...args));
    this.listenTo(this.memberships, 'change:state', (...args) => this.onMembershipsChangeState(...args));
    this.listenTo(this.memberships, 'change:videoMuted', (...args) => this.onMembershipsVideoMuted(...args));
    this.listenTo(this.memberships, 'remove', (...args) => this.trigger('memberships:remove', ...args));

    this.listenTo(this.spark.internal.mercury, 'event:locus', (event) => this.onLocusEvent(event));
    this.listenTo(this.spark.internal.mercury, 'event:locus.difference', (event) => this.onLocusEvent(event));

    this.listenTo(this.media, 'error', (error) => this.trigger('error', error));
    this.listenTo(this.media, 'internalTrackUpdate', () => {
      this.trigger('remoteMediaStream:change');
    });
    this.listenTo(this.media, 'negotiationneeded', (...args) => this.onMediaNegotiationNeeded(...args));

    if (this.locus) {
      this.internalCallId = makeInternalCallId(this.locus);
    }
    else {
      this.once('change:locus', () => {
        this.internalCallId = makeInternalCallId(this.locus);
      });
    }

    this.memberships.listenToAndRun(this, 'change:locus', () => {
      if (this.locus && this.locus.participants) {
        // Reminder: we're parsing here instead of CallMembership(s) so that we
        // can avoid making those classes spark aware and therefore keep them a
        // lot simpler
        this.memberships.set(participantsToCallMemberships(this.spark, this.locus));
        this.me = this.memberships.find((m) => m.isSelf);
      }
    });

    if (this.config.enableExperimentalGroupCallingSupport) {
      this.on('inactive', () => this.hangup());
      this.on('inactive', () => this.cleanup());

      this.on('change:state', () => {
        process.nextTick(() => this.trigger(this.state));
      });
      this.on = wrap(this.on, (fn, eventName, ...rest) => {
        if (deprecatedCallEventNames.includes(eventName)) {
          throw new Error(`The "${eventName}" event is no longer valid with "enableExperimentalGroupCallingSupport===true"`);
        }

        return Reflect.apply(fn, this, [eventName, ...rest]);
      });
    }
    else {
      this.on('disconnected', () => this.hangup());
      this.on('disconnected', () => this.cleanup());

      this.on('change:status', () => {
        process.nextTick(() => this.trigger(this.status));
      });
    }
  },


  @oneFlight
  @whileInFlight('locusLeaveInFlight')
  /**
   * Does the internal work necessary to end a call while allowing hangup() to
   * call itself without getting stuck in promise change because of oneFlight
   * The name of this function is temporary to address the no-underscore-dangle
   * rule. A future commit in this PR will rename all of the
   * reject/end/hangup/finish functions to be more meaningful and not just be
   * synonyms the same word.
   * @private
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  leave() {
    this.logger.info('leave: attempting to leave locus');
    const status = get(this, this.config.enableExperimentalGroupCallingSupport ? 'me.state' : 'status');
    if (status === 'disconnected') {
      this.logger.info('already hung up, not calling locus again');
      return Promise.resolve();
    }

    if (status === 'declined') {
      this.logger.info('call was declined, not leaving again');
      return Promise.resolve();
    }

    if (status !== 'connected') {
      this.logger.info('call is neither connected, disconnected, or declined, declining instead of leaving');
      return this.decline();
    }

    this.logger.info('leave: leaving locus');
    return this.spark.internal.locus.leave(this.locus)
      .catch((err) => {
        this.logger.error('leave: locus leave error: ', err.stack || err.toString());
        return Promise.reject(err);
      })
      .then(tap(() => this.logger.info(`leave ${this.locus.id}: finished leaving via locus`)))
      .then(tap(() => this.logger.info(`leave ${this.locus.id}: setting locus`)))
      .then((locus) => this.setLocus(locus))
      .then(tap(() => this.logger.info(`leave ${this.locus.id}: finished setting locus`)))
      // Note: not stopping event-listening here; that'll happening
      // automatically when `disconnected` fires.
      .then(tap(() => this.logger.info('call: hung up')));
  },

  /**
   * Handles an incoming mercury event if relevant to this call.
   * @instance
   * @memberof Call
   * @param {Types~MercuryEvent} event
   * @private
   * @returns {undefined}
   */
  onLocusEvent(event) {
    const devices = get(event, 'data.locus.self.devices');
    const device = devices && find(devices, (item) => item.url === this.spark.internal.device.url);

    const internalCallId = this.locus && makeInternalCallId(event.data.locus);
    if (internalCallId === this.internalCallId || device && this.correlationId === device.correlationId) {
      this.logger.info(`locus event: ${event.data.eventType}`);
      this.setLocus(event.data.locus);
    }


    if (event.data.locus.replaces) {
      for (const replaced of event.data.locus.replaces) {
        if (`${replaced.locusUrl}_${replaced.lastActive}` === this.internalCallId) {
          this.setLocus(event.data.locus);
          this.logger.info(`locus replacement event: ${event.data.eventType}`, this.locusUrl, '->', event.data.locus.url);
          return;
        }
      }
    }
  },

  /**
   * Event handler
   * @instance
   * @memberof Call
   * @private
   * @returns {undefined}
   */
  onMembershipsAudioMuted() {
    this.logger.info('onMembershipsAudioMuted');
    if (this.remoteMember) {
      this.remoteAudioMuted = this.remoteMember.audioMuted;
    }
  },

  /**
   * Event handler
   * @instance
   * @memberof Call
   * @private
   * @returns {undefined}
   */
  onMembershipsVideoMuted() {
    this.logger.info('onMembershipsVideoMuted');
    if (this.remoteMember) {
      this.remoteVideoMuted = this.remoteMember.videoMuted;
    }
  },

  /**
   * Event handler
   * @instance
   * @memberof Call
   * @private
   * @returns {undefined}
   */
  onChangeRemoteMember() {
    if (this.remoteMember) {
      this.remoteAudioMuted = this.remoteMember.audioMuted;
      this.remoteVideoMuted = this.remoteMember.videoMuted;
    }
    else {
      this.remoteAudioMuted = undefined;
      this.remoteVideoMuted = undefined;
    }
  },

  /**
   * Event handler
   * @instance
   * @memberof Call
   * @param {Membership} model
   * @private
   * @returns {undefined}
   */
  onMembershipsChangeState(model) {
    this.activeParticipantsCount = this
      .memberships
      .filter((m) => m.state === 'connected')
      .length;

    this.trigger(`membership:${model.state}`, model);
  },

  @debounce()
  /**
   * Event handler
   * @instance
   * @memberof Call
   * @private
   * @returns {undefined}
   */
  onMediaNegotiationNeeded() {
    this.logger.info('onMediaNegotiationNeeded');
    this.media.createOffer()
      .then(() => {
        // Determine mute state for locus from sdp
        const offer = parse(this.media.offerSdp);
        const audioOfferDir = getMediaDirectionFromSDP('audio', offer);
        const audioMuted = !audioOfferDir.includes('send');
        const videoOfferDir = getMediaDirectionFromSDP('video', offer);
        const videoMuted = !videoOfferDir.includes('send');
        const screenOfferDir = getMediaDirectionFromSDP('screen', offer);
        this.logger.info(`onMediaNegotiationNeeded: audioOfferDir=${audioOfferDir} videoOfferDir=${videoOfferDir} screenOfferDir=${screenOfferDir}`);
        this.logger.info(`onMediaNegotiationNeeded: audioMuted=${audioMuted} videoMuted=${videoMuted}`);
        const updateMediaOptions = {
          sdp: this.media.offerSdp,
          mediaId: this.mediaId,
          audioMuted,
          videoMuted
        };
        return this.updateMedia(updateMediaOptions);
      })
      .then(() => this.pollForExpectedLocusAndSdp())
      .then(() => {
        const {sdp} = JSON.parse(this.mediaConnection.remoteSdp);
        return this.media.acceptAnswer(sdp);
      })
      .then(() => this.emit('mediaNegotiationCompleted'))
      .catch((reason) => this.emit('error', reason));
  },

  /**
   * Event handler
   * @instance
   * @memberof Call
   * @private
   * @returns {undefined}
   */
  onChangeLocalMediaStream() {
    if (this.localMediaStream && this.localMediaStream !== this.media.localMediaStream) {
      [
        'audio',
        'video'
      ]
        .forEach((kind) => {
          // eslint-disable-next-line max-nested-callbacks
          const track = this.localMediaStream.getTracks().find((t) => t.kind === kind);
          if (track) {
            this.media.setMedia(kind, boolToStatus(track.enabled, this[`receiving${capitalize[kind]}`]), track);
          }
          else {
            this.media.setMedia(kind, boolToStatus(false, this[`receiving${capitalize[kind]}`]));
          }
        });
      this.localMediaStream = this.media.localMediaStream;
    }
  },

  /**
   * Event handler
   * @instance
   * @memberof Call
   * @private
   * @returns {undefined}
   */
  onChangeIsActive() {
    if (!this.isActive) {
      if (this.joinedOnThisDevice) {
        this.logger.info('call: hanging up due to locus going inactive');
        this.hangup();
      }
    }
  },

  /**
   * Event handler
   * @instance
   * @memberof Call
   * @private
   * @returns {undefined}
   */
  onChangeActiveParticipantsCount() {
    if (!this.joinedOnThisDevice) {
      return;
    }

    if (this.activeParticipantsCount !== 1) {
      return;
    }

    if (this.isCall && !this.config.hangupIfLastActive.call) {
      return;
    }

    if (!this.isCall && !this.config.hangupIfLastActive.meeting) {
      return;
    }

    const previousLocus = this.previousAttributes().locus;
    if (!previousLocus) {
      return;
    }

    if (activeParticipants(previousLocus).length > 1) {
      this.logger.info('call: hanging up due to last participant in call');
      this.hangup();
    }
  },

  @retry
  /**
   * The response to a PUT to LOCUS/media may not be fully up-to-date when we
   * receive it. This method polls locus until we get a locus with the status
   * properties we expect (or three errors occur)
   * @instance
   * @memberof Call
   * @private
   * @returns {Promise<Types~Locus>}
   */
  pollForExpectedLocusAndSdp() {
    return new Promise((resolve, reject) => {
      const offer = parse(this.media.offerSdp);

      const audioOfferDir = getMediaDirectionFromSDP('audio', offer);
      const videoOfferDir = getMediaDirectionFromSDP('video', offer);
      const screenOfferDir = getMediaDirectionFromSDP('screen', offer);

      const self = this;
      let count = 0;
      const validate = () => {
        count += 1;
        try {
          this.logger.info(`iteration ${count}: checking if current locus sdp has the expected audio and video directions`);
          if (isExpectedDirection(JSON.parse(this.mediaConnection.remoteSdp).sdp)) {
            this.logger.info(`iteration ${count}: the current locus sdp has the expected audio and video directions`);
            try {
              this.logger.info(`iteration ${count}: checking if current locus has the expected audio and video directions`);
              this.validateLocusMediaState(this.locus);
              this.logger.info(`iteration ${count}: the current locus has the expected audio and video directions; not syncing`);
              resolve();
              return;
            }
            catch (err) {
              this.logger.info(`iteration ${count}: the current locus does not have the expected audio and video directions; syncing`);
            }
          }
          else {
            this.logger.info(`iteration ${count}: the current locus sdp does not have the expected audio and video directions; syncing`);
          }

          if (count > 4) {
            reject(new Error(`After ${count} attempts polling locus`));
            return;
          }

          setTimeout(() => this.spark.internal.locus.sync(this.locus)
            .then((locus) => this.setLocus(locus))
            .then(validate)
            .catch(reject), 1000 * (2 ** count));
        }
        catch (err) {
          reject(err);
        }
      };

      validate();
      /**
       * Determine if the incoming sdp has the expected media directions
       * @private
       * @param {string} sdp
       * @returns {boolean}
       */
      function isExpectedDirection(sdp) {
        const answer = parse(sdp);

        const audioAnswerDir = getMediaDirectionFromSDP('audio', answer);
        const videoAnswerDir = getMediaDirectionFromSDP('video', answer);
        const screenAnswerDir = getMediaDirectionFromSDP('screen', answer);

        const expectedAudioAnswerDir = reverseMediaDirection(audioOfferDir);
        const expectedVideoAnswerDir = reverseMediaDirection(videoOfferDir);
        const expectedScreenAnswerDir = reverseMediaDirection(screenOfferDir);

        self.logger.info(`audio: ${audioOfferDir}, ${audioAnswerDir}, ${expectedAudioAnswerDir}`);
        self.logger.info(`video: ${videoOfferDir}, ${videoAnswerDir}, ${expectedVideoAnswerDir}`);
        self.logger.info(`screen: ${screenOfferDir}, ${screenAnswerDir}, ${expectedScreenAnswerDir}`);

        // eslint-disable-next-line max-len
        return audioAnswerDir === expectedAudioAnswerDir && videoAnswerDir === expectedVideoAnswerDir && screenAnswerDir === expectedScreenAnswerDir;
      }
    });
  },

  /**
   * Tells locus we're done sharing some or all of our screen.
   * @instance
   * @memberof Call
   * @private
   * @returns {Promise}
   */
  releaseFloor() {
    this.logger.info('call: releasing floor grant');
    return Promise.resolve()
      .then(waitForMediaShare(this))
      .then((mediaShare) => this.spark.internal.locus.releaseFloorGrant(this.locus, mediaShare));
  },

  @oneFlight
  /**
   * Rejects an incoming call. Only applies to incoming calls. Invoking this
   * method on an outgoing call is a no-op.
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  reject() {
    if (this.direction === 'out') {
      return Promise.resolve();
    }

    this.logger.info('call: rejecting');
    /* eslint no-invalid-this: [0] */
    return this.spark.internal.locus.decline(this.locus)
      .then((locus) => this.setLocus(locus))
      .then(tap(() => this.cleanup()))
      .then(tap(() => this.logger.info('call: rejected')));
  },

  /**
   * Tells locus we'd like to share some or all of our screen.
   * @instance
   * @memberof Call
   * @private
   * @returns {Promise}
   */
  requestFloor() {
    this.logger.info('call: requesting floor grant');
    return Promise.resolve()
      .then(waitForMediaShare(this))
      .then((mediaShare) => this.spark.internal.locus.requestFloorGrant(this.locus, mediaShare));
  },

  /**
   * Assigns a new locus to this.locus according to locus sequencing rules
   * @instance
   * @memberof Call
   * @param {Types~Locus} incoming
   * @param {boolean} recursing - when true, indicates that this method has
   * called itself and we should fall back to {@link locus.get()} instead of
   * calling {@link locus.sync()}
   * @private
   * @returns {Promise}
   */
  setLocus(incoming, recursing = false) {
    const current = this.locus;
    if (!current) {
      this.locus = incoming;
      return Promise.resolve();
    }
    const action = this.spark.internal.locus.compare(current, incoming);

    switch (action) {
      case USE_INCOMING:
        this.locus = this.spark.internal.locus.merge(this.locus, incoming);
        if (this.device) {
          this.correlationId = this.device.correlationId;
        }
        break;
      case FETCH:
        if (recursing) {
          this.logger.info('call: fetching locus according to sequencing algorithm');
          return this.spark.internal.locus.get(current)
            .then((locus) => this.setLocus(locus, true));
        }

        this.logger.info('call: syncing locus according to sequencing algorithm');

        return this.spark.internal.locus.sync(current)
          .then((locus) => this.setLocus(locus, true));

      default:
      // do nothing
    }

    return Promise.resolve();
  },

  /**
   * Send DTMF tones to the current call
   * @instance
   * @memberof Call
   * @param {string} tones
   * @returns {Promise}
   */
  sendDtmf(tones) {
    if (!this.supportsDtmf) {
      return Promise.reject(new Error('this call does not support dtmf'));
    }

    return this.spark.internal.locus.sendDtmf(this.locus, tones);
  },

  /**
   * Sends feedback about the call to the Cisco Spark cloud
   * @instance
   * @memberof Call
   * @param {FeedbackObject} feedback
   * @returns {Promise}
   */
  sendFeedback(feedback) {
    return this.spark.internal.metrics.submit('meetup_call_user_rating', feedback);
  },

  /**
   * Shares a particular application as a second stream in the call
   * @returns {Promise}
   */
  startApplicationShare() {
    this.logger.info('call: sharing application');
    return new Promise((resolve) => {
      this.media.once('answeraccepted', resolve);
      this.media.setMedia('screen', 'sendonly', {
        mediaSource: 'application'
      });
    })
      .then(() => this.requestFloor());
  },

  /**
   * Shares the whole screen as a second stream in the call
   * @returns {Promise}
   */
  startScreenShare() {
    this.logger.info('call: sharing screen');

    return new Promise((resolve) => {
      this.media.once('answeraccepted', resolve);
      this.media.setMedia('screen', 'sendonly', {
        mediaSource: 'screen'
      });
    })
      .then(() => this.requestFloor());
  },

  /**
   * Start receiving audio
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  startReceivingAudio() {
    return this.changeReceivingMedia('audio', true);
  },

  /**
   * Start receiving video
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  startReceivingVideo() {
    return this.changeReceivingMedia('video', true);
  },

  /**
   * Starts sending audio to the Cisco Spark Cloud
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  startSendingAudio() {
    return this.changeSendingMedia('audio', true);
  },

  /**
   * Starts sending video to the Cisco Spark Cloud
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  startSendingVideo() {
    return this.changeSendingMedia('video', true);
  },

  /**
   * Stops sharing an application or whole screen media stream
   * @returns {Promise}
   */
  stopScreenShare() {
    this.logger.info('call: stopping screen/application share');

    return this.releaseFloor()
      .then(() => new Promise((resolve) => {
        this.media.once('answeraccepted', resolve);
        this.media.setMedia('screen', 'inactive');
      }));
  },

  /**
   * Stop receiving audio
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  stopReceivingAudio() {
    return this.changeReceivingMedia('audio', false);
  },

  /**
   * Stop receiving video
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  stopReceivingVideo() {
    return this.changeReceivingMedia('video', false);
  },

  /**
   * Stops sending audio to the Cisco Spark Cloud. (stops broadcast immediately,
   * even if renegotiation has not completed)
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  stopSendingAudio() {
    return this.changeSendingMedia('audio', false);
  },

  /**
   * Stops sending video to the Cisco Spark Cloud. (stops broadcast immediately,
   * even if renegotiation has not completed)
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  stopSendingVideo() {
    return this.changeSendingMedia('video', false);
  },

  /**
   * Replaces the current mediaStrem with one with identical constraints, except
   * for an opposite facing mode. If the current facing mode cannot be
   * determined, the facing mode will be set to `user`. If the call is audio
   * only, this function will throw.
   * @instance
   * @memberof Call
   * @returns {undefined}
   */
  toggleFacingMode() {
    if (!this.sendingVideo) {
      throw new Error('Cannot toggle facingMode if we\'re not sending video');
    }

    if (this.facingMode !== 'user' && this.facingMode !== 'environment') {
      throw new Error('Cannot determine current facing mode; specify a new localMediaStream to change cameras');
    }

    const constraint = {
      facingMode: {
        ideal: this.facingMode === 'user' ? 'environment' : 'user'
      }
    };

    // Constraint changes that don't result in a new sender does not trigger renegotiate
    // We now use replaceTrack to swap in a new media
    return this.media.setMedia('video', boolToStatus(this.sendingAudio, this.sendingVideo), constraint)
      .then(() => {
        this.facingMode = constraint.facingMode.ideal;
      });
  },

  /**
   * Toggles receiving audio from the Cisco Spark Cloud
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  toggleReceivingAudio() {
    return this.receivingAudio ? this.stopReceivingAudio() : this.startReceivingAudio();
  },

  /**
   * Toggles receiving video from the Cisco Spark Cloud
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  toggleReceivingVideo() {
    return this.receivingVideo ? this.stopReceivingVideo() : this.startReceivingVideo();
  },

  /**
   * Toggles sending audio to the Cisco Spark Cloud
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  toggleSendingAudio() {
    return this.sendingAudio ? this.stopSendingAudio() : this.startSendingAudio();
  },

  /**
   * Toggles sending video to the Cisco Spark Cloud
   * @instance
   * @memberof Call
   * @returns {Promise}
   */
  toggleSendingVideo() {
    return this.sendingVideo ? this.stopSendingVideo() : this.startSendingVideo();
  },

  /**
   * Changes the status of media
   * @instance
   * @memberof Call
   * @param {Object} payload
   * @private
   * @returns {Promise}
   */
  updateMedia(payload) {
    this.logger.info('updateMedia');
    if (payload.sdp && !payload.sdp.includes('b=')) {
      throw new Error('outbound sdp should always have a \'b=\' line');
    }
    return this.spark.internal.locus.updateMedia(this.locus, payload)
      .then((locus) => this.setLocus(locus));
  },

  /**
   * Updates sdp with correct video status
   * @instance
   * @memberof Call
   * @param {string} sdp
   * @param {boolean} isMuted
   * @private
   * @returns {Promise}
   */
  updateVideoMuteSdp(sdp, isMuted) {
    const newDir = boolToDirection(!isMuted, this.receivingVideo);
    const oldDir = boolToDirection(isMuted, this.receivingVideo);
    return sdp.replace(new RegExp(`a=mid:video[^a]+a=${oldDir}`, 'gi'), `a=mid:video\na=${newDir}`);
  },

  @oneFlight
  /**
   * Tells locus we've got a new media direction
   * @instance
   * @memberof Call
   * @param {string} kind of 'audio' or 'video'
   * @param {boolean} value
   * @private
   * @returns {Promise}
   */
  updateMuteToggles(kind, value) {
    this.logger.info(`updating mute toggles: ${kind}=${value}`);
    const payload = {
      mediaId: this.mediaId,
      audioMuted: !this.sendingAudio,
      videoMuted: !this.sendingVideo
    };
    if (kind === 'audio') {
      payload.audioMuted = !value;
    }
    else if (kind === 'video') {
      payload.videoMuted = !value;
      payload.sdp = this.updateVideoMuteSdp(this.media.offerSdp, !value);
    }

    return this.updateMedia(payload);
  },

  /**
   * Checks that this.locus has the expected state
   * @instance
   * @memberof Call
   * @param {Types~Locus} locus
   * @private
   * @returns {Promise}
   */
  validateLocusMediaState(locus) {
    const locusAudio = locus.self.status.audioStatus.toLowerCase();
    const mediaAudio = this.media.audioDirection;

    if (locusAudio !== mediaAudio) {
      this.logger.warn(`locus: expected audio ${locusAudio} (locus) to equal ${mediaAudio} (local media)`);
      throw new Error('locus.self.status.audioStatus indicates the received DTO is out of date');
    }

    const locusVideo = locus.self.status.videoStatus.toLowerCase();
    const mediaVideo = this.media.videoDirection;
    if (locusVideo !== mediaVideo) {
      this.logger.warn(`locus: expected video ${locusVideo} (locus) to equal ${mediaVideo} (local media)`);
      throw new Error('locus.self.status.videoStatus indicates the received DTO is out of date');
    }

    return locus;
  },

  /**
   * Waits until this.locus describes the expected state
   * @instance
   * @memberof Call
   * @private
   * @returns {Promise}
   */
  waitForExpectedLocus() {
    return new Promise((resolve) => {
      const listener = () => {
        try {
          this.validateLocusMediaState(this.locus);
          this.off('change:locus', listener);
          resolve();
        }
        catch (err) {
          this.logger.warn('locus: current locus not in expected state; waiting for next locus');
        }
      };
      this.on('change:locus', listener);
      listener();
    });
  }
});

Call.make = function make(attrs, options) {
  return new Call(attrs, options);
};

export default Call;
