// A single media channel keeps voices exclusive. The simulation owns the clock,
// so pausing also freezes subtitle time and queued dialogue expiry.
export class DialogueDirector {
  constructor({media,lines,onCaption=()=>{},onActivity=()=>{},onLast=()=>{}}) {
    this.media=media; this.lines=new Map(lines.map(line=>[line.id,line]));
    this.lookup=new Map(lines.map(line=>[line.speaker+'\n'+line.text,line]));
    this.onCaption=onCaption;this.onActivity=onActivity;this.onLast=onLast;
    this.queue=[];this.current=null;this.last=null;this.clock=0;this.serial=0;this.attempt=0;
    this.paused=false;this.enabled=true;this.volume=.9;this.subtitles=true;this.recent=new Map();
    this.media.preload='auto';
  }
  find(speaker,text){return this.lookup.get(speaker+'\n'+text);}
  say(id,options={}) {
    const line=typeof id==='string'?this.lines.get(id):id;
    if(!line)return false;
    const {priority=1,ttl=30,cooldown=0,caption=true,replace=false}=options;
    if(replace)this.stop();
    if(this.current?.line.id===line.id||this.queue.some(job=>job.line.id===line.id))return false;
    if(this.clock-(this.recent.get(line.id)??-Infinity)<cooldown)return false;
    const job={line,priority,expires:this.clock+ttl,caption,elapsed:0,state:'waiting'};
    // Drop stale combat chatter first; essential history is always retained.
    if(priority===0&&this.queue.filter(item=>item.priority===0).length>=1)return false;
    this.queue.push(job);this.queue.sort((a,b)=>b.priority-a.priority);
    this._next();return true;
  }
  _next(){
    if(this.current||this.paused)return;
    this.queue=this.queue.filter(job=>job.expires>=this.clock);
    const job=this.queue.shift();if(!job){this.onActivity(false);return;}
    this.current=job;this.last=job.line;this.lastCaption=job.caption;this.onLast(job.line);this.recent.set(job.line.id,this.clock);
    const token=++this.serial;job.state='loading';
    this._caption();
    this.media.onended=()=>{if(token===this.serial)this._finish();};
    this.media.onerror=()=>{if(token===this.serial)this._silent();};
    this.media.src=job.line.file||'';
    this.media.volume=this.volume;this.media.muted=!this.enabled;
    if(!job.line.file){this._silent();return;}
    this._play(token);
  }
  _play(token){
    const attempt=++this.attempt;
    try{
      const pending=this.media.play();
      Promise.resolve(pending).then(()=>{
        if(token!==this.serial||attempt!==this.attempt||!this.current)return;
        if(this.paused){this.media.pause();return;}
        this.current.state='playing';this._activity();
      }).catch(()=>{if(token===this.serial&&attempt===this.attempt&&!this.paused)this._silent();});
    }catch{if(token===this.serial)this._silent();}
  }
  _silent(){
    if(!this.current)return;
    ++this.attempt;this.media.pause();this.current.state='silent';this.onActivity(false);
    // A missing/blocked clip must not remove the only available dialogue.
    this._caption();
  }
  _caption(){
    const job=this.current;
    this.onCaption(job&&job.caption&&(this.subtitles||job.state==='silent')?job.line:null);
  }
  _activity(){this.onActivity(!!this.current&&!this.paused&&this.current.state==='playing'&&this.enabled&&this.volume>0);}
  _finish(){
    if(!this.current)return;
    this.media.pause();this.media.onended=null;this.media.onerror=null;
    this.current=null;++this.serial;this.onCaption(null);this.onActivity(false);this._next();
  }
  update(dt){
    if(this.paused)return;
    this.clock+=dt;
    if(!this.current){this._next();return;}
    const job=this.current;job.elapsed+=dt;
    if(job.state==='loading'&&job.elapsed>4)this._silent();
    if(job.state==='silent'&&job.elapsed>=Math.max(3,job.line.duration||job.line.text.split(/\s+/).length*.37))this._finish();
    // Broken media events must never wedge the dialogue channel forever.
    if(job===this.current&&job.elapsed>(job.line.duration||15)+15)this._finish();
  }
  pause(){++this.attempt;this.paused=true;this.media.pause();this.onActivity(false);}
  resume(){
    if(!this.paused)return;
    this.paused=false;
    if(this.current&&this.current.state!=='silent')this._play(this.serial);
    else this._next();
  }
  stop(){
    ++this.serial;this.media.pause();this.media.onended=null;this.media.onerror=null;
    this.queue=[];this.current=null;this.paused=false;
    try{this.media.currentTime=0;}catch{}
    this.onCaption(null);this.onActivity(false);
  }
  reset(){this.stop();this.recent.clear();this.last=null;}
  replay(){if(this.last)this.say(this.last,{replace:true,caption:this.lastCaption??true,priority:3});}
  configure({enabled=this.enabled,volume=this.volume,subtitles=this.subtitles}={}){
    this.enabled=enabled;this.volume=Math.max(0,Math.min(1,Number(volume)||0));this.subtitles=subtitles;
    this.media.muted=!enabled;this.media.volume=this.volume;this._caption();this._activity();
  }
}
