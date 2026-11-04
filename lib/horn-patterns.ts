/** Pressure-horn patterns for the truck's number plate. Pure data plus a
 *  picker, so the timing rules can be tested without a browser. Times are in
 *  seconds; each note sounds all of its frequencies together as a chord, the
 *  way twin air-horn trumpets beat against each other. */

export interface HornNote {
  freqs: number[];
  start: number;
  duration: number;
}

export interface HornPattern {
  name: string;
  notes: HornNote[];
}

/** Two slightly detuned trumpets: the classic highway blast. */
const BLAST = [311, 370];
/** A brighter, smaller horn for the double tap. */
const TAP = [415, 494];

export const HORN_PATTERNS: readonly HornPattern[] = [
  { name: "long blast", notes: [{ freqs: BLAST, start: 0, duration: 1.1 }] },
  {
    name: "double tap",
    notes: [
      { freqs: TAP, start: 0, duration: 0.16 },
      { freqs: TAP, start: 0.24, duration: 0.42 },
    ],
  },
  {
    // The musical "bajaa" horn every decorated truck seems to carry.
    name: "truck tune",
    notes: [
      { freqs: [392], start: 0, duration: 0.2 },
      { freqs: [494], start: 0.2, duration: 0.2 },
      { freqs: [587], start: 0.4, duration: 0.2 },
      { freqs: [523], start: 0.6, duration: 0.2 },
      { freqs: [494], start: 0.8, duration: 0.2 },
      { freqs: [392], start: 1.0, duration: 0.45 },
    ],
  },
  {
    name: "impatient",
    notes: [
      { freqs: BLAST, start: 0, duration: 0.12 },
      { freqs: BLAST, start: 0.18, duration: 0.12 },
      { freqs: BLAST, start: 0.36, duration: 0.12 },
      { freqs: BLAST, start: 0.6, duration: 0.7 },
    ],
  },
];

/** When the pattern's last note stops sounding. */
export function patternLength(pattern: HornPattern): number {
  return Math.max(...pattern.notes.map((n) => Math.round((n.start + n.duration) * 1000) / 1000));
}

/** Picks a horn index from a random number in [0, 1], never the previous
 *  one, so two presses in a row always sound different. Pass -1 for none. */
export function pickHornIndex(random: number, count: number, previous: number): number {
  if (count <= 1) return 0;
  const r = Number.isFinite(random) ? Math.min(Math.max(random, 0), 0.999999) : 0;
  const hasPrevious = previous >= 0 && previous < count;
  if (!hasPrevious) return Math.floor(r * count);
  // Choose among the other count-1 slots, then step over the previous one.
  const slot = Math.floor(r * (count - 1));
  return slot >= previous ? slot + 1 : slot;
}
