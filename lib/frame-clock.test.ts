import { test } from "node:test";
import assert from "node:assert/strict";
import { frameAt, frameDurationMs, scrubFrame } from "./frame-clock.ts";

test("frame duration is one second split by fps", () => {
  assert.equal(frameDurationMs(10), 100);
  assert.equal(frameDurationMs(12), 1000 / 12);
});

test("loop mode wraps back to the first frame", () => {
  // 10 fps, 4 frames: 0..399ms covers frames 0..3, then it wraps.
  assert.equal(frameAt(0, 10, 4, "loop"), 0);
  assert.equal(frameAt(99, 10, 4, "loop"), 0);
  assert.equal(frameAt(100, 10, 4, "loop"), 1);
  assert.equal(frameAt(399, 10, 4, "loop"), 3);
  assert.equal(frameAt(400, 10, 4, "loop"), 0);
  assert.equal(frameAt(1250, 10, 4, "loop"), 0);
});

test("once mode holds on the last frame", () => {
  assert.equal(frameAt(0, 10, 4, "once"), 0);
  assert.equal(frameAt(300, 10, 4, "once"), 3);
  assert.equal(frameAt(5000, 10, 4, "once"), 3);
});

test("pingpong mode bounces without repeating the end frames", () => {
  const seq = Array.from({ length: 8 }, (_, i) => frameAt(i * 100, 10, 4, "pingpong"));
  assert.deepEqual(seq, [0, 1, 2, 3, 2, 1, 0, 1]);
});

test("degenerate inputs never return an out-of-range frame", () => {
  assert.equal(frameAt(500, 10, 1, "pingpong"), 0);
  assert.equal(frameAt(500, 10, 0, "loop"), 0);
  assert.equal(frameAt(-50, 10, 4, "loop"), 0);
  assert.equal(frameAt(Number.NaN, 10, 4, "loop"), 0);
  assert.equal(frameAt(500, 0, 4, "loop"), 0);
});

test("scrub maps 0..1 progress evenly across the strip", () => {
  assert.equal(scrubFrame(0, 78), 0);
  assert.equal(scrubFrame(1, 78), 77);
  assert.equal(scrubFrame(0.5, 78), 39);
  // Rounds to the nearest frame rather than flooring, so the last frame is
  // reachable without scrolling to the exact end.
  assert.equal(scrubFrame(0.996, 78), 77);
});

test("scrub clamps overshoot from a springy scroll value", () => {
  assert.equal(scrubFrame(-0.2, 78), 0);
  assert.equal(scrubFrame(1.3, 78), 77);
});

test("scrub is safe on degenerate input", () => {
  assert.equal(scrubFrame(Number.NaN, 78), 0);
  assert.equal(scrubFrame(0.5, 1), 0);
  assert.equal(scrubFrame(0.5, 0), 0);
});
