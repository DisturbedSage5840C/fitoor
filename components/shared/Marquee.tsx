import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** A looping ticker strip. The list is rendered twice so the -50% loop is seamless. */
export function Marquee({ items, className }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <span className="px-5 whitespace-nowrap">{item}</span>
          <span className="text-[0.6em] opacity-70" aria-hidden>
            ✦
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div className="flex animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
