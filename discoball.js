var e=null,h,l=this;l.requestAnimationFrame=l.requestAnimationFrame||l.webkitRequestAnimationFrame||l.mozRequestAnimationFrame||l.oRequestAnimationFrame||l.msRequestAnimationFrame||function(a){l.setTimeout(a,1E3/60)};function m(a,c){function b(){}b.prototype=c.prototype;a.ia=c.prototype;a.prototype=new b}
function o(a,c,b){var f=c||l;if(arguments.length>2){var g=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(arguments,g);return a.apply(f,b)}}else return function(){return a.apply(f,arguments)}};function p(a,c){this.c=a||new u;this.d=typeof c==="undefined"?1:c}h=p.prototype;h.m=function(){return new p(this.c.m(),-this.d)};h.P=function(){return Math.sqrt(this.r())};h.r=function(){return this.d*this.d+this.c.r()};h.t=function(){return this.k(this.P())};h.L=function(){return new p(this.c.m(),this.d)};h.A=function(){return this.L().k(this.r())};h.f=function(a){if(typeof a==="number")return new p(this.c,this.d+a);else if(a instanceof p)return new p(this.c.f(a.c),this.d+a.d);return e};
h.l=function(a){if(typeof a==="number")return new p(this.c,this.d-a);else if(a instanceof p)return new p(this.c.l(a.c),this.d-a.d);return e};h.b=function(a){if(typeof a==="number")return new p(this.c.b(a),this.d*a);else if(a instanceof p)return new p(a.c.b(this.d).f(this.c.b(a.d)).f(this.c.N(a.c)),this.d*a.d-this.c.C(a.c));return e};h.k=function(a){if(typeof a==="number")return new p(this.c.k(a),this.d/a);else if(a instanceof p)return this.b(a.A());return e};h.transform=function(a){return this.b(a).b(this.A()).c};
h.toString=function(){return this.c+" + "+this.d};function u(a,c,b){this.d=0;this.c=this;this.x=a||0;this.y=c||0;this.a=b||0}m(u,p);var w=new u(1,0,0),x=new u(0,1,0),y=new u(0,0,1);h=u.prototype;h.m=function(){return new u(-this.x,-this.y,-this.a)};h.r=function(){return this.C(this)};h.f=function(a){return a instanceof u?new u(this.x+a.x,this.y+a.y,this.a+a.a):p.prototype.f.call(this,a)};h.l=function(a){return a instanceof u?new u(this.x-a.x,this.y-a.y,this.a-a.a):p.prototype.f.call(this,a)};
h.b=function(a){return typeof a==="number"?new u(this.x*a,this.y*a,this.a*a):p.prototype.b.call(this,a)};h.k=function(a){return typeof a==="number"?new u(this.x/a,this.y/a,this.a/a):p.prototype.k.call(this,a)};h.N=function(a){return new u(this.y*a.a-this.a*a.y,this.a*a.x-this.x*a.a,this.x*a.y-this.y*a.x)};h.C=function(a){return this.x*a.x+this.y*a.y+this.a*a.a};h.toString=function(){return this.x+"i + "+this.y+"j + "+this.a+"k"};function C(a,c){this.h=a||0;this.i=c||0}h=C.prototype;h.s=function(){return new C(this.h,-this.i)};h.f=function(a){return new C(this.h+a.h,this.i+a.i)};h.l=function(a){return new C(this.h-a.h,this.i-a.i)};h.m=function(){return new C(-this.h,-this.i)};h.b=function(a){return new C(this.h*a.h,this.h*a.i+this.i*a.h)};h.inverse=function(){return new C(1/this.h,-this.i/this.h/this.h)};h.k=function(a){return this.b(a.inverse())};h.sqrt=function(){return new C(Math.sqrt(this.h),this.i/2/Math.sqrt(this.h))};
h.toString=function(){return this.h+" + "+this.i+"e"};function F(a,c){this.c=a||new I;this.d=typeof c==="undefined"?new C(1):c}function J(a){return new F(new I(new C(0,a.x/2),new C(0,a.y/2),new C(0,a.a/2)),new C(1))}function K(a,c){var b=a.t().b(Math.sin(c/2));return new F(new I(new C(b.x),new C(b.y),new C(b.a)),new C(Math.cos(c/2)))}h=F.prototype;h.h=function(){return new p(this.c.h(),this.d.h)};h.i=function(){return new p(this.c.i(),this.d.i)};h.m=function(){return new F(this.c.m(),this.d.m())};h.P=function(){return this.r().sqrt()};h.r=function(){return this.d.b(this.d).f(this.c.r())};
h.t=function(){return this.k(this.P())};h.L=function(){return new F(this.c.m(),this.d)};h.s=function(){return new F(this.c.s(),this.d.s())};h.A=function(){return this.L().k(this.r())};h.f=function(a){if(a instanceof C)return new F(this.c,this.d.f(a));else if(a instanceof F)return new F(this.c.f(a.c),this.d.f(a.d));return e};h.l=function(a){if(a instanceof C)return new F(this.c,this.d.l(a));else if(a instanceof F)return new F(this.c.l(a.c),this.d.l(a.d));return e};
h.b=function(a){if(a instanceof C)return new F(this.c.b(a),this.d.b(a));else if(a instanceof F)return new F(a.c.b(this.d).f(this.c.b(a.d)).f(this.c.N(a.c)),this.d.b(a.d).l(this.c.C(a.c)));else if(a instanceof L){for(var c=new L,b=0;b<a.n.length;++b)c.set(b,this.b(a.n[b]));return c}return e};h.k=function(a){if(a instanceof C)return new F(this.c.k(a),this.d.k(a));else if(a instanceof F)return this.b(a.A());return e};
h.transform=function(a){return this.b(new F(new I(new C(0,a.x),new C(0,a.y),new C(0,a.a)),new C(1))).b(this.s().A()).c.i()};h.toString=function(){return this.c+" + "+this.d};function I(a,c,b){this.d=new C;this.c=this;this.x=a||new C;this.y=c||new C;this.a=b||new C}m(I,F);h=I.prototype;h.h=function(){return new u(this.x.h,this.y.h,this.a.h)};h.i=function(){return new u(this.x.i,this.y.i,this.a.i)};h.s=function(){return new I(this.x.s(),this.y.s(),this.a.s())};h.m=function(){return new I(this.x.m(),this.y.m(),this.a.m())};h.r=function(){return this.C(this)};h.f=function(a){return a instanceof I?new I(this.x.f(a.x),this.y.f(a.y),this.a.f(a.a)):F.prototype.f.call(this,a)};
h.l=function(a){return a instanceof I?new I(this.x.l(a.x),this.y.l(a.y),this.a.l(a.a)):F.prototype.f.call(this,a)};h.b=function(a){return a instanceof C?new I(this.x.b(a),this.y.b(a),this.a.b(a)):F.prototype.b.call(this,a)};h.k=function(a){return a instanceof C?new I(this.x.k(a),this.y.k(a),this.a.k(a)):F.prototype.k.call(this,a)};h.N=function(a){return new I(this.y.b(a.a).l(this.a.b(a.y)),this.a.b(a.x).l(this.x.b(a.a)),this.x.b(a.y).l(this.y.b(a.x)))};h.C=function(a){return this.x.b(a.x).f(this.y.b(a.y)).f(this.a.b(a.a))};
h.toString=function(){return"("+this.x+")i + ("+this.y+")j + ("+this.a+")k"};function aa(){this.I=10;this.o=128;this.j=[4,4,4];this.Q=this.M=e}function M(a,c,b){return new u(a.I*Math.sin(c)*Math.sin(b),a.I*Math.cos(c),a.I*Math.sin(c)*Math.cos(b))};function N(a,c){this.ja=a;this.e=c;this.reset()}
N.prototype.O=function(a,c){for(var b in a){this.w[b]=l.document.getElementById(b);this.w[b].width=window.innerWidth;this.w[b].height=window.innerHeight;this.z[b]=this.w[b].getContext("experimental-webgl");this.J[b]=a[b];var f=this.J[b],g=this.z[b];f.e.O();var n=new O("v0",g.VERTEX_SHADER,f.getShaderSource("quatlib")+f.getShaderSource("v0")),d=new O("f0",g.FRAGMENT_SHADER,f.getShaderSource("f0"));f.p=new P(n,d);f.p.create(g);f.p.link(g);n=new O("v1",g.VERTEX_SHADER,f.getShaderSource("quatlib")+f.getShaderSource("v1"));
d=new O("f1",g.FRAGMENT_SHADER,f.getShaderSource("f1"));f.u=new P(n,d);f.u.create(g);f.u.link(g);n=new O("v2",g.VERTEX_SHADER,f.getShaderSource("quatlib")+f.getShaderSource("v2"));d=new O("f2",g.FRAGMENT_SHADER,f.getShaderSource("f2"));f.v=new P(n,d);f.v.create(g);f.v.link(g);g.enable(g.DEPTH_TEST);g.enable(g.CULL_FACE);f.G=g.createBuffer();f.Z=g.createBuffer();g.clearColor(0.1,0.1,0.1,1);f.g=J(new u(0,0,-15));f.K=new F;for(var d=n=new aa,j=2*Math.PI*d.I,q=j/d.o,i=[],D=d.M=0;D<d.o/2;++D){var E=Math.random(),
G=D*2*Math.PI/d.o,A=(D+1)*2*Math.PI/d.o,z=(G+A)/2,B=0.0025/Math.sin(z),z=Math.floor(Math.sin(z)*j/q);d.M+=z;for(var H=0;H<z;++H){var v=H*2*Math.PI/z,k=(H+1)*2*Math.PI/z,r=M(d,G+0.0025*Math.random(),v+B*Math.random()+E),t=M(d,G+0.0025*Math.random(),k-B*Math.random()+E),k=M(d,A-0.0025*Math.random(),k-B*Math.random()+E),v=M(d,A-0.0025*Math.random(),v+B*Math.random()+E),s=[r,t,k,v,r.f(t),t.f(k),k.f(v),v.f(r),r.f(t).f(k).f(v)][Math.floor(Math.random()*9)].t(),R=new u(0.15,0.15),Z=new u(0.15,0.85),S=new u(0.85,
0.85),$=new u(0.85,0.15);i.push(r.x,r.y,r.a);i.push(s.x,s.y,s.a);i.push(d.j[0],d.j[1],d.j[2]);i.push(R.x,R.y);i.push(k.x,k.y,k.a);i.push(s.x,s.y,s.a);i.push(d.j[0],d.j[1],d.j[2]);i.push(S.x,S.y);i.push(t.x,t.y,t.a);i.push(s.x,s.y,s.a);i.push(d.j[0],d.j[1],d.j[2]);i.push(Z.x,Z.y);i.push(r.x,r.y,r.a);i.push(s.x,s.y,s.a);i.push(d.j[0],d.j[1],d.j[2]);i.push(R.x,R.y);i.push(v.x,v.y,v.a);i.push(s.x,s.y,s.a);i.push(d.j[0],d.j[1],d.j[2]);i.push($.x,$.y);i.push(k.x,k.y,k.a);i.push(s.x,s.y,s.a);i.push(d.j[0],
d.j[1],d.j[2]);i.push(S.x,S.y)}}d=new Float32Array(i);f.V=n.M*6;g.bindBuffer(g.ARRAY_BUFFER,f.G);g.bufferData(g.ARRAY_BUFFER,d.byteLength,g.STATIC_DRAW);g.bufferSubData(g.ARRAY_BUFFER,0,d);d=n;j=[];q=new u;for(i=d.Q=0;i<d.o/2;++i){D=i*2*Math.PI/d.o;E=(i+1)*2*Math.PI/d.o;d.Q+=d.o;for(G=0;G<d.o;++G)t=G*2*Math.PI/d.o,k=(G+1)*2*Math.PI/d.o,A=M(d,D,t).b(0.99),B=M(d,D,t).t(),z=M(d,D,k).b(0.99),H=M(d,D,k).t(),r=M(d,E,k).b(0.99),k=M(d,E,k).t(),v=M(d,E,t).b(0.99),t=M(d,E,t).t(),A.f(z).f(r).f(v).t(),j.push(A.x,
A.y,A.a),j.push(B.x,B.y,B.a),j.push(q.x,q.y,q.a),j.push(0,0),j.push(r.x,r.y,r.a),j.push(k.x,k.y,k.a),j.push(q.x,q.y,q.a),j.push(0,0),j.push(z.x,z.y,z.a),j.push(H.x,H.y,H.a),j.push(q.x,q.y,q.a),j.push(0,0),j.push(A.x,A.y,A.a),j.push(B.x,B.y,B.a),j.push(q.x,q.y,q.a),j.push(0,0),j.push(v.x,v.y,v.a),j.push(t.x,t.y,t.a),j.push(q.x,q.y,q.a),j.push(0,0),j.push(r.x,r.y,r.a),j.push(k.x,k.y,k.a),j.push(q.x,q.y,q.a),j.push(0,0)}d=new Float32Array(j);f.fa=n.Q*6;g.bindBuffer(g.ARRAY_BUFFER,f.Z);g.bufferData(g.ARRAY_BUFFER,
d.byteLength,g.STATIC_DRAW);g.bufferSubData(g.ARRAY_BUFFER,0,d);f.ea=g.createTexture();g.bindTexture(g.TEXTURE_2D,f.ea);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,g.LINEAR_MIPMAP_LINEAR);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,g.LINEAR);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE);n=document.createElement("img");n.onload=ba(g,g.TEXTURE_2D,n,!0);n.src="light.png";f.q=0;Q(f,g,f.q)}if(c)this.T=0,this.aa=
l.document.getElementById(c),this.Y=(new Date).getTime();this.$()};N.prototype.round=function(a){return Math.round(10*a)/10};
N.prototype.$=function(){for(var a in this.z){var c=window.innerWidth,b=window.innerHeight;if(this.ba[a]!==c||this.X[a]!==b){this.w[a].width=c;this.w[a].height=b;this.ba[a]=c;this.X[a]=b;var f=this.J[a];this.z[a].viewport(0,0,c,b);b=c/b;f.R=[0.2/(b/10- -b/10),0,0,0,0,1,0,0,(b/10+-b/10)/(b/10- -b/10),0,-300.1/299.9,-1,0,0,-60/299.9,0]}}if(this.aa)a=+new Date,this.T=0.25*(a-this.Y||1)+0.75*this.T,this.aa.innerText=this.round(this.T)+" ms",this.Y=a;for(var g in this.z){f=this.J[g];a=this.z[g];if(f.S)f.K=
f.K.b(K(x,T/16));b=f;c=a;if(b.e.e[74]&&!b.e.H[74])b.S=!b.S;if(b.e.e[78]&&!b.e.H[78]){++b.q;if(b.q>=U.length)b.q=0;Q(b,c,b.q)}if(b.e.e[80]&&!b.e.H[80]){--b.q;if(b.q<0)b.q=U.length-1;Q(b,c,b.q)}if(b.e.e[87])b.g=J(y.b(0.1)).b(b.g);if(b.e.e[83])b.g=J(y.b(-0.1)).b(b.g);if(b.e.e[65])b.g=J(w.b(0.1)).b(b.g);if(b.e.e[68])b.g=J(w.b(-0.1)).b(b.g);if(b.e.e[90])b.g=J(x.b(0.1)).b(b.g);if(b.e.e[81])b.g=J(x.b(-0.1)).b(b.g);if(b.e.e[39])b.g=K(x,T).b(b.g);if(b.e.e[37])b.g=K(x,-T).b(b.g);if(b.e.e[40])b.g=K(w,T).b(b.g);
if(b.e.e[38])b.g=K(w,-T).b(b.g);if(b.e.e[190])b.g=K(y,T).b(b.g);if(b.e.e[188])b.g=K(y,-T).b(b.g);a.clear(a.DEPTH_BUFFER_BIT|a.COLOR_BUFFER_BIT);b=f;c=a;c.useProgram(b.p.handle);c.cullFace(c.BACK);c.uniformMatrix4fv(b.p.uProjection,!1,b.R);c.uniform1i(b.p.uTexture,b.U);var n=(new L([b.g])).get();c.uniform4fv(b.p.uCamera,n);n=(new L([b.g.b(b.K)])).get();c.uniform4fv(b.p.uTransform,n);var d=b.g.transform(ca);c.uniform3f(b.p.uLightPos,d.x,d.y,d.a);V(c,b.p,b.G,b.V,c.TRIANGLES);c.useProgram(b.v.handle);
c.uniformMatrix4fv(b.v.uProjection,!1,b.R);c.uniform4fv(b.v.uTransform,n);c.uniform3f(b.v.uLightPos,d.x,d.y,d.a);V(c,b.v,b.Z,b.fa,c.TRIANGLES);b=a;b.useProgram(f.u.handle);b.cullFace(b.FRONT);b.uniformMatrix4fv(f.u.uProjection,!1,f.R);c=(new L([f.g.b(f.K)])).get();b.uniform4fv(f.u.uTransform,c);c=f.g.transform(ca);b.uniform3f(f.u.uLightPos,c.x,c.y,c.a);V(b,f.u,f.G,f.V,b.TRIANGLES);a.flush()}this.e.update();l.requestAnimationFrame(o(this.$,this))};
N.prototype.reset=function(){this.w={};this.z={};this.J={};this.ba={};this.X={}};function P(a,c){this.name=a.name+":"+c.name;this.F=a;this.D=c}var da=/(.*)\[.*/;function ea(a){var c=a.match(da);return c?c[1]:a}P.prototype.create=function(a){this.F.create(a);this.D.create(a);this.handle=a.createProgram()};P.prototype.B=function(a){a.detachShader(this.handle,this.F.handle);this.F.B(a);a.detachShader(this.handle,this.D.handle);this.D.B(a);a.deleteProgram(this.handle);this.handle=e};
P.prototype.link=function(a){this.F.compile(a);a.attachShader(this.handle,this.F.handle);this.D.compile(a);a.attachShader(this.handle,this.D.handle);a.linkProgram(this.handle);if(!a.getProgramParameter(this.handle,a.LINK_STATUS)){var c=a.getProgramInfoLog(this.handle);this.B(a);throw Error(c);}for(var c=a.getProgramParameter(this.handle,a.ACTIVE_UNIFORMS),b=0;b<c;++b){var f=ea(a.getActiveUniform(this.handle,b).name);this[f]=a.getUniformLocation(this.handle,f)}c=a.getProgramParameter(this.handle,a.ACTIVE_ATTRIBUTES);
for(b=0;b<c;++b)f=ea(a.getActiveAttrib(this.handle,b).name),this[f]=a.getAttribLocation(this.handle,f)};function fa(){};function O(a,c,b){this.name=a;this.ha=c;this.ga=b}O.prototype.create=function(a){this.handle=a.createShader(this.ha);a.shaderSource(this.handle,this.ga)};O.prototype.compile=function(a){a.compileShader(this.handle);if(!a.getShaderParameter(this.handle,a.COMPILE_STATUS)){var c=a.getShaderInfoLog(this.handle);this.B(a);throw Error(c);}};O.prototype.B=function(a){a.deleteShader(this.handle);this.handle=e};function W(a){this.W=a;this.e={};this.H={}}W.prototype.O=function(){this.W.onkeydown=o(this.ca,this);this.W.onkeyup=o(this.da,this)};W.prototype.ca=function(a){return this.e[a.keyCode]=!0};W.prototype.da=function(a){this.e[a.keyCode]=!1;return!0};W.prototype.update=function(){for(var a in this.e)this.H[a]=this.e[a]};function L(a){this.n=a||[]}h=L.prototype;h.inverse=function(){for(var a=new L,c=0;c<this.n.length;++c)a.set(c,this.n[c].A());return a};h.b=function(a){for(var c=new L,b=0;b<this.n.length;++b)c.set(b,this.n[b].b(a.n[b]));return c};h.set=function(a,c){this.n[a]=c};h.reset=function(){this.n=[]};h.get=function(){for(var a=[],c=0;c<this.n.length;++c){var b=this.n[c];a.push(b.c.x.h,b.c.y.h,b.c.a.h,b.d.h,b.c.x.i,b.c.y.i,b.c.a.i,b.d.i)}return a};window.onload=function(){var a=new W(document);(new N(window,a)).O({c0:new X(a)},"stats")};function X(a){this.e=a;this.G=this.p=e;this.S=!0}m(X,fa);X.prototype.getShaderSource=function(a){return l.document.getElementById(a).text};function Y(a,c){return[a+"px."+c,a+"nx."+c,a+"py."+c,a+"ny."+c,a+"pz."+c,a+"nz."+c]}
var U=[Y("a","jpg"),Y("b","png"),Y("c","png"),Y("d","jpg"),Y("e","png"),Y("f","png"),Y("g","png"),Y("h","png"),Y("i","png"),Y("j","png"),Y("k","jpg"),Y("l","png"),Y("m","png"),Y("n","jpg"),Y("o","png"),Y("p","jpg"),Y("q","png"),Y("r","png"),Y("s","png"),Y("u","png"),Y("v","png")];
function Q(a,c,b){a.U&&c.deleteTexture(a.U);var b=U[b],f=c.createTexture();c.bindTexture(c.TEXTURE_CUBE_MAP,f);c.texParameteri(c.TEXTURE_CUBE_MAP,c.TEXTURE_MIN_FILTER,c.LINEAR);c.texParameteri(c.TEXTURE_CUBE_MAP,c.TEXTURE_MAG_FILTER,c.LINEAR);for(var g=[c.TEXTURE_CUBE_MAP_POSITIVE_X,c.TEXTURE_CUBE_MAP_NEGATIVE_X,c.TEXTURE_CUBE_MAP_POSITIVE_Y,c.TEXTURE_CUBE_MAP_NEGATIVE_Y,c.TEXTURE_CUBE_MAP_POSITIVE_Z,c.TEXTURE_CUBE_MAP_NEGATIVE_Z],n=0;n<6;++n){var d=document.createElement("img");d.onload=ba(c,g[n],
d);d.src=b[n]}a.U=f}function ba(a,c,b,f){return function(){a.texImage2D(c,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,b);f&&a.generateMipmap(c)}}
function V(a,c,b,f,g){a.bindBuffer(a.ARRAY_BUFFER,b);a.vertexAttribPointer(c.aPosition,3,a.FLOAT,!1,44,0);a.enableVertexAttribArray(c.aPosition);c.aNormal>=0&&(a.vertexAttribPointer(c.aNormal,3,a.FLOAT,!1,44,12),a.enableVertexAttribArray(c.aNormal));c.aColor>=0&&(a.vertexAttribPointer(c.aColor,3,a.FLOAT,!1,44,24),a.enableVertexAttribArray(c.aColor));c.aTexCoord>=0&&(a.vertexAttribPointer(c.aTexCoord,2,a.FLOAT,!1,44,36),a.enableVertexAttribArray(c.aTexCoord));a.drawArrays(g,0,f);a.disableVertexAttribArray(c.aPosition);
c.aNormal>=0&&a.disableVertexAttribArray(c.aNormal);c.aColor>=0&&a.disableVertexAttribArray(c.aColor);c.aTexCoord>=0&&a.disableVertexAttribArray(c.aTexCoord)}var ca=new u(40,0,20),T=Math.PI/64;
