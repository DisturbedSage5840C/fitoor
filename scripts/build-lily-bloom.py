"""Build the Rules-page lily's bloom sprite from its open-flower cut-out.

Usage: python3 -I scripts/build-lily-bloom.py public/art/lily-flower.webp public/art/lily-bloom.webp

Each frame is a polar warp of the open flower about the point where its stem
meets the fingers. Closed, every petal is folded up into a narrow cone round
the upright axis and the head is smaller and greener, which reads as a bud;
frame by frame the cone widens and the head grows until the last frame is
the untouched flower. Frames stack top to bottom in one WebP sprite that the
page steps through with CSS.
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image

# The flower's box on the 907x1024 layer, kept in the sprite. LilyBloom.tsx
# positions the sprite with the same numbers.
CROP = (180, 0, 907, 470)
# Where the stem meets the fingers, in layer pixels.
PIVOT = (572.0, 425.0)
# Output scale: the layer shows about 240 CSS px wide, so this stays sharp at 2x.
SCALE = 0.55
# Openness per frame: a held, swaying bud, then the petals peel open and settle.
OPENNESS = [0.0, 0.0, 0.03, 0.07, 0.13, 0.21, 0.31, 0.43, 0.56, 0.69, 0.81, 0.9, 0.97, 1.0]
SWAY_DEG = [-4, 3, -2, 2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
# Fully closed: petal angles squeezed to this share, head scaled to this size.
BUD_SPREAD, BUD_SIZE = 0.2, 0.55
BUD_GREEN = np.array([70.0, 105.0, 45.0])
BUD_TINT = 0.45
QUALITY = 82


def ease(t: float) -> float:
    return 1 - (1 - t) ** 2


def warp(src: np.ndarray, openness: float, sway_deg: float) -> np.ndarray:
    h, w = src.shape[:2]
    spread = BUD_SPREAD + (1 - BUD_SPREAD) * ease(openness)
    size = BUD_SIZE + (1 - BUD_SIZE) * ease(openness)
    px, py = PIVOT
    ys, xs = np.mgrid[0:h, 0:w].astype(float)
    dx, dy = xs - px, ys - py
    r = np.hypot(dx, dy)
    # Angle from straight up, clockwise positive.
    theta = np.arctan2(dx, -dy) - np.radians(sway_deg)
    src_theta = theta / spread
    src_r = r / size
    valid = np.abs(src_theta) <= np.pi
    sx = px + src_r * np.sin(src_theta)
    sy = py - src_r * np.cos(src_theta)
    valid &= (sx >= 0) & (sx <= w - 1) & (sy >= 0) & (sy <= h - 1)
    sxi = np.clip(np.rint(sx), 0, w - 1).astype(int)
    syi = np.clip(np.rint(sy), 0, h - 1).astype(int)
    out = src[syi, sxi].astype(float)
    out[~valid] = 0

    tint = BUD_TINT * (1 - openness) ** 1.5
    if tint > 0:
        # Greener towards the base of the bud, as a real lily bud is.
        base_weight = np.clip(1 - r / (260 * size), 0, 1)[..., None]
        out[..., :3] += (BUD_GREEN - out[..., :3]) * tint * (0.4 + 0.6 * base_weight)
    return out.clip(0, 255).astype(np.uint8)


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    src_path, out_path = Path(sys.argv[1]), Path(sys.argv[2])
    if not src_path.is_file():
        sys.exit(f"No flower at {src_path}")
    if len(OPENNESS) != len(SWAY_DEG):
        sys.exit("OPENNESS and SWAY_DEG must have one entry per frame")
    src = np.asarray(Image.open(src_path).convert("RGBA"))
    x0, y0, x1, y1 = CROP
    fw, fh = round((x1 - x0) * SCALE), round((y1 - y0) * SCALE)
    sheet = Image.new("RGBA", (fw, fh * len(OPENNESS)))
    for i, (t, sway) in enumerate(zip(OPENNESS, SWAY_DEG)):
        frame = Image.fromarray(warp(src, t, sway), "RGBA").crop(CROP)
        sheet.paste(frame.resize((fw, fh), Image.Resampling.LANCZOS), (0, i * fh))
    sheet.save(out_path, quality=QUALITY, method=6)
    print(f"{len(OPENNESS)} frames of {fw}x{fh} -> {out_path}")


if __name__ == "__main__":
    main()
