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
    imageAlt: "Fitoor poster for Nanku, live at Plaksha University on 14 November 2026, 8:30 PM",
    song: {
      title: "Yezdi",
      credit: "Nanku",
      previewUrl:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/78/e8/b6/78e8b6d6-0f77-f929-f8a2-4b51da18ec0a/mzaf_6948795962729331186.plus.aac.p.m4a",
      link: "https://music.apple.com/in/album/yezdi/1701159173?i=1701159185",
    },
  },
  {
    id: "rcr",
    name: "RCR",
    role: "headliner",
    day: 2,
    time: "6 PM to 8 PM",
    venue: "Ground",
    image: "/artists/rcr.webp",
    imageAlt: "Fitoor x Pearl poster for RCR, live at Plaksha University on 15 November 2026, 6 PM",
    song: {
      title: "Ae Dil Hai Mushkil X",
      credit: "RCR & Jai Dhir",
      previewUrl:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/be/9d/bf/be9dbf2c-0228-fff7-8b04-bab90b0eafd8/mzaf_1406269231980376138.plus.aac.p.m4a",
      link: "https://music.apple.com/in/album/ae-dil-hai-mushkil-x/1660046724?i=1660046727",
    },
  },
  {
    id: "starboy-music",
    name: "Starboy Music",
    role: "dj",
    day: 2,
    time: "8 PM to 10 PM",
    venue: "Ground",
    image: "/artists/starboy-music.webp",
    imageAlt: "Fitoor poster for DJ Starboy, 15 November 2026",
  },
];
