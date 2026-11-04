/** Synthesised sound effects (no audio files to download). Client-only: the
 *  AudioContext is created lazily on first use, and browsers only let it
 *  start after a user gesture, so a play call before one just stays silent. */

import { HORN_PATTERNS, pickHornIndex, type HornNote } from "@/lib/horn-patterns";

const HORN_VOLUME = 0.4;
const GUNSHOT_VOLUME = 0.15;
/** Lowpass cutoff that turns a crack into a far-off, muffled pop. */
const MUFFLE_HZ = 900;

let context: AudioContext | null = null;
let lastHorn = -1;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    context ??= new AudioContext();
    if (context.state === "suspended") void context.resume();
    return context;
  } catch (error: unknown) {
    // No Web Audio (old browser, locked-down webview): sound is decoration, so carry on silently.
    console.warn("Sound unavailable", error);
    return null;
  }
}

/** One horn note: sawtooth trumpets through a lowpass, with a fast attack
 *  and a short release so the blast cuts off like a valve closing. */
function playNote(ctx: AudioContext, out: AudioNode, note: HornNote, at: number) {
  const start = at + note.start;
  const end = start + note.duration;
  const level = 1 / note.freqs.length;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(level, start + 0.02);
  gain.gain.setValueAtTime(level, end - 0.04);
  gain.gain.linearRampToValueAtTime(0, end);
  gain.connect(out);
  for (const freq of note.freqs) {
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    // A slight sag at the start: the air pressure building up in the horn.
    osc.frequency.setValueAtTime(freq * 0.94, start);
    osc.frequency.exponentialRampToValueAtTime(freq, start + 0.06);
    osc.connect(gain);
    osc.start(start);
    osc.stop(end + 0.02);
  }
}

/** Plays a random pressure horn, never the same one twice in a row. */
export function playHorn(): void {
  const ctx = audio();
  if (!ctx) return;
  lastHorn = pickHornIndex(Math.random(), HORN_PATTERNS.length, lastHorn);
  const pattern = HORN_PATTERNS[lastHorn];

  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 2400;
  const master = ctx.createGain();
  master.gain.value = HORN_VOLUME;
  tone.connect(master).connect(ctx.destination);

  const at = ctx.currentTime + 0.01;
  for (const note of pattern.notes) playNote(ctx, tone, note, at);
}

/** A quiet, muffled gunshot: a burst of filtered noise over a low thump. */
export function playGunshot(): void {
  const ctx = audio();
  if (!ctx) return;
  const at = ctx.currentTime + 0.01;
  const master = ctx.createGain();
  master.gain.value = GUNSHOT_VOLUME;
  master.connect(ctx.destination);

  // Noise crack, decaying over a quarter of a second.
  const length = Math.floor(ctx.sampleRate * 0.25);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const muffle = ctx.createBiquadFilter();
  muffle.type = "lowpass";
  muffle.frequency.value = MUFFLE_HZ;
  noise.connect(muffle).connect(master);
  noise.start(at);

  // Body thump: a sine dropping from 150Hz to 45Hz.
  const thump = ctx.createOscillator();
  const thumpGain = ctx.createGain();
  thump.frequency.setValueAtTime(150, at);
  thump.frequency.exponentialRampToValueAtTime(45, at + 0.18);
  thumpGain.gain.setValueAtTime(0.9, at);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, at + 0.22);
  thump.connect(thumpGain).connect(master);
  thump.start(at);
  thump.stop(at + 0.25);
}

const CAN_CRUSH_VOLUME = 0.22;
/** How long the aluminium keeps crackling as the fingers close. */
const CRACKLE_SECONDS = 0.45;
const CRACKLE_TICKS = 12;

/** One sharp tick of buckling metal: a sliver of noise through a bandpass. */
function crackleTick(ctx: AudioContext, out: AudioNode, at: number, level: number) {
  const length = Math.floor(ctx.sampleRate * 0.03);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 4;
  const tick = ctx.createBufferSource();
  tick.buffer = buffer;
  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 2000 + Math.random() * 4000;
  band.Q.value = 3;
  const gain = ctx.createGain();
  gain.gain.value = level;
  tick.connect(band).connect(gain).connect(out);
  tick.start(at);
}

/** A soda can crushed in one fist: a hollow metal thunk, then a run of
 *  crackles that thin out as the can gives way. */
export function playCanCrush(): void {
  const ctx = audio();
  if (!ctx) return;
  const at = ctx.currentTime + 0.01;
  const master = ctx.createGain();
  master.gain.value = CAN_CRUSH_VOLUME;
  master.connect(ctx.destination);

  // Hollow thunk of the can wall caving in: a sine falling from 220Hz to 80Hz.
  const thunk = ctx.createOscillator();
  const thunkGain = ctx.createGain();
  thunk.frequency.setValueAtTime(220, at);
  thunk.frequency.exponentialRampToValueAtTime(80, at + 0.12);
  thunkGain.gain.setValueAtTime(0.7, at);
  thunkGain.gain.exponentialRampToValueAtTime(0.001, at + 0.16);
  thunk.connect(thunkGain).connect(master);
  thunk.start(at);
  thunk.stop(at + 0.2);

  // Crackles bunch up early and fade, like folds giving way one after another.
  for (let i = 0; i < CRACKLE_TICKS; i++) {
    const t = (i / CRACKLE_TICKS) ** 1.6 * CRACKLE_SECONDS + Math.random() * 0.02;
    crackleTick(ctx, master, at + t, 1.4 * (1 - i / CRACKLE_TICKS) + 0.3);
  }
}
