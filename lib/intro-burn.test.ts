import { test } from "node:test";
import assert from "node:assert/strict";
import {
  BURN_DURATION_MS,
  EDGE_WOBBLE,
  INTRO_STEPS,
  burnHolePath,
  burnRadius,
  coverClipPath,
  edgeFactor,
  maxBurnRadius,
  nextStep,
} from "./intro-burn.ts";

test("steps run open, strike, light, then burn", () => {
  assert.deepEqual(
    INTRO_STEPS.map((s) => s.id),
    ["open", "strike", "light"],
  );
  assert.equal(nextStep("open"), "strike");
  assert.equal(nextStep("strike"), "light");
  assert.equal(nextStep("light"), "burning");
  assert.equal(nextStep("burning"), "burning");
});

test("edge factor stays inside the wobble band and wraps around the circle", () => {
  for (let i = 0; i <= 360; i += 7) {
    const theta = (i / 180) * Math.PI;
    const f = edgeFactor(theta, 1234);
    assert.ok(f >= 1 - EDGE_WOBBLE && f <= 1 + EDGE_WOBBLE, `factor ${f} at ${i}deg`);
  }
  assert.ok(Math.abs(edgeFactor(0, 500) - edgeFactor(Math.PI * 2, 500)) < 1e-9);
});

test("burn radius starts at zero, only grows and reaches the max on time", () => {
  assert.equal(burnRadius(0, 1000), 0);
  let prev = 0;
  for (let t = 0; t <= BURN_DURATION_MS; t += 50) {
    const r = burnRadius(t, 1000);
    assert.ok(r >= prev, `shrank at ${t}ms`);
    prev = r;
  }
  assert.equal(burnRadius(BURN_DURATION_MS, 1000), 1000);
  assert.equal(burnRadius(BURN_DURATION_MS * 2, 1000), 1000);
});

test("max radius clears the farthest corner even at the edge's deepest dip", () => {
  const r = maxBurnRadius(800, 600, 100, 300);
  const farthest = Math.hypot(700, 300);
  assert.ok(r * (1 - EDGE_WOBBLE) >= farthest);
});

test("hole path is a closed polygon around the origin", () => {
  const path = burnHolePath(50, 60, 20, 0, 12);
  assert.match(path, /^M[\d.-]+ [\d.-]+( L[\d.-]+ [\d.-]+){11} Z$/);
  assert.equal(burnHolePath(50, 60, 0, 0), "");
});

test("cover clip keeps the screen and cuts the hole with even-odd", () => {
  const clip = coverClipPath(800, 600, "M1 1 L2 2 Z");
  assert.equal(clip, 'path(evenodd, "M0 0 H800 V600 H0 Z M1 1 L2 2 Z")');
  assert.equal(coverClipPath(800, 600, ""), "none");
});
