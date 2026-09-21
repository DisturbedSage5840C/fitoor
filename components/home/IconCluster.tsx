import Link from "next/link";
import { categoryList, categoryIcons } from "@/data/categories";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function IconCluster() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Five Categories"
        title="Pick your obsession"
        frame="zine"
        className="mb-10"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categoryList.map((category, i) => {
          const Icon = categoryIcons[category.slug];
          return (
            <RevealOnScroll key={category.slug} variant="flip" delay={i * 0.05}>
              <Link
                href={`/events/${category.slug}`}
                data-category={category.slug}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-category/30 bg-maroon/50 px-4 py-8 text-center transition-all hover:border-category hover:bg-maroon"
              >
                <span className="glow-category flex size-14 items-center justify-center rounded-full bg-category/15 text-category-light transition-transform group-hover:scale-110">
                  <Icon className="size-7" aria-hidden />
                </span>
                <span className="font-display text-base text-cream sm:text-lg">
                  {category.name}
                </span>
                <span className="font-body text-xs text-cream/60">{category.tagline}</span>
              </Link>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
