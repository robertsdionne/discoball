// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @fileoverview Defines the vector object.
 * @author robertsdionne@gmail.com (Robert Scott Dionne)
 */

/**
 * Constructs a new vector from the given coordinates.
 * @param {discoball.DualNumber=} opt_x
 * @param {discoball.DualNumber=} opt_y
 * @param {discoball.DualNumber=} opt_z
 * @constructor
 * @extends {discoball.DualQuaternion}
 */
discoball.DualVector = function(opt_x, opt_y, opt_z) {
  this.scalar = new discoball.DualNumber();
  this.vector = this;
  this.x = opt_x || new discoball.DualNumber();
  this.y = opt_y || new discoball.DualNumber();
  this.z = opt_z || new discoball.DualNumber();
};
goog.inherits(discoball.DualVector, discoball.DualQuaternion);


discoball.DualVector.prototype.real = function() {
  return new discoball.Vector(this.x.real, this.y.real, this.z.real);
};


discoball.DualVector.prototype.dual = function() {
  return new discoball.Vector(this.x.dual, this.y.dual, this.z.dual);
};


discoball.DualVector.prototype.dualConjugate = function() {
  return new discoball.DualVector(
      this.x.dualConjugate(),
      this.y.dualConjugate(),
      this.z.dualConjugate());
};


/**
 * @return {discoball.DualVector} The negation of this vector.
 */
discoball.DualVector.prototype.negate = function() {
  return new discoball.DualVector(
      this.x.negate(), this.y.negate(), this.z.negate());
};


/**
 * @return {number} The square magnitude of this vector.
 */
discoball.DualVector.prototype.magnitudeSquared = function() {
  return this.dot(this);
};


/**
 * @return {discoball.DualVector|discoball.DualQuaternion} The sum of this and that.
 * @param {discoball.DualVector|number|discoball.DualQuaternion} that
 */
discoball.DualVector.prototype.plus = function(that) {
  if (that instanceof discoball.DualVector) {
    return new discoball.DualVector(
        this.x.plus(that.x), this.y.plus(that.y), this.z.plus(that.z));
  } else {
    return discoball.DualQuaternion.prototype.plus.call(this, that);
  }
};


/**
 * @return {discoball.DualVector|discoball.DualQuaternion} The difference of
 *    this and that.
 * @param {discoball.DualVector|number|discoball.DualQuaternion} that
 */
discoball.DualVector.prototype.minus = function(that) {
  if (that instanceof discoball.DualVector) {
    return new discoball.DualVector(
        this.x.minus(that.x), this.y.minus(that.y), this.z.minus(that.z));
  } else {
    return discoball.DualQuaternion.prototype.plus.call(this, that);
  }
};


/**
 * @return {discoball.DualVector|discoball.DualQuaternion} The product of
 *    this and that.
 * @param {discoball.DualNumber|discoball.DualQuaternion} that
 */
discoball.DualVector.prototype.times = function(that) {
  if (that instanceof discoball.DualNumber) {
    return new discoball.DualVector(
        this.x.times(that), this.y.times(that), this.z.times(that));
  } else {
    return /** @type {discoball.DualVector} */ (
        discoball.DualQuaternion.prototype.times.call(this, that));
  }
};


/**
 * @return {discoball.DualVector|discoball.DualQuaternion} The quotient of
 *    this and that.
 * @param {discoball.DualNumber|discoball.DualQuaternion} that
 */
discoball.DualVector.prototype.over = function(that) {
  if (that instanceof discoball.DualNumber) {
    return new discoball.DualVector(
        this.x.over(that), this.y.over(that), this.z.over(that));
  } else {
    return discoball.DualQuaternion.prototype.over.call(this, that);
  }
};


/**
 * @return {discoball.DualVector} The cross product of this and that.
 * @param {discoball.DualVector} that
 */
discoball.DualVector.prototype.cross = function(that) {
  return new discoball.DualVector(
      this.y.times(that.z).minus(this.z.times(that.y)),
      this.z.times(that.x).minus(this.x.times(that.z)),
      this.x.times(that.y).minus(this.y.times(that.x)));
};


/**
 * @return {number} The dot product of this and that.
 * @param {discoball.DualVector} that
 */
discoball.DualVector.prototype.dot = function(that) {
  return this.x.times(that.x).
      plus(this.y.times(that.y)).
      plus(this.z.times(that.z));
};


/**
 * @return {string} A string representation of this vector.
 */
discoball.DualVector.prototype.toString = function() {
  return '(' + this.x + ')i + (' + this.y + ')j + (' + this.z + ')k';
};
