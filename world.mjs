import * as THREE from './three.module.js';
const COLORS={stone:0x667477,wood:0x5b4537,roof:0x293538,skin:0xb48f6e,coat:0x2c5164,brass:0xe8c282};
function mat(color,extra={}){return new THREE.MeshStandardMaterial({color,roughness:.91,...extra});}
function surface(kind){const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const c=canvas.getContext('2d');let seed=7;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};c.fillStyle=kind==='earth'?'#858579':kind==='wood'?'#8a7256':'#8e9894';c.fillRect(0,0,256,256);
 for(let i=0;i<2600;i++){const n=Math.floor(45+rnd()*130);c.fillStyle=`rgba(${n},${n},${n},${rnd()*.35})`;c.fillRect(rnd()*256,rnd()*256,kind==='wood'?1:2,kind==='wood'?20+rnd()*60:2);}
 if(kind==='stone'){for(let y=0;y<256;y+=32)for(let x=-32;x<256;x+=64){c.strokeStyle='#3d48455c';c.lineWidth=2;c.strokeRect(x+(y%64?32:0),y,64,32);}}
 if(kind==='wood'){c.strokeStyle='#302e2550';c.lineWidth=2;for(let x=0;x<256;x+=43){c.beginPath();c.moveTo(x,0);c.lineTo(x,256);c.stroke();}}
 const t=new THREE.CanvasTexture(canvas);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;t.repeat.set(kind==='earth'?50:2,kind==='earth'?50:2);return t;}
export class World {
 constructor(canvas){
  this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.05;
  this.scene=new THREE.Scene();this.camera=new THREE.PerspectiveCamera(76,1,.05,150);this.camera.rotation.order='YXZ';this.scene.add(this.camera);this.models=[];this.fires=[];this.particles=[];this.lastShot=0;this.resize();
 }
 resize(){const w=innerWidth,h=innerHeight;this.renderer.setSize(w,h,false);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();}
 box(w,h,d,color,x,y,z,parent=this.scene){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),typeof color==='number'?mat(color):color);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 cylinder(r1,r2,h,color,x,y,z,parent=this.scene,sides=8){const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,sides),typeof color==='number'?mat(color):color);m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
 load(mission,state){
  this.scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>{m.map?.dispose();m.dispose();});}});
  this.scene.clear();this.scene.add(this.camera);this.camera.clear();this.models=[];this.fires=[];this.particles=[];this.mission=mission;
  const night=mission.mode==='stealth';this.scene.background=new THREE.Color(night?0x172732:0x526c7e);this.scene.fog=new THREE.FogExp2(night?0x24343a:0x6d8088,.013);
  this.scene.add(new THREE.HemisphereLight(night?0x9cbdd8:0xc2daef,0x39362a,night?1.4:1.4));
  const sun=new THREE.DirectionalLight(night?0xbbd4e5:0xffdfb0,night?1.2:2.7);sun.position.set(-15,30,-20);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-35,right:35,top:35,bottom:-35,near:1,far:85});sun.shadow.bias=-.001;this.scene.add(sun);
  const earth=surface('earth'),wood=surface('wood'),stone=surface('stone');
  this.box(120,.2,140,mat(night?0x434c3a:0x5d684d,{map:earth}),0,-.1,0);this.box(16,.03,70,mat(night?0x626354:0x9f967b,{map:earth}),0,.025,0);
  const sunDisc=new THREE.Mesh(new THREE.SphereGeometry(night?2:4,16,12),new THREE.MeshBasicMaterial({color:night?0xb5cbd7:0xf5c690,fog:false}));sunDisc.position.set(-52,36,-86);this.scene.add(sunDisc);
  // Roads and physically navigable cover are actual game geometry.
  state.walls.forEach((w,i)=>{
   this.box(w.w,w.h,w.d,mat(w.h>3?0x8f775e:i%2?0x899390:0x95764b,{map:w.h>3||i%2===0?wood:stone}),w.x,w.h/2,w.z);
   if(w.h>3){const roof=new THREE.Mesh(new THREE.ConeGeometry(Math.max(w.w,w.d)*.8,2.8,4),mat(COLORS.roof));roof.rotation.y=Math.PI/4;roof.position.set(w.x,w.h+1.2,w.z);this.scene.add(roof);
    for(let z=-w.d/2+1;z<w.d/2;z+=2.3){this.box(.035,.8,.65,mat(0xffc878,{emissive:0xff9e32,emissiveIntensity:night?1:.2}),w.x+(w.x<0?w.w/2+.03:-w.w/2-.03),2.6,w.z+z);}
    for(let yy=1;yy<w.h;yy+=1)this.box(w.w+.06,.065,w.d+.06,0x302c25,w.x,yy,w.z);
   }else{this.box(w.w+.06,.08,w.d+.06,0x3d392f,w.x,w.h,w.z);if(w.h<2)for(let xx=-w.w/2+.2;xx<w.w/2;xx+=.8)this.box(.065,w.h,.06,0x3c3027,w.x+xx,w.h/2,w.z+w.d/2+.02);}
  });
  for(let i=0;i<45;i++){
   const side=i%2?-1:1,x=side*(27+(i%6)*3.3),z=-45+(i*13.7)%92;const height=5+(i%4)*1.5;
   this.cylinder(.28,.45,height,0x4b4433,x,height/2,z);const tree=new THREE.Mesh(new THREE.ConeGeometry(2.2,height,6),mat(i%3?0x244438:0x324b3c));tree.position.set(x,height,z);this.scene.add(tree);
  }
  for(let i=0;i<12;i++){const x=i%2?14:-14,z=-24+i*4;this.cylinder(.35,.42,1.2,0x66513c,x,.6,z);this.cylinder(.36,.36,.045,0x2b302c,x,.3,z);this.cylinder(.36,.36,.045,0x2b302c,x,.85,z);}
  if(mission.id==='ashes')for(const [x,z]of[[-18,15],[20,13],[-19,-10]]){
   const flame=new THREE.Mesh(new THREE.ConeGeometry(1.6,4.8,7),mat(0xff851e,{emissive:0xff5814,emissiveIntensity:2,transparent:true,opacity:.85}));flame.position.set(x,5,z);this.scene.add(flame);const light=new THREE.PointLight(0xff7a20,40,16);light.position.set(x,5,z);this.scene.add(light);this.fires.push(flame);
   for(let i=0;i<4;i++){const smoke=new THREE.Mesh(new THREE.IcosahedronGeometry(2.5+i,1),mat(0x242a2b,{transparent:true,opacity:.4}));smoke.position.set(x+i*.4,9+i*3,z);this.scene.add(smoke);}
  }
  state.enemies.forEach((e,i)=>{const model=this.soldier(mission.mode==='fps'?0x29455d:0x675841);if(night){const lamp=new THREE.PointLight(0xffc77a,5,7);lamp.position.set(.4,1.3,-.3);model.add(lamp);this.box(.12,.2,.12,mat(0xffce7c,{emissive:0xffa236,emissiveIntensity:1}),.4,1.1,-.3,model);}this.scene.add(model);this.models.push(model);});
  this.marker=new THREE.Group();const ring=new THREE.Mesh(new THREE.TorusGeometry(2.8,.075,8,50),new THREE.MeshBasicMaterial({color:0xf8cc79}));ring.rotation.x=Math.PI/2;ring.position.y=.13;this.marker.add(ring);
  const pole=this.cylinder(.035,.035,4.5,0xe7cb89,0,2.25,0,this.marker);const flag=this.box(1.15,.68,.03,0xe4bf7a,.6,4,0,this.marker);this.scene.add(this.marker);
  this.weapon=new THREE.Group();this.camera.add(this.weapon);
  if(mission.mode==='fps'){
   this.box(.075,.09,.88,0x67472f,.21,-.22,-.6,this.weapon);
   const barrel=this.cylinder(.021,.03,.97,0x646e70,.21,-.17,-.66,this.weapon,12);barrel.rotation.x=Math.PI/2;
   this.box(.05,.05,.08,0xbca46f,.18,-.19,-.35,this.weapon);this.box(.08,.19,.32,0x472f23,.22,-.31,-.24,this.weapon);
   const arm=this.cylinder(.07,.085,.43,0x7e352d,.29,-.39,-.26,this.weapon);arm.rotation.z=-.4;
   this.box(.11,.09,.14,0xb28f6d,.21,-.3,-.55,this.weapon);
   this.flash=new THREE.Mesh(new THREE.ConeGeometry(.15,.5,7),new THREE.MeshBasicMaterial({color:0xffd87d,transparent:true,opacity:.9}));this.flash.rotation.x=-Math.PI/2;this.flash.position.set(.21,-.17,-1.25);this.weapon.add(this.flash);
  }else{
   this.box(.15,.17,.12,0x624935,.3,-.27,-.43,this.weapon);const rock=new THREE.Mesh(new THREE.IcosahedronGeometry(.085,0),mat(0x90968a));rock.position.set(.3,-.16,-.48);this.weapon.add(rock);this.flash=null;
  }
 }
 soldier(coat){const g=new THREE.Group();this.box(.6,.75,.32,coat,0,1.12,0,g);this.box(.18,.65,.2,0x393b37,-.17,.42,0,g);this.box(.18,.65,.2,0x393b37,.17,.42,0,g);this.box(.37,.35,.34,COLORS.skin,0,1.7,0,g);this.box(.12,.59,.18,coat,-.4,1.04,0,g);this.box(.12,.59,.18,coat,.4,1.04,0,g);this.box(.045,.8,.03,0xc9c8a7,.07,1.12,-.18,g);this.cylinder(.33,.4,.10,0x292e31,0,1.92,0,g,3);this.box(.12,.06,.85,0x3d342b,.35,1.08,-.18,g);this.cylinder(.026,.026,.75,0x738183,.35,1.08,-.2,g).rotation.x=Math.PI/2;return g;}
 update(state,dt,input){
  const p=state.player,t=state.time;const moving=input.forward||input.back||input.left||input.right;
  this.camera.position.set(p.x,1.7+p.jump-(input.crouch?.55:0)+(moving?Math.sin(t*(input.sprint?15:10))*.035:0),p.z);
  this.camera.rotation.set(p.pitch+(state.shot>0?Math.sin(state.shot*14)*.015:0),p.yaw,0);
  const desired=input.aim?54:input.sprint?83:76;this.camera.fov+=(desired-this.camera.fov)*Math.min(1,dt*8);this.camera.updateProjectionMatrix();
  this.models.forEach((m,i)=>{const e=state.enemies[i];m.position.set(e.x,0,e.z);m.rotation.y=e.angle;m.visible=e.hp>0||e.dead<.55;if(e.hp<=0){m.rotation.z=Math.min(Math.PI/2,e.dead*3);m.position.y=-e.dead*.2;}else{m.rotation.z=0;m.children[1].rotation.x=Math.sin(t*5+i)*.14;m.children[2].rotation.x=-Math.sin(t*5+i)*.14;}});
  const goal=this.mission.points[state.point];this.marker.visible=!!goal;if(goal){this.marker.position.set(goal[0],0,goal[1]);this.marker.children[0].scale.setScalar(1+Math.sin(t*3)*.025);}
  this.weapon.position.set(moving?Math.sin(t*7)*.012:0,state.reload>0?-Math.sin(state.reload/1.35*Math.PI)*.15:0,state.shot>0?state.shot*.28:0);this.weapon.rotation.z=state.reload>0?Math.sin(state.reload/1.35*Math.PI)*-.35:0;
  if(this.flash)this.flash.visible=state.shot>.14;
  this.fires.forEach((f,i)=>{f.scale.x=1+Math.sin(t*9+i)*.18;f.scale.y=1+Math.sin(t*6+i)*.2;});
  this.renderer.render(this.scene,this.camera);
 }
}
