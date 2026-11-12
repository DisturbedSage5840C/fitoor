import type { Artist } from "./types.ts";

/** The evening acts, from the organisers' Day 1 and Day 2 schedule posters. */
export const artists: Artist[] = [
  {
    id: "nanku",
    name: "Nanku",
    role: "headliner",
    day: 1,
    time: "8:30 PM onwards",
    venue: "Ground",
    image: "/artists/nanku.webp",
    imageAlt: "Nanku, Day 1 headliner at Fitoor 2026",
  },
  {
    id: "rcr",
    name: "RCR",
    role: "headliner",
    day: 2,
    time: "6 PM to 8 PM",
    venue: "Ground",
    image: "/artists/rcr.webp",
    imageAlt: "RCR, Day 2 headliner at Fitoor 2026",
  },
  {
    id: "starboy-music",
    name: "Starboy Music",
    role: "dj",
    day: 2,
    time: "8 PM to 10 PM",
    venue: "Ground",
  },
];
