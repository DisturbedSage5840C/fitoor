"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Countdown } from "@/components/home/Countdown";
import { MatchIntro } from "@/components/intro/MatchIntro";
import { hasIntroStarted } from "@/components/intro/useMatchIntro";
import { MascotSequence, MascotStill } from "@/components/mascot/MascotSequence";
import { registerUrl } from "@/data/contacts";
import { fest } from "@/data/content";
import { events } from "@/data/events";

/** Scroll length of the desktop mascot sequence, in viewport heights. */
const MASCOT_VH = 900;

const SPRING = { stiffness: 90, damping: 26, mass: 0.6 };

/** Poster backdrop behind the hero copy and mascot: plum glow, polka dots and
 *  slow-turning mandala rings, so the settled hero carries the auto's palette. */
function HeroStage({ mobile }: { mobile?: boolean }) {
  // The outer dotted ring is drawn at 1.2x, so size the base circle to leave
  // room for that scale-up. On desktop the fixed nav covers the top 4rem, so
  // the ring is fitted to the space below it and centred there.
  const ringBox = mobile
    ? "left-1/2 top-[30%] size-[68vw] max-w-[340px]"
    : "left-[72%] top-[calc(50%+2rem)]";
  const ringSize = mobile
    ? undefined
    : { width: "min(calc((100vh - 7rem) / 1.2), 38vw)", height: "min(calc((100vh - 7rem) / 1.2), 38vw)" };
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="polka-purple absolute inset-0 opacity-60" />
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#4a1a6b_0%,#2a0d45_58%,transparent_72%)] ${ringBox}`}
        style={ringSize}
      />
      <div
        className={`animate-spin-slow absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-dashed border-gold/60 ${ringBox}`}
        style={{ ...ringSize, scale: 1.08 }}
      />
      <div
        className={`animate-spin-slow absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-dotted border-rose/60 [animation-direction:reverse] ${ringBox}`}
        style={{ ...ringSize, scale: 1.2 }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-maroon-deepest to-transparent" />
    </div>
  );
}

function HeroCopy({ covered, centered }: { covered: boolean; centered?: boolean }) {
  return (
    <div
      // The matchbox loader sits on top of this until the invite has burned
      // away; keep the links out of the tab order and the accessibility tree.
      inert={covered}
      className={centered ? "flex flex-col items-center text-center" : ""}
    >
      <h1>
        <Image quality={90}
          src="/brand/fitoor-wordmark.png"
          alt="Fitoor, फ़ितूर, فتور"
          width={1359}
          height={759}
          priority
          className="h-auto w-[clamp(13rem,42vw,26rem)]"
        />
      </h1>

      <p className="font-script mt-2 text-3xl text-gold [text-shadow:0_0_14px_rgba(232,199,126,0.55),0_0_34px_rgba(255,99,80,0.35)] sm:text-4xl">
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
        <a
          href={registerUrl}
          target="_blank"
          rel="noreferrer"
          className="font-body inline-flex min-h-12 items-center rounded-sm bg-gold px-6 font-bold text-maroon-deepest shadow-[4px_4px_0_var(--rose)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[6px_6px_0_var(--rose)]"
        >
          Register now
          <span className="sr-only"> (opens Unstop in a new tab)</span>
        </a>
        <Link
          href="/events"
          className="font-body inline-flex min-h-12 items-center font-semibold text-cream underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
        >
          See all {events.length} events
        </Link>
      </div>

      <div className="mt-10">
        <Countdown />
      </div>
    </div>
  );
}

/** Spring-smoothed scroll progress through the desktop hero. */
function useMascotScroll(target: React.RefObject<HTMLDivElement | null>) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  // Smooth wheel and trackpad jumps so the mascot never snaps.
  return useSpring(scrollYProgress, SPRING);
}

function ScrollHero({ covered }: { covered: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Mascot beats on a 0 to 1 scroll clock:
  // 0 to 0.4 walk in from the left, 0.4 to 0.5 sit down, 0.5 to 1 play.
  const m = useMascotScroll(wrapperRef);
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
      style={{ height: `${MASCOT_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <HeroStage />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-[1fr_1.15fr] items-center gap-6 px-6">
          <HeroCopy covered={covered} />
          <div className="relative mx-auto w-[min(100%,660px,74vh)]">
            <motion.div style={{ x, y, rotate, scaleY, transformOrigin: "50% 100%" }}>
              <MascotSequence progress={frameProgress} className="h-auto w-full" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileHero({ covered }: { covered: boolean }) {
  return (
    <div className="relative lg:hidden">
      <div className="relative flex min-h-svh items-center overflow-hidden pt-16">
        <HeroStage mobile />
        <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center gap-2 px-4">
          <MascotStill className="h-[min(24svh,220px)] w-auto" />
          <HeroCopy covered={covered} centered />
        </div>
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

  // The loader plays once per page load; a client-side return skips it.
  // SSR and the first client render agree on `true`, so hydration matches.
  const [introActive, setIntroActive] = useState(() => !hasIntroStarted());
  const endIntro = useCallback(() => setIntroActive(false), []);

  if (mounted && prefersReducedMotion) {
    return (
      <section>
        <SettledHero />
      </section>
    );
  }

  // `inert` is applied only after mount so no-JS visitors can still reach the links.
  const covered = mounted && introActive;

  return (
    <section>
      {introActive && <MatchIntro onDone={endIntro} />}
      <ScrollHero covered={covered} />
      <MobileHero covered={covered} />
    </section>
  );
}
