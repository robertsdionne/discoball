// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 */
discoball.Animator = function() {};


/**
 * @param {!discoball.Skeleton} skeleton
 * @param {!discoball.DualQuaternion} root
 * @param {!discoball.Pose} first
 * @param {!discoball.Pose} second
 * @return {!discoball.Palette}
 */
discoball.Animator.prototype.animate = function(
    skeleton, root, first, second, t) {
  return root.times(first.blend(second, t).
      globalize(skeleton).times(skeleton.globalBindPose.inverse())).get();
};
