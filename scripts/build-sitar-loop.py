"""Build the site's background sitar loop from the hero's green-screen clip.

Usage: python3 -I scripts/build-sitar-loop.py <clip.mp4> public/audio/sitar-loop.m4a

Cuts the plucked-sitar stretch of the clip's sound, folds its tail back over
its head with an equal-power crossfade so the loop restarts without a click
or a gap, then loudness-normalises it and encodes a small AAC file. Needs
ffmpeg on the PATH.
"""

import subprocess
import sys
import tempfile
import wave
from pathlib import Path

import numpy as np

# The clip's playing section, in seconds: he is seated and plucking throughout.
CUT_START, CUT_END = 6.4, 20.0
# How much of the tail is blended into the head.
CROSSFADE_S = 1.5
# Quiet enough to sit behind the page; previews play at their own level.
LOUDNESS = "loudnorm=I=-18:TP=-2:LRA=11"
BITRATE = "112k"


def ffmpeg(*args: str) -> None:
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *args], check=True)


def crossfade_loop(src: Path, out: Path) -> float:
    with wave.open(str(src)) as w:
        rate, channels = w.getframerate(), w.getnchannels()
        samples = np.frombuffer(w.readframes(w.getnframes()), np.int16)
    audio = samples.reshape(-1, channels).astype(np.float64)
    n = int(CROSSFADE_S * rate)
    if len(audio) <= 2 * n:
        sys.exit("Cut is too short for the crossfade")
    t = np.linspace(0, np.pi / 2, n)[:, None]
    head = audio[:n] * np.sin(t) + audio[-n:] * np.cos(t)
    loop = np.concatenate([head, audio[n:-n]])
    with wave.open(str(out), "wb") as o:
        o.setnchannels(channels)
        o.setsampwidth(2)
        o.setframerate(rate)
        o.writeframes(np.clip(loop, -32768, 32767).astype(np.int16).tobytes())
    return len(loop) / rate


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    clip, out = Path(sys.argv[1]), Path(sys.argv[2])
    if not clip.is_file():
        sys.exit(f"No clip at {clip}")
    with tempfile.TemporaryDirectory() as tmp:
        raw, looped = Path(tmp, "raw.wav"), Path(tmp, "loop.wav")
        ffmpeg("-ss", str(CUT_START), "-to", str(CUT_END), "-i", str(clip), "-vn", "-ac", "2", "-ar", "44100", str(raw))
        seconds = crossfade_loop(raw, looped)
        ffmpeg("-i", str(looped), "-af", LOUDNESS, "-ar", "44100", "-c:a", "aac", "-b:a", BITRATE, "-movflags", "+faststart", str(out))
    print(f"{seconds:.2f}s loop -> {out}")


if __name__ == "__main__":
    main()
