// Copyright 2011 Robert Scott Dionne. All rights reserved.

discoball.Ball = function(radius, n, color) {
  this.radius = radius;
  this.n = n;
  this.color = color;
};


discoball.Ball.prototype.getTriangleVertexCount = function() {
  return this.n * this.n * 3;
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
  var data = [];
  for (var i = 0; i < this.n/2; ++i) {
    for (var j = 0; j < this.n; ++j) {
      var theta0 = i * 2 * Math.PI / this.n + 0.0025 * Math.random();
      var theta1 = (i + 1) * 2 * Math.PI / this.n - 0.0025 * Math.random();
      var phi0 = j * 2 * Math.PI / this.n + 0.0025 * Math.random();
      var phi1 = (j + 1) * 2 * Math.PI / this.n - 0.0025 * Math.random();
      var v0 = this.point(theta0, phi0);
      var v1 = this.point(theta0, phi1);
      var v2 = this.point(theta1, phi1);
      var v3 = this.point(theta1, phi0);
      var normal = v0.plus(v1).plus(v2).plus(v3).over(4).normalized();
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
