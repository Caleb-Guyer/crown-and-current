# Voice production

67 prerecorded synthetic dialogue clips, approximately 5 minutes 17 seconds. Original game dialogue is performed by stock synthetic voices; these are not recordings of historical people or named human actors.

The voice files were generated locally with [Hexgrad's Kokoro-82M v1.0](https://huggingface.co/hexgrad/Kokoro-82M), an Apache 2.0 model, using [kokoro-onnx 0.6.1](https://github.com/thewh1teagle/kokoro-onnx) (MIT). The model and voice data came from the inference project's linked model release. No AI model, inference package, account, microphone, or speech API is required to play.

| Stock voice | Cast |
|---|---|
| `bm_george` | Narrator, mate, printer, treasurer |
| `bm_fable` | Officer, William Penn |
| `am_fenrir` | Scout, fugitive |
| `am_puck` | Runner, lookout |
| `af_heart` | Neighbor, newcomer |
| `bf_emma` | Friend, dispatch |
| `am_michael` | Watchman |
| `af_bella` | Colonist |

Voice assignments and pacing vary by role. All scripts, stock-voice identifiers, generation rates, durations, and asset filenames are preserved in [voice-lines.mjs](voice-lines.mjs). Dates are expanded for spoken pronunciation where necessary; captions retain the historical numerals. Audio is 24 kHz mono MP3 at 96 kbps, with silence trimming, consistent levels, peak headroom, and brief fades. Content-addressed filenames avoid stale recordings after a script change.

The player downloads only the clips that are used. One dialogue channel handles prioritization, stale chatter, pause/resume, and cancellation. Speech temporarily lowers game-effect volume. Optional subtitles remain available independently, and blocked or failed audio shows timed captions.

Original dialogue and produced audio are offered under the project's CC BY 4.0 content terms, to the extent rights apply, with credit to Crown & Current contributors and this production note. Source models and generation libraries retain their own licenses; they are not distributed in this repository.
