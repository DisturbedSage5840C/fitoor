import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "plain" (default) is the original eyebrow treatment, unchanged. "zine" wraps it as a rotated stamp. */
  frame?: "plain" | "zine";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  frame = "plain",
  className,
}: SectionHeadingProps) {
  // Deterministic per-instance tilt (from title length) rather than a fixed
  // angle, so a page with several zine-framed headings doesn't repeat the
  // exact same stamp rotation.
  const stampRotate = frame === "zine" ? ((title.length * 7) % 5) - 2 : 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "flex items-center gap-2",
            frame === "zine" &&
              "w-fit border border-gold/30 bg-maroon-light/30 px-3 py-1.5 shadow-[0_4px_12px_-6px_rgba(0,0,0,0.6)]",
          )}
          style={frame === "zine" ? { transform: `rotate(${stampRotate}deg)` } : undefined}
        >
          <span className="flex items-center gap-1" aria-hidden>
            <span className="size-1.5 rounded-full bg-dance" />
            <span className="size-1.5 rounded-full bg-gold" />
            <span className="size-1.5 rounded-full bg-sunset" />
          </span>
          <span className="font-pixel text-[10px] tracking-[0.2em] text-category-light uppercase">
            {eyebrow}
          </span>
        </span>
      ) : null}
      <h2 className="font-display text-4xl sm:text-5xl font-bold text-cream text-balance">
        {title}
      </h2>
      {description ? (
        <p className="font-body max-w-2xl text-cream/70 text-base sm:text-lg text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}
