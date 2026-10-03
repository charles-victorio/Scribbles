import{$ as e,A as t,B as n,C as r,D as i,E as a,F as o,G as s,H as c,I as l,J as u,K as d,N as f,O as p,P as m,R as h,S as ee,V as g,W as _,X as v,Y as y,a as te,b as ne,c as re,ct as b,d as ie,et as ae,f as oe,ft as se,g as ce,gt as x,h as S,ht as C,i as le,it as ue,j as w,k as de,l as fe,lt as pe,m as me,mt as T,ot as he,p as E,pt as D,q as O,r as k,s as ge,st as A,tt as _e,u as ve,x as ye,z as be}from"./navLink-B9NtfqvL.js";function xe(e,t){let n=t.look,r=e.addFolder(`Staff look`);r.addColor(n,`color`).name(`Color`),r.add(n,`brightness`,0,1,.01).name(`Brightness`),r.add(n,`opacity`,0,1,.01).name(`Opacity`),r.add(n,`shimmer`,0,1,.01).name(`Shimmer`),r.add(n,`shimmerSpeed`,-6,6,.05).name(`Shimmer speed`),r.add(n,`shimmerScale`,.2,15,.1).name(`Shimmer wavelength`)}var Se={color:`#e8eef8`,brightness:.6,opacity:.85,shimmer:.18,shimmerSpeed:1.5,shimmerScale:3},j=`
  attribute float arc;
  varying float vArc;
  varying vec3 vNormal;
  varying vec3 vView;
  #include <common>
  #include <logdepthbuf_pars_vertex>
  void main() {
    vArc = arc;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
    #include <logdepthbuf_vertex>
  }
`,Ce=`
  uniform vec3 uColor;
  uniform float uBrightness;
  uniform float uOpacity;
  uniform float uShimmer;
  uniform float uShimmerSpeed;
  uniform float uShimmerScale;
  uniform float uTime;
  uniform float uLength;
  varying float vArc;
  varying vec3 vNormal;
  varying vec3 vView;
  #include <common>
  #include <logdepthbuf_pars_fragment>

  void main() {
    #include <logdepthbuf_fragment>
    // Round, soft tube: full at the center facing us, fading to the silhouette.
    float facing = abs(dot(normalize(vNormal), normalize(vView)));
    float core = smoothstep(0.0, 0.85, facing);

    // Gentle shimmer travelling along the lines.
    float s = 0.5 + 0.5 * sin((vArc * uLength - uTime * uShimmerSpeed) * 6.2831853 / uShimmerScale);
    vec3 base = uColor * uBrightness * (1.0 - uShimmer + uShimmer * 2.0 * s);

    vec3 color = base * (0.75 + 0.25 * core);
    float alpha = uOpacity * mix(0.35, 1.0, core);
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`,we=class extends A{look;constructor(e={}){super({vertexShader:j,fragmentShader:Ce,transparent:!0,depthWrite:!1,uniforms:{uColor:{value:new o},uBrightness:{value:0},uOpacity:{value:1},uShimmer:{value:0},uShimmerSpeed:{value:0},uShimmerScale:{value:1},uTime:{value:0},uLength:{value:1}}}),this.look={...Se,...e}}setLength(e){this.uniforms.uLength.value=Math.max(e,.001)}update(e){let t=this.uniforms,n=this.look;t.uColor.value.set(n.color),t.uBrightness.value=n.brightness,t.uOpacity.value=n.opacity,t.uShimmer.value=n.shimmer,t.uShimmerSpeed.value=n.shimmerSpeed,t.uShimmerScale.value=Math.max(n.shimmerScale,.001),t.uTime.value=e}};function Te(e,t){let n={shading:`relit`,normalMap:!0,normalMethod:me,normalScale:1,moveLightTo:``},r=()=>{for(let t of e.people)t.setShading(n.shading),t.setNormalMap(n.normalMap?n.normalMethod:null,n.normalScale)};r();let i=n=>{let r=e.people.find(e=>e.entry.id===n);r&&t.point.position.copy(r.pointAt(.5,.3,e.projection,1))};i(e.people.reduce((e,t)=>e.depth<t.depth?e:t).entry.id);let a=new ce().close();ve(a,`gui-pos:main`);let o=a.addFolder(`Shading`);o.add(n,`shading`,ie).name(`Mode`).onChange(r),o.add(n,`normalMap`).name(`Normal map`).onChange(r),Object.keys(S).length>1&&o.add(n,`normalMethod`,Object.keys(S)).name(`Normal method`).onChange(r),o.add(n,`normalScale`,0,3,.05).name(`Normal scale`).onChange(r);let s=a.addFolder(`Debug lights`).close();s.add({on:t.enabled},`on`).name(`Enabled`).onChange(e=>t.setEnabled(e)),s.add(t.ambient,`intensity`,0,6,.01).name(`Ambient`).decimals(2),s.add(t.key,`intensity`,0,6,.01).name(`Key light`).decimals(2),s.add(t.point,`intensity`,0,30,.1).name(`Point light`).decimals(2),s.add(t.point,`distance`,1,40,.5).name(`Point range`);let c=e.backgroundDepth,l=s.addFolder(`Point light position`).close();return l.add(t.point.position,`x`,-c/2,c/2,.01).listen(),l.add(t.point.position,`y`,-c/3,c/3,.01).listen(),l.add(t.point.position,`z`,-c,5,.01).listen(),s.add(n,`moveLightTo`,[``,...e.people.map(e=>e.entry.id)]).name(`Move light to`).onChange(i),a.add(e.background,`visible`).name(`Background`),a}var Ee=class{ambient=new de(16777215,.35*Math.PI);key=new h(16777215,.4*Math.PI);point=new e(16765562,2.5*Math.PI,10,2);gizmo;root=new g;constructor(e,t){this.key.position.set(-3,4,5);let n=new d(new pe(.08,16,12),new O({color:16765562}));this.point.add(n),this.gizmo=new fe(e,t),this.gizmo.setMode(`translate`),this.gizmo.setSize(.7),this.gizmo.attach(this.point),this.root.name=`debug-lights`,this.root.add(this.ambient,this.key,this.point,this.gizmo.getHelper()),this.setEnabled(!1)}get enabled(){return this.root.visible}setEnabled(e){this.root.visible=e,this.gizmo.enabled=e}};function De(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new w,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=M(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=M(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function M(e){let n,r,i,a=-1,o=0;for(let t=0;t<e.length;++t){let s=e[t];if(n===void 0&&(n=s.array.constructor),n!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(r===void 0&&(r=s.itemSize),r!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(i===void 0&&(i=s.normalized),i!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(a===-1&&(a=s.gpuType),a!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;o+=s.count*r}let s=new n(o),c=new t(s,r,i),l=0;for(let t=0;t<e.length;++t){let n=e[t];if(n.isInterleavedBufferAttribute){let e=l/r;for(let t=0,i=n.count;t<i;t++)for(let i=0;i<r;i++){let r=n.getComponent(t,i);c.setComponent(t+e,i,r)}}else s.set(n.array,l);l+=n.count*r}return a!==void 0&&(c.gpuType=a),c}var N={rx:.62,ry:.44,tilt:_.degToRad(22)},P={width:.1,top:3.3},Oe=.16,F={dx:2.4,dy:.5,rise:.6,thickness:.48,gap:.3},ke={depth:Oe,bevelEnabled:!0,bevelThickness:.04,bevelSize:.03,bevelSegments:3,curveSegments:32};function I(e,t,n){return Math.sqrt(e*e*Math.cos(n)**2+t*t*Math.sin(n)**2)}function L(e,t,n,r,i=0,a=0){let o=new b;if(o.absellipse(i,a,e,t,0,Math.PI*2,!1,n),r){let e=new v;e.absellipse(i,a,r.rx,r.ry,0,Math.PI*2,!0,r.tilt),o.holes.push(e)}return o}function R(e,t,n,r){let i=new b;return i.moveTo(e,t),i.lineTo(n,t),i.lineTo(n,r),i.lineTo(e,r),i.closePath(),i}function z(e,t){let n=new b;return n.moveTo(e,t),n.bezierCurveTo(e+.1,t-.75,e+1.05,t-1,e+.72,t-2.1),n.bezierCurveTo(e+.8,t-1.35,e+.25,t-1.05,e,t-.8),n.closePath(),n}function B(e,t,n,r,i){let a=new b;return a.moveTo(e,t),a.lineTo(n,r),a.lineTo(n,r-i),a.lineTo(e,t-i),a.closePath(),a}function V(e){let t=I(N.rx,N.ry,N.tilt)-.02,n=t,r=F.dx+t,i=P.top+(e===2?.3:0),a=i+F.dy+F.rise,o=[L(N.rx,N.ry,N.tilt),L(N.rx,N.ry,N.tilt,void 0,F.dx,F.dy),R(n-P.width,.05,n,i),R(r-P.width,F.dy+.05,r,a),B(n-P.width,i,r,a,F.thickness)];if(e===2){let e=F.thickness+F.gap;o.push(B(n-P.width,i-e,r,a-e,F.thickness))}return o}function Ae(e){if(e===`beamed8`)return V(1);if(e===`beamed16`)return V(2);if(e===`whole`)return[L(.82,.5,0,{rx:.4,ry:.27,tilt:_.degToRad(-55)})];let t=e===`half`?L(N.rx,N.ry,N.tilt,{rx:.5,ry:.19,tilt:_.degToRad(32)}):L(N.rx,N.ry,N.tilt),n=I(N.rx,N.ry,N.tilt)-.02,r=e===`sixteenth`?P.top+.35:P.top,i=[t,R(n-P.width,.05,n,r)];return e===`eighth`&&i.push(z(n,r)),e===`sixteenth`&&i.push(z(n,r),z(n,r-.75)),i}var H=new Map;function je(e){let t=H.get(e);if(!t){let n=Ae(e).map(e=>new be(e,ke));t=De(n),n.forEach(e=>e.dispose()),t.translate(0,0,-.16/2),t.computeBoundingSphere(),H.set(e,t)}return t}var U={"debug light":{glow:1.3,lightIntensity:2.5*Math.PI,lightRange:10,lightDecay:2,lightColor:`#ffd27a`,lightRadius:.6,softness:1},soft:{glow:1.3,lightIntensity:3,lightRange:3.5,lightDecay:2,lightColor:`#fff1d6`,lightRadius:.6,softness:1}},W=`debug light`,Me={count:6,speed:1.2,bobAmplitude:1.5,bobFrequency:.3,bob2Amplitude:.6,bob2Frequency:.83,tiltDeg:12,glow:U[W].glow,lightIntensity:U[W].lightIntensity,lightRange:U[W].lightRange,lightDecay:U[W].lightDecay,lightColor:U[W].lightColor},G=[[`whole`,1],[`half`,2],[`quarter`,4],[`eighth`,3],[`sixteenth`,2],[`beamed8`,2],[`beamed16`,1]];function Ne(e){return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Pe(e){let t=G.reduce((e,[,t])=>e+t,0),n=e()*t;for(let[e,t]of G)if((n-=t)<0)return e;return`quarter`}var K=null;function Fe(){if(K)return K;let e=Object.assign(document.createElement(`canvas`),{width:128,height:128}),t=e.getContext(`2d`),n=t.createRadialGradient(48.64,40.96,6.4,64,64,64);return n.addColorStop(0,`#ffffff`),n.addColorStop(.6,`#e9e9ee`),n.addColorStop(1,`#a9a9b4`),t.fillStyle=n,t.fillRect(0,0,128,128),K=new f(e),K.colorSpace=ue,K}var Ie=class{type;basePitch;phase;freqScale;phase2;freqScale2;mesh;light;u=0;constructor(t,n,r,i,a,o){this.type=t,this.basePitch=n,this.phase=r,this.freqScale=i,this.phase2=a,this.freqScale2=o;let s=new u({matcap:Fe()});this.mesh=new d(je(t),s),this.mesh.name=`note:${t}`,this.light=new e(16777215,0,4,2),this.light.name=`note-light`}},Le=class{frames;spacing;root=new g;params;notes=[];frame={position:new C,tangent:new C,normal:new C,binormal:new C};basis=new s;bank=new ae;zAxis=new C(0,0,1);distributedFor=-1;constructor(e,t,n={},r=7){this.frames=e,this.spacing=t,this.params={...Me,...n};let i=Ne(r);for(let e=0;e<10;e++){let e=Math.round(i()*6)-3,t=new Ie(Pe(i),e,i()*Math.PI*2,.75+i()*.5,i()*Math.PI*2,.75+i()*.5);this.notes.push(t),this.root.add(t.mesh,t.light)}this.root.name=`notes`}setStaff(e,t){this.frames=e,this.spacing=t,this.distributedFor=-1}update(e,t){let n=this.params,r=this.frames?Math.round(_.clamp(n.count,0,10)):0;r!==this.distributedFor&&this.distribute(r);let i=new o(n.lightColor);this.notes.forEach((a,o)=>{let s=o<r&&!!this.frames;if(a.mesh.visible=s,a.light.intensity=0,!s||!this.frames)return;a.u+=n.speed*e/this.frames.length,!this.frames.closed&&a.u>1&&--a.u;let c=2*Math.PI*n.bobFrequency*a.freqScale,l=2*Math.PI*n.bob2Frequency*a.freqScale2,u=c*t+a.phase,d=l*t+a.phase2,f=a.basePitch+n.bobAmplitude*Math.sin(u)+n.bob2Amplitude*Math.sin(d),p=n.bobAmplitude*c*Math.cos(u)+n.bob2Amplitude*l*Math.cos(d),m=n.bobAmplitude*c+n.bob2Amplitude*l||1,h=this.frames.frameAt(a.u,this.frame);a.mesh.position.copy(h.position).addScaledVector(h.normal,f*this.spacing/2),this.basis.makeBasis(h.tangent,h.normal,h.binormal),a.mesh.quaternion.setFromRotationMatrix(this.basis),this.bank.setFromAxisAngle(this.zAxis,_.degToRad(n.tiltDeg)*(p/m)),a.mesh.quaternion.multiply(this.bank),a.mesh.scale.setScalar(this.spacing),a.mesh.material.color.setScalar(n.glow),a.light.position.copy(a.mesh.position),a.light.intensity=n.lightIntensity,a.light.distance=n.lightRange,a.light.decay=n.lightDecay,a.light.color.copy(i)})}distribute(e){let t=this.notes[0]?.u??0;this.notes.forEach((n,r)=>n.u=e?t+r/e:0),this.distributedFor=e}};function Re(e,t,n){let r=t.params,i=e.addFolder(`Notes`),a={name:W},o=e=>{let{lightRadius:t,softness:n,...a}=e;Object.assign(r,a),E.lightRadius.value=t,E.softness.value=n,i.controllersRecursive().forEach(e=>e.updateDisplay())};i.add(a,`name`,Object.keys(U)).name(`Look preset`).onChange(e=>o(U[e])),o(U[a.name]),i.add({copy:()=>{let e=JSON.stringify({glow:r.glow,lightIntensity:r.lightIntensity,lightRange:r.lightRange,lightDecay:r.lightDecay,lightColor:r.lightColor,lightRadius:E.lightRadius.value,softness:E.softness.value});console.log(`note look:`,e),navigator.clipboard?.writeText(e).catch(()=>{})}},`copy`).name(`Copy look as JSON`),i.add(r,`count`,0,10,1).name(`Count`),i.add(r,`speed`,0,5,.05).name(`Speed`),i.add(r,`bobAmplitude`,0,4,.05).name(`Bob amplitude`),i.add(r,`bobFrequency`,0,1.5,.01).name(`Bob frequency (Hz)`),i.add(r,`bob2Amplitude`,0,4,.05).name(`Bob 2 amplitude`),i.add(r,`bob2Frequency`,0,3,.01).name(`Bob 2 frequency (Hz)`),i.add(r,`tiltDeg`,0,45,1).name(`Bank (deg)`),i.add(r,`glow`,0,10,.05).name(`Glow`),i.add(r,`lightIntensity`,0,30,.1).name(`Light intensity`),i.add(r,`lightRange`,.5,15,.1).name(`Light range`),i.add(r,`lightDecay`,0,2,.05).name(`Light falloff`),i.add(E.lightRadius,`value`,0,2,.01).name(`Light radius (on people)`),i.add(E.softness,`value`,0,1,.01).name(`Soft highlights`),i.addColor(r,`lightColor`).name(`Light color`);let s=e.addFolder(`Bloom`).close();s.add(n.bloom,`strength`,0,3,.01).name(`Strength`),s.add(n.bloom,`radius`,0,1,.01).name(`Radius`),s.add(n.bloom,`threshold`,0,3,.01).name(`Threshold`)}var q={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},J=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Y=new y(-1,1,1,-1,0,1),ze=new class extends w{constructor(){super(),this.setAttribute(`position`,new n([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new n([0,2,0,0,2,0],2))}},X=class{constructor(e){this._mesh=new d(ze,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Y)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Be=class extends J{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof A?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=D.clone(e.uniforms),this.material=new A({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new X(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Z=class extends J{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Ve=class extends J{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},He=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new T);this._width=n.width,this._height=n.height,t=new x(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:c}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Be(q),this.copyPass.material.blending=0,this.timer=new se}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Z!==void 0&&(r instanceof Z?n=!0:r instanceof Ve&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new T);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Q={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Ue=class extends J{constructor(){super(),this.isOutputPass=!0,this.uniforms=D.clone(Q.uniforms),this.material=new _e({name:Q.name,uniforms:this.uniforms,vertexShader:Q.vertexShader,fragmentShader:Q.fragmentShader}),this._fsQuad=new X(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},l.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},We=class extends J{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new o}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Ge={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new o(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},$=class e extends J{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new T(256,256):new T(e.x,e.y),this.clearColor=new o(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new x(i,a,{type:c,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new x(i,a,{type:c,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new x(i,a,{type:c,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let s=Ge;this.highPassUniforms=D.clone(s.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new A({uniforms:this.highPassUniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new T(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=D.clone(q.uniforms),this.blendMaterial=new A({uniforms:this.copyUniforms,vertexShader:q.vertexShader,fragmentShader:q.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new o,this._oldClearAlpha=1,this._basic=new O,this._fsQuad=new X(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new T(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new A({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new T(.5,.5)},direction:{value:new T(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new A({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};$.BlurDirectionX=new T(1,0),$.BlurDirectionY=new T(0,1);function Ke(e,t,n){let r=e.getSize(new T),i=new He(e,new x(r.x,r.y,{type:c,samples:4}));i.setPixelRatio(e.getPixelRatio()),i.setSize(r.x,r.y),i.addPass(new We(t,n));let a=new $(r.clone(),.55,.2,1.02);return i.addPass(a),i.addPass(new Ue),window.addEventListener(`resize`,()=>{e.getSize(r),i.setSize(r.x,r.y)}),{composer:i,bloom:a,render:()=>i.render()}}async function qe(){let e=await ge(),t=re(document.getElementById(`container`),e.projection.aspect),n=e.projection.makeCamera(e.backgroundDepth*2),o=new he;o.add(e.root);let s=new Ee(n,t.domElement);o.add(s.root);let c=Te(e,s),l=te(),u=l??ye(i),d=r(u),f=d&&ne(u,d),h=new we;f&&h.setLength(f.length);let g=new a(h);g.update(f,ee(u)),o.add(g.mesh),c.add(g.mesh,`visible`).name(`Staff`);let _=new p;_.update(d,u.closed),_.mesh.visible=!1,o.add(_.mesh),c.add(_.mesh,`visible`).name(`Staff center line`);let v=new Le(f,u.staff.spacing);o.add(v.root);let y=Ke(t,o,n);if(Re(c,v,y),xe(c,h),k(`edit curve`,oe(`curve_editor/`)),l){let e=k(`reset curve`,`#`);e.title=`Use the original curve again (forget the one saved in this browser)`,e.addEventListener(`click`,e=>{e.preventDefault(),le(),window.location.reload()})}let b=new m;t.setAnimationLoop(()=>{let e=Math.min(b.getDelta(),.1);v.update(e,b.elapsedTime),h.update(b.elapsedTime),y.render()})}qe();