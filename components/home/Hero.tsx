"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
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
  const x = useTransform(smooth, [0, 0.4], ["-260%", "0%"], { clamp: true });
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
    <div ref={wrapperRef} className="relative hidden h-[600vh] lg:block">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          className="halftone-light absolute inset-0 -z-10 opacity-60"
          aria-hidden
        />
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[1.15fr_1fr] items-center gap-6 px-6">
          <HeroCopy />
          <motion.div style={{ x, y, rotate, scaleY, transformOrigin: "50% 100%" }}>
            <MascotSequence
              progress={frameProgress}
              className="mx-auto h-auto w-[min(100%,460px)] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
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
