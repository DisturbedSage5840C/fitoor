import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="flex items-center gap-2">
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
