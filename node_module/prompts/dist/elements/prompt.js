'use strict';

const readline = require('readline');

var _require = require('../util');

const action = _require.action;

const EventEmitter = require('events');

var _require2 = require('sisteransi');

const beep = _require2.beep,
      cursor = _require2.cursor;

const color = require('kleur');

/**
 * Base prompt skeleton
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class Prompt extends EventEmitter {
  constructor(opts = {}) {
    super();

    this.first = true;
    this.in = opts.in || process.stdin;
    this.out = opts.out || process.stdout;
    this.onRender = (opts.onRender || (() => void 0)).bind(this);

    const rl = readline.createInterface(this.in);
    readline.emitKeypressEvents(this.in, rl);

    if (this.in.isTTY) this.in.setRawMode(true);

    const keypress = (str, key) => {
      let a = action(key);
      if (a === false) {
        this._ && this._(str, key);
      } else if (typeof this[a] === 'function') {
        this[a](key);
      } else {
        this.bell();
      }
    };

    const close = () => {
      this.out.write(cursor.show);
      this.in.removeListener('keypress', keypress);
      if (this.in.isTTY) this.in.setRawMode(false);
      rl.close();
      this.emit(this.aborted ? 'abort' : 'submit', this.value);
      this.closed = true;
    };
    this.close = close;

    this.in.on('keypress', keypress);
  }

  fire() {
    this.emit('state', {
      value: this.value,
      aborted: !!this.aborted
    });
  }

  bell() {
    this.out.write(beep);
  }

  render() {
    this.onRender(color);
    if (this.first) this.first = false;
  }
}

module.exports = Prompt;