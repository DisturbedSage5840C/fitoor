"""Build the contact page's heap of cola waves from the reference wave art.

Usage: python3 -I scripts/build-cola-waves.py <waves.png> public/art/cola-waves.webp

The reference is blue hand-drawn curling waves on white. The white backdrop is
cut away (only white that touches the border, so the white streaks inside the
waves stay), then each pixel's lightness is mapped onto a cola ramp: near-black
cola in the troughs, deep brown, caramel, and cream foam on the highlights.
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

# Brighter than this on every channel and joined to the edge = backdrop.
BACKDROP_MIN = 232
# Lightness stops (0..1) and the cola colour at each.
RAMP = [
    (0.0, (26, 8, 2)),
    (0.3, (62, 22, 8)),
    (0.55, (104, 44, 16)),
    (0.78, (176, 104, 50)),
    (1.0, (243, 230, 207)),
]
OUT_W = 720
QUALITY = 84
# The reference runs off its frame at the bottom and right. Round the heap off
# inside a superellipse and scallop its underside, so the cut-out has an
# organic outline all round instead of the frame's straight edges.
HEAP_POWER = 3.0
SCALLOPS, SCALLOP_DEPTH, UNDERSIDE = 6, 0.035, 0.93


def cut_backdrop(rgb: np.ndarray) -> np.ndarray:
    """Alpha: 0 on the white that reaches the border, 1 everywhere else."""
    white = (rgb >= BACKDROP_MIN).all(axis=-1)
    labels, _ = ndimage.label(white)
    edge = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
    backdrop = np.isin(labels, edge[edge > 0])
    backdrop = ndimage.binary_opening(backdrop, iterations=1)
    return ndimage.uniform_filter((~backdrop).astype(float), size=3)


def heap_mask(h: int, w: int) -> np.ndarray:
    ys, xs = np.mgrid[0:h, 0:w].astype(float)
    u = (xs - w / 2) / (w / 2)
    v = (ys - h / 2) / (h / 2)
    inside = np.abs(u) ** HEAP_POWER + np.abs(v) ** HEAP_POWER < 1
    underside = h * (UNDERSIDE - SCALLOP_DEPTH * np.abs(np.sin(np.pi * SCALLOPS * xs / w)))
    mask = (inside & (ys < underside)).astype(float)
    return ndimage.uniform_filter(mask, size=3)


def to_cola(rgb: np.ndarray) -> np.ndarray:
    lightness = (rgb @ np.array([0.299, 0.587, 0.114])) / 255.0
    stops = np.array([s for s, _ in RAMP])
    colours = np.array([c for _, c in RAMP], dtype=float)
    return np.stack([np.interp(lightness, stops, colours[:, ch]) for ch in range(3)], axis=-1)


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    src, out = Path(sys.argv[1]), Path(sys.argv[2])
    if not src.is_file():
        sys.exit(f"No wave art at {src}")
    rgba_in = Image.open(src).convert("RGBA")
    # Flatten any transparency onto white so it is treated as backdrop.
    flat = Image.new("RGBA", rgba_in.size, (255, 255, 255, 255))
    flat.alpha_composite(rgba_in)
    rgb = np.asarray(flat.convert("RGB")).astype(float)
    alpha = cut_backdrop(rgb)
    rgba = np.dstack([to_cola(rgb), alpha * 255]).clip(0, 255).astype(np.uint8)
    img = Image.fromarray(rgba, "RGBA")
    img = img.crop(img.getbbox())
    shaped = np.asarray(img).astype(float)
    shaped[..., 3] *= heap_mask(*shaped.shape[:2])
    img = Image.fromarray(shaped.clip(0, 255).astype(np.uint8), "RGBA")
    img = img.crop(img.getbbox())
    img = img.resize((OUT_W, round(img.height * OUT_W / img.width)), Image.Resampling.LANCZOS)
    img.save(out, quality=QUALITY, method=6)
    print(f"{img.width}x{img.height} -> {out}")


if __name__ == "__main__":
    main()
