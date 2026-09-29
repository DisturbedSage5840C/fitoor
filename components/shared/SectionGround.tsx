import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const GROUNDS = {
  plain: "bg-maroon-deepest",
  polka: "bg-dupatta polka-purple",
  halftone: "bg-maroon halftone",
  grain: "bg-maroon",
} as const;

interface SectionGroundProps {
  ground: keyof typeof GROUNDS;
  children: ReactNode;
  className?: string;
}

/** One texture per section, so the page changes surface as you scroll. */
export function SectionGround({ ground, children, className }: SectionGroundProps) {
  return (
    <section className={cn("relative isolate overflow-hidden", GROUNDS[ground], className)}>
      {ground === "grain" && (
        <div
          aria-hidden
          className="grain-texture pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-overlay"
        />
      )}
      {children}
    </section>
  );
}
