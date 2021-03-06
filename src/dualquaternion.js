// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @fileoverview Defines the quaternion object.
 * @author robertsdionne@gmail.com (Robert Scott Dionne)
 */

/**
 * Constructs a new quaternion given the vector and scalar.
 * @param {discoball.DualVector=} opt_vector
 * @param {discoball.DualNumber=} opt_scalar
 * @constructor
 */
discoball.DualQuaternion = function(opt_vector, opt_scalar) {
  /**
   * @type {discoball.DualVector}
   */
  this.vector = opt_vector || new discoball.DualVector();
  
  /**
   * @type {discoball.DualNumber}
   */
  this.scalar = typeof opt_scalar === "undefined" ?
      new discoball.DualNumber(1) : opt_scalar;
};


discoball.DualQuaternion.fromPosition = function(position) {
  return new discoball.DualQuaternion(
      new discoball.DualVector(
          new discoball.DualNumber(0, position.x),
          new discoball.DualNumber(0, position.y),
          new discoball.DualNumber(0, position.z)),
      new discoball.DualNumber(1));
};


discoball.DualQuaternion.fromTranslation = function(translation) {
  return new discoball.DualQuaternion(
      new discoball.DualVector(
          new discoball.DualNumber(0, translation.x / 2),
          new discoball.DualNumber(0, translation.y / 2),
          new discoball.DualNumber(0, translation.z / 2)),
      new discoball.DualNumber(1));
};


discoball.DualQuaternion.fromRotation = function(rotation) {
  return new discoball.DualQuaternion(
      rotation.vector.toDual(),
      new discoball.DualNumber(rotation.scalar));
};


discoball.DualQuaternion.fromAxisAngle = function(axis, angle) {
  return new discoball.DualQuaternion(
      axis.normalized().times(Math.sin(angle/2)).toDual(),
      new discoball.DualNumber(Math.cos(angle/2)));
};


discoball.DualQuaternion.prototype.real = function() {
  return new discoball.Quaternion(this.vector.real(), this.scalar.real);
};


discoball.DualQuaternion.prototype.dual = function() {
  return new discoball.Quaternion(this.vector.dual(), this.scalar.dual);
};


/**
 * @param {discoball.DualQuaternion} that
 * @param {number} t
 * @return {discoball.DualQuaternion}
 */
discoball.DualQuaternion.prototype.lerp = function(that, t) {
  var v = new discoball.DualNumber(t);
  var u = new discoball.DualNumber(1).minus(v);
  return this.times(u).plus(/** @type {discoball.DualQuaternion} */ (
      that.times(v))).normalized();
};


/**
 * @return {discoball.DualQuaternion} The negation of this quaternion.
 */
discoball.DualQuaternion.prototype.negate = function() {
  return new discoball.DualQuaternion(this.vector.negate(), this.scalar.negate());
};


/**
 * @return {discoball.DualNumber} The magnitude of this quaternion.
 */
discoball.DualQuaternion.prototype.magnitude = function() {
  return this.magnitudeSquared().sqrt();
};


/**
 * @return {discoball.DualNumber} The square magnitude of this quaternion.
 */
discoball.DualQuaternion.prototype.magnitudeSquared = function() {
  return this.scalar.times(this.scalar).plus(this.vector.magnitudeSquared());
};


/**
 * @return {discoball.DualQuaternion} This quaternion normalized.
 */
discoball.DualQuaternion.prototype.normalized = function() {
  return this.over(this.magnitude());
};


/**
 * @return {discoball.DualQuaternion} This quaternion's conjugate.
 */
discoball.DualQuaternion.prototype.conjugate = function() {
  return new discoball.DualQuaternion(this.vector.negate(), this.scalar);
};


discoball.DualQuaternion.prototype.dualConjugate = function() {
  return new discoball.DualQuaternion(
      this.vector.dualConjugate(), this.scalar.dualConjugate());
};


/**
 * @return {discoball.DualQuaternion} This quaternion's reciprocal.
 */
discoball.DualQuaternion.prototype.reciprocal = function() {
  return this.conjugate().over(this.magnitudeSquared());
};


/**
 * @return {discoball.DualQuaternion} The sum of this and that.
 * @param {number|discoball.DualQuaternion} that
 */
discoball.DualQuaternion.prototype.plus = function(that) {
  if (that instanceof discoball.DualNumber) {
    return new discoball.DualQuaternion(this.vector, this.scalar.plus(that));
  } else if (that instanceof discoball.DualQuaternion) {
    return new discoball.DualQuaternion(
        /** @type {discoball.DualVector} */ (this.vector.plus(that.vector)),
        this.scalar.plus(that.scalar));
  }
  return null;
};


/**
 * @return {discoball.DualQuaternion} The difference of this and that.
 * @param {number|discoball.DualQuaternion} that
 */
discoball.DualQuaternion.prototype.minus = function(that) {
  if (that instanceof discoball.DualNumber) {
    return new discoball.DualQuaternion(this.vector, this.scalar.minus(that));
  } else if (that instanceof discoball.DualQuaternion) {
    return new discoball.DualQuaternion(
        /** @type {discoball.DualVector} */ (this.vector.minus(that.vector)),
        this.scalar.minus(that.scalar));
  }
  return null;
};


/**
 * @return {discoball.DualQuaternion|discoball.Pose} The product of
 *    this and that.
 * @param {discoball.DualNumber|discoball.DualQuaternion|discoball.Pose} that
 */
discoball.DualQuaternion.prototype.times = function(that) {
  if (that instanceof discoball.DualNumber) {
    return new discoball.DualQuaternion(
        /** @type {discoball.DualVector} */ (this.vector.times(that)),
        this.scalar.times(that));
  } else if (that instanceof discoball.DualQuaternion) {
    return new discoball.DualQuaternion(
        /** @type {discoball.DualVector} */ (that.vector.times(this.scalar).
            plus(this.vector.times(that.scalar)).
            plus(this.vector.cross(that.vector))),
        this.scalar.times(that.scalar).minus(this.vector.dot(that.vector)));
  } else if (that instanceof discoball.Pose) {
    var result = new discoball.Pose();
    for (var i = 0; i < that.getNumBones(); ++i) {
      result.set(i, /** @type {discoball.DualQuaternion} */ (
          this.times(that.getBone(i))));
    }
    return result;
  }
  return null;
};


/**
 * @return {discoball.DualQuaternion} The quotient of this and that.
 * @param {discoball.DualNumber|discoball.DualQuaternion} that
 */
discoball.DualQuaternion.prototype.over = function(that) {
  if (that instanceof discoball.DualNumber) {
    return new discoball.DualQuaternion(
        /** @type {discoball.DualVector} */ (this.vector.over(that)),
        this.scalar.over(that));
  } else if (that instanceof discoball.DualQuaternion) {
    return /** @type {discoball.DualQuaternion} */ (
        this.times(that.reciprocal()));
  }
  return null;
};

/**
 * @return {discoball.Vector} That vector rotated by this quaternion.
 * @param {discoball.Vector} that
 */
discoball.DualQuaternion.prototype.transform = function(that) {
  return this.times(discoball.DualQuaternion.fromPosition(that)).
      times(this.dualConjugate().reciprocal()).vector.dual();
};


/**
 * @return {string} A string representation of this quaternion.
 */
discoball.DualQuaternion.prototype.toString = function() {
  return this.vector + ' + ' + this.scalar;
};
