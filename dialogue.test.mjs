import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DialogueDirector} from './dialogue.mjs';
import {VOICE_LINES} from './voice-lines.mjs';
import {MISSIONS} from './missions.mjs';
const flush=()=>new Promise(resolve=>setImmediate(resolve));
class Media {
 constructor(){this.paused=true;this.currentTime=0;this.calls=[];this.volume=1;this.muted=false;}
 play(){this.paused=false;this.calls.push(this.src);return Promise.resolve();}
 pause(){this.paused=true;}
 end(){this.paused=true;this.onended?.();}
}
const lines=['a','b','c'].map(id=>({id,file:id+'.mp3',speaker:'Officer',text:id,duration:4}));
function setup(media=new Media()){const captions=[],activity=[];const director=new DialogueDirector({media,lines,onCaption:line=>captions.push(line?.id??null),onActivity:state=>activity.push(state)});return{director,media,captions,activity};}
test('voices never overlap; objectives precede queued chatter and stale chatter expires',async()=>{
 const {director:d,media:m}=setup();d.say('a');d.say('b',{priority:0,ttl:2});d.say('c',{priority:3});await flush();
 assert.deepEqual(m.calls,['a.mp3']);d.update(3);m.end();await flush();assert.deepEqual(m.calls,['a.mp3','c.mp3']);m.end();assert.equal(d.current,null);
});
test('pause freezes the queue and resumes the same recording at its saved position',async()=>{
 const {director:d,media:m,activity}=setup();d.say('a');d.say('b',{ttl:1});await flush();m.currentTime=1.4;d.pause();d.update(20);assert.equal(d.clock,0);assert.equal(m.paused,true);assert.equal(activity.at(-1),false);
 d.resume();await flush();assert.equal(m.currentTime,1.4);assert.equal(m.paused,false);m.end();assert.equal(d.current.line.id,'b');
});
test('pausing during load ignores the aborted play promise and can resume',async()=>{
 const m=new Media();let rejectOld;m.play=()=>new Promise((_,reject)=>rejectOld=reject);const{director:d}=setup(m);d.say('a');d.pause();rejectOld(new Error('AbortError'));await flush();assert.equal(d.current.state,'loading');
 m.play=Media.prototype.play;d.resume();await flush();assert.equal(d.current.state,'playing');
});
test('leaving a mission invalidates pending playback and empties queued dialogue',async()=>{
 const m=new Media();let resolveOld;m.play=()=>new Promise(resolve=>resolveOld=resolve);const{director:d,activity}=setup(m);d.say('a');d.say('b');d.stop();resolveOld();await flush();assert.equal(d.current,null);assert.equal(d.queue.length,0);assert.equal(m.paused,true);assert.equal(activity.at(-1),false);
});
test('missing or blocked audio falls back to timed captions and releases the channel',async()=>{
 const m=new Media();m.play=()=>Promise.reject(new Error('NotAllowedError'));const{director:d,captions}=setup(m);d.configure({subtitles:false});d.say('a');await flush();assert.equal(d.current.state,'silent');assert.equal(captions.at(-1),'a');d.update(5);assert.equal(d.current,null);
});
test('voice mute and volume change immediately without changing playback position',async()=>{
 const{director:d,media:m,activity}=setup();d.say('a');await flush();m.currentTime=2;d.configure({enabled:false,volume:.35,subtitles:false});assert.equal(m.muted,true);assert.equal(m.volume,.35);assert.equal(m.currentTime,2);assert.equal(activity.at(-1),false);d.configure({enabled:true});assert.equal(activity.at(-1),true);
});
test('every mission briefing, result, dialogue, and objective has a packaged recording',()=>{
 const ids=new Map(VOICE_LINES.map(line=>[line.id,line]));assert.equal(ids.size,VOICE_LINES.length);
 for(const m of MISSIONS){assert.equal(ids.get(m.id+'.brief').text,m.brief);assert.equal(ids.get(m.id+'.after').text,m.after);m.lines.forEach(([,speaker,text],i)=>{assert.equal(ids.get(m.id+'.line'+i).speaker,speaker);assert.equal(ids.get(m.id+'.line'+i).text,text);});m.pointLines?.forEach((text,i)=>assert.equal(ids.get(m.id+'.point'+i).text,text));}
 for(const line of VOICE_LINES){const bytes=fs.readFileSync(new URL(line.file,import.meta.url));assert.ok(bytes.length>5000,line.id);assert.ok(line.duration>1&&line.duration<25,line.id);assert.ok(line.rms>.02&&line.peak<.99,line.id);assert.ok(!line.file.includes('/')&&!line.file.includes('..'));}
});
