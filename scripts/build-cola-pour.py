"""Build the Contact-page cola pour: a looping, hand-inked stop-motion sprite.

Usage: python3 -I scripts/build-cola-pour.py public/art/soda-can.webp public/art/cola-pour.webp

Each frame is drawn from scratch like a cel. The cola fills the can's own
drink hole (traced from the can art, so it sits exactly in the opening), rolls
forward over the lid's lip and falls as a thick glossy stream that arcs out
and narrows, ripples running down it, landing in a
cartoon crown splash with a puddle, fizz and drops thrown out on arcs. The cream keyline and hard
shadow are baked in and fade in only below the rim, so where the cola meets
the can it reads as part of the drawing, not a sticker laid on top. Every
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
# The drink hole on the can art: a point inside it and a box it fits in.
HOLE_SEED = (505, 195)
HOLE_BOX = (474, 150, 545, 236)
HOLE_DARK = 75  # the hole is drawn near-black; anything darker than this is hole
# The stream leaves the hole at its widest row and rolls over the lip below it.
SPOUT = (508.0, 192.0)
LIP_Y = 248.0
LAND_Y = 880.0
THROW, THROW_FALL = 40.0, 45.0  # sideways throw out of the mouth, and how fast it bends down
DRIFT = 8.0  # slow drift right on the long fall
# Below the rim the pour becomes a sticker like the can: keyline + shadow
# fade in over this band. Above it the outline is the can art's own ink.
EDGE_FROM, EDGE_TO = 236.0, 290.0
INK_FROM = 204.0
# Inside the can the cola is in shadow: it brightens to full colour by
# EMERGE_TO, and the lip highlight sits where it rolls out of the opening.
EMERGE_FROM, EMERGE_TO = 192.0, 222.0
LIP_ROW = 214.0
SS = 3  # supersampling
OUT_SCALE = 0.75  # art px -> sprite px (the can shows at most 240 CSS px)

INK = (28, 4, 7, 255)  # --maroon-deepest
COLA = (90, 35, 12, 255)
COLA_DARK = (58, 20, 6, 255)
CARAMEL = (176, 98, 44, 255)
CREAM = (255, 248, 236, 255)
INK_PX = 5  # outline width, art px
KEYLINE_PX = 5  # the sticker-edge keyline: 2 CSS px at the can's 240 px width
SHADOW = (8, 13)  # the sticker-edge shadow offset (3, 5 CSS px), art px
SHADOW_ALPHA = 0.45
QUALITY = 86


def to_px(x: float, y: float) -> tuple[float, float]:
    return ((x - BOX[0]) * SS, (y - BOX[1]) * SS)


def centre_x(y: float) -> float:
    # The can is tipped with its mouth to the right, so the cola shoots out
    # sideways first and gravity bends it down: fast drift, then near plumb.
    d = max(0.0, y - SPOUT[1])
    return SPOUT[0] + THROW * (1 - math.exp(-d / THROW_FALL)) + DRIFT * math.sqrt(d / (LAND_Y - SPOUT[1]))


def half_width(y: float) -> float:
    t = max(0.0, (y - SPOUT[1]) / (LAND_Y - SPOUT[1]))
    # As wide as the hole where it leaves, swelling as it rolls over the lip.
    bulge = 3.5 * math.exp(-(((y - LIP_Y) / 18) ** 2))
    across = 25.5 + bulge - 8 * math.sqrt(t)
    # Measured across a slanted stream, so stretch it to a horizontal span.
    d = max(0.0, y - SPOUT[1])
    slope = THROW / THROW_FALL * math.exp(-d / THROW_FALL) + 0.5 * DRIFT / math.sqrt(
        max(d, 1.0) * (LAND_Y - SPOUT[1]))
    return across * math.sqrt(1 + slope * slope)


def stream_edges(phase: float, rng: random.Random) -> tuple[list, list]:
    left, right = [], []
    y = SPOUT[1]
    while y <= LAND_Y + 20:
        t = (y - SPOUT[1]) / (LAND_Y - SPOUT[1])
        amp = 0.5 + 5.5 * t
        ripple_l = amp * math.sin(2 * math.pi * (y / 95 - phase))
        ripple_r = amp * math.sin(2 * math.pi * (y / 95 - phase) + 2.1)
        jitter = lambda: rng.uniform(-0.8, 0.8)  # noqa: E731 - the boiling line
        cx, hw = centre_x(y), half_width(y)
        left.append(to_px(cx - hw + ripple_l + jitter(), y))
        right.append(to_px(cx + hw + ripple_r + jitter(), y))
        y += 4
    return left, right


def draw_stream(fill: ImageDraw.ImageDraw, phase: float, rng: random.Random) -> None:
    left, right = stream_edges(phase, rng)
    fill.polygon(left + right[::-1], fill=COLA)
    # Dark core on the right, a caramel band and dashed cream glints on the left
    # that run down the stream one ripple per loop.
    y = SPOUT[1] + 14
    while y < LAND_Y - 10:
        cx, hw = centre_x(y), half_width(y)
        x0, y0 = to_px(cx + hw * 0.25, y)
        x1, y1 = to_px(cx + hw * 0.7, y + 5)
        fill.rectangle((x0, y0, x1, y1), fill=COLA_DARK)
        x0, _ = to_px(cx - hw * 0.55, y)
        x1, _ = to_px(cx - hw * 0.2, y)
        fill.rectangle((x0, y0, x1, y1), fill=CARAMEL)
        y += 4
    dash, gap = 46, 49
    period = dash + gap
    start = SPOUT[1] + 30 + (phase * period) % period - period
    while start < LAND_Y - 40:
        a, b = max(start, SPOUT[1] + 30), min(start + dash, LAND_Y - 40)
        if b > a:
            pts = []
            for yy in np.linspace(a, b, 12):
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


def hole_mask(can_path: Path) -> np.ndarray:
    """The can's drink hole on the sprite canvas, traced from the art itself."""
    art = np.asarray(Image.open(can_path).convert("RGBA")).astype(float)
    x0, y0, x1, y1 = HOLE_BOX
    patch = art[y0:y1, x0:x1]
    dark = (patch[..., :3].mean(axis=-1) < HOLE_DARK) & (patch[..., 3] > 128)
    labels, _ = ndimage.label(dark)
    seed = labels[HOLE_SEED[1] - y0, HOLE_SEED[0] - x0]
    if seed == 0:
        sys.exit("HOLE_SEED is not inside the can's drink hole")
    hole = ndimage.binary_fill_holes(labels == seed)
    # Close the pull-tab's notch and keep the art's own ink rim showing.
    hole = ndimage.binary_closing(hole, iterations=3)
    hole = ndimage.binary_erosion(hole, iterations=1)
    w = (BOX[2] - BOX[0]) * SS
    h = (BOX[3] - BOX[1]) * SS
    big = Image.fromarray((hole * 255).astype(np.uint8)).resize(
        ((x1 - x0) * SS, (y1 - y0) * SS), Image.Resampling.BILINEAR)
    canvas = np.zeros((h, w), dtype=bool)
    ox, oy = (x0 - BOX[0]) * SS, (y0 - BOX[1]) * SS
    canvas[oy:oy + big.height, ox:ox + big.width] = np.asarray(big) > 127
    return canvas


def draw_lip(fill: ImageDraw.ImageDraw, phase: float) -> None:
    """Light catching the cola as it rolls forward over the hole's edge."""
    wobble = 2.5 * math.sin(2 * math.pi * phase)
    for dy, colour, width in ((LIP_ROW + wobble, CARAMEL, 6), (LIP_ROW + 3 + wobble, CREAM, 2.5)):
        pts = []
        for u in np.linspace(-0.78, 0.6, 9):
            hw = half_width(dy)
            pts.append(to_px(centre_x(dy) + u * hw, dy - 7 * (1 - u * u)))
        fill.line(pts, fill=colour, width=int(width * SS), joint="curve")


def row_weight(h: int, start: float, end: float) -> np.ndarray:
    """0 above art row `start`, 1 below `end`, as a column to multiply alpha by."""
    art_y = BOX[1] + np.arange(h) / SS
    return np.clip((art_y - start) / (end - start), 0, 1)[:, None]


def frame(f: int, hole: np.ndarray) -> Image.Image:
    w = (BOX[2] - BOX[0]) * SS
    h = (BOX[3] - BOX[1]) * SS
    rng = random.Random(f * 7919)
    colour = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(colour)
    draw_stream(draw, f / FRAMES, rng)
    draw_splash(draw, f, rng)
    arr = np.asarray(colour).astype(float)
    # Cola seen through the opening, the same body as the stream leaving it.
    arr[hole & (arr[..., 3] == 0)] = COLA_DARK
    # Out of the dark: blend everything near the opening toward the shadowed cola.
    dim = 1 - row_weight(h, EMERGE_FROM, EMERGE_TO)[..., None] * np.ones((1, 1, 1))
    has = arr[..., 3:] > 0
    arr[..., :3] = np.where(has, arr[..., :3] * (1 - dim) + np.array(COLA_DARK[:3]) * dim,
                            arr[..., :3])
    lip = Image.fromarray(arr.astype(np.uint8), "RGBA")
    draw_lip(ImageDraw.Draw(lip), f / FRAMES)
    arr = np.asarray(lip).astype(float)
    body = arr[..., 3] > 0

    # Bold ink outline, except inside the opening where the art has its own.
    ring = ndimage.binary_dilation(body, iterations=INK_PX * SS) & ~body
    ink_a = ring * row_weight(h, INK_FROM - 6, INK_FROM + 6)
    solid = body | ring
    key = ndimage.binary_dilation(solid, iterations=KEYLINE_PX * SS) & ~solid
    edge_w = row_weight(h, EDGE_FROM, EDGE_TO)
    key_a = key * edge_w
    sticker = solid | key
    sx, sy = SHADOW[0] * SS, SHADOW[1] * SS
    shifted = np.zeros_like(sticker)
    shifted[sy:, sx:] = sticker[:-sy, :-sx]
    shadow_a = (shifted & ~sticker) * edge_w * SHADOW_ALPHA

    out = np.zeros((h, w, 4))
    for alpha, rgb in ((shadow_a, (0, 0, 0)), (key_a, CREAM[:3]), (ink_a, INK[:3])):
        a = alpha[..., None] if alpha.ndim == 2 else alpha
        out[..., :3] = out[..., :3] * (1 - a) + np.array(rgb) * a
        out[..., 3:] = out[..., 3:] * (1 - a) + a
    out[body] = np.concatenate([arr[body][:, :3], np.ones((body.sum(), 1))], axis=1)
    out[..., 3] *= 255
    img = Image.fromarray(out.clip(0, 255).astype(np.uint8), "RGBA")
    out_w = round((BOX[2] - BOX[0]) * OUT_SCALE)
    out_h = round((BOX[3] - BOX[1]) * OUT_SCALE)
    return img.resize((out_w, out_h), Image.Resampling.LANCZOS)


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    can_path, out = Path(sys.argv[1]), Path(sys.argv[2])
    if not can_path.is_file():
        sys.exit(f"No can art at {can_path}")
    hole = hole_mask(can_path)
    frames = [frame(f, hole) for f in range(FRAMES)]
    fw, fh = frames[0].size
    sheet = Image.new("RGBA", (fw, fh * FRAMES))
    for i, im in enumerate(frames):
        sheet.paste(im, (0, i * fh))
    sheet.save(out, quality=QUALITY, method=6)
    print(f"{FRAMES} frames of {fw}x{fh} -> {out}")


if __name__ == "__main__":
    main()
