"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Countdown } from "@/components/home/Countdown";
import { RideCurtain } from "@/components/home/RideCurtain";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { MascotSequence, MascotStill } from "@/components/mascot/MascotSequence";
import { socials } from "@/data/contacts";
import { fest } from "@/data/content";
import { events } from "@/data/events";

/** Scroll lengths, in viewport heights. The ride and the mascot share one
 *  spring-smoothed timeline, so the auto's last frame hands straight over to
 *  the mascot's first step with no pause or jump between them. */
const RIDE_VH = 400;
const MASCOT_VH = 900;
const MOBILE_RIDE_VH = 300;

const SPRING = { stiffness: 90, damping: 26, mass: 0.6 };

function HeroCopy({ covered, centered }: { covered: boolean; centered?: boolean }) {
  return (
    <div
      // The curtain sits on top of this until the auto has cleared; keep the
      // links out of the tab order and the accessibility tree meanwhile.
      inert={covered}
      className={centered ? "flex flex-col items-center text-center" : ""}
    >
      <h1>
        <Image
          src="/brand/fitoor-wordmark.png"
          alt="Fitoor, फ़ितूर, فتور"
          width={1359}
          height={759}
          priority
          className="h-auto w-[clamp(13rem,42vw,26rem)]"
        />
      </h1>

      <p className="font-script mt-2 text-3xl text-gold sm:text-4xl">
        {fest.theme.toLowerCase()}
      </p>

      <p className="font-body mt-6 text-lg font-semibold text-cream">
        {fest.dates}
      </p>
      <p className="font-body text-cream/75">
        {fest.university}, {fest.region}
      </p>

      <div
        className={`mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 ${
          centered ? "items-center" : "items-start"
        }`}
      >
        <Link
          href="/events"
          className="font-body inline-flex min-h-12 items-center rounded-sm bg-gold px-6 font-bold text-maroon-deepest transition-colors hover:bg-gold-bright"
        >
          See all {events.length} events
        </Link>
        <a
          href={socials.instagram}
          target="_blank"
          rel="noreferrer"
          className="font-body inline-flex min-h-12 items-center gap-2 font-semibold text-cream underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
        >
          <InstagramIcon className="size-4" />
          Register via @{socials.instagramHandle}
        </a>
      </div>

      <div className="mt-10">
        <Countdown />
      </div>
    </div>
  );
}

/** Shared by both layouts: drives the ride from scroll and reports when the
 *  auto has cleared the page, so the copy underneath can be reached. */
function useRide(
  target: React.RefObject<HTMLDivElement | null>,
  rideShare: number,
) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  // Smooth wheel and trackpad jumps so the auto never snaps.
  const smooth = useSpring(scrollYProgress, SPRING);
  const rideP = useTransform(smooth, [0, rideShare], [0, 1], { clamp: true });
  const [covered, setCovered] = useState(true);
  useMotionValueEvent(rideP, "change", (v) => setCovered(v < 0.85));
  return { smooth, rideP, covered };
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.04], [1, 0], { clamp: true });
  return (
    <motion.p
      aria-hidden
      style={{ opacity }}
      className="font-body pointer-events-none absolute inset-x-0 bottom-6 z-30 flex flex-col items-center gap-2 text-sm font-medium text-maroon-deepest"
    >
      scroll
      <span className="block h-10 w-px bg-maroon-deepest/70" />
    </motion.p>
  );
}

function ScrollHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rideShare = RIDE_VH / (RIDE_VH + MASCOT_VH);
  const { smooth, rideP, covered } = useRide(wrapperRef, rideShare);

  // Mascot beats, on their own 0 to 1 clock that starts as the auto clears:
  // 0 to 0.4 walk in from the left, 0.4 to 0.5 sit down, 0.5 to 1 play.
  const mascotStart = rideShare * 0.94;
  const m = useTransform(smooth, [mascotStart, 1], [0, 1], { clamp: true });
  const frameProgress = useTransform(m, [0.5, 1], [0, 1], { clamp: true });
  const x = useTransform(m, [0, 0.4], ["-230%", "0%"], { clamp: true });
  // Footstep bob while walking, then a drop onto the floor when sitting.
  const y = useTransform(
    m,
    [0, 0.04, 0.08, 0.12, 0.16, 0.2, 0.24, 0.28, 0.32, 0.36, 0.4, 0.45, 0.5],
    [0, -14, 0, -14, 0, -14, 0, -14, 0, -14, -10, -24, 0],
    { clamp: true },
  );
  const rotate = useTransform(
    m,
    [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4],
    [0, -3, 3, -3, 3, -3, 3, -3, 0],
    { clamp: true },
  );
  const scaleY = useTransform(m, [0.4, 0.45, 0.5], [1, 1.04, 0.96], { clamp: true });

  return (
    <div
      ref={wrapperRef}
      className="relative hidden lg:block"
      style={{ height: `${RIDE_VH + MASCOT_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_1.15fr] items-center gap-6 px-6">
          <HeroCopy covered={covered} />
          <div className="relative mx-auto w-[min(100%,660px,74vh)]">
            <motion.div style={{ x, y, rotate, scaleY, transformOrigin: "50% 100%" }}>
              <MascotSequence progress={frameProgress} className="h-auto w-full" />
            </motion.div>
          </div>
        </div>
        <RideCurtain progress={rideP} />
        <ScrollHint progress={rideP} />
      </div>
    </div>
  );
}

function MobileHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { rideP, covered } = useRide(wrapperRef, 1);

  return (
    <div
      ref={wrapperRef}
      className="relative lg:hidden"
      style={{ height: `${MOBILE_RIDE_VH + 100}svh` }}
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden pt-16">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-2 px-4">
          <MascotStill className="h-[min(24svh,220px)] w-auto" />
          <HeroCopy covered={covered} centered />
        </div>
        <RideCurtain progress={rideP} />
        <ScrollHint progress={rideP} />
      </div>
    </div>
  );
}

function SettledHero() {
  return (
    <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
      <HeroCopy covered={false} />
      <MascotStill className="mx-auto h-auto w-[min(80%,520px)]" />
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  // `useReducedMotion` only knows the real answer once mounted client-side.
  // SSR and the first client render always assume motion is on, so the
  // reduced branch stays off until after mount to keep hydration identical.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  preload("/intro/ride/f-000.webp", { as: "image" });

  if (mounted && prefersReducedMotion) {
    return (
      <section>
        <SettledHero />
      </section>
    );
  }

  return (
    <section>
      <ScrollHero />
      <MobileHero />
    </section>
  );
}
