import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Side = "top" | "bottom" | "left" | "right";

/**
 * Deterministic PRNG (mulberry32) so a given `seed` always produces the
 * same tear shape on both server and client — no hydration mismatch, and
 * repeated TornEdge instances read as hand-torn rather than copy-pasted
 * as long as callers vary the seed.
 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface TornEdgeProps {
  children: ReactNode;
  side?: Side;
  seed?: number;
  teeth?: number;
  /** How far the tear reaches into the cross-axis, as a percentage. */
  depth?: number;
  className?: string;
}

export function TornEdge({
  children,
  side = "top",
  seed = 1,
  teeth = 9,
  depth = 6,
  className,
}: TornEdgeProps) {
  const rand = mulberry32(seed);
  const steps = teeth * 2;
  const points: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const along = (i / steps) * 100;
    const jitter = i === 0 || i === steps ? 0 : rand() * depth;
    const cross = i % 2 === 0 ? 0 : jitter;
    if (side === "top" || side === "bottom") {
      points.push(`${along}% ${side === "top" ? cross : 100 - cross}%`);
    } else {
      points.push(`${side === "left" ? cross : 100 - cross}% ${along}%`);
    }
  }

  if (side === "top") {
    points.push("100% 100%", "0% 100%");
  } else if (side === "bottom") {
    points.push("100% 0%", "0% 0%");
  } else if (side === "left") {
    points.push("100% 100%", "100% 0%");
  } else {
    points.push("0% 100%", "0% 0%");
  }

  return (
    <div
      className={cn("relative", className)}
      style={{ clipPath: `polygon(${points.join(", ")})` } as CSSProperties}
    >
      {children}
    </div>
  );
}
