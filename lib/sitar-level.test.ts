import { test } from "node:test";
import assert from "node:assert/strict";
import { DUCKED_VOLUME, SITAR_VOLUME, sitarLevel } from "./sitar-level.ts";

test("the sitar plays at its background volume when nothing else is on", () => {
  assert.equal(sitarLevel({ muted: false, ducked: false }), SITAR_VOLUME);
});

test("an artist preview ducks the sitar under it", () => {
  assert.equal(sitarLevel({ muted: false, ducked: true }), DUCKED_VOLUME);
  assert.ok(DUCKED_VOLUME < SITAR_VOLUME);
});

test("muted is silent whether or not a preview plays", () => {
  assert.equal(sitarLevel({ muted: true, ducked: false }), 0);
  assert.equal(sitarLevel({ muted: true, ducked: true }), 0);
});
