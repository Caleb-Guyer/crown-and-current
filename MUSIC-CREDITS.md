# Original score

Eight original instrumental compositions, arranged and synthesized for **Crown & Current**. No commercial recordings, sampled songs, or external music services are used. These are contemporary game cues inspired by strings, wooden flutes, plucked instruments, horns, and field drums; they are not authentic recordings or reconstructions of colonial music.

| Scene | Track | Tempo |
| --- | --- | --- |
| Menus / mission complete | A Crown on the Horizon | 76 BPM |
| Jamestown escape | Embers in the Streets | 96 BPM |
| Pennsylvania | Room for Everyone | 88 BPM |
| Boston courier | The Unbroken Seal | 102 BPM |
| Atlantic blockade | Full Sail, No Permission | 112 BPM |
| Pitt's reinforcements | Hold the Line | 116 BPM |
| Quebec | Above the Saint Lawrence | 124 BPM |
| Imperial debt | The Price of an Empire | 84 BPM |

Each cue has a 16-bar arrangement, melodic development, percussion appropriate to its scene, stereo placement, and circular room reflections. The full score is about 5 minutes 16 seconds. Music files are 32 kHz stereo MP3 at 160 kbps; `score.mjs` includes loop boundaries measured to exclude encoder padding. Playback uses Web Audio buffer loops, 1.25-second transitions, and an independent music bus that drops to 22% of its normal level during dialogue. Music pauses with gameplay and when the tab is hidden. Only needed tracks load, with at most three decoded buffers cached.

`compose-score.py` contains the complete original composition and synthesis. To regenerate, install Python packages `numpy`, `lameenc`, and `soundfile`, then run `python compose-score.py` from this directory. This is an optional asset-production step; neither Python nor these packages are needed to play or host the game. Production versions: numpy 2.5.3, lameenc 1.8.4, soundfile 0.14.0.

Music and score compositions: Crown & Current contributors, 2026. Offered under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), to the extent rights apply. Credit “Crown & Current — original game score.” Synthesis and playback code are MIT licensed with the rest of the game code.
