"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import { frameAt, scrubFrame } from "@/lib/frame-clock";

export const FRAME_W = 560;
export const FRAME_H = 598;
/** Walk in, kneel, lift the sitar. Scrubbed by scroll on desktop, played
 *  once on a timer on mobile. Frame 1 is empty: he enters from the left. */
export const INTRO_COUNT = 78;
/** Seamless forward loop of him playing. Its first frame picks up exactly
 *  where the intro's last frame leaves off. */
export const LOOP_COUNT = 36;
/** Both strips were cut from the clip at this rate. */
const SITAR_FPS = 12;

type Strip = "intro" | "frame";
const stripSrc = (strip: Strip, i: number) =>
  `/mascot-sequence/${strip}-${String(i + 1).padStart(3, "0")}.webp`;

/** Where the seated musician sits inside a frame, as fractions of its box.
 *  Used to centre him on the hero's disc rather than centring the canvas. */
export const SUBJECT_CENTRE = { x: 0.5, y: 0.535 };

const LABEL = "Musician walking in, kneeling and playing a sitar";

function preload(strip: Strip, count: number, onSettled: () => void) {
  return Array.from({ length: count }, (_, i) => {
    const img = new Image();
    img.decoding = "async";
    // A failed frame still counts as settled; `draw` skips broken images.
    img.onload = img.onerror = onSettled;
    img.src = stripSrc(strip, i);
    return img;
  });
}

interface MascotSequenceProps {
  /** False freezes him on the current frame, e.g. under the matchbox loader. */
  playing: boolean;
  /** 0..1 scroll clock that scrubs the walk-in. Without it the walk-in plays
   *  once on a timer as soon as `playing` turns on. */
  scrub?: MotionValue<number>;
  className?: string;
}

/** The hero musician: the walk-in strip, then the playing loop forever,
 *  blitted to one canvas so the hand-off between the two never flickers. */
export function MascotSequence({ playing, scrub, className }: MascotSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stripsRef = useRef<Record<Strip, HTMLImageElement[]>>({ intro: [], frame: [] });
  const targetRef = useRef<{ strip: Strip; idx: number }>({ strip: "intro", idx: 0 });
  const shownRef = useRef("");
  const [introReady, setIntroReady] = useState(false);
  // One-way: once he has sat down and picked up the sitar, he keeps playing.
  const [seated, setSeated] = useState(false);

  /** Draws the target frame, or while it streams in the nearest earlier
   *  frame of the same strip that has loaded. */
  const draw = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { strip, idx: target } = targetRef.current;
    const frames = stripsRef.current[strip];
    let idx = target;
    while (idx > 0 && !frames[idx]?.complete) idx--;
    const img = frames[idx];
    if (!img?.complete || img.naturalWidth === 0) return;
    const key = `${strip}-${idx}`;
    if (key === shownRef.current) return;
    shownRef.current = key;
    ctx.clearRect(0, 0, FRAME_W, FRAME_H);
    ctx.drawImage(img, 0, 0, FRAME_W, FRAME_H);
  };

  const show = (strip: Strip, idx: number) => {
    targetRef.current = { strip, idx };
    draw();
  };

  useEffect(() => {
    let settled = 0;
    stripsRef.current = {
      intro: preload("intro", INTRO_COUNT, () => {
        settled += 1;
        if (settled === INTRO_COUNT) setIntroReady(true);
        draw();
      }),
      frame: preload("frame", LOOP_COUNT, draw),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Desktop: the scroll clock picks the intro frame; its last frame seats him.
  useEffect(() => {
    if (!scrub || seated) return;
    const onScroll = (v: number) => {
      const idx = scrubFrame(v, INTRO_COUNT);
      show("intro", idx);
      if (idx === INTRO_COUNT - 1) setSeated(true);
    };
    onScroll(scrub.get());
    return scrub.on("change", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrub, seated]);

  // Mobile: once every intro frame is in, play the walk-in once on a timer.
  useEffect(() => {
    if (scrub || seated || !playing || !introReady) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const idx = frameAt(now - start, SITAR_FPS, INTRO_COUNT, "once");
      show("intro", idx);
      if (idx === INTRO_COUNT - 1) setSeated(true);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrub, seated, playing, introReady]);

  // Seated: loop the playing strip for as long as he is on screen to play.
  useEffect(() => {
    if (!seated || !playing) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      show("frame", frameAt(now - start, SITAR_FPS, LOOP_COUNT, "loop"));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seated, playing]);

  return (
    <canvas
      ref={canvasRef}
      width={FRAME_W}
      height={FRAME_H}
      className={className}
      role="img"
      aria-label={LABEL}
    />
  );
}

/** Still pose for reduced motion: mid-strum. */
export function MascotStill({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={stripSrc("frame", LOOP_COUNT / 2)}
      width={FRAME_W}
      height={FRAME_H}
      alt="Musician playing a sitar"
      className={className}
    />
  );
}
