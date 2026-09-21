import { cn } from "@/lib/utils";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FONT_CYCLE = ["font-display", "font-body-alt", "font-script"];

interface ClippingTextProps {
  text: string;
  seed?: number;
  className?: string;
}

/**
 * Magazine-clipping treatment: each word gets its own jittered rotation
 * and cycles through the brand's display/body/script fonts, like pasted-in
 * cutout letters. Deliberately reserved for hero taglines/transitions only
 * — used on every heading it would read as noisy, not intentional.
 */
export function ClippingText({ text, seed = 1, className }: ClippingTextProps) {
  const rand = mulberry32(seed * 53 + 7);
  const words = text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      {words.map((word, i) => {
        const rotate = (rand() * 2 - 1) * 4;
        const font = FONT_CYCLE[Math.floor(rand() * FONT_CYCLE.length)];
        return (
          <span
            key={`${word}-${i}`}
            className={cn(
              font,
              "inline-block bg-maroon-light/70 px-1.5 py-0.5 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.5)]",
            )}
            style={{ transform: `rotate(${rotate.toFixed(2)}deg)` }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
