import { test } from "node:test";
import assert from "node:assert/strict";
import { HORN_PATTERNS, patternLength, pickHornIndex } from "./horn-patterns.ts";

test("there are several horn patterns to pick from", () => {
  assert.ok(HORN_PATTERNS.length >= 3);
});

test("every note is audible and starts at or after zero", () => {
  for (const pattern of HORN_PATTERNS) {
    assert.ok(pattern.notes.length > 0, pattern.name);
    for (const note of pattern.notes) {
      assert.ok(note.start >= 0, pattern.name);
      assert.ok(note.duration > 0, pattern.name);
      assert.ok(note.freqs.length > 0, pattern.name);
      for (const f of note.freqs) assert.ok(f >= 80 && f <= 2000, `${pattern.name} ${f}`);
    }
  }
});

test("no pattern runs longer than two and a half seconds", () => {
  for (const pattern of HORN_PATTERNS) assert.ok(patternLength(pattern) <= 2.5, pattern.name);
});

test("pattern length is the end of its last-ending note", () => {
  const pattern = {
    name: "t",
    notes: [
      { freqs: [300], start: 0, duration: 0.2 },
      { freqs: [300], start: 0.5, duration: 0.3 },
    ],
  };
  assert.equal(patternLength(pattern), 0.8);
});

test("picking never repeats the previous horn", () => {
  for (let prev = 0; prev < 4; prev++) {
    for (const r of [0, 0.2, 0.5, 0.74, 0.99, 1]) {
      const i = pickHornIndex(r, 4, prev);
      assert.notEqual(i, prev);
      assert.ok(i >= 0 && i < 4);
    }
  }
});

test("picking stays in range with no previous horn or a single horn", () => {
  assert.equal(pickHornIndex(0.99, 4, -1), 3);
  assert.equal(pickHornIndex(0, 4, -1), 0);
  assert.equal(pickHornIndex(0.6, 1, 0), 0);
  assert.equal(pickHornIndex(Number.NaN, 3, -1), 0);
});
