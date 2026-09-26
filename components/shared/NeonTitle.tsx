import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeonTitleProps {
  children: ReactNode;
  /** Script line underneath, like the brochure's "competitions and informations". */
  script?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  size?: "md" | "lg" | "xl";
  className?: string;
}

const SIZES = {
  md: "text-4xl sm:text-5xl",
  lg: "text-5xl sm:text-7xl",
  xl: "text-6xl sm:text-8xl lg:text-9xl",
};

/**
 * The brochure's section heading: lowercase Yatra One with a neon halo that
 * follows the surrounding [data-category] (rose by default).
 */
export function NeonTitle({
  children,
  script,
  as: Tag = "h2",
  align = "left",
  size = "lg",
  className,
}: NeonTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Tag
        className={cn(
          "font-title neon leading-[0.95] lowercase text-balance",
          SIZES[size],
        )}
      >
        {children}
      </Tag>
      {script ? (
        <p className="font-script -mt-1 text-xl text-cream/85 sm:text-2xl">
          {script}
        </p>
      ) : null}
    </div>
  );
}
