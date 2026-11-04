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
