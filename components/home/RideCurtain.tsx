"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";

export const RIDE_FRAMES = 91;
const FRAME_W = 1264;
const FRAME_H = 560;
const rideSrc = (i: number) => `/intro/ride/f-${String(i).padStart(3, "0")}.webp`;

/** Rightmost opaque column of the banner in each frame, as a fraction of the
 *  frame width. The curtain is clipped to it, so the page underneath is
 *  uncovered exactly as the banner's trailing edge leaves each part of the
 *  screen. Frame 0 is the pose the auto holds before it moves. */
const BANNER_EDGE = [
  0.991, 0.99, 0.989, 0.987, 0.987, 0.986, 0.984, 0.983, 0.981, 0.979, 0.976, 0.974,
  0.972, 0.968, 0.967, 0.963, 0.959, 0.956, 0.951, 0.946, 0.941, 0.937, 0.93, 0.924,
  0.919, 0.911, 0.907, 0.899, 0.893, 0.886, 0.879, 0.871, 0.862, 0.853, 0.843, 0.834,
  0.824, 0.813, 0.802, 0.793, 0.78, 0.769, 0.756, 0.745, 0.733, 0.72, 0.707, 0.695,
  0.679, 0.665, 0.65, 0.634, 0.619, 0.603, 0.587, 0.57, 0.554, 0.538, 0.521, 0.505,
  0.486, 0.468, 0.451, 0.434, 0.415, 0.397, 0.378, 0.361, 0.342, 0.324, 0.305, 0.289,
  0.269, 0.251, 0.233, 0.215, 0.196, 0.179, 0.161, 0.144, 0.127, 0.111, 0.095, 0.081,
  0.063, 0.049, 0.035, 0.022, 0.0,
];
/** Keeps the curtain edge a hair ahead of the banner tip. */
const EDGE_MARGIN = 0.006;

function edgeAt(f: number) {
  const i = Math.min(BANNER_EDGE.length - 2, Math.max(0, Math.floor(f)));
  const a = BANNER_EDGE[i];
  const b = BANNER_EDGE[i + 1];
  return a + (b - a) * Math.min(1, Math.max(0, f - i));
}

/** Full-stage cover for the first stretch of the hero scroll. An auto with
 *  the theme banner sits on it; as the page scrolls the auto drives off to
 *  the left and the cover is drawn back behind the banner. */
export function RideCurtain({ progress }: { progress: MotionValue<number> }) {
  const coverRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const shown = useRef(-1);

  const paint = (p: number) => {
    const cover = coverRef.current;
    const canvas = canvasRef.current;
    if (!cover || !canvas) return;

    const f = Math.min(1, Math.max(0, p)) * (RIDE_FRAMES - 1);
    const edge = edgeAt(f);
    // The last frame has no banner left, so the cover must vanish entirely
    // rather than leave the margin as a sliver at the screen edge.
    const inset =
      f < 1 ? 0 : edge <= 0.001 ? 100 : Math.max(0, 1 - Math.min(1, edge + EDGE_MARGIN)) * 100;
    cover.style.clipPath = `inset(0 ${inset}% 0 0)`;

    // Nearest frame that has already arrived, so scrubbing never stalls.
    const want = Math.round(f);
    let idx = -1;
    for (let d = 0; d < RIDE_FRAMES; d++) {
      if (frames.current[want - d]?.complete) {
        idx = want - d;
        break;
      }
      if (frames.current[want + d]?.complete) {
        idx = want + d;
        break;
      }
    }
    if (idx < 0 || idx === shown.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    shown.current = idx;
    ctx.clearRect(0, 0, FRAME_W, FRAME_H);
    ctx.drawImage(frames.current[idx], 0, 0, FRAME_W, FRAME_H);
  };

  useEffect(() => {
    frames.current = Array.from({ length: RIDE_FRAMES }, (_, i) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        shown.current = -1;
        paint(progress.get());
      };
      img.src = rideSrc(i);
      return img;
    });
    paint(progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(progress, "change", paint);

  return (
    <div
      ref={coverRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 flex items-center overflow-hidden bg-[#2a0d45]"
    >
      {/* Polka-dot dupatta purple, from the moodboard's palette */}
      <div className="polka-purple absolute inset-0" />
      {/* Low sun behind the auto: gold disc, halftone-screened at its rim */}
      <div className="absolute top-1/2 left-[62%] aspect-square w-[min(70vh,44vw)] -translate-x-1/2 -translate-y-[66%] rounded-full bg-[radial-gradient(circle,#f4d896_0%,#e8c77e_46%,#e0813f_100%)] shadow-[0_0_120px_30px_rgba(240,138,75,0.35)]" />
      <div className="halftone absolute top-1/2 left-[62%] aspect-square w-[min(70vh,44vw)] -translate-x-1/2 -translate-y-[66%] rounded-full opacity-40" />
      <div className="relative w-full">
        <canvas
          ref={canvasRef}
          width={FRAME_W}
          height={FRAME_H}
          className="relative z-10 h-auto w-full drop-shadow-[0_18px_0_rgba(28,4,7,0.35)]"
        />
        {/* Road under the wheels (wheel bottoms sit at ~94% of the frame) */}
        <div className="absolute top-[93.5%] left-0 h-[max(2.2rem,4.5vw)] w-full bg-maroon-deepest">
          <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#e8c77e_0_36px,transparent_36px_72px)] opacity-70" />
        </div>
      </div>
    </div>
  );
}
