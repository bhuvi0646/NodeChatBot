import {debounce} from 'lodash-decorators';
import {nonenumerable} from 'core-decorators';
import {make as makeTemplateContainer, oneFlight, tap, whileInFlight} from '@ciscospark/common';
import evented from '@ciscospark/common-evented';
import Events from 'ampersand-events';
import {defaults} from 'lodash';
import {parse} from 'sdp-transform';
import grammar from 'sdp-transform/lib/grammar';
import browser from 'bowser';

import {
  ensureH264,
  limitBandwith,
  removeExtmap,
  getMediaDirectionFromTracks,
  kindToPropertyFragment
} from './webrtc-helpers';

// Add support for our custom "content" attribute. Note: this seems to make
// parse() work correctly, but I don't think I could get write() to work.
if (!grammar.a.find((g) => g.name === 'content')) {
  grammar.a.unshift({
    // name appears to be where we stick the value of this field in the parsed
    // media object
    name: 'content',
    // reg determines whether or not this line should be handled by this rule
    reg: /^content:(slides)/
  });
}

const DirectionContainer = makeTemplateContainer(WeakMap, Map);
const targetMediaDirection = new DirectionContainer();

const capitalize = {
  audio: 'Audio',
  video: 'Video'
};

/**
 * Wrapper around targetMediaDirection.get which return `inactive` instead of
 * undefined
 * @param {WebRTCMediaEngine} target
 * @param {string} kind
 * @private
 * @returns {string}
 */
function getTargetMediaDirection(target, kind) {
  return targetMediaDirection.get(target, kind) || 'inactive';
}

/**
 * Interface for doing webrtc things
 * @protected
 */
export default class WebRTCMediaEngine {
  /**
   * Wrapper around navigator.mediaDevices.getUserMedia
   *
   * @param {MediaStreamContraints} constraints
   * @returns {Promise<MediaStream>}
   */
  static getUserMedia(constraints) {
    const finalConstraints = defaults({}, constraints, {fake: process.env.NODE_ENV === 'test'});
    return navigator.mediaDevices.getUserMedia(finalConstraints);
  }

  logger = console

  @evented
  /**
   * Represents the local party's outgoing stream. Instantiated when the class
   * is instantiated.
   * @type {MediaStream}
   */
  localMediaStream

  @evented
  /**
   * Represent the remote party's incoming media. Instantiated when the class is
   * instantiated.
   * @type {MediaStream}
   */
  remoteMediaStream

  @evented
  /**
   * Reserved for future use
   * @type {MediaStream}
   */
  localScreenShare

  /**
   * Peer Connection
   * @type {RTCPeerConnection}
   */
  pc = new RTCPeerConnection({
    iceServers: [],
    bundlePolicy: 'max-compat'
  });

  @evented
  /**
   * The most-recently produced offer
   * @private
   */
  offerSdp = '';

  @evented
  /**
   * The most-recently accepted answer
   * @private
   */
  answerSdp = '';

  @evented
  sendingAudio = false;

  @evented
  sendingVideo = false;

  @evented
  receivingAudio = false;

  @evented
  receivingVideo = false;

  @evented
  ended = false;

  negotiationNeeded = false;

  bandwidthLimit = {
    audioBandwidthLimit: 60000,
    videoBandwidthLimit: 1000000
  };

  /**
   * Returns the current audio direction
   * @returns {string}
   */
  get audioDirection() {
    return getMediaDirectionFromTracks('audio', this.pc);
  }

  /**
   * Returns the current video direction
   * @returns {string}
   */
  get videoDirection() {
    return getMediaDirectionFromTracks('video', this.pc);
  }

  /**
   * Returns the current screen direction
   * @returns {string}
   */
  get screenDirection() {
    return (!this.localScreenShare || this.localScreenShare.getTracks().length === 0) ? 'inactive' : 'sendonly';
  }

  /**
   * Returns the current tracks attached to senders
   * @returns {string}
   */
  get senderTracks() {
    return this.pc.getSenders().reduce((acc, s) => {
      if (s.track) {
        acc.push(s.track);
      }
      return acc;
    }, []);
  }

  /**
   * Returns the current tracks attached to receivers
   * @returns {string}
   */
  get receiverTracks() {
    return this.pc.getReceivers().reduce((acc, r) => {
      if (r.track) {
        acc.push(r.track);
      }
      return acc;
    }, []);
  }

  /**
   * Constructor
   * @param {Object} attrs
   * @param {Object} options
   * @param {Logger} options.logger (optional): defaults to console
   * @returns {WebRTCMediaEngine}
   */
  constructor(attrs = {}, options = {}) {
    if (options.parent) {
      // This is a bit of weirdness to maintain amp-state compatibility
      process.nextTick(() => {
        if (options.parent.logger) {
          this.logger = options.parent.logger;
        }
      });
    }
    else if (attrs.logger) {
      this.logger = attrs.logger;
    }

    this.pc.onnegotiationneeded = () => {
      this.logger.info('peer connection emitted negotiationneeded');
      if (this.answerSdp && !this.negotiationNeeded) {
        this.negotiationNeeded = true;
        this.triggerNegotiationNeeded();
      }
    };

    // Note: adapter.js doesn't seem to fully shim the track event.
    // addEventListener doesn't appear to work for it in chrome
    this.pc.ontrack = (event) => {
      this.logger.info('peerConnection ontrack fired, updating remoteMediaStream');
      this.trigger('track');
      const stream = this.remoteMediaStream || new MediaStream();
      event.streams[0]
        .getTracks()
        .forEach((track) => {
          this.logger.info(`adding ${track.kind} track to remoteMediaStream`);
          if (stream && !stream.getTracks().includes(track)) {
            stream.addTrack(track);
          }
          track.onended = () => {
            this.logger.info(`remote ${track.kind} has ended, removing track from remoteMediaStream`);
            stream.removeTrack(track);
            track.onended = undefined;
            try {
              this[`receiving${capitalize[track.kind]}`] = getMediaDirectionFromTracks(track.kind, this.pc).includes('recv');
            }
            catch (err) {
              this[`receiving${capitalize[track.kind]}`] = false;
            }
          };

          this[`receiving${capitalize[track.kind]}`] = getMediaDirectionFromTracks(track.kind, this.pc).includes('recv');
        });
      this.remoteMediaStream = stream;
      this.trigger('internalTrackUpdate');
    };
  }

  /* eslint-disable complexity */
  /**
   * Determines if ice gathering is necessary and sends it up when appropriate
   * @private
   * @returns {Promise|undefined}
   */
  _prepareIceGatherer() {
    let needsIce = false;
    if (this.pc.iceGatheringState === 'new') {
      this.logger.info('ice gathering is in state "new", definitely need to block for ice gathering');
      needsIce = true;
    }
    else {
      const sdp = parse(this.pc.localDescription.sdp);
      [
        'audio',
        'video',
        'screen'
      ].forEach((kind) => {
        const directionKey = `${kind}Direction`;
        if (this[directionKey] !== 'inactive'
          || getTargetMediaDirection(this, kind) !== this[directionKey]
          && getTargetMediaDirection(this, kind) !== 'inactive') {
          const media = sdp.media.find((m) => m.type === kind);
          if (media) {
            this.logger.info(`${kind} candidates already gathered`);
          }
          else {
            this.logger.info(`transitioning ${kind} from inactive, ice needed`);
            needsIce = true;
          }
        }
      });
    }

    let icePromise;
    if (needsIce) {
      icePromise = new Promise((resolve) => {
        this.logger.info('configuring ice gathering');
        this.pc.onicecandidate = (event) => {
          if (!event.candidate) {
            this.logger.info('ice gathering complete');
            this.pc.onicecandidate = undefined;
            resolve();
            return;
          }

          this.logger.info('got ice candidate');
        };
      });
    }

    return icePromise;
  }

  /* eslint-enable complexity */

  /**
   * Creates an offer SDP
   * @returns {Promise<string>}
   */
  createOffer() {
    this.logger.info('beginning negotiation');

    const td = getTargetMediaDirection(this, 'video');
    const wantsVideo = td.includes('send') || td.includes('recv');

    const icePromise = this._prepareIceGatherer();

    return new Promise((resolve) => {
      if (this.gumming) {
        this.logger.info('gum in flight, waiting until it completes');
        // Since gum is protected by @oneflight, returning it here will block
        // until it completes but, more importantly, propagate a thrown
        // exception up the stack
        resolve(this._getUserMedia()
          .then(tap(() => this.logger.info('gum completed'))));
        return;
      }

      resolve();
    })
      .then(tap(() => this.logger.info('starting create offer', this.offerOptions)))
      .then(() => {
        this.offerOptions.offerToReceiveAudio = !!this.offerOptions.offerToReceiveAudio;
        this.offerOptions.offerToReceiveVideo = !!this.offerOptions.offerToReceiveVideo;
        this.logger.info('creating REAL offer', this.offerOptions);
        this.logger.info(`createOffer audioDirection: ${this.audioDirection}`);
        this.logger.info(`createOffer videoDirection: ${this.videoDirection}`);
        this.logger.info(`createOffer screenDirection: ${this.screenDirection}`);

        // Ensure senders and receivers are in the correct state based on media direction
        this.updateLocalMediaToTargetDirection();
        return this.pc.createOffer(this.offerOptions);
      })

      .then(tap((offer) => {
        offer.sdp = limitBandwith(this.bandwidthLimit, offer.sdp);
        offer.sdp = removeExtmap(offer.sdp);
      }))
      .then(tap(() => this.logger.info('setting local description')))
      .then((offer) => this.pc.setLocalDescription(offer))
      .then(tap(() => icePromise && this.logger.info('blocking for ice gathering')))
      .then(() => icePromise)
      .then(tap(() => this.logger.info('limiting bandwith')))
      .then(() => limitBandwith(this.bandwidthLimit, this.pc.localDescription.sdp))
      .then(tap(() => wantsVideo && this.logger.info('confirm h264 in offer')))
      .then(ensureH264(wantsVideo))
      .then((sdp) => {
        if (this.localScreenShare) {
          // Add content descriptor to the local sdp
          const streamId = this.localScreenShare.id;
          const track = this.localScreenShare.getVideoTracks()[0];
          if (track) {
            const trackId = track.id;
            const msid = `${streamId} ${trackId}`;
            const sections = sdp.split(msid);
            if (sections[1]) {
              sections[1] = `\r\na=content:slides${sections[1]}`;
              sdp = sections.join(msid);
              return sdp;
            }
          }

          sdp += 'a=content:slides\r\n';
        }
        return sdp;
      })
      .then(tap((sdp) => {
        this.offerSdp = sdp;
      }));
  }

  /**
   * Receives an answer SDP
   * @param {string} sdp
   * @returns {Promise}
   */
  acceptAnswer(sdp) {
    this.logger.info('accepting answer');
    this.logger.debug('new answer sdp:', sdp);
    // Allow larger frames (this makes screenshare look *way* better, but no
    // idea what impact it's having on the camera stream - we may want to limit
    // it to just screen share at some future point)
    const defaultCodecParams = /max-mbps=27600;max-fs=920/g;
    const newCodecParams = 'max-mbps=27600;max-fs=8160';
    let newSdp = sdp.replace(defaultCodecParams, newCodecParams);

    // If the screenshare goes inactive, make sure the sdp includes a direction
    // config
    newSdp = newSdp.replace(/m=video 0(.*?\r\n)/, 'm=video 0$1a=inactive\r\n');

    // extmapFix
    newSdp = removeExtmap(newSdp);

    this.logger.debug('cleaned answer sdp:', newSdp);
    // Only accept answer if PeerConnection is in the correct state
    if (this.pc.signalingState === 'have-local-offer') {
      return this.pc.setRemoteDescription(new RTCSessionDescription({
        sdp: newSdp,
        type: 'answer'
      }))
        .then(() => {
          this.logger.info('answer accepted');
          this.answerSdp = newSdp;
          this.sendingAudio = getMediaDirectionFromTracks('audio', this.pc).includes('send');
          this.sendingVideo = getMediaDirectionFromTracks('video', this.pc).includes('send');

          // Update media enabled flags in case we get extra media stream
          this.updateLocalMediaToTargetDirection();
          this.trigger('answeraccepted');
          this.negotiationNeeded = false;
        });
    }
    return Promise.resolve();
  }

  @nonenumerable
  /**
   * {@link MediaStreamConstraints} that'll be used for the next call to
   * {@link WebRTCMediaEngine.getUserMedia()}
   * @private
   * @type {MediaStreamConstraints}
   */
  constraints = {};

  @nonenumerable
  /**
   * {@link RTCOfferOptions} that'll be used for the next call to
   * {@link RTCPeerConnection.createOffer}
   * @private
   * @type {RTCOfferOptions}
   */
  offerOptions = {};

  @nonenumerable
  @evented
  /**
   * Indicates whether or not a call to {@link MediaDevices#getUserMedia()} is
   * in flight
   * @private
   * @type {boolean}
   */
  gumming = false

  /**
   * Change media direction without consumer provided tracks or complex
   * constraints
   * @param {string} kind
   * @param {string} direction
   * @private
   * @returns {Promise}
   */
  _setNewMediaDirection(kind, direction) {
    this.logger.info(`setting ${kind} direction to ${direction}`);
    const isSending = direction.includes('send');
    this.constraints[kind] = isSending;

    if (isSending) {
      const senders = this.pc.getSenders().filter((s) => s.track && s.track.kind === kind);
      if (senders.length > 0) {
        this.logger.info(`enabling existing ${kind} sender track`);
        const localTracks = this.localMediaStream.getTracks().filter((t) => t.kind === kind);
        senders.forEach((s) => {
          s.track.enabled = localTracks.includes(s.track);
        });
        this[`sending${capitalize[kind]}`] = isSending;
        return Promise.resolve();
      }
      if (!this[`${kind}Direction`].includes('send')) {
        // only set new constraints if we were not already sending media
        return this._setNewMediaConstraint(kind, isSending);
      }
    }
    else {
      this.logger.info(`muting ${kind} local tracks`);
      if (!this.localMediaStream) {
        return Promise.resolve();
      }
      return this.localMediaStream
        .getTracks()
        .filter((t) => t.kind === kind)
        .forEach((track) => {
          // We remove the track from localMediaStream, and disable on PeerConnection
          this.logger.info(`muting existing ${kind} track from localMediaStream`);
          const sender = this.pc.getSenders().find((s) => s.track === track);
          if (!browser.firefox) {
            this.localMediaStream.removeTrack(track);
          }
          if (sender) {
            this.logger.info(`muting existing ${kind} track on sender`);
            sender.track.enabled = false;
            track.enabled = false;
            // We must remove sender track from PC when muting
            // browsers will still create SDP media field if we don't remote the track
            if (!browser.firefox) {
              this.pc.removeTrack(sender);
            }
          }
          this.logger.info(`setting sending${capitalize[kind]} to ${isSending}`);
          this[`sending${capitalize[kind]}`] = isSending;
        });
    }
    return Promise.resolve();
  }

  /**
   * Sets or replaces current track for $kind
   * @param {string} kind
   * @param {MediaStreamTrack} track
   * @returns {Promise}
   */
  _setNewMediaTrack(kind, track) {
    this.logger.info(`setting new ${kind} track`);
    this.constraints[kind] = false;
    return this.addOrReplaceTrack(track);
  }

  /**
   * Causes track for ${kind} to be set or replaced according to $constraint
   * @param {string} kind
   * @param {Object|boolean} constraint
   * @returns {Promise}
   */
  _setNewMediaConstraint(kind, constraint) {
    this.logger.info(`setting ${kind} with new constraint`);
    this.constraints[kind] = constraint;
    return this._getUserMedia();
  }

  /**
   * Starts or stops an outbound screenshare
   *
   * @param {string} direction currently only inactive or sendonly
   * @param {Object|MediaStreamTrack} trackOrConstraint
   * @returns {Promise}
   */
  _setScreenShare(direction, trackOrConstraint) {
    this.logger.info('calling _setScreenShare');
    targetMediaDirection.set(this, 'screen', direction);
    if (direction.includes('send')) {
      const constraint = defaults({}, trackOrConstraint, {
        mediaSource: 'application',
        width: {
          min: '160',
          max: '1920'
        },
        height: {
          min: '90',
          max: '1080'
        },
        frameRate: {
          min: '1',
          max: '30'
        }
      });

      this._setNewMediaConstraint('screen', constraint);
      return;
    }

    this.logger.info('removing existing screenshare tracks from peer connection and localScreenShare stream');
    this.pc.getSenders()
      .filter((s) => s.track && this.localScreenShare.getTracks().includes(s.track))
      .forEach((s) => {
        this.logger.info(`removing screenshare track ${s.track.id} from peer connection and localScreenShare stream`);
        const senderTrack = s.track;
        s.track.enabled = false;
        this.localScreenShare.removeTrack(senderTrack);
        this.pc.removeTrack(s);
        senderTrack.stop();
        this.logger.info(`removed screenshare track ${senderTrack.id} from peer connection and localScreenShare stream`);
      });
    // Remove reference to screen share media stream to trigger change event
    this.localScreenShare = false;
  }

  // I don't see any further ways to reduce complexity without hurting
  // readability
  /* eslint-disable complexity */
  /**
   * Sets a media direction for a given media type. Almost certainly triggers
   * renegotiation. This is the method to use if you want to replace a track.
   * @param {string} kind audio|video
   * @param {string} direction sendonly|recvonly|sendrecv|inactive
   * @param {MediaStreamTrack|Object} trackOrConstraint
   * @returns {Promise}
   */
  setMedia(kind, direction, trackOrConstraint) {
    this.logger.info('setMedia');
    if (kind === 'screen') {
      this.logger.info('setMedia: setting new screen direction');
      this._setScreenShare(direction, trackOrConstraint);
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      if (trackOrConstraint) {
        if (!direction.includes('send')) {
          throw new Error(`Cannot set new ${kind} track or constraint if direction does not include send`);
        }

        if (trackOrConstraint instanceof MediaStreamTrack) {
          if (trackOrConstraint.kind !== kind) {
            throw new Error(`track is not a valid ${kind} media stream track`);
          }

          resolve(this._setNewMediaTrack(kind, trackOrConstraint));
        }
        else {
          resolve(this._setNewMediaConstraint(kind, trackOrConstraint));
        }
      }
      else {
        if (direction === getTargetMediaDirection(this, kind)) {
          this.logger.info(`setMedia: ${kind} already transitioning to ${direction}, not making changes`);
          resolve();
        }

        if (direction === this[`${kind}Direction`]) {
          this.logger.info(`setMedia: ${kind} already set to ${direction}, not making changes`);
          resolve();
        }
        resolve(this._setNewMediaDirection(kind, direction));
      }
    }).then(() => {
      const shouldRecv = direction.includes('recv');

      this.logger.info(`setMedia: set targetMediaDirection for ${kind} to ${direction}`);
      targetMediaDirection.set(this, kind, direction);

      this.logger.info(`setMedia: set offerToReceive${kindToPropertyFragment(kind)} to ${shouldRecv}`);
      this.offerOptions[`offerToReceive${kindToPropertyFragment(kind)}`] = shouldRecv;

      const receivers = this.pc.getReceivers().filter((r) => r.track && r.track.kind === kind);

      if (shouldRecv) {
        if (receivers.length > 0) {
          this.logger.info(`setMedia: unpause existing receiving ${kind} track`);
          this.unpauseReceivingMedia(kind);
        }
        else
        if (!receivers.length && this.answerSdp) {
          this.logger.info(`setMedia: no receiving ${kind} track exists, trigger negotiation`);
          this.triggerNegotiationNeeded();
        }
      }
      else if (receivers.length > 0) {
        this.logger.info(`setMedia: pausing existing receiving ${kind} track`);
        this.pauseReceivingMedia(kind);
      }
    });
  }

  /* eslint-enable complexity */
  /**
   * Wrapper around {@link MediaDevices#getUserMedia()} that delays the call one
   * tick to reduce the number of permissions dialogs presented to the user.
   * @name _getUserMedia
   * @returns {Promise<MediaStream>}
   */
  @whileInFlight('gumming')
  @oneFlight
  _getUserMedia() {
    this.logger.info('enqueing request to get user media');
    return new Promise((resolve) => process.nextTick(resolve))
      .then(() => {
        if (this.constraints.audio === true && this.pc.getSenders().find((s) => s.track && s.track.kind === 'audio')) {
          this.logger.info('already have a local audio track, removing constraint for a second one');
          Reflect.deleteProperty(this.constraints, 'audio');
        }

        if (this.constraints.video === true && this.pc.getSenders().find((s) => s.track && s.track.kind === 'video')) {
          this.logger.info('already have a local video track, removing constraint for a second one');
          Reflect.deleteProperty(this.constraints, 'video');
        }

        const {audio, video, screen} = this.constraints;
        this.logger.info(`getting user media with ${audio ? '1' : '0'} audio track, ${video ? '1' : '0'} video track, and ${screen ? '1' : '0'} screenshare track.`);
        return Promise.all([
          (audio || video) && WebRTCMediaEngine.getUserMedia({audio, video}),
          screen && WebRTCMediaEngine.getUserMedia({video: screen})
        ]);
      })
      .then(([userStream, screenStream]) => {
        const p = [];
        if (userStream) {
          this.logger.info(`got local media stream with ${userStream.getAudioTracks().length} audio tracks and ${userStream.getVideoTracks().length} video tracks`);
          userStream.getTracks().forEach((t) => p.push(this.addOrReplaceTrack(t)));
        }

        if (screenStream) {
          if (this.localScreenShare) {
            const sender = this.pc.getSenders().find((s) => this.localScreenShare.getTracks().includes(s.track));

            if (sender) {
              this.logger.info('removing existing screenshare track from localScreenShare stream');
              this.localScreenShare.removeTrack(sender.track);
              this.logger.info('disabling existing screenshare track on sender');
              sender.track.enabled = false;
            }

            // We hope there's only a single track from the screenshare
            screenStream.getTracks().forEach((t) => {
              if (sender) {
                // if a sender already exists and we need to update with a new track, replace the track
                this.logger.info('replacing existing screenshare track on sender');
                p.push(sender.replaceTrack(t));
              }
              else {
                // If we've never sent, we should
                this.logger.info('adding new screen track to peerConnection');
                this.pc.addTrack(t, screenStream);
              }
            });
          }
          else {
            this.logger.info('adding localScreenShare for the first time');
            this.logger.info('adding new screenshare track to peer connection');
            screenStream.getVideoTracks().forEach((t) => this.pc.addTrack(t, screenStream));
          }

          this.localScreenShare = screenStream;
        }

        this.constraints = {};
        return Promise.all(p);
      })
      .catch((err) => {
        this.trigger('error', err);
        return Promise.reject(err);
      });
  }

  /**
   * adds or replaces a local @{link MediaStreamTrack}
   * @private
   * @param {MediaStreamTrack} track
   * @returns {Promise}
   */
  addOrReplaceTrack(track) {
    const p = [];
    if (!this.localMediaStream) {
      this.localMediaStream = new MediaStream();
    }
    const sender = this.pc.getSenders().find((s) => s.track && s.track.kind === track.kind);
    const existingTrack = this.localMediaStream.getTracks().find((t) => t.kind === track.kind);

    if (existingTrack !== track) {
      if (existingTrack) {
        this.logger.info(`removing previous ${existingTrack.kind} track from localMediaStream`);
        this.localMediaStream.removeTrack(existingTrack);
      }

      this.logger.info(`adding new ${track.kind} track to localMediaStream`);
      this.localMediaStream.addTrack(track);
    }

    if (sender) {
      if (sender.track === track) {
        this.logger.info(`new track is the same as existing track, renabling ${track.kind} track on sender`);
        sender.track.enabled = true;
      }
      else {
        this.logger.info(`replacing new ${track.kind} on existing sender`);
        p.push(sender.replaceTrack(track)
          .then(() => {
            this.logger.info(`successfully replace ${track.kind} on existing sender`);
          })
          .catch((e) => {
            // replaceTrack fails silently so we need to check if track was added correctly
            this.logger.warn(e);
            this.logger.warn(`was not able to replace ${track.kind} track on sender`);
            this.logger.info(`adding as new ${track.kind} track to peerConnection`);
            this.pc.removeTrack(sender);
            this.pc.addTrack(track, this.localMediaStream);
          }));
      }
    }
    else {
      this.logger.info(`adding new ${track.kind} track to peerConnection`);
      this.pc.addTrack(track, this.localMediaStream);
    }

    this.logger.info(`setting sending${capitalize[track.kind]} to true`);
    this[`sending${capitalize[track.kind]}`] = true;
    return Promise.all(p);
  }

  /**
   * Stops sending useful bits on the identified track, but does not end it (the
   * camera/mic will stay on but the remote party(s) will not see/hear anything).
   * Avoids renegotiation. Throws if `kind` does not identify a track.
   * @param {string} kind
   * @returns {Promise}
   */
  pauseSendingMedia(kind) {
    if (!kind) {
      throw new Error('kind is required');
    }
    const senders = this.pc
      .getSenders()
      .filter((s) => s.track && s.track.kind === kind);

    if (senders.length === 0) {
      throw new Error(`No ${kind} media senders to pause`);
    }

    senders.forEach((s) => {
      this.logger.info(`pausing ${kind} sender`);
      s.track.enabled = false;
    });

    this.logger.info(`setting sending${capitalize[kind]} to false`);
    this[`sending${capitalize[kind]}`] = false;
  }

  /**
   * Compares target directions with senders and receivers and updates PC to match
   * @returns {undefined}
   */
  updateLocalMediaToTargetDirection() {
    ['audio', 'video'].forEach((kind) => {
      // Get direction value set when updating senders and receivers
      const targetDirection = getTargetMediaDirection(this, kind);
      // Get direction from peer connection
      const direction = this[`${kind}Direction`];
      // If directions don't match, update peer connection to match target
      if (direction !== targetDirection) {
        const shouldSend = targetDirection.includes('send');
        if (direction.includes('send') !== shouldSend) {
          // Update pc senders to correct target direction
          this.pc.getSenders().forEach((s) => {
            if (s.track && s.track.kind === kind) {
              s.track.enabled = shouldSend;
            }
          });
        }
        const shouldRecv = targetDirection.includes('recv');
        if (direction.includes('send') !== shouldRecv) {
          // Update pc receivers to correct target direction
          this.pc.getReceivers().forEach((r) => {
            if (r.track && r.track.kind === kind) {
              r.track.enabled = shouldRecv;
            }
          });
        }
      }
    });
  }

  /**
   * Resumes sending bits on the identified track. Throws if `kind` does not
   * identify a track.
   * @param {string} kind
   * @returns {Promise}
   */
  unpauseSendingMedia(kind) {
    if (!kind) {
      throw new Error('kind is required');
    }
    const senders = this.pc
      .getSenders()
      .filter((s) => s.track && s.track.kind === kind);

    if (senders.length === 0) {
      throw new Error(`No ${kind} media senders to unpause`);
    }

    senders.forEach((s) => {
      this.logger.info(`unpausing ${kind} sender`);
      s.track.enabled = true;
    });

    this.logger.info(`setting sending${capitalize[kind]} to true`);
    this[`sending${capitalize[kind]}`] = true;
  }

  /**
   * Convenience function. Sets a remote track.enabled=false. Does not
   * renegotiate.Throws if `kind` does not identify a track.
   * @param {string} kind
   * @returns {Promise}
   */
  pauseReceivingMedia(kind) {
    if (!kind) {
      throw new Error('kind is required');
    }
    const receivers = this.pc
      .getReceivers()
      .filter((r) => r.track && r.track.kind === kind);

    if (receivers.length === 0) {
      throw new Error(`No ${kind} receiver media tracks to pause`);
    }


    receivers.forEach((r) => {
      this.logger.info(`pausing remote ${kind} track`);
      r.track.enabled = false;
    });

    this.logger.info(`setting receiving${capitalize[kind]} to false`);
    this[`receiving${capitalize[kind]}`] = false;
  }

  /**
   * Convenience function. Sets a remote track.enabled=true. Does not
   * renegotiate.Throws if `kind` does not identify a track.
   * @param {string} kind
   * @returns {Promise}
   */
  unpauseReceivingMedia(kind) {
    if (!kind) {
      throw new Error('kind is required');
    }
    const receivers = this.pc
      .getReceivers()
      .filter((r) => r.track && r.track.kind === kind);

    if (receivers.length === 0) {
      throw new Error(`No ${kind} receiver media tracks to pause`);
    }

    receivers.forEach((r) => {
      this.logger.info(`unpausing ${kind} receiver track`);
      r.track.enabled = true;
    });

    this.logger.info(`setting receiving${capitalize[kind]} to true from ${this[`receiving${capitalize[kind]}`]}`);
    this[`receiving${capitalize[kind]}`] = true;
  }

  /**
   * Stops all tracks and streams, closes the peer connection, and removes all
   * listeners
   * @returns {undefined}
   */
  stop() {
    if (this.pc.signalingState !== 'closed') {
      this.pc.getSenders().forEach((s) => s.track && s.track.stop());
      this.pc.close();
    }

    this.pc.onnegotiationneeded = undefined;
    this.pc.ontrack = undefined;
    this.pc.onicecandidate = undefined;
    this.ended = true;
    this.off();
  }

  @debounce(500)
  /**
   * Debounced helper for triggering `negotiationneeded`.
   * @private
   * @returns {undefined}
   */
  // It's not missing, but the decorator is throwing off eslint
  // eslint-disable-next-line require-jsdoc
  triggerNegotiationNeeded() {
    this.trigger('negotiationneeded');
  }

  /**
   * Returns a string when attempting to serialize object
   * @returns {string}
   */
  serialize() {
    return 'WebRTCMediaEngine';
  }
}

Object.assign(WebRTCMediaEngine.prototype, Events);
