// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @fileoverview
 * @author robertsdionne@gmail.com (Robert Scott Dionne)
 */

var discoball = {};
var webgl = {};


discoball.global = this;


discoball.global.requestAnimationFrame = (function() {
  return discoball.global.requestAnimationFrame ||
      discoball.global.webkitRequestAnimationFrame ||
      discoball.global.mozRequestAnimationFrame ||
      discoball.global.oRequestAnimationFrame ||
      discoball.global.msRequestAnimationFrame ||
      function(callback, element) {
        discoball.global.setTimeout(callback, 1000/60);
      };
})();


discoball.inherits = function(child, parent) {
  var temp = function() {};
  temp.prototype = parent.prototype;
  child.superClass_ = parent.prototype;
  child.prototype = new temp();
  child.prototype.constructor = child;
};


discoball.bind = function(fn, self) {
  var context = self || discoball.global;
  if (arguments > 2) {
    var bound = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(arguments, bound);
      return fn.apply(context, newArgs);
    };
  } else {
    return function() {
      return fn.apply(context, arguments);
    }
  }
};


discoball.nullFunction = function() {};


discoball.abstractMethod = function() {
  throw new Error('Unimplemented abstract method.');
};
