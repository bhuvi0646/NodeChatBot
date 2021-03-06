'use strict';

const color = require('kleur');
const Prompt = require('./prompt');

var _require = require('sisteransi');

const cursor = _require.cursor;

var _require2 = require('../util');

const clear = _require2.clear,
      figures = _require2.figures,
      style = _require2.style;

/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Number} [opts.max] Max choices
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */

class MultiselectPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = opts.cursor || 0;
    this.hint = opts.hint || '- Space to select. Return to submit';
    this.warn = opts.warn || '- This option is disabled';
    this.maxChoices = opts.max;
    this.value = opts.choices.map(v => ({
      title: v && (v.title || v.value || v),
      value: typeof v === 'object' ? v.value : v,
      selected: v && v.selected,
      disabled: v && v.disabled
    }));
    this.clear = clear('');
    this.render();
  }

  reset() {
    this.value.map(v => !v.selected);
    this.cursor = 0;
    this.fire();
    this.render();
  }

  selected() {
    return this.value.filter(v => v.selected);
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    if (this.value[this.cursor].disabled) {
      this.bell();
    } else {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length - 1;
    this.render();
  }
  next() {
    this.cursor = (this.cursor + 1) % this.value.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) return this.bell();
    this.cursor--;
    this.render();
  }

  down() {
    if (this.cursor === this.value.length - 1) return this.bell();
    this.cursor++;
    this.render();
  }

  left() {
    this.value[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.value[this.cursor].selected = true;
    this.render();
  }

  _(c, key) {
    if (c !== ' ') return this.bell();
    const v = this.value[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  render() {
    if (this.closed) return;
    if (this.first) this.out.write(cursor.hide);
    super.render();

    // print prompt
    const selected = this.value.filter(e => e.selected).map(v => v.title).join(', ');
    let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.done ? selected : this.value[this.cursor].disabled ? color.yellow(this.warn) : color.gray(this.hint)].join(' ');

    // print choices
    if (!this.done) {
      const c = this.cursor;
      prompt += '\n' + this.value.map((v, i) => {
        let title;
        if (v.disabled) title = c === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);else title = c === i ? color.cyan().underline(v.title) : v.title;
        return (v.selected ? color.green(figures.tick) : ' ') + ' ' + title;
      }).join('\n');
    }

    this.out.write(this.clear + prompt);
    this.clear = clear(prompt);
  }
}

module.exports = MultiselectPrompt;