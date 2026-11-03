"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BURN_DURATION_MS,
  type IntroStage,
  burnHolePath,
  burnRadius,
  coverClipPath,
  maxBurnRadius,
  nextStep,
} from "@/lib/intro-burn";
import { TEELI_LENGTH } from "@/components/intro/IntroArt";

export type MatchPhase = IntroStage | "leaving" | "done";

/** A visitor who just watches still gets in: each step plays itself after this. */
const IDLE_ADVANCE_MS = 3500;
/** Drawer slide-out time before the teeli pops up out of it. */
const DRAWER_MS = 720;
/** Flash of the freshly struck match before it travels to the invite. */
const IGNITE_HOLD_MS = 450;
/** The lit match's trip from the box to the envelope's edge. */
export const TRAVEL_MS = 900;
/** Fade-out when the visitor skips. */
export const LEAVE_MS = 400;
/** Longest clock step per frame, so a backgrounded tab resumes the burn. */
const MAX_STEP_MS = 100;

/** Set once the intro has started in this page load, so a client-side return
 *  to the landing page does not replay it. */
let introStarted = false;
export const hasIntroStarted = (): boolean => introStarted;

export interface TeeliPose {
  x: number;
  y: number;
  rotate: number;
}

export interface MatchIntro {
  phase: MatchPhase;
  lit: boolean;
  teeli: TeeliPose | null;
  coverRef: React.RefObject<HTMLDivElement | null>;
  drawerRef: React.RefObject<HTMLDivElement | null>;
  envelopeRef: React.RefObject<HTMLDivElement | null>;
  emberRefs: React.RefObject<(SVGPathElement | null)[]>;
  advanceFrom: (stage: IntroStage) => void;
  skip: () => void;
}

/** Transform that puts the teeli's head (its right end) at `pose`. */
export const teeliTransform = (pose: TeeliPose): string =>
  `translate(${pose.x - TEELI_LENGTH}px, ${pose.y - 5}px) rotate(${pose.rotate}deg)`;

/** Where the teeli stands once lifted out of the open drawer. */
const liftedPose = (drawer: DOMRect): TeeliPose => ({
  x: drawer.right + 18,
  y: drawer.top - 6,
  rotate: -32,
});

export function useMatchIntro(): MatchIntro {
  const [phase, setPhase] = useState<MatchPhase>("open");
  const [lit, setLit] = useState(false);
  const [teeli, setTeeli] = useState<TeeliPose | null>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const emberRefs = useRef<(SVGPathElement | null)[]>([]);
  const origin = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    introStarted = true;
  }, []);

  /** Moves on only if still on `stage`, so a tap and a timer never double-step. */
  const advanceFrom = useCallback((stage: IntroStage) => {
    setPhase((current) => (current === stage ? nextStep(stage) : current));
  }, []);

  // Open and strike wait for the visitor, but not forever.
  useEffect(() => {
    if (phase !== "open" && phase !== "strike") return;
    const timer = window.setTimeout(() => advanceFrom(phase), IDLE_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [phase, advanceFrom]);

  // Strike: once the drawer is out, a teeli rises from its far end.
  useEffect(() => {
    if (phase !== "strike") return;
    const timer = window.setTimeout(() => {
      const drawer = drawerRef.current?.getBoundingClientRect();
      if (drawer) setTeeli(liftedPose(drawer));
    }, DRAWER_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // Light: the match catches, then carries its flame to the envelope's edge.
  useEffect(() => {
    if (phase !== "light") return;
    const drawer = drawerRef.current?.getBoundingClientRect();
    if (drawer) setTeeli((pose) => pose ?? liftedPose(drawer));
    setLit(true);
    const travelTimer = window.setTimeout(() => {
      const env = envelopeRef.current?.getBoundingClientRect();
      if (!env) return;
      const target = { x: env.left + env.width * 0.04, y: env.top + env.height * 0.66 };
      origin.current = target;
      setTeeli({ ...target, rotate: -18 });
    }, IGNITE_HOLD_MS);
    const burnTimer = window.setTimeout(() => advanceFrom("light"), IGNITE_HOLD_MS + TRAVEL_MS);
    return () => {
      window.clearTimeout(travelTimer);
      window.clearTimeout(burnTimer);
    };
  }, [phase, advanceFrom]);

  // Burning: a ragged hole eats the cover outward from where the flame touched.
  useEffect(() => {
    if (phase !== "burning") return;
    const { innerWidth: w, innerHeight: h } = window;
    const { x, y } = origin.current ?? { x: w * 0.1, y: h * 0.4 };
    const maxR = maxBurnRadius(w, h, x, y);
    let raf = 0;
    let last = performance.now();
    let elapsed = 0;

    const tick = (now: number) => {
      elapsed += Math.min(now - last, MAX_STEP_MS);
      last = now;
      const hole = burnHolePath(x, y, burnRadius(elapsed, maxR), now);
      if (coverRef.current) coverRef.current.style.clipPath = coverClipPath(w, h, hole);
      emberRefs.current.forEach((path) => path?.setAttribute("d", hole));
      if (elapsed >= BURN_DURATION_MS) {
        setPhase("done");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // A skipped intro fades out before it is removed.
  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = window.setTimeout(() => setPhase("done"), LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const skip = useCallback(() => {
    setPhase((current) => (current === "done" ? current : "leaving"));
  }, []);

  // While the intro is up the page stays put and Esc skips it.
  const active = phase !== "done";
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, skip]);

  return { phase, lit, teeli, coverRef, drawerRef, envelopeRef, emberRefs, advanceFrom, skip };
}
