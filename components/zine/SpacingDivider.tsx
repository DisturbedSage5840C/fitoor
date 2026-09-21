import { TornEdge } from "@/components/zine/TornEdge";
import { cn } from "@/lib/utils";

interface SpacingDividerProps {
  /** e.g. "PG. 04" — reuses the existing pixel-font eyebrow-label convention. */
  label?: string;
  seed?: number;
  className?: string;
}

export function SpacingDivider({ label, seed = 1, className }: SpacingDividerProps) {
  return (
    <div className={cn("relative my-8 flex items-center gap-4 sm:my-12", className)}>
      <TornEdge side="bottom" seed={seed} depth={3} teeth={14} className="h-3 flex-1">
        <div className="h-3 w-full bg-maroon-light/40" />
      </TornEdge>
      {label ? (
        <span className="font-pixel shrink-0 text-[10px] tracking-[0.2em] text-gold/70 uppercase">
          {label}
        </span>
      ) : null}
      <TornEdge side="top" seed={seed + 1} depth={3} teeth={14} className="h-3 flex-1">
        <div className="h-3 w-full bg-maroon-light/40" />
      </TornEdge>
    </div>
  );
}
