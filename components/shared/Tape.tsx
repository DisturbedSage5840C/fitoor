import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TapeProps {
  children?: ReactNode;
  className?: string;
  /** Degrees. Every strip is put on by hand, so pass a different one each time. */
  tilt?: number;
  tone?: "bandage" | "rose" | "gold";
}

const TONES = {
  bandage: "bg-bandage/90 text-maroon-deepest",
  rose: "bg-rose/90 text-maroon-deepest",
  gold: "bg-gold/95 text-maroon-deepest",
} as const;

/** A strip of torn masking tape. Holds a heading, a number, or just pins a corner. */
export function Tape({ children, className, tilt = -2, tone = "bandage" }: TapeProps) {
  return (
    <span
      className={cn(
        "torn-ends inline-block px-5 py-1.5 shadow-[0_2px_4px_rgb(0_0_0/0.35)]",
        TONES[tone],
        className,
      )}
      style={{ rotate: `${tilt}deg` }}
    >
      {children}
    </span>
  );
}
