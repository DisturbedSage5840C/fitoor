import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TicketCardProps {
  children: ReactNode;
  className?: string;
  tilt?: number;
  /** Where the side notches sit, as a CSS length or percentage. */
  notchY?: string;
  /** Colour of the hard offset shadow. Defaults to rose. */
  shadow?: string;
}

/** Ticket stub: punched side notches, hard offset shadow, a torn dashed keyline. */
export function TicketCard({
  children,
  className,
  tilt = 0,
  notchY = "50%",
  shadow = "var(--rose)",
}: TicketCardProps) {
  return (
    <div
      className="drop-shadow-[5px_6px_0_var(--ticket-shadow)]"
      style={{ rotate: `${tilt}deg`, "--ticket-shadow": shadow } as React.CSSProperties}
    >
      <div
        className={cn("ticket-notches relative bg-cream text-maroon-deepest", className)}
        style={{ "--notch-y": notchY } as React.CSSProperties}
      >
        <div className="pointer-events-none absolute inset-2 rounded-[2px] border border-dashed border-maroon-deepest/40" />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
