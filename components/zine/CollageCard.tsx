import type { ReactNode } from "react";
import { TornEdge } from "@/components/zine/TornEdge";
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

interface CollageCardProps {
  children: ReactNode;
  /** Vary per-instance so a grid of cards doesn't read as stamped-identical. */
  seed?: number;
  torn?: "top" | "bottom" | "left" | "right" | "none";
  tape?: boolean;
  /** "low" = dense-page-safe (subtle rotation, shallow tear). "high" = homepage collage moments. */
  intensity?: "low" | "high";
  className?: string;
}

export function CollageCard({
  children,
  seed = 1,
  torn = "top",
  tape = false,
  intensity = "low",
  className,
}: CollageCardProps) {
  const rand = mulberry32(seed * 97 + 13);
  const maxRotate = intensity === "high" ? 4 : 1.5;
  const rotate = (rand() * 2 - 1) * maxRotate;

  const card = (
    <div
      className={cn(
        "relative bg-maroon/60 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]",
        className,
      )}
      style={{ transform: `rotate(${rotate.toFixed(2)}deg)` }}
    >
      {tape ? (
        <span
          aria-hidden
          className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-3 rounded-[2px] bg-gold/25 shadow-sm"
        />
      ) : null}
      {children}
    </div>
  );

  if (torn === "none") return card;

  return (
    <TornEdge
      side={torn}
      seed={seed}
      depth={intensity === "high" ? 5 : 2.5}
      teeth={intensity === "high" ? 10 : 7}
      className="h-full w-full"
    >
      {card}
    </TornEdge>
  );
}
