// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @fileoverview Defines the vector object.
 * @author robertsdionne@gmail.com (Robert Scott Dionne)
 */

/**
 * Constructs a new vector from the given coordinates.
 * @param {number=} opt_x
 * @param {number=} opt_y
 * @param {number=} opt_z
 * @constructor
 * @extends {discoball.Quaternion}
 */
discoball.Vector = function(opt_x, opt_y, opt_z) {
  /**
   * @type {number}
   */
  this.scalar = 0;

  /**
   * @type {discoball.Vector}
   */
  this.vector = this;

  /**
   * @type {number}
   */
  this.x = opt_x || 0;

  /**
   * @type {number}
   */
  this.y = opt_y || 0;

  /**
   * @type {number}
   */
  this.z = opt_z || 0;
};
discoball.inherits(discoball.Vector, discoball.Quaternion);


discoball.Vector.I = new discoball.Vector(1, 0, 0);


discoball.Vector.J = new discoball.Vector(0, 1, 0);


discoball.Vector.K = new discoball.Vector(0, 0, 1);


/**
 * @return {discoball.Vector} The negation of this vector.
 */
discoball.Vector.prototype.negate = function() {
  return new discoball.Vector(-this.x, -this.y, -this.z);
};


discoball.Vector.prototype.toDual = function() {
  return new discoball.DualVector(
      new discoball.DualNumber(this.x),
      new discoball.DualNumber(this.y),
      new discoball.DualNumber(this.z));
};


/**
 * @return {number} The square magnitude of this vector.
 */
discoball.Vector.prototype.magnitudeSquared = function() {
  return this.dot(this);
};


/**
 * @return {discoball.Vector|discoball.Quaternion} The sum of this and that.
 * @param {discoball.Vector|number|discoball.Quaternion} that
 */
discoball.Vector.prototype.plus = function(that) {
  if (that instanceof discoball.Vector) {
    return new discoball.Vector(
        this.x + that.x,
        this.y + that.y,
        this.z + that.z);
  } else {
    return discoball.Quaternion.prototype.plus.call(this, that);
  }
};


/**
 * @return {discoball.Vector|discoball.Quaternion} The difference of this and that.
 * @param {discoball.Vector|number|discoball.Quaternion} that
 */
discoball.Vector.prototype.minus = function(that) {
  if (that instanceof discoball.Vector) {
    return new discoball.Vector(
        this.x - that.x,
        this.y - that.y,
        this.z - that.z);
  } else {
    return discoball.Quaternion.prototype.plus.call(this, that);
  }
};


/**
 * @return {discoball.Vector|discoball.Quaternion} The product of this and that.
 * @param {number|discoball.Quaternion} that
 */
discoball.Vector.prototype.times = function(that) {
  if (typeof that === 'number') {
    return new discoball.Vector(this.x * that, this.y * that, this.z * that);
  } else {
    return discoball.Quaternion.prototype.times.call(this, that);
  }
};


/**
 * @return {discoball.Vector|discoball.Quaternion} The quotient of this and that.
 * @param {number|discoball.Quaternion} that
 */
discoball.Vector.prototype.over = function(that) {
  if (typeof that === 'number') {
    return new discoball.Vector(this.x / that, this.y / that, this.z / that);
  } else {
    return discoball.Quaternion.prototype.over.call(this, that);
  }
};


/**
 * @return {discoball.Vector} The cross product of this and that.
 * @param {discoball.Vector} that
 */
discoball.Vector.prototype.cross = function(that) {
  return new discoball.Vector(
      this.y * that.z - this.z * that.y,
      this.z * that.x - this.x * that.z,
      this.x * that.y - this.y * that.x);
};


/**
 * @return {number} The dot product of this and that.
 * @param {discoball.Vector} that
 */
discoball.Vector.prototype.dot = function(that) {
  return this.x * that.x + this.y * that.y + this.z * that.z;
};


/**
 * @return {string} A string representation of this vector.
 */
discoball.Vector.prototype.toString = function() {
  return this.x + 'i + ' + this.y + 'j + ' + this.z + 'k';
};
