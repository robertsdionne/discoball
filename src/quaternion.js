// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @fileoverview Defines the quaternion object.
 * @author robertsdionne@gmail.com (Robert Scott Dionne)
 */

/**
 * Constructs a new quaternion given the vector and scalar.
 * @param {discoball.Vector} vector
 * @param {number} scalar
 * @constructor
 */
discoball.Quaternion = function(vector, scalar) {
  /**
   * @type {discoball.Vector}
   * @private
   */
  this.vector = vector || new discoball.Vector();
  
  /**
   * @type {number}
   * @private
   */
  this.scalar = typeof scalar === "undefined" ? 1 : scalar;
};


discoball.Quaternion.fromAxisAngle = function(axis, angle) {
  return new discoball.Quaternion(
      axis.normalized().times(Math.sin(angle/2)),
      Math.cos(angle/2));
};


/**
 * @return {discoball.Quaternion} The negation of this quaternion.
 */
discoball.Quaternion.prototype.negate = function() {
  return new discoball.Quaternion(this.vector.negate(), -this.scalar);
};


/**
 * @return {number} The magnitude of this quaternion.
 */
discoball.Quaternion.prototype.magnitude = function() {
  return Math.sqrt(this.magnitudeSquared());
};


/**
 * @return {number} The square magnitude of this quaternion.
 */
discoball.Quaternion.prototype.magnitudeSquared = function() {
  return this.scalar * this.scalar + this.vector.magnitudeSquared();
};


/**
 * @return {discoball.Quaternion} This quaternion normalized.
 */
discoball.Quaternion.prototype.normalized = function() {
  return this.over(this.magnitude());
};


/**
 * @return {discoball.Quaternion} This quaternion's conjugate.
 */
discoball.Quaternion.prototype.conjugate = function() {
  return new discoball.Quaternion(this.vector.negate(), this.scalar);
};


/**
 * @return {discoball.Quaternion} This quaternion's reciprocal.
 */
discoball.Quaternion.prototype.reciprocal = function() {
  return this.conjugate().over(this.magnitudeSquared());
};


/**
 * @return {discoball.Quaternion} The sum of this and that.
 * @param {number|discoball.Quaternion} that
 */
discoball.Quaternion.prototype.plus = function(that) {
  if (typeof that === 'number') {
    return new discoball.Quaternion(this.vector, this.scalar + that);
  } else if (that instanceof discoball.Quaternion) {
    return new discoball.Quaternion(
        this.vector.plus(that.vector),
        this.scalar + that.scalar);
  }
};


/**
 * @return {discoball.Quaternion} The difference of this and that.
 * @param {number|discoball.Quaternion} that
 */
discoball.Quaternion.prototype.minus = function(that) {
  if (typeof that === 'number') {
    return new discoball.Quaternion(this.vector, this.scalar - that);
  } else if (that instanceof discoball.Quaternion) {
    return new discoball.Quaternion(
        this.vector.minus(that.vector),
        this.scalar - that.scalar);
  }
};


/**
 * @return {discoball.Quaternion} The product of this and that.
 * @param {number|discoball.Quaternion} that
 */
discoball.Quaternion.prototype.times = function(that) {
  if (typeof that === 'number') {
    return new discoball.Quaternion(
        this.vector.times(that),
        this.scalar * that);
  } else if (that instanceof discoball.Quaternion) {
    return new discoball.Quaternion(
        that.vector.times(this.scalar).
            plus(this.vector.times(that.scalar)).
            plus(this.vector.cross(that.vector)),
        this.scalar * that.scalar - this.vector.dot(that.vector));
  }
};


/**
 * @return {discoball.Quaternion} The quotient of this and that.
 * @param {number|discoball.Quaternion} that
 */
discoball.Quaternion.prototype.over = function(that) {
  if (typeof that === 'number') {
    return new discoball.Quaternion(
        this.vector.over(that),
        this.scalar / that);
  } else if (that instanceof discoball.Quaternion) {
    return this.times(that.reciprocal());
  }
};

/**
 * @return {discoball.Vector} That vector rotated by this quaternion.
 * @param {discoball.Vector} that
 */
discoball.Quaternion.prototype.transform = function(that) {
  return this.times(that).times(this.reciprocal()).vector;
};


/**
 * @return {string} A string representation of this quaternion.
 */
discoball.Quaternion.prototype.toString = function() {
  return this.vector + ' + ' + this.scalar;
};
