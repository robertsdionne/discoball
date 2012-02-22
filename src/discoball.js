// Copyright 2011 Robert Scott Dionne. All rights reserved.

/**
 * @fileoverview
 * @author robertsdionne@gmail.com (Robert Scott Dionne)
 */


/**
 * @type {webgl.App}
 * @private
 */
discoball.app_ = null;


/**
 * @param {HTMLCanvasElement} canvas
 * @param {Object.<string, *>=} opt_options
 * @export
 */
discoball.install = function(canvas, opt_options) {
  if (discoball.app_) {
    discoball.app_.uninstall();
  }
  var keys = new discoball.Keys(document);
  discoball.app_ = new webgl.App(window, keys, opt_options);
  discoball.app_.install(canvas, new discoball.Renderer(keys));
};


/**
 * @export
 */
discoball.uninstall = function() {
  discoball.app_.uninstall();
  discoball.app_ = null;
};


/**
 * @export
 */
discoball.start = function() {
  discoball.app_.start();
};


/**
 * @constructor
 * @extends {webgl.Renderer}
 */
discoball.Renderer = function(keys) {

  /**
   * @type {!discoball.Keys}
   */
  this.keys_ = keys;

  /**
   * @type {webgl.Program}
   */
  this.p_ = null;

  /**
   * @type {WebGLBuffer}
   */
  this.ball_ = null;

  /**
   * @type {boolean}
   */
  this.rotate_ = true;
};
goog.inherits(discoball.Renderer, webgl.Renderer);


/** @inheritDoc */
discoball.Renderer.prototype.onChange = function(gl, width, height) {
  gl.viewport(0, 0, width, height);
  var aspect = width/height;
  this.projection_ = this.getFrustumMatrix(
      -aspect/10, aspect/10, -0.1, 0.1, 0.1, 300);
};


/**
 * @param {string} prefix
 * @param {string} suffix
 * @return {Array.<string>}
 */
discoball.Renderer.nameCubeMap = function(prefix, suffix) {
  return [
    'res/' + prefix + 'px.' + suffix,
    'res/' + prefix + 'nx.' + suffix,
    'res/' + prefix + 'py.' + suffix,
    'res/' + prefix + 'ny.' + suffix,
    'res/' + prefix + 'pz.' + suffix,
    'res/' + prefix + 'nz.' + suffix
  ];
};


discoball.Renderer.CUBE_MAPS = [
  discoball.Renderer.nameCubeMap('a', 'jpg'),
  discoball.Renderer.nameCubeMap('b', 'png'),
  discoball.Renderer.nameCubeMap('c', 'png'),
  discoball.Renderer.nameCubeMap('d', 'jpg'),
  discoball.Renderer.nameCubeMap('e', 'png'),
  discoball.Renderer.nameCubeMap('f', 'png'),
  discoball.Renderer.nameCubeMap('g', 'png'),
  discoball.Renderer.nameCubeMap('h', 'png'),
  discoball.Renderer.nameCubeMap('i', 'png'),
  discoball.Renderer.nameCubeMap('j', 'png'),
  discoball.Renderer.nameCubeMap('k', 'jpg'),
  discoball.Renderer.nameCubeMap('l', 'png'),
  discoball.Renderer.nameCubeMap('m', 'png'),
  discoball.Renderer.nameCubeMap('n', 'jpg'),
  discoball.Renderer.nameCubeMap('o', 'png'),
  discoball.Renderer.nameCubeMap('p', 'jpg'),
  discoball.Renderer.nameCubeMap('q', 'png'),
  discoball.Renderer.nameCubeMap('r', 'png'),
  discoball.Renderer.nameCubeMap('s', 'png'),
  discoball.Renderer.nameCubeMap('u', 'png'),
  discoball.Renderer.nameCubeMap('v', 'png')
];


/**
 * @type {string}
 * @const
 */
discoball.Renderer.QUAT_LIB =
  'vec3 rotate(vec4 q, vec3 v){' +
    'vec3 r=q.xyz;' +
    'float a=q.w;' +
    'return v+cross(2.0*r,cross(r,v)+a*v);' +
  '}' +

  'vec4 inverse(vec4 q){' +
    'return vec4(vec3(-1.),1.)*q/dot(q,q);' +
  '}';


/**
 * @type {string}
 * @const
 */
discoball.Renderer.V0 =
  // Per skeleton uniforms
  'uniform mat4 uProjection;' +

  // Per limb uniforms
  'uniform vec4 uTransform[2];' +
  'uniform vec4 uCamera[2];' +

  // Per vertex attributes
  'attribute vec3 aPosition;' +
  'attribute vec3 aNormal;' +
  'attribute vec3 aColor;' +
  'attribute vec2 aTexCoord;' +

  // Per vertex varyings
  'varying vec3 vPosition;' +
  'varying vec3 vNormal;' +
  'varying vec3 vTexCoord;' +
  'varying vec3 vColor;' +

  'void main(){' +
    // Dual quaternion transformation code adapted from
    // Geometric Skinning with Approximate Dual Quaternion Blending:
    // http://isg.cs.tcd.ie/kavanl/papers/sdq-tog08.pdf
    // See dqsFast():
    // http://isg.cs.tcd.ie/kavanl/dq/dqs.cg
    'float len=length(uTransform[0]);' +
    'vec4 transf[2];' +
    'transf[0]=uTransform[0]/len;' +
    'transf[1]=uTransform[1]/len;' +
    'vec3 pos=rotate(transf[0],aPosition);' +
    'vec3 transl=2.0*(transf[0].w*transf[1].xyz-' +
        'transf[1].w*transf[0].xyz+cross(transf[0].xyz,transf[1].xyz));' +
    'pos+=transl;' +

    'len=length(uCamera[0]);' +
    'vec4 camera[2];' +
    'camera[0]=uCamera[0]/len;' +

    'vNormal=rotate(transf[0],aNormal);' +
    'vTexCoord=rotate(inverse(camera[0]),reflect(pos,vNormal));' +
    'vColor=aColor;' +
    'gl_Position=uProjection*vec4(pos,1.0);' +
    'vPosition=pos;' +
  '}';


/**
 * @type {string}
 * @const
 */
discoball.Renderer.F0 =
  'uniform highp vec3 uLightPos;' +
  'uniform samplerCube uTexture;' +

  // Per fragment varyings
  'varying highp vec3 vPosition;' +
  'varying highp vec3 vNormal;' +
  'varying highp vec3 vTexCoord;' +
  'varying lowp vec3 vColor;' +

  'const highp float AMBIENT=0.25;' +

  'void main(){' +
    'highp vec3 light=uLightPos-vPosition;' +
    'highp float spec=' +
        'pow(clamp(-dot(normalize(vPosition),' +
            'normalize(reflect(-light,vNormal))),0.,1.),99.0);' +
    'highp float dot=dot(normalize(light),vNormal);' +
    'highp vec3 diffuse=vec3(max(dot,AMBIENT));' +
    'highp vec3 color=textureCube(uTexture,normalize(vTexCoord)).xyz' +
        '*vColor;' +
    'gl_FragColor=vec4(diffuse*color+vec3(spec),1.);' +
  '}';


/**
 * @type {string}
 * @const
 */
discoball.Renderer.V1 =
  // Per skeleton uniforms
  'uniform mat4 uProjection;' +
  'uniform highp vec3 uLightPos;' +

  // Per limb uniforms
  'uniform vec4 uTransform[2];' +
  'uniform vec4 uCamera[2];' +

  // Per vertex attributes
  'attribute vec3 aPosition;' +
  'attribute vec3 aNormal;' +
  'attribute vec3 aColor;' +
  'attribute vec2 aTexCoord;' +

  // Per vertex varyings
  'varying vec3 vPosition;' +
  'varying vec3 vNormal;' +
  'varying vec2 vTexCoord;' +
  'varying vec3 vColor;' +

  'void main(){' +
     // Dual quaternion transformation code adapted from
     // Geometric Skinning with Approximate Dual Quaternion Blending:
     // http://isg.cs.tcd.ie/kavanl/papers/sdq-tog08.pdf
     // See dqsFast():
     // http://isg.cs.tcd.ie/kavanl/dq/dqs.cg
    'float len=length(uTransform[0]);' +
    'vec4 transf[2];' +
    'transf[0]=uTransform[0]/len;' +
    'transf[1]=uTransform[1]/len;' +
    'vec3 pos=rotate(transf[0],aPosition);' +
    'vec3 transl=2.0*(transf[0].w*transf[1].xyz-' +
        'transf[1].w*transf[0].xyz+cross(transf[0].xyz,transf[1].xyz));' +
    'pos+=transl;' +

    'vNormal=rotate(transf[0],aNormal);' +

    'vec4 plane=vec4(vec3(0.,0.,1.),-100.);' +
    'vec3 ab=reflect(pos-uLightPos,vNormal);' +
    'float t=(plane.w-dot(plane.xyz,pos))/(dot(plane.xyz,ab));' +
    'vec3 q=pos+t*ab;' +

    'if(t<=0.){' +
      'q=vec3(0.);' +
    '}' +

    'vTexCoord=aTexCoord;' +
    'vColor=ab;' +
    'gl_Position=uProjection*vec4(q,1.0);' +
    'vPosition=pos;' +
  '}';


/**
 * @type {string}
 * @const
 */
discoball.Renderer.F1 =
  'uniform sampler2D uTexture;' +

  'varying highp vec2 vTexCoord;' +
  'varying highp vec3 vColor;' +

  'void main(){' +
    'highp vec3 diffuse=vec3(-dot(normalize(vColor),vec3(0.,0.,1.)));' +
    'diffuse*=texture2D(uTexture,vTexCoord).rgb;' +
    'diffuse=max(vec3(.1),diffuse);' +
    'gl_FragColor=vec4(diffuse,1.);' +
  '}';


/**
 * @type {string}
 * @const
 */
discoball.Renderer.V2 =
  'uniform mat4 uProjection;' +
  'uniform vec4 uTransform[2];' +

  'attribute vec3 aPosition;' +
  'attribute vec3 aNormal;' +

  'varying vec3 vPosition;' +
  'varying vec3 vNormal;' +

  'void main(){' +
    'float len=length(uTransform[0]);' +
    'vec4 transf[2];' +
    'transf[0]=uTransform[0]/len;' +
    'transf[1]=uTransform[1]/len;' +
    'vec3 pos=rotate(transf[0],aPosition);' +
    'vec3 transl=2.0*(transf[0].w*transf[1].xyz-' +
        'transf[1].w*transf[0].xyz+cross(transf[0].xyz,transf[1].xyz));' +
    'pos+=transl;' +

    'vPosition=pos;' +
    'vNormal=rotate(transf[0],aNormal);' +

    'gl_Position=uProjection*vec4(pos,1.0);' +
  '}';


/**
 * @type {string}
 * @const
 */
discoball.Renderer.F2 =
     'uniform highp vec3 uLightPos;' +

     'varying highp vec3 vPosition;' +
     'varying highp vec3 vNormal;' +

     'void main(){' +
       'highp vec3 light=normalize(uLightPos-vPosition);' +
       'highp float spec=' +
           'pow(clamp(length(cross(normalize(vPosition),' +
               'normalize(light))),0.,1.),99.0);' +
       'gl_FragColor=vec4(vec3(spec),1.);' +
     '}';


/**  @inheritDoc */
discoball.Renderer.prototype.onCreate = function(gl) {
  this.keys_.install();
  var vertex = new webgl.Shader('v0',
      gl.VERTEX_SHADER,
      discoball.Renderer.QUAT_LIB + discoball.Renderer.V0);
  var fragment = new webgl.Shader('f0',
      gl.FRAGMENT_SHADER, discoball.Renderer.F0);
  this.p_ = new webgl.Program(vertex, fragment);
  this.p_.create(gl);
  this.p_.link(gl);

  vertex = new webgl.Shader('v1',
      gl.VERTEX_SHADER,
      discoball.Renderer.QUAT_LIB + discoball.Renderer.V1);
  fragment = new webgl.Shader('f1',
      gl.FRAGMENT_SHADER, discoball.Renderer.F1);
  this.p2_ = new webgl.Program(vertex, fragment);
  this.p2_.create(gl);
  this.p2_.link(gl);

  vertex = new webgl.Shader('v2',
      gl.VERTEX_SHADER,
      discoball.Renderer.QUAT_LIB + discoball.Renderer.V2);
  fragment = new webgl.Shader('f2',
      gl.FRAGMENT_SHADER, discoball.Renderer.F2);
  this.p3_ = new webgl.Program(vertex, fragment);
  this.p3_.create(gl);
  this.p3_.link(gl);

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);

  this.ball_ = gl.createBuffer();
  this.occluder_ = gl.createBuffer();

  gl.clearColor(0.1, 0.1, 0.1, 1.0);

  this.camera_ = discoball.DualQuaternion.fromTranslation(
      new discoball.Vector(0, 0, -15));
  this.spinning_ = new discoball.DualQuaternion();

  var ball = new discoball.Ball(10, 128, [4, 4, 4]);
  var b = ball.buildTriangles();
  this.ballVertexCount_ = ball.getTriangleVertexCount();

  gl.bindBuffer(gl.ARRAY_BUFFER, this.ball_);
  gl.bufferData(gl.ARRAY_BUFFER, b.byteLength, gl.STATIC_DRAW);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, b);

  b = ball.buildOccluder();
  this.occluderVertexCount_ = ball.getOccluderVertexCount();

  gl.bindBuffer(gl.ARRAY_BUFFER, this.occluder_);
  gl.bufferData(gl.ARRAY_BUFFER, b.byteLength, gl.STATIC_DRAW);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, b);

  this.lightTexture_ = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, this.lightTexture_);
  gl.texParameteri(
      gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  var image = /** @type {HTMLImageElement} */ (document.createElement('img'));
  image.onload = this.buildOnLoad(gl, gl.TEXTURE_2D, image, true);
  image.src = 'res/light.png';

  this.cubeMapIndex_ = 0;
  this.loadCubeMap(gl, this.cubeMapIndex_);
};


discoball.Renderer.prototype.loadCubeMap = function(gl, index) {
  if (this.texture_) {
    gl.deleteTexture(this.texture_);
  }
  this.texture_ = this.loadCubeMapImages(
      gl, discoball.Renderer.CUBE_MAPS[index]);
};


discoball.Renderer.prototype.loadCubeMapImages = function(gl, paths) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  var faces = [
    gl.TEXTURE_CUBE_MAP_POSITIVE_X,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
    gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
    gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
  ];
  for (var i = 0; i < 6; ++i) {
    var image = /** @type {HTMLImageElement} */ (document.createElement('img'));
    var face = faces[i];
    image.onload = this.buildOnLoad(gl, face, image);
    image.src = paths[i];
  }
  return texture;
};


/**
 * @param {WebGLRenderingContext} gl
 * @param {number} target
 * @param {HTMLImageElement} image
 * @param {boolean=} opt_mipmap
 */
discoball.Renderer.prototype.buildOnLoad = function(
    gl, target, image, opt_mipmap) {
  return function() {
    gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    if (opt_mipmap) {
      gl.generateMipmap(target);
    }
  };
};


discoball.Renderer.prototype.getFrustumMatrix = function(
    left, right, bottom, top, near, far) {
  var a = (right + left) / (right - left);
  var b = (top + bottom) / (top - bottom);
  var c = -(far + near) / (far - near);
  var d = -(2 * far * near) / (far - near);
  return [
    2 * near / (right - left), 0, 0, 0,
    0, 2 * near / (top - bottom), 0, 0,
    a, b, c, -1,
    0, 0, d, 0
  ];
};


/** @inheritDoc */
discoball.Renderer.prototype.onDestroy = function(gl) {};


discoball.Renderer.prototype.render = function(
    gl, program, buffer, n, type) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(program['aPosition'], 3, gl.FLOAT, false, 44, 0);
  gl.enableVertexAttribArray(program['aPosition']);
  if (program['aNormal'] >= 0) {
    gl.vertexAttribPointer(program['aNormal'], 3, gl.FLOAT, false, 44, 12);
    gl.enableVertexAttribArray(program['aNormal']);
  }
  if (program['aColor'] >= 0) {
    gl.vertexAttribPointer(program['aColor'], 3, gl.FLOAT, false, 44, 24);
    gl.enableVertexAttribArray(program['aColor']);
  }
  if (program['aTexCoord'] >= 0) {
    gl.vertexAttribPointer(program['aTexCoord'], 2, gl.FLOAT, false, 44, 36);
    gl.enableVertexAttribArray(program['aTexCoord']);
  }
  gl.drawArrays(type, 0, n);
  gl.disableVertexAttribArray(program['aPosition']);
  if (program['aNormal'] >= 0) {
    gl.disableVertexAttribArray(program['aNormal']);
  }
  if (program['aColor'] >= 0) {
    gl.disableVertexAttribArray(program['aColor']);
  }
  if (program['aTexCoord'] >= 0) {
    gl.disableVertexAttribArray(program['aTexCoord']);
  }
};


discoball.Renderer.LIGHT_POS = new discoball.Vector(40, 0, 20);


discoball.Renderer.prototype.scenePass = function(gl) {
  gl.useProgram(this.p_.handle);
  gl.cullFace(gl.BACK);
  gl.uniformMatrix4fv(this.p_['uProjection'], false, this.projection_);
  gl.uniform1i(this.p_['uTexture'], this.texture_);
  var palette = new discoball.Pose([this.camera_]).get();
  gl.uniform4fv(this.p_['uCamera'], palette);
  palette = new discoball.Pose([this.camera_.times(this.spinning_)]).get();
  gl.uniform4fv(this.p_['uTransform'], palette);
  var lightPos = this.camera_.transform(discoball.Renderer.LIGHT_POS);
  gl.uniform3f(this.p_['uLightPos'], lightPos.x, lightPos.y, lightPos.z);
  this.render(
      gl, this.p_, this.ball_, this.ballVertexCount_, gl.TRIANGLES);
  gl.useProgram(this.p3_.handle);
  gl.uniformMatrix4fv(this.p3_['uProjection'], false, this.projection_);
  gl.uniform4fv(this.p3_['uTransform'], palette);
  gl.uniform3f(this.p3_['uLightPos'], lightPos.x, lightPos.y, lightPos.z);
  this.render(
      gl, this.p3_, this.occluder_, this.occluderVertexCount_, gl.TRIANGLES);
};


discoball.Renderer.prototype.reflectionPass = function(gl) {
  gl.useProgram(this.p2_.handle);
  gl.cullFace(gl.FRONT);
  gl.uniformMatrix4fv(this.p2_['uProjection'], false, this.projection_);
  var palette = new discoball.Pose([this.camera_.times(this.spinning_)]).get();
  gl.uniform4fv(this.p2_['uTransform'], palette);
  var lightPos = this.camera_.transform(discoball.Renderer.LIGHT_POS);
  gl.uniform3f(this.p2_['uLightPos'], lightPos.x, lightPos.y, lightPos.z);
  this.render(
      gl, this.p2_, this.ball_, this.ballVertexCount_, gl.TRIANGLES);
};


discoball.Renderer.DISPLACEMENT = 0.1;


discoball.Renderer.ROTATION = Math.PI/64;


/** @inheritDoc */
discoball.Renderer.prototype.onDraw = function(gl) {
  if (this.rotate_) {
    this.spinning_ = this.spinning_.times(
        discoball.DualQuaternion.fromAxisAngle(
            discoball.Vector.J, discoball.Renderer.ROTATION/16));
  }
  this.handleKeys(gl);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  this.scenePass(gl);
  this.reflectionPass(gl);
  gl.flush();
};


discoball.Renderer.prototype.handleKeys = function(gl) {
  if (this.keys_.justPressed(discoball.Key.J)) {
    this.rotate_ = !this.rotate_;
  }
  if (this.keys_.justPressed(discoball.Key.N)) {
    ++this.cubeMapIndex_;
    if (this.cubeMapIndex_ >= discoball.Renderer.CUBE_MAPS.length) {
      this.cubeMapIndex_ = 0;
    }
    this.loadCubeMap(gl, this.cubeMapIndex_);
  }
  if (this.keys_.justPressed(discoball.Key.P)) {
    --this.cubeMapIndex_;
    if (this.cubeMapIndex_ < 0) {
      this.cubeMapIndex_ = discoball.Renderer.CUBE_MAPS.length - 1;
    }
    this.loadCubeMap(gl, this.cubeMapIndex_);
  }
  if (this.keys_.isPressed(discoball.Key.W)) {
    this.camera_ = discoball.DualQuaternion.fromTranslation(
        discoball.Vector.K.times(discoball.Renderer.DISPLACEMENT)).
            times(this.camera_);
  }
  if (this.keys_.isPressed(discoball.Key.S)) {
    this.camera_ = discoball.DualQuaternion.fromTranslation(
        discoball.Vector.K.times(-discoball.Renderer.DISPLACEMENT)).
            times(this.camera_);
  }
  if (this.keys_.isPressed(discoball.Key.A)) {
    this.camera_ = discoball.DualQuaternion.fromTranslation(
        discoball.Vector.I.times(discoball.Renderer.DISPLACEMENT)).
            times(this.camera_);
  }
  if (this.keys_.isPressed(discoball.Key.D)) {
    this.camera_ = discoball.DualQuaternion.fromTranslation(
        discoball.Vector.I.times(-discoball.Renderer.DISPLACEMENT)).
            times(this.camera_);
  }
  if (this.keys_.isPressed(discoball.Key.Z)) {
    this.camera_ = discoball.DualQuaternion.fromTranslation(
        discoball.Vector.J.times(discoball.Renderer.DISPLACEMENT)).
            times(this.camera_);
  }
  if (this.keys_.isPressed(discoball.Key.Q)) {
    this.camera_ = discoball.DualQuaternion.fromTranslation(
        discoball.Vector.J.times(-discoball.Renderer.DISPLACEMENT)).
            times(this.camera_);
  }
  if (this.keys_.isPressed(discoball.Key.RIGHT)) {
    this.camera_ = discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.J, discoball.Renderer.ROTATION).times(this.camera_);
  }
  if (this.keys_.isPressed(discoball.Key.LEFT)) {
    this.camera_ = discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.J, -discoball.Renderer.ROTATION).times(this.camera_);
  }
  if (this.keys_.isPressed(discoball.Key.DOWN)) {
    this.camera_ = discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.I, discoball.Renderer.ROTATION).times(this.camera_);
  }
  if (this.keys_.isPressed(discoball.Key.UP)) {
    this.camera_ = discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.I, -discoball.Renderer.ROTATION).times(this.camera_);
  }
  if (this.keys_.isPressed(discoball.Key.GT)) {
    this.camera_ = discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.K, discoball.Renderer.ROTATION).times(this.camera_);
  }
  if (this.keys_.isPressed(discoball.Key.LT)) {
    this.camera_ = discoball.DualQuaternion.fromAxisAngle(
        discoball.Vector.K, -discoball.Renderer.ROTATION).times(this.camera_);
  }
};
