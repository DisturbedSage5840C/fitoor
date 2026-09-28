"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";

export const FRAME_COUNT = 61;
export const FRAME_W = 560;
export const FRAME_H = 598;
const frameSrc = (i: number) =>
  `/mascot-sequence/frame-${String(i + 1).padStart(3, "0")}.webp`;

interface MascotSequenceProps {
  /** 0 → 1 scrubs through every frame of the transparent sitar clip. */
  progress: MotionValue<number>;
  className?: string;
}

/** Scroll-scrubbed frame player: preloads the alpha-WebP frames and blits
 *  the one matching `progress` to a canvas (no <video>, so seeking is exact
 *  and transparency works in every browser). */
export function MascotSequence({ progress, className }: MascotSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>([]);
  const current = useRef(-1);

  const draw = (p: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const target = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));
    // Fall back to the nearest already-loaded frame while others stream in.
    let idx = target;
    for (let d = 0; d < FRAME_COUNT && !frames.current[idx]?.complete; d++) {
      idx = target - d >= 0 && frames.current[target - d]?.complete ? target - d : target + d;
    }
    const img = frames.current[idx];
    if (!img?.complete || idx === current.current) return;
    current.current = idx;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    frames.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      img.onload = () => {
        current.current = -1;
        draw(progress.get());
      };
      return img;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(progress, "change", draw);

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

/** Still pose for mobile and reduced-motion. */
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
