import test from 'node:test';
import assert from 'node:assert/strict';
import {MISSIONS,newFPS,updateFPS,fireFPS,blocked,slideMove,clearLine,makeWalls} from './missions.mjs';
import {newBoard,boardAction,updateBoard} from './boards.mjs';
const step=(s,seconds,input={})=>{for(let t=0;t<seconds;t+=1/60)updateBoard(s,input,1/60);};
test('cover blocks movement and shooting; open sightlines work',()=>{
 const w=makeWalls(),p={x:0,z:17};slideMove(p,0,-1,w);assert.equal(p.z,17);assert.equal(clearLine({x:0,z:18},{x:0,z:12},w),false);assert.equal(clearLine({x:10,z:20},{x:10,z:12},w),true);
});
test('musket hits, kills, and reloads; shots cannot pass through cover',()=>{
 const m=MISSIONS[5],s=newFPS(m);s.walls=[];s.enemies=[{x:0,z:12,hp:2,alert:0,cool:20,phase:0,sx:0,sz:12,angle:0,dead:0}];
 assert.equal(fireFPS(s,m),'hit');assert.equal(s.enemies[0].hp,1);assert.equal(fireFPS(s,m),false);
 for(let i=0;i<90;i++)updateFPS(s,m,{},1/60);s.enemies[0].x=0;s.enemies[0].z=12;assert.equal(fireFPS(s,m),'hit');assert.equal(s.kills,1);
 const a=newFPS(m);a.enemies=[{x:0,z:12,hp:2}];fireFPS(a,m);assert.equal(a.enemies[0].hp,2);
});
test('three captured objectives complete a mission, but nearby defenders contest them',()=>{
 const m=MISSIONS[5],s=newFPS(m);s.walls=[];s.enemies=[];
 for(const p of m.points){s.player.x=p[0];s.player.z=p[1];for(let i=0;i<70;i++)updateFPS(s,m,{},1/60);}
 assert.equal(s.done,true);assert.equal(s.point,3);
 const q=newFPS(m);q.player.x=m.points[0][0];q.player.z=m.points[0][1];for(let i=0;i<90;i++)updateFPS(q,m,{},1/60);assert.equal(q.point,0);
});
test('town economy is winnable; demolition refunds resources and clears plots',()=>{
 const s=newBoard('builder');const types=['house','house','house','house','farm','farm','meeting'];
 types.forEach((type,i)=>{s.selected=type;while(s.money<({house:22,farm:18,meeting:28}[type]))step(s,1);boardAction(s,s.plots[i].x,s.plots[i].y);});step(s,30);assert.equal(s.done,true);assert.ok(s.people>=12);
 const q=newBoard('builder');boardAction(q,q.plots[0].x,q.plots[0].y);q.selected='remove';boardAction(q,q.plots[0].x,q.plots[0].y);assert.equal(q.plots[0].type,null);assert.equal(q.money,64);
});
test('Pitt changes the available budget; a funded defense can win',()=>{
 const s=newBoard('defense');for(let t=0;t<150*60&&!s.done&&!s.failed;t++){
  if(s.time<26){for(const slot of s.towers.filter((_,i)=>i%2===0)){s.selected='militia';if(!slot.type&&s.money>=25)boardAction(s,slot.x,slot.y);}}
  else{for(const slot of s.towers){s.selected='cannon';if(!slot.type&&s.money>=60)boardAction(s,slot.x,slot.y);}}
  const threat=[...s.enemies].sort((a,b)=>a.x-b.x)[0];if(threat&&s.barrage<=0)boardAction(s,threat.x,threat.y,'barrage');updateBoard(s,{},1/60);
 }assert.equal(s.funded,true);assert.equal(s.done,true);assert.equal(s.failed,false);
});
test('naval cargo requires entering the harbor; hostile cannonballs damage the hull',()=>{
 const s=newBoard('naval');s.enemies=[];for(const b of s.barrels){s.player.x=b.x;s.player.y=b.y;updateBoard(s,{},1/60);}assert.equal(s.cargo,5);assert.equal(s.done,false);s.player.x=500;s.player.y=80;updateBoard(s,{},1/60);assert.equal(s.done,true);
 const q=newBoard('naval');q.shots.push({x:q.player.x,y:q.player.y,dx:0,dy:0,life:1,enemy:true});updateBoard(q,{},1/60);assert.ok(q.hp<100);
});
test('the debt mission can be supplied, but revenue creates unrest or borrowing',()=>{
 const s=newBoard('crisis');for(let t=0;t<61*60&&!s.done&&!s.failed;t++){
  for(const g of s.garrisons)if(g.supply<45){if(s.money<18)boardAction(s,0,0,s.unrest>s.debt?'borrow':'tax');boardAction(s,g.x,g.y);}
  updateBoard(s,{},1/60);
 }assert.equal(s.done,true);assert.equal(s.failed,false);assert.ok(s.unrest+s.debt>0);
});
