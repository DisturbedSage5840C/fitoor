import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { categoryList, categoryIcons } from "@/data/categories";
import { getEventsByCategory } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description: "All four Fitoor 2026 event categories — Esports, Fitoor (Music), Naatak (Theatre), and 1900AD (Artwork).",
};

export default function EventsPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="03 — Events"
        title="Four categories, one fest"
        description="Pick a category to see the full lineup, rules, and coordinators."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryList.map((category, i) => {
          const Icon = categoryIcons[category.slug];
          const count = getEventsByCategory(category.slug).length;
          return (
            <RevealOnScroll key={category.slug} delay={i * 0.05}>
              <Link
                href={`/events/${category.slug}`}
                data-category={category.slug}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-category/40 bg-surface/60 p-6 transition-all hover:border-category hover:bg-surface hover:glow-category"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full border border-category bg-bg-deep/60 text-category-light">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <ArrowUpRight
                    className="size-5 text-cream/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pink"
                    aria-hidden
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="font-display text-2xl text-cream">{category.name}</h2>
                  <p className="font-body text-sm text-category-light">{category.tagline}</p>
                </div>

                <p className="font-body mt-auto text-xs text-cream/60">
                  {count} event{count === 1 ? "" : "s"}
                </p>
              </Link>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  );
}
