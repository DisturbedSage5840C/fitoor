import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

const contents = [
  { number: "01", label: "About Us", href: "/about" },
  { number: "02", label: "Schedule", href: "/schedule" },
  { number: "03", label: "Events", href: "/events" },
  { number: "04", label: "Generalities", href: "/generalities" },
  { number: "05", label: "Security & Accommodation", href: "/accommodation" },
  { number: "06", label: "Contact Us", href: "/contact" },
];

export function ContentsNav() {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
      {contents.map((item, i) => (
        <RevealOnScroll key={item.href} delay={i * 0.04}>
          <Link
            href={item.href}
            className="group flex items-center justify-between gap-4 bg-surface px-6 py-6 transition-colors hover:bg-surface-light sm:px-8"
          >
            <span className="flex items-baseline gap-4">
              <span className="font-body text-xs font-semibold tracking-[0.15em] text-pink/70">{item.number}</span>
              <span className="font-display text-xl text-cream group-hover:text-pink sm:text-2xl">
                {item.label}
              </span>
            </span>
            <ArrowUpRight
              className="size-5 shrink-0 text-cream/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pink"
              aria-hidden
            />
          </Link>
        </RevealOnScroll>
      ))}
    </div>
  );
}
