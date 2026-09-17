"""Original Crown & Current score. No sampled music or external recordings.
Deterministic additive/physical-inspired instruments, arranged into 16-bar loops.
"""
import sys, json, hashlib
from pathlib import Path
root = Path(__file__).resolve().parent
# Optional production dependencies: numpy, lameenc, soundfile.
import numpy as np
import lameenc
import soundfile as sf

SR = 32000
out = root
rng = np.random.default_rng(1763)

def note(midi, length, kind):
    t = np.arange(round(length*SR), dtype=np.float64)/SR
    f = 440*2**((midi-69)/12)
    attack, release = (.018, .14)
    x = np.zeros_like(t)
    if kind == 'pluck':
        # Quill-plucked string: bright attack, warm body, high partials decay first.
        for h in range(1, 15):
            x += np.sin(2*np.pi*f*h*t+.012*h*h)*np.exp(-t*(1.7+h*.65))/(h**1.15)
        attack, release = .003, .055
    elif kind == 'flute':
        phase = 2*np.pi*f*t + .026*np.sin(2*np.pi*5.1*t)*np.minimum(t*5,1)
        x = np.sin(phase)+.16*np.sin(phase*2)+.075*np.sin(phase*3)
        x += rng.normal(0,.018,len(t))
        x *= .9+.1*np.sin(np.pi*np.minimum(t/length,1))
        attack, release = .055, .18
    elif kind == 'horn':
        phase=2*np.pi*f*t+.018*np.sin(2*np.pi*4.8*t)
        for h in range(1,9):
            x += np.sin(phase*h)/(h**1.3)*np.exp(-h*.05)
        attack, release = .09,.22
    elif kind == 'strings':
        # Three slightly detuned players, dark enough to leave dialogue space.
        for detune in [-.0019,0,.0022]:
            phase=2*np.pi*f*(1+detune)*t+.02*np.sin(2*np.pi*4.3*t)
            for h in range(1,9):
                x += np.sin(phase*h+.11*h)/(h**1.45)*np.exp(-h*f/6800)/3
        attack, release = .28,.55
    elif kind == 'bass':
        x=np.sin(2*np.pi*f*t)+.22*np.sin(4*np.pi*f*t)+.09*np.sin(6*np.pi*f*t)
        x*=np.exp(-t*.55)
        attack,release=.012,.12
    env=np.minimum(t/max(.001,attack),1)*np.minimum((length-t)/max(.001,release),1)
    return (x*env).astype(np.float32)

def drum(kind):
    length={'low':1.15,'snare':.24,'tick':.08,'swell':1.7}[kind]
    t=np.arange(round(length*SR))/SR
    noise=rng.normal(0,1,len(t))
    if kind=='low':
        phase=2*np.pi*(58*t+20*.07*(1-np.exp(-t/.07)))
        x=(np.sin(phase)+.32*np.sin(phase*1.53)+.14*np.sin(phase*2.09))*np.exp(-t*5)
        x+=noise*.12*np.exp(-t*55)
    elif kind=='snare':
        high=noise-np.convolve(noise,np.ones(13)/13,mode='same')
        x=(high*.24+np.sin(2*np.pi*174*t)*.28)*np.exp(-t*19)
    elif kind=='tick':
        x=(noise*.2+np.sin(2*np.pi*1480*t)*.14)*np.exp(-t*70)
    else:
        soft=np.convolve(noise,np.ones(19)/19,mode='same')
        x=soft*np.sin(np.pi*t/length)**1.4
    x*=np.minimum(t/.002,1)*np.minimum((length-t)/.015,1)
    return x.astype(np.float32)

# Chord roots are absolute MIDI notes; melody degrees follow each chord.
minor=[(50,3),(46,4),(53,4),(48,4)]
scores=[
 {'id':'menu','title':'A Crown on the Horizon','bpm':76,'mood':'menu','chords':minor},
 {'id':'ashes','title':'Embers in the Streets','bpm':96,'mood':'stealth','chords':minor},
 {'id':'haven','title':'Room for Everyone','bpm':88,'mood':'haven','chords':[(48,4),(43,4),(45,3),(41,4)]},
 {'id':'crown','title':'The Unbroken Seal','bpm':102,'mood':'courier','chords':[(45,3),(41,4),(48,4),(43,4)]},
 {'id':'molasses','title':'Full Sail, No Permission','bpm':112,'mood':'sea','chords':[(50,4),(48,4),(43,4),(50,4)]},
 {'id':'pitt','title':'Hold the Line','bpm':116,'mood':'defense','chords':minor},
 {'id':'quebec','title':'Above the Saint Lawrence','bpm':124,'mood':'battle','chords':minor},
 {'id':'debt','title':'The Price of an Empire','bpm':84,'mood':'crisis','chords':[(45,3),(41,4),(48,4),(43,4)]},
]
manifest={}
for score in scores:
    bpm,mood=score['bpm'],score['mood']; beat=60/bpm
    n=round(64*beat*SR); mix=np.zeros((n,2),np.float32)
    def add(x, b, volume=.1, pan=0):
        start=round(b*beat*SR)%n
        stereo=x[:,None]*np.array([np.sqrt((1-pan)/2),np.sqrt((1+pan)/2)],np.float32)*volume
        end=min(len(x),n-start); mix[start:start+end]+=stereo[:end]
        if end<len(x): mix[:len(x)-end]+=stereo[end:]
    def play(p,b,d,kind,vol=.1,pan=0):add(note(p,d*beat,kind),b,vol,pan)
    active=mood in ['battle','defense','sea']; quiet=mood in ['stealth','courier','crisis']
    for bar in range(16):
        b=bar*4; r,third=score['chords'][(bar//2)%4]; chord=[r,r+third,r+7]
        section=bar>=8
        # Sustained inner voices and a moving bass line bind the score together.
        for j,p in enumerate(chord):
            play(p+12,b,4.35,'strings',.034 if quiet else .048,[-.55,.15,.55][j])
        for pos in ([0,1.5,2,3.5] if active else [0,2]):
            play(r-12 if r>=46 else r,b+pos,1.2 if active else 1.9,'bass',.18 if active else .11)
        # Interlocking string ostinato / lute arpeggio, humanized accents.
        step=.5 if active or mood in ['haven','courier'] else 1
        pattern=[0,2,1,2,0,1,2,1]
        for k,pos in enumerate(np.arange(0,4,step)):
            p=chord[pattern[k%8]]+(12 if mood in ['haven','sea','menu'] else 0)
            vol=(.09 if mood=='haven' else .074 if active else .047)*(1 if k%2==0 else .72)
            play(p,b+float(pos),.95,'pluck',vol,(-.4 if k%2 else .4))
        # An original rising-and-answering theme, with rests between phrases.
        if mood in ['menu','haven','sea','battle','defense']:
            if bar%2==0:
                seq=[(0,chord[0]+24,.7),(.75,chord[1]+24,.65),(1.5,chord[2]+24,1.3),(3,chord[1]+24,.7)]
            else:
                seq=[(0,chord[2]+24,1.4),(1.5,chord[1]+24,.7),(2.5,chord[0]+24,1.3)]
            if bar in [6,14]:seq=[(0,r+19,1.3),(1.5,r+24,2.1)]
            if bar in [7,15]:seq=[(0,r+24,2.7)]
            if mood=='menu' and bar%4 in [2,3]:seq=[]
            if mood in ['battle','defense']:
                seq=[(pos,p-12,d) for pos,p,d in seq] if section else [(0,r+12,2.6),(3,r+19,.8)]
            for pos,p,d in seq:
                play(p,b+pos,d,'horn' if mood in ['battle','defense'] else 'flute',.092 if active else .08,-.12)
        elif bar%4 in [1,3]:
            for pos,p,d in [(0,r+19,1.5),(2,r+15 if third==3 else r+16,1.6)]:
                play(p,b+pos,d,'flute',.035,-.2)
        # Period-inspired field drums, with a fuller second phrase and short fills.
        if active:
            for pos in [0,1.5,2.5] if mood=='sea' else [0,2,3.5]:add(drum('low'),b+pos,.3 if pos==0 else .2)
            for pos in [1,3]:add(drum('snare'),b+pos,.22,.2)
            for k in range(8):add(drum('tick'),b+k*.5,.11 if k%2==0 else .065,-.3)
            if bar%4==3:
                for pos in [3.25,3.5,3.75]:add(drum('snare'),b+pos,.075+(pos-3)*.13,.15)
        elif quiet:
            add(drum('low'),b,.13)
            for pos in ([1,2,3] if mood=='crisis' else [1.5,3]):add(drum('tick'),b+pos,.07,-.2)
            if section:add(drum('low'),b+2.5,.07)
        elif mood=='haven':
            for pos in [0,2]:add(drum('low'),b+pos,.067)
            for pos in [.5,1.5,2.5,3.5]:add(drum('tick'),b+pos,.05,.3)
        elif bar%2==0:add(drum('low'),b,.09)
        if bar in [7,15]:add(drum('swell'),b+1.25,.10 if active else .035)
    # Circular early reflections preserve the exact loop and add a small hall.
    dry=mix.copy()
    for delay,level in [(.047,.13),(.081,.10),(.139,.075),(.223,.06),(.337,.045),(.491,.035),(.677,.025)]:
        mix+=np.roll(dry[:,::-1],round(delay*SR),axis=0)*level
    mix-=mix.mean(axis=0)
    mix=np.tanh(mix*1.35)
    mix*=min(.87/np.max(np.abs(mix)),.19/np.sqrt(np.mean(mix**2)))
    pcm=(np.clip(mix,-1,1)*32767).astype('<i2')
    enc=lameenc.Encoder();enc.set_bit_rate(160);enc.set_in_sample_rate(SR);enc.set_channels(2);enc.set_quality(2)
    payload=enc.encode(pcm.tobytes())+enc.flush()
    digest=hashlib.sha256(payload).hexdigest()[:8]
    name=f"music-{score['id']}-{digest}.mp3";(out/name).write_bytes(payload)
    decoded,sample_rate=sf.read(out/name,dtype='float32',always_2d=True)
    # Raw LAME frames have encoder/decoder priming. Measure it against the master
    # so Web Audio loops only the musical phrase, with no MP3 padding gap.
    ref=mix[:SR//2,0]; segment=decoded[:len(ref)+2304,0]
    correlations=np.correlate(segment,ref,mode='valid')
    delay=int(np.argmax(correlations))
    assert sample_rate==SR and delay<2304 and len(decoded)>=delay+n
    peak=float(np.max(np.abs(decoded))); rms=float(np.sqrt(np.mean(decoded**2)))
    assert peak<.99 and .10<rms<.25
    entry={k:score[k] for k in ['title','bpm','mood']}
    entry.update(file=name,loopStart=delay/SR,loopEnd=(delay+n)/SR,duration=n/SR,peak=round(peak,4),rms=round(rms,4),bytes=len(payload))
    manifest[score['id']]=entry
    print(score['id'],name,entry,flush=True)
(out/'score.mjs').write_text('// Original, locally synthesized 16-bar instrumental loops. See MUSIC-CREDITS.md.\nexport const SCORE = '+json.dumps(manifest,indent=2)+';\n',encoding='utf-8')

