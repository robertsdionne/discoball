// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @fileoverview Defines the dual number object.
 * @author robertsdionne@gmail.com (Robert Scott Dionne)
 */

/**
 * @param {number=} opt_real
 * @param {number=} opt_dual
 * @constructor
 */
discoball.DualNumber = function(opt_real, opt_dual) {
  /**
   * @type {number}
   */
  this.real = opt_real || 0;

  /**
   * @type {number}
   */
  this.dual = opt_dual || 0;
};


discoball.DualNumber.prototype.dualConjugate = function() {
  return new discoball.DualNumber(this.real, -this.dual);
};


discoball.DualNumber.prototype.plus = function(that) {
  return new discoball.DualNumber(this.real + that.real, this.dual + that.dual);
};


discoball.DualNumber.prototype.minus = function(that) {
  return new discoball.DualNumber(this.real - that.real, this.dual - that.dual);
};


discoball.DualNumber.prototype.negate = function() {
  return new discoball.DualNumber(-this.real, -this.dual);
};


discoball.DualNumber.prototype.times = function(that) {
  return new discoball.DualNumber(
      this.real * that.real,
      this.real * that.dual + this.dual * that.real);
};


discoball.DualNumber.prototype.inverse = function() {
  return new discoball.DualNumber(
      1 / this.real,
      -this.dual / this.real / this.real);
};


discoball.DualNumber.prototype.over = function(that) {
  return this.times(that.inverse());
};


discoball.DualNumber.prototype.sqrt = function() {
  return new discoball.DualNumber(
      Math.sqrt(this.real),
      this.dual / 2 / Math.sqrt(this.real));
};


discoball.DualNumber.prototype.toString = function() {
  return this.real + ' + ' + this.dual + 'e';
};
