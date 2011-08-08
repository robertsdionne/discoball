// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @fileoverview
 * @author robertsdionne@gmail.com (Robert Scott Dionne)
 */

/**
 * @param {Window} window The window.
 * @param {discoball.Keys} keys
 * @constructor
 */
webgl.App = function(window, keys) {
  /**
   * @type {Window}
   * @private
   */
  this.window_ = window;

  /**
   * @type {discoball.Keys}
   * @private
   */
  this.keys_ = keys;
  this.reset();
};


/**
 * WebGL context identifier.
 * @type {string}
 */
webgl.App.WEBGL_CONTEXT = 'experimental-webgl';


/**
 * Checks that the dimensions and, if so, dispatches onChange
 * to the Renderer.
 * @private
 */
webgl.App.prototype.checkDimensions_ = function() {
  var width = this.canvas_.width;
  var height = this.canvas_.height;
  if (this.width_ !== width ||
      this.height_ !== height) {
    this.width_ = width;
    this.height_ = height;
    this.renderer_.onChange(this.gl_, width, height);
  }
};


/**
 * Associates this App with the given canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {webgl.Renderer} renderer The renderer.
 */
webgl.App.prototype.install = function(canvas, renderer) {
  this.canvas_ = canvas;
  this.gl_ = /** @type {WebGLRenderingContext} */ (
      this.canvas_.getContext(webgl.App.WEBGL_CONTEXT));
  this.renderer_ = renderer;
};


/**
 * Starts the rendering loop.
 */
webgl.App.prototype.start = function() {
  this.renderer_.onCreate(this.gl_);
  this.onFrame_();
};


/**
 * Dispatches onChange and onDraw events to the Renderer.
 * @private
 */
webgl.App.prototype.onFrame_ = function() {
  this.checkDimensions_();
  this.renderer_.onDraw(this.gl_);
  this.keys_.update();
  this.handle_ = goog.global.requestAnimationFrame(
      goog.bind(this.onFrame_, this));
};


/**
 * Dissociates this App with the previously associated canvas
 * and stops the rendering loop.
 */
webgl.App.prototype.uninstall = function() {
  goog.global.cancelRequestAnimationFrame(this.handle_);
  this.renderer_.onDestroy(this.gl_);
  this.reset();
};


webgl.App.prototype.reset = function() {
  /**
   * @type {HTMLCanvasElement}
   * @private
   */
  this.canvas_ = null;

  /**
   * @type {WebGLRenderingContext}
   * @private
   */
  this.gl_ = null;

  /**
   * @type {webgl.Renderer}
   * @private
   */
  this.renderer_ = null;

  this.handle_ = null;

  /**
   * @type {?number}
   * @private
   */
  this.width_ = null;

  /**
   * @type {?number}
   * @private
   */
  this.height_ = null;
};
