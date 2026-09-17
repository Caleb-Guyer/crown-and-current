import {clamp} from './missions.mjs';
export function newBoard(mode,difficulty='normal'){
 const s={mode,difficulty,time:0,hp:100,done:false,failed:false,shots:[],effects:[],score:0,selected:'house',money:75,notice:'',noticeUntil:0,aim:{x:500,y:180},cool:0};
 if(mode==='naval')Object.assign(s,{player:{x:500,y:560,angle:0},cargo:0,barrels:[[250,430],[730,485],[460,325],[820,205],[220,140]].map(([x,y])=>({x,y,taken:false})),enemies:[{x:90,y:220,hp:4,cool:2},{x:890,y:310,hp:4,cool:4},{x:720,y:85,hp:4,cool:6}],islands:[{x:325,y:250,r:48},{x:685,y:365,r:55}]});
 if(mode==='builder')Object.assign(s,{plots:Array.from({length:12},(_,i)=>({x:350+i%4*135,y:190+Math.floor(i/4)*130,type:null})),people:0,settle:0,crate:{x:140,y:370},crateCool:0});
 if(mode==='defense')Object.assign(s,{money:55,selected:'militia',towers:Array.from({length:6},(_,i)=>({x:350+i%2*205,y:170+Math.floor(i/2)*150,type:null,cool:0})),enemies:[],spawn:0,spawned:0,funded:false,barrage:0});
 if(mode==='crisis')Object.assign(s,{money:45,unrest:0,debt:0,financeCool:0,garrisons:[{name:'CANADA',x:280,y:210,supply:75},{name:'OHIO FRONTIER',x:610,y:340,supply:75},{name:'FLORIDA',x:390,y:490,supply:75}],bills:0});
 return s;
}
function effect(s,x,y,color='#e6bb79',r=28){s.effects.push({x,y,color,r,life:.45});}
export function boardAction(s,x,y,action){
 if(s.done||s.failed)return;
 if(s.mode==='naval'){
  if(s.cool>0)return;const a=Math.atan2(y-s.player.y,x-s.player.x);s.shots.push({x:s.player.x,y:s.player.y,dx:Math.cos(a)*450,dy:Math.sin(a)*450,life:2,enemy:false});s.cool=.36;effect(s,s.player.x+Math.cos(a)*23,s.player.y+Math.sin(a)*23,'#ffe1a1',15);return 'shot';
 }
 if(s.mode==='builder'){
  if(Math.hypot(x-s.crate.x,y-s.crate.y)<42&&s.crateCool<=0){s.money+=12;s.crateCool=4;s.crate.y=240+Math.random()*240;effect(s,x,y);return 'collect';}
  const p=s.plots.find(p=>Math.abs(x-p.x)<55&&Math.abs(y-p.y)<51);if(!p)return;
  if(s.selected==='remove'&&p.type){s.money+=Math.floor(({house:22,farm:18,meeting:28}[p.type])/2);p.type=null;return 'build';}
  const cost={house:22,farm:18,meeting:28}[s.selected];if(p.type||s.money<cost)return;s.money-=cost;p.type=s.selected;effect(s,p.x,p.y);return 'build';
 }
 if(s.mode==='defense'){
  if(action==='barrage'){if(s.barrage>0)return;s.barrage=8;effect(s,x,y,'#ffb37b',110);s.enemies.forEach(e=>{if(Math.hypot(x-e.x,y-e.y)<120)e.hp-=4;});return 'boom';}
  const t=s.towers.find(t=>Math.abs(x-t.x)<65&&Math.abs(y-t.y)<58);if(!t||t.type)return;const cost=s.selected==='cannon'?60:25;if(s.money<cost)return;s.money-=cost;t.type=s.selected;effect(s,t.x,t.y);return 'build';
 }
 if(s.mode==='crisis'){
  if(action==='tax'||action==='borrow'){if(s.financeCool>0)return;s.financeCool=5;s.money+=40;if(action==='tax')s.unrest+=25;else s.debt+=25;return 'collect';}
  const g=s.garrisons.find(g=>Math.hypot(g.x-x,g.y-y)<82);if(!g||s.money<18||g.supply>90)return;s.money-=18;g.supply=Math.min(100,g.supply+35);effect(s,g.x,g.y);return 'build';
 }
}
export function updateBoard(s,input,dt){
 if(s.done||s.failed)return;dt=Math.min(dt,.05);s.time+=dt;s.cool=Math.max(0,s.cool-dt);s.effects.forEach(e=>e.life-=dt);s.effects=s.effects.filter(e=>e.life>0);
 if(s.mode==='naval'){
  const p=s.player;let dx=(input.right||0)-(input.left||0),dy=(input.back||0)-(input.forward||0),len=Math.hypot(dx,dy)||1;const speed=input.sprint?210:155;
  p.x=clamp(p.x+dx/len*speed*dt,40,960);p.y=clamp(p.y+dy/len*speed*dt,55,605);if(dx||dy)p.angle=Math.atan2(dy,dx)+Math.PI/2;
  s.islands.forEach(i=>{const d=Math.hypot(p.x-i.x,p.y-i.y);if(d<i.r+20){const a=Math.atan2(p.y-i.y,p.x-i.x);p.x=i.x+Math.cos(a)*(i.r+20);p.y=i.y+Math.sin(a)*(i.r+20);}});
  s.barrels.forEach(b=>{if(!b.taken&&Math.hypot(p.x-b.x,p.y-b.y)<35){b.taken=true;s.cargo++;s.score+=100;effect(s,b.x,b.y);}});
  for(const e of s.enemies){if(e.hp<=0)continue;e.cool-=dt;const a=Math.atan2(p.y-e.y,p.x-e.x),d=Math.hypot(p.x-e.x,p.y-e.y);e.angle=a+Math.PI/2;const da=d>210?a:a+Math.PI/2;e.x=clamp(e.x+Math.cos(da)*35*dt,35,965);e.y=clamp(e.y+Math.sin(da)*35*dt,50,605);
   if(e.cool<=0){e.cool=s.difficulty==='story'?3.5:2.4;s.shots.push({x:e.x,y:e.y,dx:Math.cos(a)*160,dy:Math.sin(a)*160,enemy:true,life:5});effect(s,e.x,e.y,'#ffc184',12);}
  }
  for(const b of s.shots){b.x+=b.dx*dt;b.y+=b.dy*dt;b.life-=dt;if(s.islands.some(i=>Math.hypot(b.x-i.x,b.y-i.y)<i.r))b.life=0;
   if(b.life>0&&b.enemy&&Math.hypot(b.x-p.x,b.y-p.y)<20){s.hp-=s.difficulty==='story'?6:11;b.life=0;effect(s,p.x,p.y,'#ec9476',45);}
   if(b.life>0&&!b.enemy)for(const e of s.enemies){if(e.hp>0&&Math.hypot(b.x-e.x,b.y-e.y)<28){e.hp--;b.life=0;effect(s,e.x,e.y,'#ffe0ad',e.hp<=0?65:30);if(e.hp<=0)s.score+=150;break;}}
  }s.shots=s.shots.filter(b=>b.life>0);
  if(s.cargo>=5&&p.y<110&&Math.abs(p.x-500)<110)s.done=true;
 }
 if(s.mode==='builder'){
  s.money+=dt*1.8;s.crateCool=Math.max(0,s.crateCool-dt);s.settle+=dt;const count=t=>s.plots.filter(p=>p.type===t).length,capacity=Math.min(count('house')*3,count('farm')*6);
  if(s.settle>1.7&&s.people<capacity){s.people++;s.settle=0;}
  if(s.people>=12&&count('farm')>=2&&count('meeting')>=1){s.done=true;s.score=Math.max(0,Math.round(2000-s.time*8));}
 }
 if(s.mode==='defense'){
  s.barrage=Math.max(0,s.barrage-dt);s.money+=dt*(s.funded?3:1);if(s.time>=26&&!s.funded){s.funded=true;s.money+=180;effect(s,500,300,'#d9e7bb',300);}
  s.spawn-=dt;if(s.spawn<=0&&s.spawned<24){s.spawned++;s.spawn=s.time<26?3.4:1.6;const lane=(s.spawned*7)%3;s.enemies.push({x:1040,y:170+lane*150,lane,hp:s.time<26?2:4,speed:s.time<26?20:25});}
  for(const t of s.towers){if(!t.type)continue;t.cool-=dt;const target=s.enemies.filter(e=>e.hp>0&&Math.abs(e.y-t.y)<25&&e.x>t.x-20&&e.x-t.x<(t.type==='cannon'?570:390)).sort((a,b)=>a.x-b.x)[0];
   if(target&&t.cool<=0){t.cool=t.type==='cannon'?1.8:1.3;const damage=t.type==='cannon'?3:1;target.hp-=damage;s.shots.push({x:t.x+15,y:t.y,tx:target.x,ty:target.y,life:.12,enemy:false});effect(s,target.x,target.y,t.type==='cannon'?'#ffbf79':'#e6d8b2',t.type==='cannon'?40:10);}
  }
  s.enemies.forEach(e=>{if(e.hp>0)e.x-=e.speed*dt;if(e.x<140&&e.hp>0){s.hp-=s.difficulty==='story'?5:9;e.hp=0;effect(s,140,e.y,'#f19276',55);}});
  s.enemies=s.enemies.filter(e=>{if(e.hp<=0){s.score+=50;return false;}return true;});s.shots.forEach(b=>b.life-=dt);s.shots=s.shots.filter(b=>b.life>0);
  if(s.spawned>=24&&s.enemies.length===0)s.done=true;
 }
 if(s.mode==='crisis'){
  s.financeCool=Math.max(0,s.financeCool-dt);s.garrisons.forEach(g=>g.supply=Math.max(0,g.supply-dt*(s.difficulty==='story'?1.55:1.85)));
  if(s.time>20&&s.bills===0){s.money=Math.max(0,s.money-15);s.bills++;}if(s.time>40&&s.bills===1){s.money=Math.max(0,s.money-15);s.bills++;}
  if(s.garrisons.some(g=>g.supply<=0))s.failed=true;if(s.time>=60){s.done=true;s.score=Math.max(0,1200-s.unrest*3-s.debt*2);}
 }
 if(s.hp<=0){s.hp=0;s.failed=true;}
}

export class Board {
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.resize();}
 resize(){this.canvas.width=Math.round(innerWidth*Math.min(devicePixelRatio,1.5));this.canvas.height=Math.round(innerHeight*Math.min(devicePixelRatio,1.5));}
 point(event){const r=this.canvas.getBoundingClientRect(),scale=Math.min(r.width/1000,r.height/650),ox=(r.width-1000*scale)/2,oy=(r.height-650*scale)/2;return{x:(event.clientX-r.left-ox)/scale,y:(event.clientY-r.top-oy)/scale};}
 rect(x,y,w,h,color){const c=this.ctx;c.fillStyle=color;c.fillRect(x,y,w,h);}
 circle(x,y,r,color){const c=this.ctx;c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();}
 text(t,x,y,size=15,color='#e5dfc8',align='center'){const c=this.ctx;c.fillStyle=color;c.font=`${size}px "DM Sans",sans-serif`;c.textAlign=align;c.fillText(t,x,y);}
 line(x1,y1,x2,y2,color,width=2){const c=this.ctx;c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();}
 boat(x,y,a,enemy=false,scale=1){const c=this.ctx;c.save();c.translate(x,y);c.rotate(a);c.scale(scale,scale);c.shadowColor='#020b1488';c.shadowBlur=12;this.circle(0,0,23,'#0b26333d');c.fillStyle=enemy?'#745640':'#9f7951';c.beginPath();c.moveTo(0,-35);c.lineTo(15,-12);c.lineTo(13,28);c.lineTo(-13,28);c.lineTo(-15,-12);c.closePath();c.fill();c.shadowBlur=0;this.rect(-8,-14,16,36,'#463a2c');this.line(0,-20,0,25,'#221e18',3);c.fillStyle=enemy?'#8dabae':'#ebe0bb';c.beginPath();c.moveTo(-20,-9);c.lineTo(19,-9);c.lineTo(12,12);c.lineTo(-15,12);c.closePath();c.fill();this.line(-22,-9,21,-9,'#a7956b',2);this.rect(-3,-24,6,7,enemy?'#819daa':'#d1aa65');c.restore();}
 ground(time){const c=this.ctx;this.rect(0,0,1000,650,'#263b36');for(let i=0;i<150;i++){const x=(i*71.3)%1000,y=(i*47.9)%650;this.rect(x,y,2,5,i%2?'#4c5b4160':'#142d2930');}}
 tree(x,y,r=25){this.circle(x+6,y+7,r,'#07181044');this.circle(x,y,r,'#1a3b30');this.circle(x-6,y-6,r*.68,'#2e5140');}
 draw(s){const c=this.ctx,w=this.canvas.width,h=this.canvas.height,scale=Math.min(w/1000,h/650);c.setTransform(1,0,0,1,0,0);c.fillStyle=s.mode==='naval'?'#173e50':s.mode==='crisis'?'#263f48':'#263b36';c.fillRect(0,0,w,h);c.setTransform(scale,0,0,scale,(w-1000*scale)/2,(h-650*scale)/2);
  if(s.mode==='naval')this.naval(s);if(s.mode==='builder')this.builder(s);if(s.mode==='defense')this.defense(s);if(s.mode==='crisis')this.crisis(s);
  s.effects.forEach(e=>{c.globalAlpha=e.life/.45;this.circle(e.x,e.y,e.r*(1.4-e.life),e.color+'55');c.strokeStyle=e.color;c.lineWidth=2;c.beginPath();c.arc(e.x,e.y,e.r*(1-e.life),0,Math.PI*2);c.stroke();});c.globalAlpha=1;
 }
 naval(s){const c=this.ctx;this.rect(0,0,1000,650,'#173e50');const gradient=c.createLinearGradient(0,0,1000,650);gradient.addColorStop(0,'#29616e88');gradient.addColorStop(1,'#0b283e88');c.fillStyle=gradient;c.fillRect(0,0,1000,650);
  for(let y=0;y<650;y+=28)for(let x=0;x<1000;x+=65){const xx=x+Math.sin(s.time*.7+y)*10;this.line(xx,y,xx+23,y-3,'#8ab1b51c',1);}
  s.islands.forEach(i=>{this.circle(i.x,i.y,i.r+14,'#88a99b35');this.circle(i.x,i.y,i.r+5,'#a4a57c');this.circle(i.x,i.y,i.r,'#4b6650');for(let j=0;j<5;j++)this.tree(i.x+Math.sin(j*2)*i.r*.5,i.y+Math.cos(j*2)*i.r*.5,14);});
  this.rect(402,0,196,38,'#796e53');for(let i=0;i<7;i++)this.rect(420+i*25,0,6,65,'#7b755a');this.text('BOSTON HARBOR',500,88,12,s.cargo>=5?'#ffe0a4':'#aac0b7');if(s.cargo>=5){c.strokeStyle='#f4cf84';c.lineWidth=3;c.strokeRect(391,43,218,65);}
  s.barrels.forEach(b=>{if(b.taken)return;const y=b.y+Math.sin(s.time*2+b.x)*3;this.circle(b.x,y,22,'#ead09818');this.rect(b.x-8,y-11,16,22,'#b29962');this.line(b.x-8,y-5,b.x+8,y-5,'#3e4941',3);this.line(b.x-8,y+5,b.x+8,y+5,'#3e4941',3);this.text('◆',b.x,y-24,11,'#f0cf8c');});
  s.enemies.filter(e=>e.hp>0).forEach(e=>{this.boat(e.x,e.y,e.angle,true,.9);this.rect(e.x-15,e.y+38,30,3,'#1d2829');this.rect(e.x-15,e.y+38,e.hp/4*30,3,'#ce826e');});
  const p=s.player;this.line(p.x+Math.sin(p.angle)*20,p.y+Math.cos(p.angle)*20,p.x+Math.sin(p.angle)*50,p.y+Math.cos(p.angle)*50,'#97c4c040',10);this.boat(p.x,p.y,p.angle);
  s.shots.forEach(b=>{this.line(b.x,b.y,b.x-b.dx*.045,b.y-b.dy*.045,b.enemy?'#e99163':'#ffe5a0',2);this.circle(b.x,b.y,4,b.enemy?'#ffb981':'#fff0c4');});
 }
 builder(s){this.ground(s.time);this.rect(0,0,225,650,'#244c5b');for(let i=0;i<14;i++)this.line(0,40+i*45,218,35+i*45,'#90b9b322',1);this.rect(160,280,142,30,'#726447');for(let i=0;i<14;i++)this.line(165+i*10,280,165+i*10,310,'#3b493a',1);this.boat(120,310,.1,false,1.25);this.rect(275,118,600,12,'#827b5770');
  for(let i=0;i<13;i++)this.tree(910+(i%2)*48,20+i*49,25);this.tree(270,70,36);this.tree(260,550,32);
  for(const p of s.plots){this.rect(p.x-50,p.y-45,100,90,p.type?'#68744d':'#5362495c');cStroke(this.ctx,p.x-50,p.y-45,100,90,p.type?'#82926f66':'#c2d2a449',1);
   if(!p.type){this.text('+',p.x,p.y+9,28,'#c4d5ab70');continue;}
   if(p.type==='farm'){this.rect(p.x-38,p.y-32,76,64,'#5c4934');for(let r=0;r<5;r++)for(let col=0;col<7;col++){this.rect(p.x-33+col*10,p.y-24+r*12,4,7,'#c0aa53');this.rect(p.x-31+col*10,p.y-24+r*12,1,10,'#67824c');}}
   else{this.rect(p.x-35,p.y-21,70,54,p.type==='meeting'?'#b2ab89':'#ad9370');this.rect(p.x-38,p.y-29,76,30,p.type==='meeting'?'#677b74':'#685743');this.rect(p.x-6,p.y+9,12,24,'#3e4841');this.rect(p.x-25,p.y+7,10,10,'#d4c087');this.rect(p.x+15,p.y+7,10,10,'#d4c087');if(p.type==='meeting')this.text('FRIENDS',p.x,p.y-5,8,'#eadbbb');}
  }
  for(let i=0;i<s.people;i++){const p=s.plots.filter(p=>p.type==='house')[Math.floor(i/3)];if(p){const x=p.x+Math.sin(i*2+s.time*.4)*43,y=p.y+43+Math.cos(i+s.time*.4)*9;this.circle(x,y-5,3,'#bcaa87');this.rect(x-3,y,6,9,['#749797','#c3b28e','#8b6d6b'][i%3]);}}
  if(s.crateCool<=0){this.rect(s.crate.x-18,s.crate.y-18,36,36,'#b2925b');this.line(s.crate.x-18,s.crate.y-18,s.crate.x+18,s.crate.y+18,'#554b39',3);this.text('+12',s.crate.x,s.crate.y-27,13,'#edd596');}
 }
 defense(s){this.ground(s.time);for(let lane=0;lane<3;lane++){const y=170+lane*150;this.rect(120,y-38,890,76,'#9b927244');for(let x=190;x<1000;x+=45)this.line(x,y-2,x+15,y+2,'#ccb99533',2);this.rect(100,y-55,42,110,'#786b50');for(let i=0;i<7;i++)this.rect(93+i*7,y-62,5,121,'#9b8663');}
  for(let i=0;i<12;i++){this.tree(50+i*85,78,20);this.tree(25+i*92,584,23);}
  for(const t of s.towers){this.circle(t.x,t.y,40,t.type?'#172f2c99':'#b9cc9b15');const c=this.ctx;c.strokeStyle=t.type?'#c5d3a161':'#d8ddae77';c.setLineDash(t.type?[]:[5,5]);c.lineWidth=1;c.beginPath();c.arc(t.x,t.y,40,0,Math.PI*2);c.stroke();c.setLineDash([]);
   if(!t.type){this.text('+',t.x,t.y+8,24,'#d5d3a699');continue;}
   if(t.type==='cannon'){this.circle(t.x-8,t.y-13,12,'#282e2e');this.circle(t.x-8,t.y+13,12,'#282e2e');this.rect(t.x-12,t.y-6,47,12,'#8d9990');this.rect(t.x-25,t.y-10,24,20,'#67543c');}
   else{for(let i=-1;i<=1;i++){this.circle(t.x-5,t.y+i*17,5,'#ae906f');this.rect(t.x,t.y+i*17-5,10,10,'#883f34');this.line(t.x+9,t.y+i*17,t.x+30,t.y+i*17,'#a2a791',3);}}
  }
  s.enemies.forEach(e=>{this.circle(e.x+2,e.y+8,12,'#0003');this.circle(e.x,e.y-8,5,'#ab9173');this.rect(e.x-7,e.y-2,14,16,'#426277');this.line(e.x-6,e.y+4,e.x-26,e.y+2,'#808c87',3);this.rect(e.x-8,e.y-17,16,5,'#25353b');});
  s.shots.forEach(b=>this.line(b.x,b.y,b.tx,b.ty,'#f7d18b',2));
  this.text(s.funded?'PITT’S REINFORCEMENTS':'HOLD THE APPROACHES',570,560,12,s.funded?'#efd29b':'#adb9a3');
 }
 crisis(s){this.rect(0,0,1000,650,'#263f48');this.ctx.fillStyle='#586952';this.ctx.beginPath();[[0,0],[590,0],[630,120],[800,190],[690,285],[610,420],[530,570],[460,650],[0,650]].forEach(([x,y],i)=>i?this.ctx.lineTo(x,y):this.ctx.moveTo(x,y));this.ctx.closePath();this.ctx.fill();for(let i=0;i<50;i++)this.tree(70+(i*137)%590,80+(i*71)%480,9+i%7);
  for(const g of s.garrisons){this.circle(g.x,g.y,79,'#091e2c80');this.rect(g.x-27,g.y-24,54,46,'#bac4a2');this.rect(g.x-20,g.y-17,40,32,'#526d62');for(const xx of[-28,18])for(const yy of[-25,15])this.rect(g.x+xx,g.y+yy,12,12,'#e3cf9d');this.text(g.name,g.x,g.y-48,12,'#e6ddbd');this.rect(g.x-44,g.y+34,88,5,'#071e28');this.rect(g.x-44,g.y+34,g.supply/100*88,5,g.supply<30?'#dd8c70':'#c3d1a2');this.text(`SUPPLY · ${Math.ceil(g.supply)}%`,g.x,g.y+60,11,'#c9d4bd');}
  this.text('ATLANTIC',865,420,18,'#a9c1bd60');this.text('Click a garrison · Supply +35 / £18',770,520,13,'#c4d4c3');
 }
}
function cStroke(c,x,y,w,h,color,width){c.strokeStyle=color;c.lineWidth=width;c.strokeRect(x,y,w,h);}
