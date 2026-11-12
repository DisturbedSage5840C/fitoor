"""Build the Contact-page cola pour: a looping, hand-inked stop-motion sprite.

Usage: python3 -I scripts/build-cola-pour.py public/art/cola-pour.webp

Each frame is drawn from scratch like a cel: a thick glossy stream that arcs
out of the can and narrows as it falls, ripples running down it, landing in a
cartoon crown splash with a puddle, fizz and drops thrown out on arcs. Every
moving part repeats a whole number of times per loop, so the last frame runs
straight back into the first. Frames stack top to bottom in one WebP sprite.
"""

import math
import random
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

FRAMES = 8
# The sprite's box on the 613x899 can art, in art pixels. SodaPour.tsx
# positions the sprite with the same numbers.
BOX = (280, 150, 720, 1010)
SPOUT = (490.0, 200.0)
LAND_Y = 880.0
DRIFT = 26.0  # how far right the stream has carried by the time it lands
SS = 3  # supersampling
OUT_SCALE = 0.75  # art px -> sprite px (the can shows at most 240 CSS px)

INK = (28, 4, 7, 255)  # --maroon-deepest
COLA = (90, 35, 12, 255)
COLA_DARK = (58, 20, 6, 255)
CARAMEL = (176, 98, 44, 255)
CREAM = (255, 248, 236, 255)
INK_PX = 5  # outline width, art px
QUALITY = 86


def to_px(x: float, y: float) -> tuple[float, float]:
    return ((x - BOX[0]) * SS, (y - BOX[1]) * SS)


def centre_x(y: float) -> float:
    t = max(0.0, (y - SPOUT[1]) / (LAND_Y - SPOUT[1]))
    return SPOUT[0] + DRIFT * math.sqrt(t)


def half_width(y: float) -> float:
    t = max(0.0, (y - SPOUT[1]) / (LAND_Y - SPOUT[1]))
    return 40 - 13 * math.sqrt(t)


def stream_edges(phase: float, rng: random.Random) -> tuple[list, list]:
    left, right = [], []
    y = SPOUT[1]
    while y <= LAND_Y + 20:
        t = (y - SPOUT[1]) / (LAND_Y - SPOUT[1])
        amp = 1.5 + 4.5 * t
        ripple_l = amp * math.sin(2 * math.pi * (y / 95 - phase))
        ripple_r = amp * math.sin(2 * math.pi * (y / 95 - phase) + 2.1)
        jitter = lambda: rng.uniform(-0.8, 0.8)  # noqa: E731 - the boiling line
        cx, hw = centre_x(y), half_width(y)
        left.append(to_px(cx - hw + ripple_l + jitter(), y))
        right.append(to_px(cx + hw + ripple_r + jitter(), y))
        y += 10
    return left, right


def draw_stream(fill: ImageDraw.ImageDraw, phase: float, rng: random.Random) -> None:
    left, right = stream_edges(phase, rng)
    fill.polygon(left + right[::-1], fill=COLA)
    # Round lip where the cola leaves the can.
    sx, sy = to_px(*SPOUT)
    r = 40 * SS
    fill.ellipse((sx - r, sy - r * 0.55, sx + r, sy + r * 0.55), fill=COLA)
    # Dark core on the right, a caramel band and dashed cream glints on the left
    # that run down the stream one ripple per loop.
    y = SPOUT[1] + 8
    while y < LAND_Y - 10:
        cx, hw = centre_x(y), half_width(y)
        x0, y0 = to_px(cx + hw * 0.25, y)
        x1, y1 = to_px(cx + hw * 0.7, y + 11)
        fill.rectangle((x0, y0, x1, y1), fill=COLA_DARK)
        x0, _ = to_px(cx - hw * 0.55, y)
        x1, _ = to_px(cx - hw * 0.2, y)
        fill.rectangle((x0, y0, x1, y1), fill=CARAMEL)
        y += 10
    dash, gap = 46, 49
    period = dash + gap
    start = SPOUT[1] + 20 + (phase * period) % period - period
    while start < LAND_Y - 40:
        a, b = max(start, SPOUT[1] + 18), min(start + dash, LAND_Y - 40)
        if b > a:
            pts = []
            for yy in np.linspace(a, b, 6):
                cx, hw = centre_x(yy), half_width(yy)
                pts.append(to_px(cx - hw * 0.42, yy))
            fill.line(pts, fill=CREAM, width=int(5 * SS), joint="curve")
        start += period


def teardrop(fill: ImageDraw.ImageDraw, x: float, y: float, r: float, angle: float,
             colour=COLA) -> None:
    """A cartoon drop: round body, pointed tail trailing behind its motion."""
    tail = 1.9 * r
    pts = []
    for k in range(24):
        a = 2 * math.pi * k / 24
        rr = r if math.cos(a) <= 0 else r + (tail - r) * max(0.0, math.cos(a)) ** 6
        pts.append((x + rr * math.cos(a + angle), y + rr * math.sin(a + angle)))
    fill.polygon([to_px(px, py) for px, py in pts], fill=colour)
    gx, gy = to_px(x - r * 0.35, y - r * 0.35)
    g = r * 0.32 * SS
    fill.ellipse((gx - g, gy - g, gx + g, gy + g), fill=CREAM)


# Crown spikes: (x offset from the landing point, base height, lean, phase).
SPIKES = [(-112, 46, -0.75, 0.0), (-80, 82, -0.5, 0.3), (-40, 108, -0.22, 0.62),
          (40, 104, 0.22, 0.15), (80, 86, 0.5, 0.47), (114, 48, 0.75, 0.8)]
# Thrown drops: (horizontal speed, launch speed, radius, phase).
DROPS = [(-130, 300, 10, 0.0), (-80, 360, 12, 0.5), (-175, 230, 8, 0.25),
         (105, 330, 11, 0.12), (165, 250, 8, 0.62), (45, 380, 9, 0.37),
         (-35, 400, 7, 0.85), (140, 300, 7, 0.75)]
GRAVITY = 600.0


def draw_splash(fill: ImageDraw.ImageDraw, f: int, rng: random.Random) -> None:
    lx = centre_x(LAND_Y)
    ly = LAND_Y
    # Puddle with a lighter rim.
    for w, h, dy, colour in ((170, 36, 18, COLA), (140, 22, 12, CARAMEL), (114, 15, 12, COLA)):
        x0, y0 = to_px(lx - w, ly + dy - h)
        x1, y1 = to_px(lx + w, ly + dy + h)
        fill.ellipse((x0, y0, x1, y1), fill=colour)
    # Crown: each spike swells and sinks on its own beat, a drop beading at its tip.
    for dx, base_h, lean, ph in SPIKES:
        h = base_h * (0.72 + 0.28 * math.sin(2 * math.pi * (f / FRAMES + ph)))
        bx, by = lx + dx, ly + 10
        tip = (bx + lean * h * 0.9 + rng.uniform(-1, 1), by - h)
        half = 17 + abs(dx) * 0.05
        pts = [(bx - half, by), (bx - half * 0.45, by - h * 0.5), tip,
               (bx + half * 0.45, by - h * 0.5), (bx + half, by)]
        fill.polygon([to_px(*p) for p in pts], fill=COLA)
        tx, ty = to_px(*tip)
        r = (8 + base_h * 0.06) * SS
        fill.ellipse((tx - r, ty - r * 1.1, tx + r, ty + r * 0.9), fill=COLA)
    # Hump of cola where the stream hits, with a cream fizz ring.
    x0, y0 = to_px(lx - 62, ly - 30)
    x1, y1 = to_px(lx + 62, ly + 24)
    fill.ellipse((x0, y0, x1, y1), fill=COLA)
    for k in range(8):
        a = math.pi * (0.1 + 0.8 * k / 7) + rng.uniform(-0.12, 0.12)
        bx, by = lx + 56 * math.cos(a + math.pi), ly + 4 - 22 * math.sin(a)
        r = rng.uniform(5, 9.5) * SS
        cx, cy = to_px(bx, by)
        fill.ellipse((cx - r, cy - r, cx + r, cy + r), fill=CREAM)
    # Thrown drops on ballistic arcs, one flight per loop each.
    for vx, vy, r, ph in DROPS:
        p = (f / FRAMES + ph) % 1.0
        flight = 2 * vy / GRAVITY
        t = p * flight
        x = lx + vx * t
        y = ly - 10 - vy * t + 0.5 * GRAVITY * t * t
        if y > ly + 6:
            continue
        angle = math.atan2(-(vy - GRAVITY * t), -vx)  # tail points back along the path
        teardrop(fill, x, y, r * (1 - 0.35 * p), angle)


def frame(f: int) -> Image.Image:
    w = (BOX[2] - BOX[0]) * SS
    h = (BOX[3] - BOX[1]) * SS
    rng = random.Random(f * 7919)
    colour = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(colour)
    draw_stream(draw, f / FRAMES, rng)
    draw_splash(draw, f, rng)
    arr = np.asarray(colour).copy()
    body = arr[..., 3] > 0
    # Bold cartoon outline: everything the cola covers, grown by INK_PX.
    ring = ndimage.binary_dilation(body, iterations=INK_PX * SS) & ~body
    arr[ring] = INK
    img = Image.fromarray(arr, "RGBA")
    out_w = round((BOX[2] - BOX[0]) * OUT_SCALE)
    out_h = round((BOX[3] - BOX[1]) * OUT_SCALE)
    return img.resize((out_w, out_h), Image.Resampling.LANCZOS)


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    out = Path(sys.argv[1])
    frames = [frame(f) for f in range(FRAMES)]
    fw, fh = frames[0].size
    sheet = Image.new("RGBA", (fw, fh * FRAMES))
    for i, im in enumerate(frames):
        sheet.paste(im, (0, i * fh))
    sheet.save(out, quality=QUALITY, method=6)
    print(f"{FRAMES} frames of {fw}x{fh} -> {out}")


if __name__ == "__main__":
    main()
