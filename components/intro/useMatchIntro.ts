"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BURN_DURATION_MS,
  type IntroStage,
  burnHolePath,
  burnRadius,
  coverClipPath,
  maxBurnRadius,
} from "@/lib/intro-burn";
import { type Point, isTouching, strikeTravel, STRIKE_TRAVEL_PX, wickPoint } from "@/lib/intro-drag";
import { TEELI_LENGTH } from "@/components/intro/IntroArt";

export type MatchPhase = IntroStage | "leaving" | "done";

/** Slow, cardboard-on-cardboard slide of the drawer. */
export const DRAWER_MS = 1600;
/** Unhurried rise of the teeli out of the drawer, and keyboard moves. */
export const TRAVEL_MS = 1000;
/** Fade-out when the visitor skips. */
export const LEAVE_MS = 400;
/** How long the strike spark flashes. */
const SPARK_MS = 600;
/** Beat between the drawer stopping and the stick leaving it. */
const LIFT_DELAY_MS = 120;
/** Longest clock step per frame, so a backgrounded tab resumes the burn. */
const MAX_STEP_MS = 100;
/** Resting tilt of the held match. */
const HELD_TILT_DEG = -30;
/** Where the top stick's head sits across the drawer art (256 of 280). */
const STICK_HEAD_X = 256 / 280;

/** Set once the intro has started in this page load, so a client-side return
 *  to the landing page does not replay it. */
let introStarted = false;
export const hasIntroStarted = (): boolean => introStarted;

export interface TeeliPose {
  x: number;
  y: number;
  rotate: number;
}

interface Gesture {
  id: number;
  offset: Point;
  last: Point;
  travel: number;
}

export interface MatchIntro {
  phase: MatchPhase;
  lit: boolean;
  teeli: TeeliPose | null;
  dragging: boolean;
  wick: Point | null;
  spark: Point | null;
  coverRef: React.RefObject<HTMLDivElement | null>;
  drawerRef: React.RefObject<HTMLDivElement | null>;
  strikerRef: React.RefObject<HTMLDivElement | null>;
  envelopeRef: React.RefObject<HTMLDivElement | null>;
  emberRefs: React.RefObject<(SVGPathElement | null)[]>;
  openBox: () => void;
  teeliHandlers: {
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => void;
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => void;
    onPointerUp: (e: React.PointerEvent<HTMLElement>) => void;
    onPointerCancel: (e: React.PointerEvent<HTMLElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  };
  skip: () => void;
}

/** Transform that puts the teeli's head (its right end) at `pose`. */
export const teeliTransform = (pose: TeeliPose, pad: number): string =>
  `translate(${pose.x - TEELI_LENGTH - pad}px, ${pose.y - 5 - pad}px) rotate(${pose.rotate}deg)`;

/** The top stick, lying in the open drawer. */
const restingPose = (drawer: DOMRect): TeeliPose => ({
  x: drawer.left + drawer.width * STICK_HEAD_X,
  y: drawer.top + drawer.height * 0.13,
  rotate: 0,
});

/** Held up above the drawer, ready to be dragged. */
const liftedPose = (drawer: DOMRect): TeeliPose => ({
  x: drawer.right + 10,
  y: drawer.top - drawer.height * 0.55,
  rotate: HELD_TILT_DEG,
});

const centreOf = (r: DOMRect): Point => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });

export function useMatchIntro(): MatchIntro {
  const [phase, setPhase] = useState<MatchPhase>("open");
  const [lit, setLit] = useState(false);
  const [teeli, setTeeli] = useState<TeeliPose | null>(null);
  const [dragging, setDragging] = useState(false);
  const [wick, setWick] = useState<Point | null>(null);
  const [spark, setSpark] = useState<Point | null>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const strikerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const emberRefs = useRef<(SVGPathElement | null)[]>([]);
  const origin = useRef<Point | null>(null);
  const gesture = useRef<Gesture | null>(null);
  const keyTimer = useRef(0);

  useEffect(() => {
    introStarted = true;
    return () => window.clearTimeout(keyTimer.current);
  }, []);

  const openBox = useCallback(() => {
    setPhase((current) => (current === "open" ? "strike" : current));
  }, []);

  // Strike: once the drawer has slid out, the top stick rises out of it.
  useEffect(() => {
    if (phase !== "strike") return;
    let liftTimer = 0;
    const showTimer = window.setTimeout(() => {
      const drawer = drawerRef.current?.getBoundingClientRect();
      if (!drawer) return;
      setTeeli(restingPose(drawer));
      liftTimer = window.setTimeout(() => setTeeli(liftedPose(drawer)), LIFT_DELAY_MS);
    }, DRAWER_MS);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(liftTimer);
    };
  }, [phase]);

  const ignite = useCallback((at: Point) => {
    const env = envelopeRef.current?.getBoundingClientRect();
    if (env) setWick(wickPoint(env));
    setLit(true);
    setSpark(at);
    setPhase("light");
  }, []);

  const catchFire = useCallback((at: Point) => {
    gesture.current = null;
    origin.current = at;
    setDragging(false);
    setTeeli({ ...at, rotate: -18 });
    setPhase("burning");
  }, []);

  useEffect(() => {
    if (!spark) return;
    const timer = window.setTimeout(() => setSpark(null), SPARK_MS);
    return () => window.clearTimeout(timer);
  }, [spark]);

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (!teeli || (phase !== "strike" && phase !== "light")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const head = { x: teeli.x, y: teeli.y };
    gesture.current = {
      id: e.pointerId,
      offset: { x: head.x - e.clientX, y: head.y - e.clientY },
      last: head,
      travel: 0,
    };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    const head = { x: e.clientX + g.offset.x, y: e.clientY + g.offset.y };
    setTeeli({ ...head, rotate: HELD_TILT_DEG });

    if (phase === "light") {
      if (wick && isTouching(head, wick)) catchFire(wick);
      else gesture.current = { ...g, last: head };
      return;
    }
    const striker = strikerRef.current?.getBoundingClientRect();
    const travel = striker ? strikeTravel(g.travel, g.last, head, striker) : 0;
    const struck = travel >= STRIKE_TRAVEL_PX;
    // Reset after a strike so the moves queued before React re-renders
    // (still seeing phase "strike") cannot strike it twice.
    gesture.current = { ...g, last: head, travel: struck ? 0 : travel };
    if (struck) ignite(head);
  };

  const endDrag = (e: React.PointerEvent<HTMLElement>) => {
    if (gesture.current?.id !== e.pointerId) return;
    gesture.current = null;
    setDragging(false);
  };

  // Keyboard fallback: Enter or Space glides the match to the next spot.
  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    const striker = strikerRef.current?.getBoundingClientRect();
    if (phase === "strike" && striker) {
      const at = centreOf(striker);
      setTeeli({ ...at, rotate: HELD_TILT_DEG });
      window.clearTimeout(keyTimer.current);
      keyTimer.current = window.setTimeout(() => ignite(at), TRAVEL_MS);
    } else if (phase === "light" && wick) {
      setTeeli({ ...wick, rotate: -18 });
      window.clearTimeout(keyTimer.current);
      keyTimer.current = window.setTimeout(() => catchFire(wick), TRAVEL_MS);
    }
  };

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
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") skip();
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEsc);
    };
  }, [active, skip]);

  return {
    phase,
    lit,
    teeli,
    dragging,
    wick,
    spark,
    coverRef,
    drawerRef,
    strikerRef,
    envelopeRef,
    emberRefs,
    openBox,
    teeliHandlers: { onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerCancel: endDrag, onKeyDown },
    skip,
  };
}
