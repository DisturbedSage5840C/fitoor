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
        <span className="font-body text-[10px] font-semibold tracking-[0.2em] text-category-light uppercase">
          {eyebrow}
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
