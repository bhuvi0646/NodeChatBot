/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['qbox.js']) {
  _$jscoverage['qbox.js'] = [];
  _$jscoverage['qbox.js'][1] = 0;
  _$jscoverage['qbox.js'][2] = 0;
  _$jscoverage['qbox.js'][4] = 0;
  _$jscoverage['qbox.js'][6] = 0;
  _$jscoverage['qbox.js'][7] = 0;
  _$jscoverage['qbox.js'][8] = 0;
  _$jscoverage['qbox.js'][9] = 0;
  _$jscoverage['qbox.js'][11] = 0;
  _$jscoverage['qbox.js'][12] = 0;
  _$jscoverage['qbox.js'][14] = 0;
  _$jscoverage['qbox.js'][16] = 0;
  _$jscoverage['qbox.js'][19] = 0;
  _$jscoverage['qbox.js'][22] = 0;
  _$jscoverage['qbox.js'][23] = 0;
  _$jscoverage['qbox.js'][24] = 0;
  _$jscoverage['qbox.js'][26] = 0;
  _$jscoverage['qbox.js'][34] = 0;
  _$jscoverage['qbox.js'][35] = 0;
  _$jscoverage['qbox.js'][36] = 0;
  _$jscoverage['qbox.js'][37] = 0;
  _$jscoverage['qbox.js'][38] = 0;
  _$jscoverage['qbox.js'][40] = 0;
  _$jscoverage['qbox.js'][41] = 0;
  _$jscoverage['qbox.js'][49] = 0;
  _$jscoverage['qbox.js'][50] = 0;
  _$jscoverage['qbox.js'][53] = 0;
  _$jscoverage['qbox.js'][55] = 0;
  _$jscoverage['qbox.js'][56] = 0;
  _$jscoverage['qbox.js'][57] = 0;
  _$jscoverage['qbox.js'][58] = 0;
  _$jscoverage['qbox.js'][60] = 0;
  _$jscoverage['qbox.js'][62] = 0;
  _$jscoverage['qbox.js'][63] = 0;
  _$jscoverage['qbox.js'][65] = 0;
  _$jscoverage['qbox.js'][66] = 0;
  _$jscoverage['qbox.js'][67] = 0;
  _$jscoverage['qbox.js'][71] = 0;
  _$jscoverage['qbox.js'][74] = 0;
  _$jscoverage['qbox.js'][82] = 0;
  _$jscoverage['qbox.js'][84] = 0;
  _$jscoverage['qbox.js'][85] = 0;
  _$jscoverage['qbox.js'][86] = 0;
  _$jscoverage['qbox.js'][87] = 0;
  _$jscoverage['qbox.js'][93] = 0;
  _$jscoverage['qbox.js'][94] = 0;
  _$jscoverage['qbox.js'][101] = 0;
  _$jscoverage['qbox.js'][102] = 0;
  _$jscoverage['qbox.js'][103] = 0;
  _$jscoverage['qbox.js'][104] = 0;
  _$jscoverage['qbox.js'][105] = 0;
  _$jscoverage['qbox.js'][106] = 0;
  _$jscoverage['qbox.js'][110] = 0;
  _$jscoverage['qbox.js'][111] = 0;
  _$jscoverage['qbox.js'][112] = 0;
  _$jscoverage['qbox.js'][113] = 0;
  _$jscoverage['qbox.js'][114] = 0;
  _$jscoverage['qbox.js'][118] = 0;
  _$jscoverage['qbox.js'][120] = 0;
  _$jscoverage['qbox.js'][121] = 0;
}
_$jscoverage['qbox.js'][1]++;
var util = require("util");
_$jscoverage['qbox.js'][2]++;
var EventEmitter = require("events").EventEmitter;
_$jscoverage['qbox.js'][4]++;
function QBox(steps) {
  _$jscoverage['qbox.js'][6]++;
  var isReady = false;
  _$jscoverage['qbox.js'][7]++;
  var queue = [];
  _$jscoverage['qbox.js'][8]++;
  var isStop = false;
  _$jscoverage['qbox.js'][9]++;
  var startingCallback;
  _$jscoverage['qbox.js'][11]++;
  var ticks;
  _$jscoverage['qbox.js'][12]++;
  var countingSteps = null;
  _$jscoverage['qbox.js'][14]++;
  if (typeof steps == "number") {
    _$jscoverage['qbox.js'][16]++;
    countingSteps = steps;
  }
  else {
    _$jscoverage['qbox.js'][19]++;
    addTicks();
  }
  _$jscoverage['qbox.js'][22]++;
  this.ready = (function (callback) {
  _$jscoverage['qbox.js'][23]++;
  if (isReady && ! isStop) {
    _$jscoverage['qbox.js'][24]++;
    callback();
  }
  else {
    _$jscoverage['qbox.js'][26]++;
    queue.push(callback);
  }
});
  _$jscoverage['qbox.js'][34]++;
  this.start = (function () {
  _$jscoverage['qbox.js'][35]++;
  if (! isStop) {
    _$jscoverage['qbox.js'][36]++;
    isReady = true;
    _$jscoverage['qbox.js'][37]++;
    queue.forEach((function (callback) {
  _$jscoverage['qbox.js'][38]++;
  callback();
}));
    _$jscoverage['qbox.js'][40]++;
    queue = [];
    _$jscoverage['qbox.js'][41]++;
    if (startingCallback) {
      _$jscoverage['qbox.js'][41]++;
      startingCallback();
    }
  }
});
  _$jscoverage['qbox.js'][49]++;
  this.onStart = (function (callback) {
  _$jscoverage['qbox.js'][50]++;
  startingCallback = callback;
});
  _$jscoverage['qbox.js'][53]++;
  this.tick = (function (step) {
  _$jscoverage['qbox.js'][55]++;
  if (countingSteps != null) {
    _$jscoverage['qbox.js'][56]++;
    countingSteps--;
    _$jscoverage['qbox.js'][57]++;
    if (countingSteps == 0) {
      _$jscoverage['qbox.js'][58]++;
      this.start();
    }
  }
  else {
    _$jscoverage['qbox.js'][60]++;
    if (ticks && ticks instanceof Array) {
      _$jscoverage['qbox.js'][62]++;
      var index = ticks.indexOf(step);
      _$jscoverage['qbox.js'][63]++;
      if (index >= 0) {
        _$jscoverage['qbox.js'][65]++;
        ticks.splice(index, 1);
        _$jscoverage['qbox.js'][66]++;
        if (ticks.length == 0) {
          _$jscoverage['qbox.js'][67]++;
          this.start();
        }
      }
      else {
        _$jscoverage['qbox.js'][71]++;
        throw new Error("Invalid step: '" + step + "' provided");
      }
    }
    else {
      _$jscoverage['qbox.js'][74]++;
      throw new Error("Cannot tick - no steps are provided");
    }
  }
});
  _$jscoverage['qbox.js'][82]++;
  this.timeout = (function (amount, callback) {
  _$jscoverage['qbox.js'][84]++;
  if (! isStop) {
    _$jscoverage['qbox.js'][85]++;
    setTimeout((function () {
  _$jscoverage['qbox.js'][86]++;
  if (! isReady && ! isStop) {
    _$jscoverage['qbox.js'][87]++;
    callback(ticks);
  }
}), amount);
  }
});
  _$jscoverage['qbox.js'][93]++;
  this.stop = (function () {
  _$jscoverage['qbox.js'][94]++;
  isStop = true;
});
  _$jscoverage['qbox.js'][101]++;
  this.reset = (function () {
  _$jscoverage['qbox.js'][102]++;
  isReady = false;
  _$jscoverage['qbox.js'][103]++;
  isStop = false;
  _$jscoverage['qbox.js'][104]++;
  addTicks();
  _$jscoverage['qbox.js'][105]++;
  if (countingSteps != null) {
    _$jscoverage['qbox.js'][106]++;
    countingSteps = steps;
  }
});
  _$jscoverage['qbox.js'][110]++;
  function addTicks() {
    _$jscoverage['qbox.js'][111]++;
    if (steps && steps.length > 0) {
      _$jscoverage['qbox.js'][112]++;
      ticks = [];
      _$jscoverage['qbox.js'][113]++;
      steps.forEach((function (tick) {
  _$jscoverage['qbox.js'][114]++;
  ticks.push(tick);
}));
    }
}
}
_$jscoverage['qbox.js'][118]++;
;
_$jscoverage['qbox.js'][120]++;
exports.create = (function (steps) {
  _$jscoverage['qbox.js'][121]++;
  return new QBox(steps);
});
_$jscoverage['qbox.js'].source = ["var util = require('util');","var EventEmitter = require('events').EventEmitter;","","function QBox(steps) {","\t","\tvar isReady = false;","\tvar queue = [];","\tvar isStop = false;","\tvar startingCallback;","","\tvar ticks;","\tvar countingSteps = null;","","\tif(typeof(steps) == 'number') {","\t\t//used for steps in a number","\t\tcountingSteps = steps;","\t} else {","\t\t//used for steps as an array","\t\taddTicks(); //copy steps into ticks","\t}","","\tthis.ready = function(callback) {","\t\tif(isReady &amp;&amp; !isStop) {","\t\t\tcallback();","\t\t} else {","\t\t\tqueue.push(callback);","\t\t}","\t};","\t","\t/**","\t\tStart the QBox and execute all the callbacks in the queue","\t\tand clear the queue","\t*/","\tthis.start = function() {","\t\tif(!isStop) {","\t\t\tisReady = true;","\t\t\tqueue.forEach(function(callback) {","\t\t\t\tcallback();","\t\t\t});","\t\t\tqueue = [];","\t\t\tif(startingCallback) startingCallback();","\t\t}","\t};","","\t/**","\t\tAdd a single callback to call each and every time ","\t\tQbox starting (mostely used with reset())","\t*/","\tthis.onStart = function(callback) {","\t\tstartingCallback = callback;","\t};","\t","\tthis.tick = function(step) {","\t\t","\t\tif(countingSteps != null) {","\t\t\tcountingSteps--;","\t\t\tif(countingSteps == 0) {","\t\t\t\tthis.start();","\t\t\t}","\t\t} else if(ticks &amp;&amp; ticks instanceof Array) {","\t\t\t","\t\t\tvar index = ticks.indexOf(step);","\t\t\tif(index &gt;= 0) {","\t\t\t\t","\t\t\t\tticks.splice(index, 1);","\t\t\t\tif(ticks.length == 0) {","\t\t\t\t\tthis.start();","\t\t\t\t}","\t\t\t} else {","\t\t\t\t","\t\t\t\tthrow new Error(\"Invalid step: '\" + step + \"' provided\");","\t\t\t}","\t\t} else {","\t\t\tthrow new Error(\"Cannot tick - no steps are provided\");","\t\t}","\t};","\t","\t/**","\t * @param amount - no of millies fot timeout","\t * callback - function([]){} containing remaining steps","\t */","\tthis.timeout = function(amount, callback) {","\t\t","\t\tif(!isStop) {","\t\t\tsetTimeout(function() {","\t\t\t\tif(!isReady &amp;&amp; !isStop) {","\t\t\t\t\tcallback(ticks);","\t\t\t\t}","\t\t\t}, amount);","\t\t}","\t};","\t","\tthis.stop = function() {","\t\tisStop = true;","\t};","","\t/**","\t\tReset the QBOX and make is available to start again","\t\tAnd does not clean callbacks in the queue and onStart Callback","\t*/","\tthis.reset = function() {","\t\tisReady = false;","\t\tisStop = false;","\t\taddTicks();","\t\tif(countingSteps != null) {","\t\t\tcountingSteps = steps;","\t\t}","\t};","","\tfunction addTicks() {","\t\tif(steps &amp;&amp; steps.length &gt; 0) {","\t\t\tticks = [];","\t\t\tsteps.forEach(function(tick) {","\t\t\t\tticks.push(tick);","\t\t\t});","\t\t}","\t}","};","","exports.create = function(steps) {","\treturn new QBox(steps);","};"];
