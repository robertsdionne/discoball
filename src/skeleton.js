// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @param {Array.<discoball.Bone>} joints
 * @param {!discoball.Pose} bindPose
 */
discoball.Skeleton = function(joints, bindPose) {
  this.joints = joints;
  this.globalBindPose = bindPose.globalize(this);
};
