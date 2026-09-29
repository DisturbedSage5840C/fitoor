import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StickerProps {
  children: ReactNode;
  className?: string;
  tilt?: number;
  /** Wobbles and lifts on hover, like a sticker you could peel. */
  live?: boolean;
}

/** Die-cut sticker wrapper: white keyline on the silhouette, hard shadow, hand tilt. */
export function Sticker({ children, className, tilt = 0, live = true }: StickerProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "sticker-edge pointer-events-auto inline-block",
        live && "transition-transform duration-200 hover:-translate-y-1 hover:rotate-6",
        className,
      )}
      style={{ rotate: `${tilt}deg` }}
    >
      {children}
    </span>
  );
}
