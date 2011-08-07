// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @param {Array.<!discoball.DualQuaternion>} opt_bones
 * @constructor
 */
discoball.Pose = function(opt_bones) {
  /**
   * @type {Array.<!discoball.DualQuaternion>}
   * @private
   */
  this.bones_ = opt_bones || [];
};


/**
 * Blend this pose with that pose according to t.
 * @param {!discoball.Pose} that
 * @param {number} t
 * return {!discoball.Pose}
 */
discoball.Pose.prototype.blend = function(that, t) {
  var result = new discoball.Pose();
  for (var i = 0; i < this.bones_.length; ++i) {
    result.set(i, this.bones_[i].lerp(that.bones_[i], t));
  }
  return result;
};


/**
 * Globalize this pose.
 * @param {!discoball.Skeleton} skeleton
 * @return {!discoball.Pose}
 */
discoball.Pose.prototype.globalize = function(skeleton) {
  var result = new discoball.Pose();
  for (var thisBone = 0; thisBone < skeleton.joints.length; ++thisBone) {
    var thatBone = thisBone;
    result.set(thisBone, this.bones_[thatBone]);
    while ((thatBone = skeleton.joints[thatBone]) != null) {
      result.set(thisBone, this.bones_[thatBone].
          times(result.bones_[thisBone]));
    }
  }
  return result;
};


/**
 * @return {discoball.Pose}
 */
discoball.Pose.prototype.inverse = function() {
  var result = new discoball.Pose();
  for (var i = 0; i < this.bones_.length; ++i) {
    result.set(i, this.bones_[i].reciprocal());
  }
  return result;
};


/**
 * @param {discoball.Pose} that
 * @return {discoball.Pose}
 */
discoball.Pose.prototype.times = function(that) {
  var result = new discoball.Pose();
  for (var i = 0; i < this.bones_.length; ++i) {
    result.set(i, this.bones_[i].times(that.bones_[i]));
  }
  return result;
};


/**
 * @param {number} i
 * @param {discoball.DualQuaternion} bone
 */
discoball.Pose.prototype.set = function(i, bone) {
  this.bones_[i] = bone;
};


discoball.Pose.prototype.reset = function() {
  this.bones_ = [];
};


/**
 * @return {discoball.DualQuaternion}
 */
discoball.Pose.prototype.getBone = function(i) {
  return this.bones_[i];
};


/**
 * @return {!discoball.Palette}
 */
discoball.Pose.prototype.get = function() {
  var result = [];
  for (var i = 0; i < this.bones_.length; ++i) {
    var bone = this.bones_[i];
    result.push(
        bone.vector.x.real,
        bone.vector.y.real,
        bone.vector.z.real,
        bone.scalar.real,
        bone.vector.x.dual,
        bone.vector.y.dual,
        bone.vector.z.dual,
        bone.scalar.dual);
  }
  return result;
};
