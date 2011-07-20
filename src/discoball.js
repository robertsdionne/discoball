// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @fileoverview
 * @author robertsdionne@gmail.com (Robert Scott Dionne)
 */

discoball.load = function() {
  var keys = new discoball.Keys(document);
  new webgl.App(window, keys)
      .install({
        'c0': new discoball.Renderer()
      }, 'stats');
};
window.onload = discoball.load;


/**
 * @constructor
 */
discoball.Renderer = function() {
  /**
   * @type {WebGLProgram}
   */
  this.p_ = null;

  /**
   * @type {WebGLBuffer}
   */
  this.ball_ = null;
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
  this.projection_ = this.getFrustumMatrix(-aspect, aspect, -1, 1, 1, 1000);
};


discoball.Renderer.prototype.getShaderSource = function(id) {
  return discoball.global.document.getElementById(id).text;
};


/**
 * @param {WebGLRenderingContext} gl
 */
discoball.Renderer.prototype.onCreate = function(gl) {
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

  var ball = new discoball.Ball(10, 1, [1, 1, 1]);
  b = ball.buildTriangles();
  this.ballVertexCount_ = ball.getTriangleVertexCount();

  gl.bindBuffer(gl.ARRAY_BUFFER, this.ball_);
  gl.bufferData(gl.ARRAY_BUFFER, b.byteLength, gl.STATIC_DRAW);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, b);
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
  gl.uniform1i(this.p_.uLighting, true);
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
  this.root_ = this.root_.times(discoball.DualQuaternion.fromAxisAngle(
      discoball.Vector.J, 8*discoball.Renderer.ROTATION));
  this.scenePass(gl);
  gl.flush();
};
