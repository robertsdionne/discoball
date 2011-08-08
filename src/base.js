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
 * @return {*} handle
 */
goog.global.requestAnimationFrame = (function() {
  return goog.global.requestAnimationFrame ||
      goog.global.webkitRequestAnimationFrame ||
      goog.global.mozRequestAnimationFrame ||
      goog.global.oRequestAnimationFrame ||
      goog.global.msRequestAnimationFrame ||
      function(callback, opt_element) {
        return goog.global.setTimeout(callback, 1000/60);
      };
})();


/**
 * @param {*} handle
 */
goog.global.cancelRequestAnimationFrame = (function() {
  return goog.global.cancelRequestAnimationFrame ||
      goog.global.webkitCancelRequestAnimationFrame ||
      goog.global.mozCancelRequestAnimationFrame ||
      goog.global.oCancelRequestAnimationFrame ||
      goog.global.msCancelRequestAnimationFrame ||
      function(handle) {
        goog.global.clearTimeout(handle);
      };
})();
