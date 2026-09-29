import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { categoryList } from "@/data/categories";
import { getEventsByCategory } from "@/data/events";
import { cn } from "@/lib/utils";

/** One poster per category: 2 big on top, 3 below on desktop. */
export function Lineup() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <NeonTitle>themes and events</NeonTitle>
        <Link
          href="/events"
          className="font-body inline-block py-3 text-sm font-semibold text-gold hover:text-gold-bright"
        >
          See all events
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {categoryList.map((category, i) => {
          const list = getEventsByCategory(category.slug);
          const big = i < 2;
          return (
            <RevealOnScroll
              key={category.slug}
              delay={i * 0.05}
              className={cn(
                big ? "lg:col-span-3" : "lg:col-span-2",
                i === 4 && "sm:col-span-2 lg:col-span-2",
              )}
            >
              <Link
                href={`/events/${category.slug}`}
                data-category={category.slug}
                className={cn(
                  "group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-category-bg p-6 ring-1 ring-category/30 transition-shadow hover:ring-category",
                  big ? "min-h-80 lg:min-h-96" : "min-h-72",
                )}
              >
                <div
                  className="halftone absolute inset-0 -z-10 opacity-70"
                  aria-hidden
                />
                <div
                  className={cn(
                    "absolute -right-4 -bottom-4 -z-10 aspect-square transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2",
                    big ? "w-3/5" : "w-2/3",
                  )}
                  aria-hidden
                >
                  <Image
                    src={category.art}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 360px, 60vw"
                    className="object-contain object-right-bottom"
                  />
                </div>
                {/* Keeps the type legible where it runs over the artwork. */}
                <div
                  className="absolute inset-0 -z-10 bg-gradient-to-tr from-category-bg via-category-bg/60 to-transparent"
                  aria-hidden
                />

                <div className="flex items-start justify-between">
                  <span className="flex items-baseline gap-2">
                    <span className="font-serif-dev text-lg text-category-light/80">
                      {category.hindiName}
                    </span>
                    <span
                      className="font-nastaliq text-lg text-category-light/80"
                      dir="rtl"
                    >
                      {category.urduName}
                    </span>
                  </span>
                  <span className="grid size-10 place-items-center rounded-full border border-category-light/30 text-category-light transition-colors group-hover:bg-category group-hover:text-white">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>

                <div>
                  <h3
                    className={cn(
                      "font-title neon lowercase",
                      big
                        ? "text-5xl sm:text-6xl"
                        : "text-4xl xl:text-[2.6rem]",
                    )}
                  >
                    {category.name}
                  </h3>
                  <p className="font-body mt-2 text-sm font-semibold text-category-light">
                    {list.length} {list.length === 1 ? "event" : "events"}
                  </p>
                  <p className="font-body mt-1 max-w-[16rem] text-xs leading-relaxed text-cream/90">
                    {list.map((e) => e.title).join(" · ")}
                  </p>
                </div>
              </Link>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
