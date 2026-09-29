import { cn } from "@/lib/utils";

/** Dupatta lace between sections: buta and diamonds, coloured by the text colour. */
export function TrimDivider({ className }: { className?: string }) {
  return <div aria-hidden className={cn("trim-lace text-gold/70", className)} />;
}
