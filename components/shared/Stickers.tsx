import { cn } from "@/lib/utils";

/** Hand-cut sticker art from the moodboard: the smiley, the QR tattoo, the
 *  coded coral label, the crossed swords in gold thread. Plain SVG, decorative
 *  by default, so each is hidden from assistive tech. */
interface GlyphProps {
  className?: string;
}

export function Smiley({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={cn("size-full", className)}>
      <circle cx="50" cy="50" r="46" fill="#f4d896" stroke="#1c0407" strokeWidth="5" />
      <ellipse cx="34" cy="40" rx="6" ry="9" fill="#1c0407" />
      <ellipse cx="66" cy="40" rx="6" ry="9" fill="#1c0407" />
      <path
        d="M24 60c8 19 44 19 52 0"
        fill="none"
        stroke="#1c0407"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="22" cy="58" r="5" fill="#ff4f6d" opacity=".7" />
      <circle cx="78" cy="58" r="5" fill="#ff4f6d" opacity=".7" />
    </svg>
  );
}

/** A blocky barcode with a code string, like the label on the moodboard's arm. */
export function BarcodeTag({ code = "FT-26-1114", className }: GlyphProps & { code?: string }) {
  const bars = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3];
  let x = 6;
  return (
    <svg viewBox="0 0 140 76" aria-hidden className={cn("size-full", className)}>
      <rect x="1.5" y="1.5" width="137" height="73" rx="5" fill="#efe4cf" stroke="#1c0407" strokeWidth="3" />
      {bars.map((w, i) => {
        const rect = i % 2 === 0 ? <rect key={i} x={x} y="10" width={w * 2.4} height="40" fill="#1c0407" /> : null;
        x += w * 2.4;
        return rect;
      })}
      <text
        x="70"
        y="65"
        textAnchor="middle"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="10"
        fontWeight="700"
        fill="#1c0407"
        letterSpacing="2"
      >
        {code}
      </text>
    </svg>
  );
}

/** The coral coded label. Wording is passed in, not baked in. */
export function WordTag({ children, className }: GlyphProps & { children: string }) {
  return (
    <span
      className={cn(
        "font-display inline-block rounded-[3px] border-2 border-maroon-deepest bg-rose px-3 py-1 text-lg leading-none tracking-wider text-maroon-deepest uppercase shadow-[2px_3px_0_rgb(0_0_0/0.45)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Two crossed katanas in gold thread, hand-drawn wobble on purpose. */
export function SwordsGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={cn("size-full", className)}>
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 88 L80 14" />
        <path d="M86 88 L20 14" />
        <path d="M70 26 l10 10 M30 26 l-10 10" />
        <path d="M11 91 l7-3 M89 91 l-7-3" />
        <path d="M78 12 l7-4 -1 8" />
        <path d="M22 12 l-7-4 1 8" />
      </g>
    </svg>
  );
}

/** Starburst behind a number or word. Points are jittered so it never looks stamped by a machine. */
export function Burst({ className }: GlyphProps) {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const r = i % 2 === 0 ? 48 : 38 + ((i * 7) % 5);
    return `${(50 + Math.cos(a) * r).toFixed(1)},${(50 + Math.sin(a) * r).toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={cn("size-full", className)}>
      <polygon points={pts} fill="currentColor" stroke="#1c0407" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

/** Marigold: the flower on every truck garland and every bride's mala. */
export function Marigold({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={cn("size-full", className)}>
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="22"
          rx="10"
          ry="20"
          fill={i % 2 ? "#f08a4b" : "#e8a33d"}
          stroke="#1c0407"
          strokeWidth="2"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="10" fill="#8a3b10" stroke="#1c0407" strokeWidth="2" />
    </svg>
  );
}
