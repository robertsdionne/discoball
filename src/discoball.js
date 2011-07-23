// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @fileoverview
 * @author robertsdionne@gmail.com (Robert Scott Dionne)
 */

discoball.load = function() {
  var keys = new discoball.Keys(document);
  new webgl.App(window, keys)
      .install({
        'c0': new discoball.Renderer(keys)
      }, 'stats');
};
window.onload = discoball.load;


/**
 * @constructor
 */
discoball.Renderer = function(keys) {

  /**
   * @type {!discoball.Keys}
   */
  this.keys_ = keys;

  /**
   * @type {WebGLProgram}
   */
  this.p_ = null;

  /**
   * @type {WebGLBuffer}
   */
  this.ball_ = null;

  /**
   * @type {boolean}
   */
  this.rotate_ = true;
};
discoball.inherits(discoball.Renderer, webgl.Renderer);


/**
 * @param {WebGLRenderingContext} gl
 * @param {number} width
 * @param {number} height
 */
discoball.Renderer.prototype.onChange = function(gl, width, height) {
  gl.viewport(0, 0, width, height);
  var aspect = width/height;
  this.projection_ = this.getFrustumMatrix(
      -aspect/10, aspect/10, -0.1, 0.1, 0.1, 30);
};


discoball.Renderer.prototype.getShaderSource = function(id) {
  return discoball.global.document.getElementById(id).text;
};


/**
 * @param {WebGLRenderingContext} gl
 */
discoball.Renderer.prototype.onCreate = function(gl) {
  this.keys_.install();
  var vertex = new webgl.Shader('v0',
      gl.VERTEX_SHADER,
      this.getShaderSource('quatlib') + this.getShaderSource('v0'));
  var fragment = new webgl.Shader('f0',
      gl.FRAGMENT_SHADER, this.getShaderSource('f0'));
  this.p_ = new webgl.Program(vertex, fragment);
  this.p_.create(gl);
  this.p_.link(gl);

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);

  this.ball_ = gl.createBuffer();

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  this.root_ = discoball.DualQuaternion.fromTranslation(
      new discoball.Vector(0, 0, -15));

  var ball = new discoball.Ball(10, 128, [1, 1, 1]);
  b = ball.buildTriangles();
  this.ballVertexCount_ = ball.getTriangleVertexCount();

  gl.bindBuffer(gl.ARRAY_BUFFER, this.ball_);
  gl.bufferData(gl.ARRAY_BUFFER, b.byteLength, gl.STATIC_DRAW);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, b);

  this.texture_ = this.loadCubeMap(gl, [
    'apx.jpg',
    'anx.jpg',
    'apy.jpg',
    'any.jpg',
    'apz.jpg',
    'anz.jpg'
  ]);
};


discoball.Renderer.prototype.loadCubeMap = function(gl, paths) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  var faces = [
    gl.TEXTURE_CUBE_MAP_POSITIVE_X,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
    gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
    gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
  ];
  for (var i = 0; i < 6; ++i) {
    var image = document.createElement('img');
    var face = faces[i];
    image.onload = this.buildOnLoad(gl, face, image);
    image.src = paths[i];
  }
  return texture;
};


discoball.Renderer.prototype.buildOnLoad = function(gl, face, image) {
  return function() {
    gl.texImage2D(face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  };
};


/**
 * @param {WebGLRenderingContext} gl
 */
discoball.Renderer.prototype.onDestroy = discoball.nullFunction;


discoball.Renderer.prototype.getFrustumMatrix = function(
    left, right, bottom, top, near, far) {
  var a = (right + left) / (right - left);
  var b = (top + bottom) / (top - bottom);
  var c = -(far + near) / (far - near);
  var d = -(2 * far * near) / (far - near);
  return [
    2 * near / (right - left), 0, 0, 0,
    0, 2 * near / (top - bottom), 0, 0,
    a, b, c, -1,
    0, 0, d, 0
  ];
};


discoball.Renderer.prototype.render = function(
    gl, program, buffer, palette, n, type) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.uniform4fv(program.uJointPalette, palette);
  gl.vertexAttribPointer(program.aPosition, 3, gl.FLOAT, false, 40, 0);
  gl.enableVertexAttribArray(program.aPosition);
  if (program.aNormal >= 0) {
    gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 40, 12);
    gl.enableVertexAttribArray(program.aNormal);
  }
  if (program.aColor >= 0) {
    gl.vertexAttribPointer(program.aColor, 3, gl.FLOAT, false, 40, 24);
    gl.enableVertexAttribArray(program.aColor);
  }
  if (program.aJoint >= 0) {
    gl.vertexAttribPointer(program.aJoint, 1, gl.FLOAT, false, 40, 36);
    gl.enableVertexAttribArray(program.aJoint);
  }
  gl.drawArrays(type, 0, n);
  gl.disableVertexAttribArray(program.aPosition);
  if (program.aNormal >= 0) {
    gl.disableVertexAttribArray(program.aNormal);
  }
  if (program.aColor >= 0) {
    gl.disableVertexAttribArray(program.aColor);
  }
  if (program.aJoint >= 0) {
    gl.disableVertexAttribArray(program.aJoint);
  }
};


discoball.Renderer.prototype.scenePass = function(gl) {
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  gl.useProgram(this.p_.handle);
  gl.cullFace(gl.BACK);
  gl.uniformMatrix4fv(this.p_.uProjection, false, this.projection_);
  gl.uniform1i(this.p_.uTexture, this.texture_);
  var palette = new discoball.Pose([this.root_]).get();
  this.render(
      gl, this.p_, this.ball_, palette, this.ballVertexCount_, gl.TRIANGLES);
};


discoball.Renderer.DISPLACEMENT = 0.1;


discoball.Renderer.ROTATION = Math.PI/64;


/**
 * @param {WebGLRenderingContext} gl
 */
discoball.Renderer.prototype.onDraw = function(gl) {
  if (this.rotate_) {
    this.root_ = this.root_.times(discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.J, discoball.Renderer.ROTATION/16));
  }
  this.handleKeys();
  this.scenePass(gl);
  gl.flush();
};


discoball.Renderer.prototype.handleKeys = function() {
  if (this.keys_.justPressed(discoball.Key.J)) {
    this.rotate_ = !this.rotate_;
  }
  if (this.keys_.isPressed(discoball.Key.W)) {
    this.root_ = discoball.DualQuaternion.fromTranslation(
        discoball.Vector.K.times(discoball.Renderer.DISPLACEMENT)).
            times(this.root_);
  }
  if (this.keys_.isPressed(discoball.Key.S)) {
    this.root_ = discoball.DualQuaternion.fromTranslation(
        discoball.Vector.K.times(-discoball.Renderer.DISPLACEMENT)).
            times(this.root_);
  }
  if (this.keys_.isPressed(discoball.Key.A)) {
    this.root_ = discoball.DualQuaternion.fromTranslation(
        discoball.Vector.I.times(discoball.Renderer.DISPLACEMENT)).
            times(this.root_);
  }
  if (this.keys_.isPressed(discoball.Key.D)) {
    this.root_ = discoball.DualQuaternion.fromTranslation(
        discoball.Vector.I.times(-discoball.Renderer.DISPLACEMENT)).
            times(this.root_);
  }
  if (this.keys_.isPressed(discoball.Key.Z)) {
    this.root_ = discoball.DualQuaternion.fromTranslation(
        discoball.Vector.J.times(discoball.Renderer.DISPLACEMENT)).
            times(this.root_);
  }
  if (this.keys_.isPressed(discoball.Key.Q)) {
    this.root_ = discoball.DualQuaternion.fromTranslation(
        discoball.Vector.J.times(-discoball.Renderer.DISPLACEMENT)).
            times(this.root_);
  }
  if (this.keys_.isPressed(discoball.Key.RIGHT)) {
    this.root_ = discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.J, discoball.Renderer.ROTATION).times(this.root_);
  }
  if (this.keys_.isPressed(discoball.Key.LEFT)) {
    this.root_ = discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.J, -discoball.Renderer.ROTATION).times(this.root_);
  }
  if (this.keys_.isPressed(discoball.Key.DOWN)) {
    this.root_ = discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.I, discoball.Renderer.ROTATION).times(this.root_);
  }
  if (this.keys_.isPressed(discoball.Key.UP)) {
    this.root_ = discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.I, -discoball.Renderer.ROTATION).times(this.root_);
  }
  if (this.keys_.isPressed(discoball.Key.GT)) {
    this.root_ = discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.K, discoball.Renderer.ROTATION).times(this.root_);
  }
  if (this.keys_.isPressed(discoball.Key.LT)) {
    this.root_ = discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.K, -discoball.Renderer.ROTATION).times(this.root_);
  }
};
