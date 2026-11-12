"""Rebuild the hero musician's alpha-WebP frames from the green-screen clip.

Usage: python3 -I scripts/build-mascot-frames.py "<clip.mp4>" public/mascot-sequence

Writes two strips, both 560x598 like the frames they replace:
  intro-001..078.webp  walk in, kneel, pick up the sitar and settle (0 to 6.4 s)
  frame-001..036.webp  3 s of playing that loops forward with no visible seam

The clip is a muted green (about rgb 90,150,105), so a stock chromakey misses
it; alpha comes from greenness, G - max(R, B), which is 35+ on the screen and
10 or less anywhere on the musician or the sitar.
"""

import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image

FPS = 12
# Greenness ramp: fully opaque at or below KEY_LO, fully clear at KEY_HI.
KEY_LO, KEY_HI = 12, 30
# Boxes (x0, y0, x1, y1) on the 480x848 clip that are always background:
# the corner watermark and a light mark on the floor.
CLEAR_BOXES = [(385, 740, 480, 800), (215, 750, 265, 790)]
# One fixed crop that fits the tallest standing pose and the kneeling knees.
CROP_TOP, CROP_BOTTOM = 140, 783
OUT_W, OUT_H = 560, 598
SCALE = OUT_H / (CROP_BOTTOM - CROP_TOP)
# Match the light desaturation of the original mascot frames.
SATURATION = 0.8
# Soft side edges so the clip border never reads as a hard vertical cut;
# the wide one is only used while he is still walking in from the left.
EDGE_FEATHER, ENTRY_FEATHER, ENTRY_FRAMES = 20, 70, 21
# The sitar rests just past the right edge until he lifts it in: hide that
# sliver while it lies there, then fade it in rather than cut it at the edge.
SITAR_REST_FRAMES, SITAR_REST_X = 41, 440
LIFT_FRAMES, LIFT_FEATHER = 46, 60

INTRO_FRAMES = range(0, 78)
# Frames 158..193 loop seamlessly (193 -> 158 matches); start at 161, the
# pose that best matches the last intro frame, so the hand-off is invisible.
LOOP_FRAMES = [*range(161, 194), *range(158, 161)]
QUALITY = 78


def extract(clip: Path, into: Path) -> list[Path]:
    subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(clip), "-vf", f"fps={FPS}", str(into / "%03d.png")],
        check=True,
    )
    frames = sorted(into.glob("*.png"))
    if len(frames) <= max(LOOP_FRAMES):
        sys.exit(f"Expected at least {max(LOOP_FRAMES) + 1} frames, got {len(frames)}")
    return frames


def side_feather(width: int, left: int, right: int) -> np.ndarray:
    x = np.arange(width, dtype=float)
    return np.clip(np.minimum((x + 1) / left, (width - x) / right), 0, 1)


def key(path: Path, index: int) -> Image.Image:
    rgb = np.asarray(Image.open(path).convert("RGB")).astype(float)
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    alpha = np.clip((KEY_HI - (g - np.maximum(r, b))) / (KEY_HI - KEY_LO), 0, 1)
    for x0, y0, x1, y1 in CLEAR_BOXES:
        alpha[y0:y1, x0:x1] = 0
    if index < SITAR_REST_FRAMES:
        alpha[:, SITAR_REST_X:] = 0
    left = ENTRY_FEATHER if index < ENTRY_FRAMES else EDGE_FEATHER
    right = LIFT_FEATHER if index < LIFT_FRAMES else EDGE_FEATHER
    alpha *= side_feather(rgb.shape[1], left, right)[None, :]

    # Despill: green may never exceed the stronger of red and blue.
    g = np.minimum(g, np.maximum(r, b))
    out = np.stack([r, g, b], axis=-1)
    grey = out.mean(axis=-1, keepdims=True)
    out = grey + (out - grey) * SATURATION

    rgba = np.dstack([out, alpha * 255]).clip(0, 255).astype(np.uint8)
    cropped = Image.fromarray(rgba, "RGBA").crop((0, CROP_TOP, rgba.shape[1], CROP_BOTTOM))
    scaled = cropped.resize((round(cropped.width * SCALE), OUT_H), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (OUT_W, OUT_H))
    canvas.paste(scaled, ((OUT_W - scaled.width) // 2, 0))
    return canvas


def write_strip(frames: list[Path], picks, prefix: str, out_dir: Path) -> None:
    for n, i in enumerate(picks, start=1):
        key(frames[i], i).save(out_dir / f"{prefix}-{n:03d}.webp", quality=QUALITY, method=6)


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    clip, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
    if not clip.is_file():
        sys.exit(f"No clip at {clip}")
    out_dir.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        frames = extract(clip, Path(tmp))
        write_strip(frames, INTRO_FRAMES, "intro", out_dir)
        write_strip(frames, LOOP_FRAMES, "frame", out_dir)


if __name__ == "__main__":
    main()
