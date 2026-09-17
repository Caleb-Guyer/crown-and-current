// One score at a time, with short transitions. No audio starts before a gesture.
export class MusicDirector {
 constructor({tracks,createContext=()=>new(globalThis.AudioContext||globalThis.webkitAudioContext)(),fetcher=url=>globalThis.fetch(url),onStatus=()=>{}}){
  Object.assign(this,{tracks,createContext,fetcher,onStatus});
  this.context=null;this.bus=null;this.current=null;this.sources=new Set();this.cache=new Map();
  this.desired=null;this.offset=0;this.epoch=0;this.loading=null;this.enabled=true;this.volume=.6;this.ducked=false;this.paused=false;this.hidden=false;this.error=false;
 }
 get allowed(){return this.enabled&&!this.paused&&!this.hidden&&this.context?.state==='running';}
 get level(){return this.enabled?this.volume*.5*(this.ducked?.22:1):0;}
 status(){
  const state=!this.enabled?'muted':this.hidden||this.paused?'paused':this.error?'unavailable':!this.context||this.context.state!=='running'?'ready':this.current?'playing':'loading';
  return {state,id:this.current?.id||this.desired,title:this.tracks[this.current?.id||this.desired]?.title||'',ducked:this.ducked,level:this.level};
 }
 report(){this.onStatus(this.status());}
 async unlock(){
  if(this.hidden||!this.enabled)return;
  try{
   if(!this.context){this.context=this.createContext();this.bus=this.context.createGain();this.bus.gain.value=this.level;this.bus.connect(this.context.destination);}
   if(this.context.state!=='running')await this.context.resume();
   await this.ensure();
  }catch(error){this.error=true;console.warn('Music could not start:',error);this.report();}
 }
 configure({enabled=this.enabled,volume=this.volume}={}){
  const was=this.enabled;this.enabled=!!enabled;this.volume=Number.isFinite(volume)?Math.max(0,Math.min(1,volume)):.6;
  this.mix();if(was&&!this.enabled)this.freeze();else if(this.enabled)this.ensure();this.report();
 }
 duck(active){this.ducked=!!active;this.mix();this.report();}
 mix(){if(this.bus){const p=this.bus.gain,t=this.context.currentTime;p.cancelScheduledValues(t);p.setTargetAtTime(this.level,t,this.ducked?.065:.32);}}
 select(id){
  if(!this.tracks[id])id='menu';
  if(id!==this.desired){this.desired=id;this.offset=0;this.epoch++;this.loading=null;this.error=false;}
  this.ensure();this.report();
 }
 async buffer(id){
  if(!this.cache.has(id)){
   const promise=(async()=>{const response=await this.fetcher(this.tracks[id].file);if(!response.ok)throw new Error('Music unavailable');return this.context.decodeAudioData(await response.arrayBuffer());})();
   this.cache.set(id,promise);
   promise.catch(()=>{if(this.cache.get(id)===promise)this.cache.delete(id);});
   // Keep a small working set: no full soundtrack download or unbounded PCM cache.
   while(this.cache.size>3)this.cache.delete(this.cache.keys().next().value);
  }
  return this.cache.get(id);
 }
 async ensure(){
  if(!this.allowed||!this.desired||this.current?.id===this.desired||this.loading?.id===this.desired)return;
  const ticket={id:this.desired,epoch:this.epoch};this.loading=ticket;this.report();
  try{
   const buffer=await this.buffer(ticket.id);
   if(!this.allowed||ticket.epoch!==this.epoch||ticket.id!==this.desired)return;
   const spec=this.tracks[ticket.id],ctx=this.context,t=ctx.currentTime;
   const source=ctx.createBufferSource(),gain=ctx.createGain();
   source.buffer=buffer;source.loop=true;source.loopStart=spec.loopStart;source.loopEnd=Math.min(spec.loopEnd,buffer.duration);
   const duration=source.loopEnd-source.loopStart;
   if(!(duration>1))throw new Error('Invalid music loop');
   const offset=this.offset%duration,entry={id:ticket.id,source,gain,start:t,offset,duration};
   source.connect(gain);gain.connect(this.bus);gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(1,t+1.25);
   source.onended=()=>{source.disconnect();gain.disconnect();this.sources.delete(entry);};
   source.start(t,source.loopStart+offset);
   // Retire every prior source, including one still fading from a rapid change.
   for(const old of this.sources)this.retire(old,1.25);
   this.sources.add(entry);this.current=entry;this.error=false;this.mix();
  }catch(error){
   if(ticket.epoch===this.epoch){this.error=true;console.warn('Music could not load:',error);this.freeze();}
  }finally{if(this.loading===ticket)this.loading=null;this.report();}
 }
 retire(entry,seconds){
  const t=this.context.currentTime,p=entry.gain.gain;
  if(p.cancelAndHoldAtTime)p.cancelAndHoldAtTime(t);else{p.cancelScheduledValues(t);p.setValueAtTime(p.value,t);}
  p.linearRampToValueAtTime(0,t+seconds);
  try{entry.source.stop(t+seconds+.01);}catch{}
 }
 freeze(){
  if(this.current?.id===this.desired)this.offset=(this.current.offset+this.context.currentTime-this.current.start)%this.current.duration;
  this.epoch++;this.loading=null;for(const entry of this.sources)this.retire(entry,.045);this.current=null;this.report();
 }
 pause(){if(this.paused)return;this.paused=true;this.freeze();}
 resume(){this.paused=false;this.ensure();this.report();}
 setHidden(hidden){this.hidden=hidden;if(hidden)this.freeze();else this.ensure();this.report();}
 stop(){this.freeze();this.desired=null;this.offset=0;this.report();}
}
