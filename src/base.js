// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @fileoverview
 * @author robertsdionne@gmail.com (Robert Scott Dionne)
 */

var discoball = {};
var webgl = {};


/**
 * @param {Function} callback
 * @param {Element=} opt_element
 */
goog.global.requestAnimationFrame = (function() {
  return goog.global.requestAnimationFrame ||
      goog.global.webkitRequestAnimationFrame ||
      goog.global.mozRequestAnimationFrame ||
      goog.global.oRequestAnimationFrame ||
      goog.global.msRequestAnimationFrame ||
      function(callback, opt_element) {
        goog.global.setTimeout(callback, 1000/60);
      };
})();
