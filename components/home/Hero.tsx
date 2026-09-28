"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  useScroll,
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
    <div className="relative">
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

  // Copy is visible immediately; scrolling scrubs the sitar clip, which
  // finishes at 85% so the last stretch of pin holds the settled pose.
  const frameProgress = useTransform(scrollYProgress, [0, 0.85], [0, 1], {
    clamp: true,
  });

  return (
    <div ref={wrapperRef} className="relative hidden h-[220vh] lg:block">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          className="halftone-light absolute inset-0 -z-10 opacity-60"
          aria-hidden
        />
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[1.15fr_1fr] items-center gap-6 px-6">
          <HeroCopy />
          <MascotSequence
            progress={frameProgress}
            className="mx-auto h-auto w-[min(100%,460px)] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          />
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
