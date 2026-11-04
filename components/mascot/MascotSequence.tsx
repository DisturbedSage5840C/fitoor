"use client";

import { useEffect, useRef } from "react";
import { frameAt } from "@/lib/frame-clock";

export const FRAME_COUNT = 61;
export const FRAME_W = 560;
export const FRAME_H = 598;
/** Playback rate of the sitar clip; ping-pong keeps the strum seamless. */
const SITAR_FPS = 18;
export const frameSrc = (i: number) =>
  `/mascot-sequence/frame-${String(i + 1).padStart(3, "0")}.webp`;

/** Where the musician's body sits inside a frame, as fractions of its box.
 *  Used to centre him on the hero's disc rather than centring the canvas. */
export const SUBJECT_CENTRE = { x: 0.48, y: 0.465 };

interface MascotLoopProps {
  /** While false the musician holds the first frame (e.g. still walking in). */
  playing: boolean;
  className?: string;
}

/** Endless sitar loop: preloads the alpha-WebP frames and blits them to a
 *  canvas on a fixed clock, independent of scroll position. */
export function MascotLoop({ playing, className }: MascotLoopProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const shownRef = useRef(-1);

  const draw = (target: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    // While frames stream in, hold the nearest earlier frame that has loaded.
    let idx = target;
    while (idx > 0 && !framesRef.current[idx]?.complete) idx--;
    const img = framesRef.current[idx];
    if (!img?.complete || img.naturalWidth === 0 || idx === shownRef.current) return;
    shownRef.current = idx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    framesRef.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      if (i === 0) img.onload = () => draw(0);
      return img;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!playing) {
      draw(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      draw(frameAt(now - start, SITAR_FPS, FRAME_COUNT, "pingpong"));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return (
    <canvas
      ref={canvasRef}
      width={FRAME_W}
      height={FRAME_H}
      className={className}
      role="img"
      aria-label="Illustrated musician playing a sitar"
    />
  );
}

/** Still pose for reduced-motion. */
export function MascotStill({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={frameSrc(30)}
      width={FRAME_W}
      height={FRAME_H}
      alt="Illustrated musician playing a sitar"
      className={className}
    />
  );
}
