import Image from "next/image";
import type { ReactNode } from "react";
import type { CategorySlug } from "@/data/types";
import { cn } from "@/lib/utils";

const SIZES = "(min-width: 1024px) 360px, 60vw";

interface LayerProps {
  src: string;
  /** Animation class plus its transform-origin, as Tailwind classes. */
  motion?: string;
}

/** One cut-out layer. Every layer of a set shares the source canvas size, so
 *  stacked full-frame they line up pixel for pixel. */
function Layer({ src, motion }: LayerProps) {
  return (
    <span className={cn("absolute inset-0 block", motion)}>
      <Image quality={90} src={src} alt="" fill sizes={SIZES} className="object-contain" />
    </span>
  );
}

interface FrameProps {
  width: number;
  height: number;
  children: ReactNode;
}

/** A box with the art's own aspect ratio, pinned bottom-right of the square,
 *  so percentage origins and positions land on the picture, not the gap. */
function Frame({ width, height, children }: FrameProps) {
  return (
    <span
      className={cn("absolute right-0 bottom-0 block", width >= height ? "w-full" : "h-full")}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {children}
    </span>
  );
}

/** Notes rising off the mic head while the hand rides the beat. */
const NOTES = [
  { left: "12%", top: "6%", delay: "0s", glyph: "♪" },
  { left: "24%", top: "0%", delay: "0.35s", glyph: "♫" },
  { left: "4%", top: "14%", delay: "0.7s", glyph: "♪" },
];

function MusicArt() {
  return (
    <Frame width={830} height={738}>
      <Layer src="/art/mic-hand-hand.webp" motion="art-vibe origin-[52%_23%]" />
      {/* The mic head and tail sit on top and never move: the singer's hand
          moves on a still mic. */}
      <Layer src="/art/mic-hand-mic.webp" />
      {NOTES.map((note) => (
        <span
          key={note.left}
          className="art-note font-display absolute text-3xl text-category-light"
          style={{ left: note.left, top: note.top, animationDelay: note.delay }}
        >
          {note.glyph}
        </span>
      ))}
    </Frame>
  );
}

function DanceArt() {
  return (
    <Frame width={644} height={788}>
      <Layer src="/art/sneaker-jutti-left.webp" motion="art-step-left origin-[28%_100%]" />
      <Layer src="/art/sneaker-jutti-right.webp" motion="art-step-right origin-[76%_100%]" />
    </Frame>
  );
}

/** The brush tip's path across the canvas as the forearm swings about the
 *  elbow, in the painting's own 870px pixel space. */
const STROKE = "M351 248 L342 265 L334 281 L326 299 L320 316 L313 334";

function PaintingArt() {
  return (
    <Frame width={870} height={870}>
      <Layer src="/art/painting-base.webp" />
      <svg viewBox="0 0 870 870" className="absolute inset-0 size-full" aria-hidden>
        <path
          d={STROKE}
          pathLength={100}
          className="art-stroke"
          fill="none"
          stroke="#d93a2b"
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Layer src="/art/painting-arm.webp" motion="art-paint origin-[85%_54%]" />
    </Frame>
  );
}

/** Notes and coins, each with its own lane, spin and timing. */
const CASH = [
  { left: "6%", delay: "0s", kind: "note", spin: "-18deg" },
  { left: "22%", delay: "0.45s", kind: "coin", spin: "0deg" },
  { left: "36%", delay: "0.15s", kind: "note", spin: "14deg" },
  { left: "50%", delay: "0.75s", kind: "note", spin: "-8deg" },
  { left: "62%", delay: "0.3s", kind: "coin", spin: "0deg" },
  { left: "74%", delay: "0.9s", kind: "note", spin: "22deg" },
  { left: "86%", delay: "0.55s", kind: "note", spin: "-26deg" },
  { left: "14%", delay: "1.05s", kind: "coin", spin: "0deg" },
  { left: "44%", delay: "1.2s", kind: "note", spin: "10deg" },
  { left: "80%", delay: "1.35s", kind: "coin", spin: "0deg" },
] as const;

function RupeeNote() {
  return (
    <svg viewBox="0 0 60 30" className="block w-12 drop-shadow-[2px_2px_0_rgb(0_0_0/0.35)]">
      <rect x="1" y="1" width="58" height="28" rx="2" fill="#c9dcb0" stroke="#3d5a2a" strokeWidth="2" />
      <rect x="6" y="5" width="48" height="20" rx="1" fill="none" stroke="#3d5a2a" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="44" cy="15" r="6" fill="#a9c48a" stroke="#3d5a2a" strokeWidth="1" />
      <text x="18" y="21" fontSize="16" fontWeight="700" fill="#2c4420" textAnchor="middle">₹</text>
    </svg>
  );
}

function RupeeCoin() {
  return (
    <svg viewBox="0 0 24 24" className="block w-6 drop-shadow-[2px_2px_0_rgb(0_0_0/0.35)]">
      <circle cx="12" cy="12" r="11" fill="#e8c35a" stroke="#7a5a12" strokeWidth="2" />
      <text x="12" y="17" fontSize="13" fontWeight="700" fill="#7a5a12" textAnchor="middle">₹</text>
    </svg>
  );
}

/** Money rains down over the collage while the card is hovered. */
function CashRain() {
  return (
    <span className="pointer-events-none absolute inset-0 block overflow-hidden" aria-hidden>
      {CASH.map((piece) => (
        <span
          key={`${piece.left}-${piece.delay}`}
          className="art-cash absolute -top-10 block"
          style={{ left: piece.left, animationDelay: piece.delay, rotate: piece.spin }}
        >
          {piece.kind === "note" ? <RupeeNote /> : <RupeeCoin />}
        </span>
      ))}
    </span>
  );
}

interface CategoryArtProps {
  slug: CategorySlug;
  art: string;
}

/** The art in the corner of each theme card. Each theme has its own move,
 *  played while the card is hovered (and looped on touch screens). */
export function CategoryArt({ slug, art }: CategoryArtProps) {
  switch (slug) {
    case "music":
      return <MusicArt />;
    case "dance":
      return <DanceArt />;
    case "art":
      return <PaintingArt />;
    case "business":
      return (
        <>
          <Image quality={90} src={art} alt="" fill sizes={SIZES} className="object-contain object-right-bottom" />
          <CashRain />
        </>
      );
    default:
      return (
        <span className="boil-on-hover absolute inset-0 block">
          <Image quality={90} src={art} alt="" fill sizes={SIZES} className="object-contain object-right-bottom" />
        </span>
      );
  }
}
