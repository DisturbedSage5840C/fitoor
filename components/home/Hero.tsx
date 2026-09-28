"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Countdown } from "@/components/home/Countdown";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { MascotSequence, MascotStill } from "@/components/mascot/MascotSequence";
import { socials } from "@/data/contacts";
import { fest } from "@/data/content";
import { events } from "@/data/events";

function HeroCopy() {
  return (
    <div className="relative z-10">
      <p className="font-body text-xs font-semibold tracking-[0.25em] text-gold/80 uppercase">
        {fest.university} presents · {fest.edition} edition
      </p>

      <h1 className="mt-4">
        <Image
          src="/brand/fitoor-wordmark.png"
          alt="fitoor — फ़ितूर / فتور"
          width={1359}
          height={759}
          priority
          className="h-auto w-[clamp(15rem,45vw,28rem)]"
        />
      </h1>

      <p className="font-body mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold tracking-[0.18em] text-cream uppercase sm:text-base">
        <span>{fest.dates}</span>
        <span className="text-rose" aria-hidden>
          ✦
        </span>
        <span>{fest.university}</span>
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/events"
          className="font-body group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-maroon-deepest transition-colors hover:bg-gold-bright"
        >
          Explore the {events.length} events
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <a
          href={socials.instagram}
          target="_blank"
          rel="noreferrer"
          className="font-body inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
        >
          <InstagramIcon className="size-4" />
          Register via @fitoor.plaksha
        </a>
      </div>

      <div className="mt-10">
        <p className="font-body mb-2 text-[11px] font-semibold tracking-[0.25em] text-cream/50 uppercase">
          Gates open in
        </p>
        <Countdown />
      </div>
    </div>
  );
}


/** Scroll-linked decoration: fades in/out over `fade` and moves from `from` to `to`
 *  across `span`, both in scroll-progress units (0–1). */
function Ride({
  progress,
  span,
  fade,
  from,
  to,
  className,
  children,
}: {
  progress: MotionValue<number>;
  span: [number, number];
  fade: [number, number, number, number];
  from: [number | string, number];
  to: [number | string, number];
  className?: string;
  children: ReactNode;
}) {
  const x = useTransform(progress, span, [from[0], to[0]], { clamp: true });
  const y = useTransform(progress, span, [from[1], to[1]], { clamp: true });
  const opacity = useTransform(progress, fade, [0, 1, 1, 0], { clamp: true });
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute select-none ${className ?? ""}`}
      style={{ x, y, opacity }}
    >
      {children}
    </motion.span>
  );
}

const TRAIL = [
  { top: "18%", size: "text-3xl", from: "-380%", to: "-70%", delay: 0 },
  { top: "34%", size: "text-xl", from: "-340%", to: "-110%", delay: 0.02 },
  { top: "52%", size: "text-4xl", from: "-400%", to: "-60%", delay: 0.04 },
  { top: "68%", size: "text-2xl", from: "-360%", to: "-100%", delay: 0.06 },
  { top: "82%", size: "text-xl", from: "-320%", to: "-80%", delay: 0.08 },
];
const NOTES = [
  { glyph: "♪", left: "62%", start: 0.5, dx: 60, size: "text-5xl" },
  { glyph: "♫", left: "70%", start: 0.58, dx: -40, size: "text-6xl" },
  { glyph: "♩", left: "56%", start: 0.66, dx: 80, size: "text-5xl" },
  { glyph: "♬", left: "74%", start: 0.74, dx: -70, size: "text-6xl" },
  { glyph: "♪", left: "60%", start: 0.82, dx: 50, size: "text-5xl" },
  { glyph: "♫", left: "68%", start: 0.9, dx: -50, size: "text-6xl" },
];

function StageFx({ progress }: { progress: MotionValue<number> }) {
  const haloOpacity = useTransform(progress, [0.3, 0.5], [0, 1], { clamp: true });
  const haloScale = useTransform(progress, [0.3, 0.5, 1], [0.4, 1, 1.12], { clamp: true });
  const ringRotate = useTransform(progress, [0, 1], [0, 540]);
  const shadowOpacity = useTransform(progress, [0.4, 0.5], [0, 0.6], { clamp: true });
  const floorScale = useTransform(progress, [0.3, 0.5], [0, 1], { clamp: true });
  return (
    <>
      <motion.div
        aria-hidden
        className="absolute inset-[-12%] -z-10"
        style={{ opacity: haloOpacity, scale: haloScale }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(245,185,60,0.55)_0%,rgba(200,60,60,0.25)_45%,transparent_70%)] blur-2xl" />
        <motion.div
          className="absolute inset-[8%] rounded-full border-2 border-dashed border-gold/50"
          style={{ rotate: ringRotate }}
        />
        <motion.div
          className="absolute inset-[18%] rounded-full border border-gold/30"
          style={{ rotate: useTransform(ringRotate, (v) => -v * 0.6) }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute bottom-[2%] left-[8%] -z-10 h-6 w-[84%] rounded-[50%] bg-black blur-xl"
        style={{ opacity: shadowOpacity, scaleX: floorScale }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-[-10%] -z-10 h-px w-[120%] bg-gradient-to-r from-transparent via-gold to-transparent"
        style={{ opacity: floorScale, scaleX: floorScale }}
      />
      {TRAIL.map((t, i) => (
        <Ride
          key={i}
          progress={progress}
          span={[t.delay, 0.4 + t.delay]}
          fade={[t.delay, t.delay + 0.05, 0.4, 0.48]}
          from={[t.from, 0]}
          to={[t.to, i % 2 ? 24 : -24]}
          className={`text-gold ${t.size}`}
        >
          <span style={{ top: t.top }} className="absolute left-1/2">
            ✦
          </span>
        </Ride>
      ))}
      {NOTES.map((n, i) => (
        <Ride
          key={i}
          progress={progress}
          span={[n.start, n.start + 0.16]}
          fade={[n.start, n.start + 0.03, n.start + 0.12, n.start + 0.16]}
          from={[0, 0]}
          to={[n.dx, -280]}
          className={`top-[22%] text-gold-bright drop-shadow-[0_0_14px_rgba(245,185,60,0.8)] ${n.size}`}
        >
          <span style={{ left: n.left }} className="absolute">
            {n.glyph}
          </span>
        </Ride>
      ))}
    </>
  );
}

function ScrollMascotHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Smooth out wheel/trackpad jumps so the motion never snaps.
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.6 });

  // Beats: 0–0.4 walk in from the left · 0.4–0.5 sit down · 0.5–1 play.
  const frameProgress = useTransform(smooth, [0.5, 1], [0, 1], { clamp: true });
  const x = useTransform(smooth, [0, 0.4], ["-230%", "0%"], { clamp: true });
  // Footstep bob while walking, then a drop onto the floor when sitting.
  const y = useTransform(
    smooth,
    [0, 0.04, 0.08, 0.12, 0.16, 0.2, 0.24, 0.28, 0.32, 0.36, 0.4, 0.45, 0.5],
    [0, -14, 0, -14, 0, -14, 0, -14, 0, -14, -10, -24, 0],
    { clamp: true },
  );
  const rotate = useTransform(
    smooth,
    [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4],
    [0, -3, 3, -3, 3, -3, 3, -3, 0],
    { clamp: true },
  );
  const scaleY = useTransform(smooth, [0.4, 0.45, 0.5], [1, 1.04, 0.96], { clamp: true });

  return (
    <div ref={wrapperRef} className="relative hidden h-[900vh] lg:block">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          className="halftone-light absolute inset-0 -z-10 opacity-60"
          aria-hidden
        />
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_1.15fr] items-center gap-6 px-6">
          <HeroCopy />
          <div className="relative mx-auto w-[min(100%,660px,74vh)]">
            <StageFx progress={smooth} />
            <motion.div style={{ x, y, rotate, scaleY, transformOrigin: "50% 100%" }}>
              <MascotSequence
                progress={frameProgress}
                className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettledMascotHero({ onlyOnMobile }: { onlyOnMobile: boolean }) {
  return (
    <div className={onlyOnMobile ? "relative lg:hidden" : "relative"}>
      <div
        className="halftone-light absolute inset-0 -z-10 opacity-60"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-maroon-deepest/40 via-maroon-deepest/70 to-maroon-deepest" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pt-12 pb-16 sm:px-6 sm:pt-16">
        <MascotStill className="h-auto w-[min(80%,340px)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" />
        <HeroCopy />
      </div>
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  // `useReducedMotion` only knows the real answer once mounted client-side —
  // SSR and the first client render always assume motion is on, so this
  // branch stays off until after mount to keep hydration markup identical.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (mounted && prefersReducedMotion) {
    return (
      <section className="relative isolate">
        <SettledMascotHero onlyOnMobile={false} />
      </section>
    );
  }

  return (
    <section className="relative isolate">
      <ScrollMascotHero />
      <SettledMascotHero onlyOnMobile />
    </section>
  );
}
