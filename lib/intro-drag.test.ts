import { test } from "node:test";
import assert from "node:assert/strict";
import {
  LIGHT_RADIUS_PX,
  STRIKER_PAD_PX,
  isInside,
  isTouching,
  strikeTravel,
  wickPoint,
} from "./intro-drag.ts";

const striker = { left: 100, top: 300, right: 400, bottom: 322 };

test("isInside respects the box and its padding", () => {
  assert.equal(isInside({ x: 150, y: 310 }, striker), true);
  assert.equal(isInside({ x: 150, y: 290 }, striker), false);
  assert.equal(isInside({ x: 150, y: 300 - STRIKER_PAD_PX }, striker, STRIKER_PAD_PX), true);
});

test("strike travel builds up only while the head rubs along the striker", () => {
  const a = strikeTravel(0, { x: 120, y: 310 }, { x: 160, y: 311 }, striker);
  assert.equal(a, 40);
  const b = strikeTravel(a, { x: 160, y: 311 }, { x: 140, y: 309 }, striker);
  assert.equal(b, 60, "back-and-forth rubbing still counts");
});

test("strike travel resets when the head leaves the striker", () => {
  assert.equal(strikeTravel(55, { x: 160, y: 311 }, { x: 200, y: 200 }, striker), 0);
  assert.equal(strikeTravel(55, { x: 160, y: 100 }, { x: 200, y: 311 }, striker), 0);
});

test("isTouching is true only within the light radius of the wick", () => {
  const wick = { x: 50, y: 50 };
  assert.equal(isTouching({ x: 50 + LIGHT_RADIUS_PX - 1, y: 50 }, wick), true);
  assert.equal(isTouching({ x: 50 + LIGHT_RADIUS_PX + 1, y: 50 }, wick), false);
});

test("wick sits on the envelope's bottom-left marigold", () => {
  const p = wickPoint({ left: 0, top: 0, right: 420, bottom: 270 });
  assert.deepEqual(p, { x: 26, y: 244 });
  const scaled = wickPoint({ left: 10, top: 20, right: 220, bottom: 155 });
  assert.deepEqual(scaled, { x: 23, y: 142 });
});
