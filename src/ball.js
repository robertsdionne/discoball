// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @param {number} radius
 * @param {number} n
 * @param {Array.<number>} color
 * @constructor
 */
discoball.Ball = function(radius, n, color) {
  /**
   * @type {number}
   * @private
   */
  this.radius_ = radius;

  /**
   * @type {number}
   * @private
   */
  this.n_ = n;

  /**
   * @type {Array.<number>}
   * @private
   */
  this.color_ = color;

  /**
   * @type {?number}
   * @private
   */
  this.count_ = null;

  /**
   * @type {?number}
   * @private
   */
  this.occluderCount_ = null;
};


/**
 * @return {?number}
 */
discoball.Ball.prototype.getTriangleVertexCount = function() {
  return this.count_ * 6;
};


/**
 * @return {?number}
 */
discoball.Ball.prototype.getOccluderVertexCount = function() {
  return this.occluderCount_ * 6;
};


/**
 * @param {number} theta
 * @param {number} phi
 * @return {discoball.Vector}
 */
discoball.Ball.prototype.point = function(theta, phi) {
  return new discoball.Vector(
    this.radius_ * Math.sin(theta) * Math.sin(phi),
    this.radius_ * Math.cos(theta),
    this.radius_ * Math.sin(theta) * Math.cos(phi)
  );
};


discoball.Ball.prototype.buildOccluder = function() {
  var data = [];
  var color = new discoball.Vector();
  this.occluderCount_ = 0;
  for (var i = 0; i < this.n_/2; ++i) {
    var shift = Math.random();
    var theta0 = i * 2 * Math.PI / this.n_;
    var theta1 = (i + 1) * 2 * Math.PI / this.n_;
    var theta = (theta0 + theta1) / 2;
    var thetacoeff = 0.0025;
    var phicoeff = thetacoeff / Math.sin(theta);
    this.occluderCount_ += this.n_;
    for (var j = 0; j < this.n_; ++j) {
      var phi0 = j * 2 * Math.PI / this.n_;
      var phi1 = (j + 1) * 2 * Math.PI / this.n_;
      var v0 = this.point(theta0, phi0).times(.99);
      var n0 = this.point(theta0, phi0).normalized();
      var v1 = this.point(theta0, phi1).times(.99);
      var n1 = this.point(theta0, phi1).normalized();
      var v2 = this.point(theta1, phi1).times(.99);
      var n2 = this.point(theta1, phi1).normalized();
      var v3 = this.point(theta1, phi0).times(.99);
      var n3 = this.point(theta1, phi0).normalized();
      var random = new discoball.Vector(
          Math.random(), Math.random(), Math.random());
      var normal = v0.plus(v1).plus(v2).plus(v3).normalized();
      data.push(v0.x, v0.y, v0.z);
      data.push(n0.x, n0.y, n0.z);
      data.push(color.x, color.y, color.z);
      data.push(0, 0);
      data.push(v2.x, v2.y, v2.z);
      data.push(n2.x, n2.y, n2.z);
      data.push(color.x, color.y, color.z);
      data.push(0, 0);
      data.push(v1.x, v1.y, v1.z);
      data.push(n1.x, n1.y, n1.z);
      data.push(color.x, color.y, color.z);
      data.push(0, 0);
      data.push(v0.x, v0.y, v0.z);
      data.push(n0.x, n0.y, n0.z);
      data.push(color.x, color.y, color.z);
      data.push(0, 0);
      data.push(v3.x, v3.y, v3.z);
      data.push(n3.x, n3.y, n3.z);
      data.push(color.x, color.y, color.z);
      data.push(0, 0);
      data.push(v2.x, v2.y, v2.z);
      data.push(n2.x, n2.y, n2.z);
      data.push(color.x, color.y, color.z);
      data.push(0, 0);
    }
  }
  return new Float32Array(data);
};


discoball.Ball.prototype.buildTriangles = function() {
  var circumference = 2 * Math.PI * this.radius_;
  var tileSize = circumference / this.n_;
  var data = [];
  this.count_ = 0;
  for (var i = 0; i < this.n_/2; ++i) {
    var shift = Math.random();
    var theta0 = i * 2 * Math.PI / this.n_;
    var theta1 = (i + 1) * 2 * Math.PI / this.n_;
    var theta = (theta0 + theta1) / 2;
    var thetacoeff = 0.0025;
    var phicoeff = thetacoeff / Math.sin(theta);
    var m = Math.floor(Math.sin(theta) * circumference / tileSize);
    this.count_ += m;
    for (var j = 0; j < m; ++j) {
      var phi0 = j * 2 * Math.PI / m;
      var phi1 = (j + 1) * 2 * Math.PI / m;
      var dtheta0 = thetacoeff * Math.random();
      var dtheta1 = thetacoeff * Math.random();
      var dtheta2 = thetacoeff * Math.random();
      var dtheta3 = thetacoeff * Math.random();
      var dphi0 = phicoeff * Math.random();
      var dphi1 = phicoeff * Math.random();
      var dphi2 = phicoeff * Math.random();
      var dphi3 = phicoeff * Math.random();
      var v0 = this.point(theta0 + dtheta0, phi0 + dphi0 + shift);
      var v1 = this.point(theta0 + dtheta1, phi1 - dphi1 + shift);
      var v2 = this.point(theta1 - dtheta2, phi1 - dphi2 + shift);
      var v3 = this.point(theta1 - dtheta3, phi0 + dphi3 + shift);
      var v01 = v0.plus(v1);
      var v12 = v1.plus(v2);
      var v23 = v2.plus(v3);
      var v30 = v3.plus(v0);
      var v0123 = v0.plus(v1).plus(v2).plus(v3);
      var index = Math.floor(Math.random() * 9);
      var normal = [v0, v1, v2, v3, v01, v12, v23, v30, v0123][index].
          normalized();
      var t0 = new discoball.Vector(.15, .15);
      var t1 = new discoball.Vector(.15, .85);
      var t2 = new discoball.Vector(.85, .85);
      var t3 = new discoball.Vector(.85, .15);
      data.push(v0.x, v0.y, v0.z);
      data.push(normal.x, normal.y, normal.z);
      data.push(this.color_[0], this.color_[1], this.color_[2]);
      data.push(t0.x, t0.y);
      data.push(v2.x, v2.y, v2.z);
      data.push(normal.x, normal.y, normal.z);
      data.push(this.color_[0], this.color_[1], this.color_[2]);
      data.push(t2.x, t2.y);
      data.push(v1.x, v1.y, v1.z);
      data.push(normal.x, normal.y, normal.z);
      data.push(this.color_[0], this.color_[1], this.color_[2]);
      data.push(t1.x, t1.y);
      data.push(v0.x, v0.y, v0.z);
      data.push(normal.x, normal.y, normal.z);
      data.push(this.color_[0], this.color_[1], this.color_[2]);
      data.push(t0.x, t0.y);
      data.push(v3.x, v3.y, v3.z);
      data.push(normal.x, normal.y, normal.z);
      data.push(this.color_[0], this.color_[1], this.color_[2]);
      data.push(t3.x, t3.y);
      data.push(v2.x, v2.y, v2.z);
      data.push(normal.x, normal.y, normal.z);
      data.push(this.color_[0], this.color_[1], this.color_[2]);
      data.push(t2.x, t2.y);
    }
  }
  return new Float32Array(data);
};
