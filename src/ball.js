// Copyright 2011 Robert Scott Dionne. All rights reserved.

discoball.Ball = function(radius, tileSize, numTiles, color) {
  this.radius = radius;
  this.tileSize = tileSize;
  this.numTiles = numTiles;
  this.color = color;
};


discoball.Ball.prototype.getTriangleVertexCount = function() {
  return this.numTiles * 6;
};


discoball.Ball.prototype.randomCoordinate = function() {
  return 2 * Math.random() - 1;
};


discoball.Ball.prototype.buildTriangles = function() {
  var seed = new discoball.Vector(this.radius, 0, 0);
  var halfTileSize = this.tileSize/2;
  var p0 = seed.plus(discoball.Vector.J.times(1).
      plus(discoball.Vector.K.times(1)).times(halfTileSize));
  var p1 = seed.plus(discoball.Vector.J.times(1).
      plus(discoball.Vector.K.times(-1)).times(halfTileSize));
  var p2 = seed.plus(discoball.Vector.J.times(-1).
      plus(discoball.Vector.K.times(-1)).times(halfTileSize));
  var p3 = seed.plus(discoball.Vector.J.times(-1).
      plus(discoball.Vector.K.times(1)).times(halfTileSize));
  var data = [];
  for (var i = 0; i < this.numTiles; ++i) {
    var normal = new discoball.Vector(
      this.randomCoordinate(),
      this.randomCoordinate(),
      this.randomCoordinate()
    ).normalized();
    var axis = discoball.Vector.I.cross(normal);
    var angle = Math.acos(discoball.Vector.I.dot(normal));
    var rotation = discoball.Quaternion.fromAxisAngle(axis, angle);
    var v0 = rotation.transform(p0);
    var v1 = rotation.transform(p1);
    var v2 = rotation.transform(p2);
    var v3 = rotation.transform(p3);
    data.push(v0.x, v0.y, v0.z);
    data.push(normal.x, normal.y, normal.z);
    data.push(this.color[0], this.color[1], this.color[2]);
    data.push(0);
    data.push(v2.x, v2.y, v2.z);
    data.push(normal.x, normal.y, normal.z);
    data.push(this.color[0], this.color[1], this.color[2]);
    data.push(0);
    data.push(v1.x, v1.y, v1.z);
    data.push(normal.x, normal.y, normal.z);
    data.push(this.color[0], this.color[1], this.color[2]);
    data.push(0);
    data.push(v0.x, v0.y, v0.z);
    data.push(normal.x, normal.y, normal.z);
    data.push(this.color[0], this.color[1], this.color[2]);
    data.push(0);
    data.push(v3.x, v3.y, v3.z);
    data.push(normal.x, normal.y, normal.z);
    data.push(this.color[0], this.color[1], this.color[2]);
    data.push(0);
    data.push(v2.x, v2.y, v2.z);
    data.push(normal.x, normal.y, normal.z);
    data.push(this.color[0], this.color[1], this.color[2]);
    data.push(0);
  }
  return new Float32Array(data);
};
