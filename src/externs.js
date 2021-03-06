// Copyright 2011 Robert Scott Dionne. All Rights Reserved.


/**
 * @param {Function} callback
 * @param {Element=} opt_element
 */
Window.prototype.mozRequestAnimationFrame = function(callback, opt_element) {};


/**
 * @param {*} handle
 */
Window.prototype.mozCancelRequestAnimationFrame = function(handle) {};


/**
 * @param {Function} callback
 * @param {Element=} opt_element
 */
Window.prototype.msRequestAnimationFrame = function(callback, opt_element) {};


/**
 * @param {*} handle
 */
Window.prototype.msCancelRequestAnimationFrame = function(handle) {};


/**
 * @param {Function} callback
 * @param {Element=} opt_element
 */
Window.prototype.oRequestAnimationFrame = function(callback, opt_element) {};


/**
 * @param {*} handle
 */
Window.prototype.oCancelRequestAnimationFrame = function(handle) {};


/**
 * @param {Function} callback
 * @param {Element=} opt_element
 */
Window.prototype.requestAnimationFrame = function(callback, opt_element) {};


/**
 * @param {*} handle
 */
Window.prototype.cancelRequestAnimationFrame = function(handle) {};


/**
 * @param {Function} callback
 * @param {Element=} opt_element
 */
Window.prototype.webkitRequestAnimationFrame =
    function(callback, opt_element) {};


/**
 * @param {*} handle
 */
Window.prototype.webkitCancelRequestAnimationFrame = function(handle) {};
