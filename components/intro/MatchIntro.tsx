import { useEffect, useRef } from "react";
import { DRAWER_EASE, Envelope, Matchbox, TEELI_LENGTH, Teeli } from "@/components/intro/IntroArt";
import {
  DRAWER_MS,
  LEAVE_MS,
  TRAVEL_MS,
  teeliTransform,
  useMatchIntro,
} from "@/components/intro/useMatchIntro";
import { INTRO_STEPS } from "@/lib/intro-burn";
import { LIGHT_RADIUS_PX } from "@/lib/intro-drag";

/** Invisible padding around the stick so a finger can actually grab it. */
const TEELI_GRAB_PAD = 18;

const STEP_INDEX = { open: 0, strike: 1, light: 2, burning: 2, leaving: 2, done: 2 } as const;

/** Glowing, charred rim of the burn hole: outer glow, char, hot core. */
const EMBER_STROKES = [
  { stroke: "#ff8a1f", width: 26, opacity: 0.5, blur: true },
  { stroke: "#3a0c06", width: 10, opacity: 0.85, blur: false },
  { stroke: "#ffd45a", width: 3, opacity: 1, blur: false },
] as const;

/** Directions (px) the strike sparks fly off in. */
const SPARKS = [
  [-34, -26], [-12, -40], [14, -36], [36, -18], [30, 8], [-28, 6], [4, -48], [-40, -8],
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

/** The spot the flame has to be brought to: a pulsing ring on the marigold. */
function WickTarget({ x, y }: { x: number; y: number }) {
  const size = LIGHT_RADIUS_PX * 2;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{ left: x - LIGHT_RADIUS_PX, top: y - LIGHT_RADIUS_PX, width: size, height: size }}
    >
      <span className="absolute inset-0 animate-ping rounded-full border-2 border-gold/80 motion-reduce:animate-none" />
      <span className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(255,212,90,0.85)_0%,rgba(255,138,31,0.35)_60%,transparent_75%)]" />
    </div>
  );
}

/** Sparks flying off the striker the moment the match catches. */
function StrikeSpark({ x, y }: { x: number; y: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute" style={{ left: x, top: y }}>
      <span className="absolute -top-6 -left-6 size-12 rounded-full bg-[radial-gradient(circle,#fff7d6_0%,#ffd45a_35%,transparent_70%)] animate-[strike-spark_0.35s_ease-out_forwards] [--spark-dx:0px] [--spark-dy:0px]" />
      {SPARKS.map(([dx, dy]) => (
        <span
          key={`${dx},${dy}`}
          className="absolute -top-0.5 -left-0.5 size-1 rounded-full bg-[#ffd45a] shadow-[0_0_6px_#ff8a1f] animate-[strike-spark_0.55s_ease-out_forwards]"
          style={{ "--spark-dx": `${dx}px`, "--spark-dy": `${dy}px` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/** Landing-page loader after a Diwali-style invite: tap the "Fitoor ki
 *  Teeli" matchbox, drag the match across the striker until it catches, then
 *  carry the flame to the glowing marigold. Only that spot sets the invite
 *  alight, and the cover burns away to reveal the page. */
export function MatchIntro({ onDone }: { onDone: () => void }) {
  const {
    phase,
    lit,
    teeli,
    dragging,
    wick,
    spark,
    openBox,
    teeliHandlers,
    skip,
    coverRef,
    drawerRef,
    strikerRef,
    envelopeRef,
    emberRefs: emberPathsRef,
  } = useMatchIntro();
  const boxButtonRef = useRef<HTMLButtonElement>(null);
  const teeliButtonRef = useRef<HTMLButtonElement>(null);
  const hasTeeli = teeli !== null;

  useEffect(() => {
    if (phase === "done") onDone();
  }, [phase, onDone]);

  useEffect(() => {
    boxButtonRef.current?.focus({ preventScroll: true });
  }, []);

  // The box goes inert once opened, so hand focus to the match.
  useEffect(() => {
    // focusVisible: false keeps the ring off for touch and mouse; keyboard
    // users still get it as soon as they press a key.
    if (hasTeeli) teeliButtonRef.current?.focus({ preventScroll: true, focusVisible: false } as FocusOptions);
  }, [hasTeeli]);

  if (phase === "done") return null;

  const burning = phase === "burning";
  const step = STEP_INDEX[phase];
  const prompt = INTRO_STEPS[step].prompt;
  const slide = `transform ${DRAWER_MS}ms ${DRAWER_EASE}`;

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
          ref={boxButtonRef}
          type="button"
          disabled={phase !== "open"}
          aria-label={INTRO_STEPS[0].prompt}
          onClick={openBox}
          className="relative w-[min(54vw,280px,30vh)] cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-default motion-reduce:transition-none"
          style={{ transform: phase === "open" ? "translateX(0)" : "translateX(-22%)", transition: slide }}
        >
          <Matchbox
            open={phase !== "open"}
            taken={hasTeeli}
            strikerHot={phase === "strike" && hasTeeli && !dragging}
            drawerRef={drawerRef}
            strikerRef={strikerRef}
          />
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
          className={`pointer-events-none absolute inset-0 bg-maroon-deepest/40 transition-opacity duration-700 ${lit ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {burning && <EmberRim pathsRef={emberPathsRef} />}
      {phase === "light" && wick && <WickTarget x={wick.x} y={wick.y} />}
      {spark && <StrikeSpark x={spark.x} y={spark.y} />}

      {teeli && (
        <button
          ref={teeliButtonRef}
          type="button"
          aria-label={`${prompt} (or press Enter)`}
          disabled={phase !== "strike" && phase !== "light"}
          {...teeliHandlers}
          className={`absolute top-0 left-0 touch-none rounded-md select-none focus-visible:outline-2 focus-visible:outline-gold ${
            dragging ? "cursor-grabbing outline-none" : "cursor-grab"
          }`}
          style={{
            padding: TEELI_GRAB_PAD,
            transform: teeliTransform(teeli, TEELI_GRAB_PAD),
            transformOrigin: `${TEELI_LENGTH + TEELI_GRAB_PAD}px ${5 + TEELI_GRAB_PAD}px`,
            transition: dragging
              ? "opacity 300ms"
              : `transform ${TRAVEL_MS}ms cubic-bezier(0.45,0,0.2,1), opacity 300ms`,
            opacity: burning ? 0 : 1,
          }}
        >
          {lit && (
            <span
              aria-hidden
              className="pointer-events-none absolute size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,180,70,0.4)_0%,rgba(255,120,40,0.12)_40%,transparent_70%)]"
              style={{ left: TEELI_LENGTH + TEELI_GRAB_PAD, top: 5 + TEELI_GRAB_PAD }}
            />
          )}
          <Teeli lit={lit} />
        </button>
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
