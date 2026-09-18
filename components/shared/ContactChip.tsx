import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactChipProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  className?: string;
}

export function ContactChip({ icon: Icon, label, href, className }: ContactChipProps) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-full border border-cream/15 bg-maroon px-4 py-2 font-body text-sm text-cream/90 transition-colors hover:border-gold/50 hover:text-gold",
    className,
  );

  const content = (
    <>
      <Icon className="size-4 shrink-0" aria-hidden />
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return <span className={classes}>{content}</span>;
}
