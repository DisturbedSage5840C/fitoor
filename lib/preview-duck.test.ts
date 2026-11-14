import { test } from "node:test";
import assert from "node:assert/strict";
import { isPreviewPlaying, onPreviewChange, setPreviewPlaying } from "./preview-duck.ts";

test("listeners hear a preview start and stop", () => {
  const heard: boolean[] = [];
  const off = onPreviewChange((on) => heard.push(on));
  setPreviewPlaying(true);
  setPreviewPlaying(false);
  off();
  assert.deepEqual(heard, [true, false]);
});

test("repeating the same state does not re-notify", () => {
  const heard: boolean[] = [];
  const off = onPreviewChange((on) => heard.push(on));
  setPreviewPlaying(true);
  setPreviewPlaying(true);
  off();
  setPreviewPlaying(false);
  assert.deepEqual(heard, [true]);
});

test("the current state can be read by a late subscriber", () => {
  setPreviewPlaying(true);
  assert.equal(isPreviewPlaying(), true);
  setPreviewPlaying(false);
  assert.equal(isPreviewPlaying(), false);
});

test("an unsubscribed listener is not called again", () => {
  let calls = 0;
  const off = onPreviewChange(() => calls++);
  off();
  setPreviewPlaying(true);
  setPreviewPlaying(false);
  assert.equal(calls, 0);
});
