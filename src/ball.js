// Copyright 2011 Robert Scott Dionne. All rights reserved.

discoball.Ball = function(radius, n, color) {
  this.radius = radius;
  this.n = n;
  this.color = color;
};


discoball.Ball.prototype.getTriangleVertexCount = function() {
  return this.count * 6;
};


discoball.Ball.prototype.point = function(theta, phi) {
  return new discoball.Vector(
    this.radius * Math.sin(theta) * Math.sin(phi),
    this.radius * Math.cos(theta),
    this.radius * Math.sin(theta) * Math.cos(phi)
  );
};


discoball.Ball.prototype.buildTriangles = function() {
  var circumference = 2 * Math.PI * this.radius;
  var tileSize = circumference / this.n;
  var data = [];
  this.count = 0;
  for (var i = 0; i < this.n/2; ++i) {
    var shift = Math.random();
    var theta0 = i * 2 * Math.PI / this.n;
    var theta1 = (i + 1) * 2 * Math.PI / this.n;
    var m = Math.floor(Math.sin((theta0+theta1)/2) * circumference / tileSize);
    this.count += m;
    for (var j = 0; j < m; ++j) {
      var phi0 = j * 2 * Math.PI / m;
      var phi1 = (j + 1) * 2 * Math.PI / m;
      var dtheta0 = 0.0025 * Math.random();
      var dtheta1 = -0.0025 * Math.random();
      var dphi0 = 0.0025 * Math.random() + shift;
      var dphi1 = -0.0025 * Math.random() + shift;
      var v0 = this.point(theta0 + dtheta0, phi0 + dphi0);
      var v1 = this.point(theta0 + dtheta0, phi1 + dphi1);
      var v2 = this.point(theta1 + dtheta1, phi1 + dphi1);
      var v3 = this.point(theta1 + dtheta1, phi0 + dphi0);
      var v01 = v0.plus(v1);
      var v12 = v1.plus(v2);
      var v23 = v2.plus(v3);
      var v30 = v3.plus(v0);
      var v0123 = v0.plus(v1).plus(v2).plus(v3);
      var index = Math.floor(Math.random() * 9);
      var normal = [v0, v1, v2, v3, v01, v12, v23, v30, v0123][index].
          normalized();
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
  }
  return new Float32Array(data);
};
