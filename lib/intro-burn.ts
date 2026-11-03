/** Steps, timing and burn geometry for the landing-page matchbox loader. Pure
 *  so the maths can be tested without a browser. */

export type IntroStepId = "open" | "strike" | "light";
export type IntroStage = IntroStepId | "burning";

export interface IntroStep {
  id: IntroStepId;
  label: string;
  prompt: string;
}

export const INTRO_STEPS: readonly IntroStep[] = [
  { id: "open", label: "open", prompt: "tap the matchbox" },
  { id: "strike", label: "strike", prompt: "drag the teeli across the striker" },
  { id: "light", label: "light", prompt: "touch the flame to the glowing phool" },
];

const ORDER: readonly IntroStage[] = ["open", "strike", "light", "burning"];

export function nextStep(stage: IntroStage): IntroStage {
  const i = ORDER.indexOf(stage);
  return ORDER[Math.min(ORDER.length - 1, i + 1)];
}

/** How long the burn takes to eat the whole screen. */
export const BURN_DURATION_MS = 3200;

/** The ragged edge strays at most this far, as a fraction of the radius. */
export const EDGE_WOBBLE = 0.22;

/** Integer frequencies keep the edge periodic, so it closes without a seam. */
const WAVES: readonly { k: number; amp: number; phase: number; speed: number }[] = [
  { k: 3, amp: 0.09, phase: 0.4, speed: 0.0011 },
  { k: 5, amp: 0.06, phase: 1.9, speed: -0.0017 },
  { k: 9, amp: 0.04, phase: 3.1, speed: 0.0023 },
  { k: 17, amp: 0.03, phase: 0.7, speed: -0.0031 },
];

/** Radius multiplier at angle `theta`, flickering with time `t` (ms). */
export function edgeFactor(theta: number, t: number): number {
  const wobble = WAVES.reduce(
    (sum, w) => sum + w.amp * Math.sin(w.k * theta + w.phase + w.speed * t),
    0,
  );
  return 1 + wobble;
}

/** Ease-in: the flame catches slowly, then races across the paper. */
export function burnRadius(elapsedMs: number, maxRadius: number): number {
  const p = Math.min(1, Math.max(0, elapsedMs / BURN_DURATION_MS));
  return maxRadius * p * p;
}

/** Radius at which even the edge's deepest dip is past every screen corner. */
export function maxBurnRadius(width: number, height: number, cx: number, cy: number): number {
  const farthest = Math.max(
    Math.hypot(cx, cy),
    Math.hypot(width - cx, cy),
    Math.hypot(cx, height - cy),
    Math.hypot(width - cx, height - cy),
  );
  return farthest / (1 - EDGE_WOBBLE);
}

const DEFAULT_POINTS = 72;

/** SVG path of the burnt hole around (cx, cy), or "" before it has started. */
export function burnHolePath(
  cx: number,
  cy: number,
  radius: number,
  t: number,
  points: number = DEFAULT_POINTS,
): string {
  if (radius <= 0) return "";
  const parts = Array.from({ length: points }, (_, i) => {
    const theta = (i / points) * Math.PI * 2;
    const r = radius * edgeFactor(theta, t);
    const x = (cx + r * Math.cos(theta)).toFixed(1);
    const y = (cy + r * Math.sin(theta)).toFixed(1);
    return `${i === 0 ? "M" : "L"}${x} ${y}`;
  });
  return `${parts.join(" ")} Z`;
}

/** clip-path for the cover: the whole screen minus the hole (even-odd). */
export function coverClipPath(width: number, height: number, hole: string): string {
  if (!hole) return "none";
  return `path(evenodd, "M0 0 H${width} V${height} H0 Z ${hole}")`;
}
