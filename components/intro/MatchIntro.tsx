import { useEffect, useRef } from "react";
import { Envelope, Matchbox, Teeli } from "@/components/intro/IntroArt";
import {
  LEAVE_MS,
  TRAVEL_MS,
  teeliTransform,
  useMatchIntro,
} from "@/components/intro/useMatchIntro";
import { INTRO_STEPS } from "@/lib/intro-burn";

/** A sideways drag this long on the matchbox counts as a strike. */
const SWIPE_PX = 30;

const STEP_INDEX = { open: 0, strike: 1, light: 2, burning: 2, leaving: 2, done: 2 } as const;

/** Glowing, charred rim of the burn hole: outer glow, char, hot core. */
const EMBER_STROKES = [
  { stroke: "#ff8a1f", width: 26, opacity: 0.5, blur: true },
  { stroke: "#3a0c06", width: 10, opacity: 0.85, blur: false },
  { stroke: "#ffd45a", width: 3, opacity: 1, blur: false },
] as const;

function StepStrip({ active }: { active: number }) {
  return (
    <ol className="font-body flex items-center gap-3 text-[0.65rem] font-bold tracking-[0.2em] uppercase">
      {INTRO_STEPS.map((step, i) => (
        <li
          key={step.id}
          aria-current={i === active ? "step" : undefined}
          className={`rounded-sm px-2 py-1 transition-colors duration-300 ${
            i === active ? "bg-gold text-maroon-deepest" : "text-cream/45"
          }`}
        >
          {i + 1} · {step.label}
        </li>
      ))}
    </ol>
  );
}

function EmberRim({ pathsRef }: { pathsRef: React.RefObject<(SVGPathElement | null)[]> }) {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <filter id="ember-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      {EMBER_STROKES.map((s, i) => (
        <path
          key={s.stroke}
          ref={(el) => {
            pathsRef.current[i] = el;
          }}
          fill="none"
          stroke={s.stroke}
          strokeWidth={s.width}
          strokeOpacity={s.opacity}
          strokeLinejoin="round"
          filter={s.blur ? "url(#ember-blur)" : undefined}
        />
      ))}
    </svg>
  );
}

/** Landing-page loader after a Diwali-style invite: open the "Fitoor ki
 *  Teeli" matchbox, strike a match, and it sets the invite alight; the cover
 *  burns away from the envelope's edge to reveal the page. Each step also
 *  plays itself if the visitor just watches. */
export function MatchIntro({ onDone }: { onDone: () => void }) {
  const {
    phase,
    lit,
    teeli,
    advanceFrom,
    skip,
    coverRef,
    drawerRef,
    envelopeRef,
    emberRefs: emberPathsRef,
  } = useMatchIntro();
  const swipeStart = useRef<number | null>(null);
  const boxButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (phase === "done") onDone();
  }, [phase, onDone]);

  useEffect(() => {
    boxButton.current?.focus({ preventScroll: true });
  }, []);

  if (phase === "done") return null;

  const waiting = phase === "open" || phase === "strike";
  const burning = phase === "burning";
  const step = STEP_INDEX[phase];
  const prompt = INTRO_STEPS[step].prompt;

  const onBoxPress = () => {
    if (phase === "open" || phase === "strike") advanceFrom(phase);
  };

  return (
    <div
      data-match-intro
      className="fixed inset-0 z-[60] transition-opacity"
      style={{ opacity: phase === "leaving" ? 0 : 1, transitionDuration: `${LEAVE_MS}ms` }}
    >
      {/* No script, no invite: show the page. */}
      <noscript>
        <style>{"[data-match-intro]{display:none!important}"}</style>
      </noscript>

      <div
        ref={coverRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-[min(4vh,2rem)] overflow-hidden bg-maroon-deepest px-4 pt-14 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#5a1420_0%,#2c0a0d_55%,#1c0407_100%)]"
        />
        <div aria-hidden className="polka-purple absolute inset-0 opacity-40" />
        {/* Genda-phool garland along the top edge */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-5 bg-[radial-gradient(circle,#ffb02e_0_6px,#f08a1c_6px_8px,transparent_8.5px)] bg-[length:22px_20px] bg-repeat-x"
        />

        <p className="font-script relative text-center text-xl text-gold/90 sm:text-2xl">
          agar invite aisa hai, toh socho fest kaisa hoga!
        </p>

        <div ref={envelopeRef} className="relative w-[min(84vw,420px,46vh)]">
          <Envelope />
        </div>

        <button
          ref={boxButton}
          type="button"
          disabled={!waiting}
          aria-label={prompt}
          onClick={onBoxPress}
          onPointerDown={(e) => {
            swipeStart.current = e.clientX;
          }}
          onPointerMove={(e) => {
            if (phase !== "strike" || swipeStart.current === null) return;
            if (Math.abs(e.clientX - swipeStart.current) > SWIPE_PX) {
              swipeStart.current = null;
              advanceFrom("strike");
            }
          }}
          className="relative w-[min(54vw,280px,30vh)] cursor-pointer touch-none rounded-lg transition-transform duration-700 ease-[cubic-bezier(0.2,0.9,0.3,1.15)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-default motion-reduce:transition-none"
          style={{ transform: phase === "open" ? "translateX(0)" : "translateX(-22%)" }}
        >
          <Matchbox open={phase !== "open"} drawerRef={drawerRef} />
          {phase === "open" && (
            <span aria-hidden className="absolute top-1/2 left-1/2 size-14 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2 border-gold motion-reduce:animate-none" />
          )}
        </button>

        <div className="relative flex flex-col items-center gap-2">
          <StepStrip active={step} />
          <p role="status" className="font-title text-center text-xl text-cream">
            {prompt}
          </p>
        </div>

        {/* The room dims once the match is lit, like a diya in a dark gali. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-maroon-deepest/55 transition-opacity duration-500 ${lit ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {burning && <EmberRim pathsRef={emberPathsRef} />}

      {teeli && (
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 origin-right transition-[transform,opacity] ease-in-out"
          style={{
            transform: teeliTransform(teeli),
            transitionDuration: `${TRAVEL_MS}ms, 300ms`,
            opacity: burning ? 0 : 1,
          }}
        >
          {lit && (
            <div className="absolute top-1/2 right-0 size-80 translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,180,70,0.4)_0%,rgba(255,120,40,0.12)_40%,transparent_70%)]" />
          )}
          <Teeli lit={lit} />
        </div>
      )}

      <button
        type="button"
        onClick={skip}
        className="font-body absolute top-4 right-4 inline-flex min-h-11 items-center rounded-sm border border-gold/50 bg-maroon-deepest/70 px-4 text-sm font-semibold text-cream backdrop-blur-sm hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        Skip intro
      </button>
    </div>
  );
}
