import { test } from "node:test";
import assert from "node:assert/strict";
import { isRegistrationOpen, registration } from "./registration.ts";

const deadline = new Date(registration.closesAt);

test("the deadline is Unstop's: 12 Nov 2026, 11:59 PM IST", () => {
  assert.equal(deadline.toISOString(), "2026-11-12T18:29:00.000Z");
});

test("without the closed flag, registration is open a minute before the deadline", () => {
  const open = { ...registration, closed: false };
  assert.equal(isRegistrationOpen(new Date(deadline.getTime() - 60_000), open), true);
});

test("registration is closed at the deadline and after it", () => {
  assert.equal(isRegistrationOpen(deadline), false);
  assert.equal(isRegistrationOpen(new Date(deadline.getTime() + 60_000)), false);
});

test("the manual closed flag shuts registration whatever the time", () => {
  const early = new Date(deadline.getTime() - 86_400_000);
  assert.equal(isRegistrationOpen(early, { ...registration, closed: true }), false);
});

test("registrations are now closed for good", () => {
  assert.equal(registration.closed, true);
  assert.equal(isRegistrationOpen(new Date()), false);
});
