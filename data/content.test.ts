import { test } from "node:test";
import assert from "node:assert/strict";
import { festDays, generalRules, stats } from "./content.ts";
import { events } from "./events.ts";
import { artists } from "./artists.ts";

const eventSlots = festDays.flatMap((day) =>
  day.schedule
    .filter((slot) => slot.id)
    .map((slot) => ({ ...slot, date: `${day.date.split(" ")[0]} Nov` })),
);

test("every schedule id resolves to an event", () => {
  const ids = new Set(events.map((e) => e.id));
  for (const slot of eventSlots) {
    assert.ok(ids.has(slot.id!), `unknown event id in schedule: ${slot.id}`);
  }
});

test("every event appears in exactly one schedule slot", () => {
  for (const event of events) {
    const matches = eventSlots.filter((slot) => slot.id === event.id);
    assert.equal(matches.length, 1, `${event.id} appears ${matches.length} times`);
  }
});

test("event date, time and venue agree with the schedule slot", () => {
  for (const slot of eventSlots) {
    const event = events.find((e) => e.id === slot.id)!;
    assert.equal(event.dateTime, `${slot.date}, ${slot.time}`, event.id);
    assert.equal(event.venue, slot.venue, event.id);
  }
});

test("every schedule row has a venue", () => {
  for (const day of festDays) {
    for (const slot of day.schedule) {
      assert.ok(slot.venue, `${slot.title} has no venue`);
    }
  }
});

test("climax is no longer part of the fest", () => {
  assert.equal(events.some((e) => e.id === "climax"), false);
});

test("day 2 runs until 10 PM and the rules say so", () => {
  assert.equal(festDays[1].concludes, "10 PM");
  assert.ok(generalRules.some((rule) => rule.includes("Day 2 concludes at 10 PM")));
});

test("the events stat matches the number of events", () => {
  const stat = stats.find((s) => s.label === "events");
  assert.equal(stat?.value, String(events.length));
});

test("each artist plays on a fest day and has a schedule row", () => {
  for (const artist of artists) {
    const day = festDays.find((d) => d.day === artist.day);
    assert.ok(day, `${artist.name} has no fest day`);
    const row = day.schedule.find((slot) => slot.kind === "artist" && slot.title.includes(artist.name));
    assert.ok(row, `${artist.name} missing from the day ${artist.day} schedule`);
    assert.equal(row.time, artist.time);
    assert.equal(row.venue, artist.venue);
  }
});
