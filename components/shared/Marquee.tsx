import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
  /** Glyph between items. Defaults to a four-point star. */
  separator?: ReactNode;
}

/** A looping ticker strip. The list is rendered twice so the -50% loop is seamless. */
export function Marquee({ items, className, reverse, separator = "✦" }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <span className="px-5 whitespace-nowrap">{item}</span>
          <span className="flex items-center text-[0.6em] opacity-80" aria-hidden>
            {separator}
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div className={cn("flex", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
