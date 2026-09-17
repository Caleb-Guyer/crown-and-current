import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {MusicDirector} from './music.mjs';
import {SCORE} from './score.mjs';
import {MISSIONS} from './missions.mjs';
const flush=()=>new Promise(resolve=>setImmediate(resolve));
class Param{
 constructor(){this.value=1;this.targets=[];}
 setValueAtTime(v){this.value=v;}
 linearRampToValueAtTime(v,t){this.targets.push([v,t]);this.value=v;}
 setTargetAtTime(v,t,c){this.targets.push([v,t,c]);this.value=v;}
 cancelScheduledValues(){} cancelAndHoldAtTime(){}
}
class Context{
 constructor(){this.state='suspended';this.currentTime=0;this.sources=[];this.destination={};}
 resume(){this.state='running';return Promise.resolve();}
 createGain(){return {gain:new Param(),connect(){},disconnect(){}};}
 createBufferSource(){const source={connect(){},disconnect(){},start(t,o){this.started=[t,o];},stop(t){this.stopped=t;}};this.sources.push(source);return source;}
 decodeAudioData(){return Promise.resolve({duration:60});}
}
function setup(fetcher=async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(8)})){
 const context=new Context(),states=[],requests=[];
 const music=new MusicDirector({tracks:SCORE,createContext:()=>context,fetcher:file=>{requests.push(file);return fetcher(file);},onStatus:s=>states.push(s)});
 return {music,context,states,requests};
}
test('loading waits for a gesture; every selected track has the exact musical loop points',async()=>{
 const {music:m,context:c,requests}=setup();m.select('quebec');assert.equal(requests.length,0);assert.equal(m.status().state,'ready');await m.unlock();
 assert.equal(m.status().state,'playing');assert.equal(c.sources.length,1);const s=c.sources[0];assert.equal(s.loop,true);assert.equal(s.loopStart,SCORE.quebec.loopStart);assert.equal(s.loopEnd,SCORE.quebec.loopEnd);assert.equal(s.started[1],SCORE.quebec.loopStart);
});
test('out-of-order downloads cannot start music from a previous mission',async()=>{
 const pending=new Map();const {music:m,context:c}=setup(file=>new Promise(resolve=>pending.set(file,resolve)));
 const response={ok:true,arrayBuffer:async()=>new ArrayBuffer(8)};m.select('ashes');const first=m.unlock();await flush();m.select('haven');await flush();
 pending.get(SCORE.haven.file)(response);await flush();pending.get(SCORE.ashes.file)(response);await first;await flush();
 assert.equal(m.current.id,'haven');assert.equal(c.sources.length,1);
});
test('pause resumes from the same phrase position and stops all crossfade tails',async()=>{
 const {music:m,context:c}=setup();m.select('ashes');await m.unlock();c.currentTime=8;m.select('haven');await flush();c.currentTime=9;m.pause();
 assert.equal(m.status().state,'paused');assert.ok(c.sources.every(s=>s.stopped<=9.06));c.currentTime=30;m.resume();await flush();
 assert.equal(m.current.id,'haven');assert.equal(c.sources.at(-1).started[1],SCORE.haven.loopStart+1);
});
test('a pending download stays silent if the player pauses or mutes',async()=>{
 let done;const {music:m,context:c}=setup(()=>new Promise(resolve=>done=resolve));m.select('pitt');const ready=m.unlock();await flush();m.pause();done({ok:true,arrayBuffer:async()=>new ArrayBuffer(8)});await ready;assert.equal(c.sources.length,0);
 m.configure({enabled:false});m.resume();await flush();assert.equal(c.sources.length,0);m.configure({enabled:true});await flush();assert.equal(c.sources.length,1);
});
test('voice ducking and live volume updates change the mix without restarting the score',async()=>{
 const {music:m,context:c}=setup();m.select('menu');await m.unlock();m.configure({volume:.8});const full=m.bus.gain.value;m.duck(true);assert.ok(m.bus.gain.value<full*.25);m.duck(false);assert.equal(m.bus.gain.value,full);assert.equal(c.sources.length,1);
 m.configure({volume:0});assert.equal(m.bus.gain.value,0);m.configure({enabled:false});assert.equal(m.status().state,'muted');assert.equal(m.level,0);
});
test('hidden tabs stop music, retain position, and do not resume a paused game',async()=>{
 const {music:m,context:c}=setup();m.select('debt');await m.unlock();c.currentTime=4;m.setHidden(true);assert.equal(m.status().state,'paused');assert.ok(c.sources[0].stopped<4.1);
 c.currentTime=20;m.setHidden(false);await flush();assert.equal(c.sources.at(-1).started[1],SCORE.debt.loopStart+4);m.pause();m.setHidden(true);m.setHidden(false);await flush();assert.equal(m.current,null);
});
test('rapid selections crossfade old sources and stop prevents delayed restarts',async()=>{
 const {music:m,context:c}=setup();m.select('menu');await m.unlock();m.select('quebec');await flush();m.select('crown');await flush();
 assert.equal(c.sources.length,3);assert.ok(c.sources.slice(0,2).every(s=>s.stopped<=1.26));m.stop();await flush();assert.equal(m.desired,null);assert.equal(m.current,null);assert.ok(c.sources.every(s=>s.stopped<.1));
});
test('failed music requests are contained and can recover on the next interaction',async()=>{
 let works=false;const {music:m}=setup(async()=>({ok:works,arrayBuffer:async()=>new ArrayBuffer(8)}));m.select('molasses');await m.unlock();assert.equal(m.status().state,'unavailable');works=true;await m.unlock();assert.equal(m.status().state,'playing');
});
test('every mission and menu has a distinct, packaged stereo score with safe audio levels',()=>{
 const ids=['menu',...MISSIONS.map(m=>m.id)];assert.equal(new Set(ids.map(id=>SCORE[id].file)).size,8);
 for(const id of ids){const t=SCORE[id],bytes=fs.readFileSync(new URL(t.file,import.meta.url));assert.equal(bytes.length,t.bytes);assert.ok(t.duration>30&&t.duration<55);assert.ok(t.loopEnd-t.loopStart-t.duration<.00001);assert.ok(t.rms>.1&&t.peak<.99);assert.ok(!t.file.includes('/'));}
});
