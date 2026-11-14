/** Time-based frame picking for stop-motion sprites and image sequences.
 *  Pure so the stepping maths is testable without a browser. */

export type FrameMode = "loop" | "once" | "pingpong";

export function frameDurationMs(fps: number): number {
  return 1000 / fps;
}

/** Which frame of a `count`-frame strip shows `elapsedMs` after it started. */
export function frameAt(
  elapsedMs: number,
  fps: number,
  count: number,
  mode: FrameMode,
): number {
  if (count <= 1 || !(fps > 0) || !(elapsedMs > 0)) return 0;
  const tick = Math.floor(elapsedMs / frameDurationMs(fps));
  if (mode === "once") return Math.min(tick, count - 1);
  if (mode === "loop") return tick % count;
  // Ping-pong: 0..n-1..1, so neither end frame is shown twice in a row.
  const period = 2 * (count - 1);
  const phase = tick % period;
  return phase < count ? phase : period - phase;
}

/** Which frame of a `count`-frame strip a 0..1 scroll `progress` lands on.
 *  Clamped, because a spring-smoothed scroll value can overshoot either end. */
export function scrubFrame(progress: number, count: number): number {
  if (count <= 1 || !Number.isFinite(progress)) return 0;
  const p = Math.min(1, Math.max(0, progress));
  return Math.round(p * (count - 1));
}

/** Steps a (fractional) frame position from `current` towards `target`, but
 *  never by more than `maxFps` frames a second, so a fast scroll still plays
 *  the footage through at a watchable pace instead of jumping to the end. */
export function approachFrame(
  current: number,
  target: number,
  elapsedMs: number,
  maxFps: number,
): number {
  if (!Number.isFinite(target) || !(elapsedMs > 0) || !(maxFps > 0)) return current;
  const step = (elapsedMs / 1000) * maxFps;
  const gap = target - current;
  return Math.abs(gap) <= step ? target : current + Math.sign(gap) * step;
}
