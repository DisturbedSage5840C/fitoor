"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { Countdown } from "@/components/home/Countdown";
import { MatchIntro } from "@/components/intro/MatchIntro";
import { hasIntroStarted } from "@/components/intro/useMatchIntro";
import { MascotSequence, MascotStill, SUBJECT_CENTRE } from "@/components/mascot/MascotSequence";
import { RegisterLink, RegistrationNote } from "@/components/shared/RegisterCta";
import { fest } from "@/data/content";
import { events } from "@/data/events";

/** Scroll length of the desktop walk-in, in viewport heights. The pin only
 *  outlasts the screen by 60vh, so one flick seats the musician and the page
 *  then scrolls normally. */
const MASCOT_VH = 160;

/** Progress past which the rest of the sit-down plays on its own. */
const SEATED_AT = 0.92;

/** Soft and slightly heavy so wheel notches glide through the footage
 *  instead of stepping through it. */
const SPRING = { stiffness: 90, damping: 24, mass: 0.5 };
/** How the latched clock eases the last of the sit-down once he is held. */
const SETTLE = { duration: 0.35, ease: "easeOut" } as const;

/** Base disc diameters. The outer dotted ring is drawn at 1.2x, so the disc
 *  leaves room for that; on desktop it is fitted below the 5rem nav. */
const DESKTOP_DISC = "min(calc((100vh - 8rem) / 1.2), 38vw)";
const MOBILE_DISC = "min(64vw, 280px, 34svh)";
/** The musician is drawn a touch wider than the disc so he fills it. */
const MASCOT_TO_DISC = 1.08;

/** Plum disc with the two slow-turning mandala rings, centred on its box. */
function Disc({ size }: { size: string }) {
  const box = { width: size, height: size };
  const ring = "animate-spin-slow absolute inset-0 rounded-full";
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={box}>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#4a1a6b_0%,#2a0d45_58%,transparent_72%)]" />
      <div className={`${ring} border-[3px] border-dashed border-gold/60`} style={{ scale: 1.08 }} />
      <div className={`${ring} border-4 border-dotted border-rose/60 [animation-direction:reverse]`} style={{ scale: 1.2 }} />
    </div>
  );
}

/** Box sized from the disc whose centre is the musician's body, not the
 *  canvas centre, so he sits squarely on the disc. */
function mascotBox(disc: string) {
  return {
    width: `calc(${disc} * ${MASCOT_TO_DISC})`,
    transform: `translate(-${SUBJECT_CENTRE.x * 100}%, -${SUBJECT_CENTRE.y * 100}%)`,
  };
}

/** Poster backdrop behind the hero: plum glow and polka dots. */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="polka-purple absolute inset-0 opacity-60" />
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
          src="/brand/fitoor-wordmark-trim.png"
          alt="Fitoor, फ़ितूर, فتور"
          width={1216}
          height={647}
          priority
          className="h-auto w-[clamp(19rem,86vw,30rem)] lg:w-[clamp(26rem,44vw,42rem)] lg:max-w-none lg:-translate-x-[9.5%]"
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
        <RegisterLink className="font-body inline-flex min-h-12 items-center rounded-sm bg-gold px-6 font-bold text-maroon-deepest shadow-[4px_4px_0_var(--rose)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[6px_6px_0_var(--rose)]">
          Register now
        </RegisterLink>
        <Link
          href="/events"
          className="font-body inline-flex min-h-12 items-center font-semibold text-cream underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
        >
          See all {events.length} events
        </Link>
      </div>
      <RegistrationNote className="mt-3" />

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

/** Once he first sits down he stays seated: past `SEATED_AT` the clock is
 *  cut loose from the scroll, eased onto 1 and held there, so scrolling back
 *  up never walks him off the stage again. */
function useSeatLatch(scroll: MotionValue<number>): MotionValue<number> {
  const held = useMotionValue(0);
  const settle = useMotionValue(0);
  useMotionValueEvent(scroll, "change", (v) => {
    if (held.get() || v < SEATED_AT) return;
    settle.set(v);
    held.set(1);
    animate(settle, 1, SETTLE);
  });
  return useTransform([scroll, held, settle], ([v, h, s]: number[]) => (h ? s : v));
}

function ScrollHero({ covered }: { covered: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // The footage is scrubbed on a 0 to 1 scroll clock: walk in, kneel, lift the sitar.
  const scroll = useMascotScroll(wrapperRef);
  const clock = useSeatLatch(scroll);

  return (
    <div
      ref={wrapperRef}
      className="relative hidden lg:block"
      style={{ height: `${MASCOT_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <HeroBackdrop />
        <div className="absolute left-[72%] top-[calc(50%+2rem)]">
          <Disc size={DESKTOP_DISC} />
          <div className="absolute left-0 top-0" style={mascotBox(DESKTOP_DISC)}>
            <MascotSequence scrub={clock} playing={!covered} className="h-auto w-full" />
          </div>
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-[1fr_1.15fr] items-center gap-6 px-6">
          <HeroCopy covered={covered} />
        </div>
      </div>
    </div>
  );
}

function MobileHero({ covered }: { covered: boolean }) {
  const discBox = { width: MOBILE_DISC, height: `calc(${MOBILE_DISC} * 1.2)` };
  return (
    <div className="relative lg:hidden">
      <div className="relative flex min-h-svh items-center overflow-hidden pb-10 pt-20">
        <HeroBackdrop />
        <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center gap-4 px-4">
          <div className="relative" style={discBox}>
            <Disc size={MOBILE_DISC} />
            <div className="absolute left-1/2 top-1/2" style={mascotBox(MOBILE_DISC)}>
              <MascotSequence playing={!covered} className="h-auto w-full" />
            </div>
          </div>
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
