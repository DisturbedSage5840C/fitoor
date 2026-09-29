import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionGround } from "@/components/shared/SectionGround";
import { Sticker } from "@/components/shared/Sticker";
import { categoryStickers } from "@/components/shared/categoryStickers";
import { categoryList } from "@/data/categories";
import { getEventsByCategory } from "@/data/events";
import type { CategorySlug } from "@/data/types";
import { cn } from "@/lib/utils";

/** Cards are pinned up by hand: uneven spans, tilts and drops, never a tidy grid. */
const LAYOUT: Record<
  CategorySlug,
  { span: string; tilt: number; drop: string; min: string }
> = {
  music: { span: "lg:col-span-4", tilt: -1.2, drop: "", min: "min-h-80 lg:min-h-[26rem]" },
  dance: { span: "lg:col-span-2", tilt: 1.6, drop: "lg:mt-10", min: "min-h-80 lg:min-h-96" },
  art: { span: "lg:col-span-2", tilt: 1, drop: "lg:-mt-2", min: "min-h-72" },
  "wit-whim": { span: "lg:col-span-2", tilt: -1.8, drop: "lg:mt-8", min: "min-h-72" },
  business: { span: "lg:col-span-2", tilt: 0.8, drop: "lg:mt-2", min: "min-h-72" },
};

export function Lineup() {
  return (
    <SectionGround ground="plain">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <RevealOnScroll variant="stamp">
            <NeonTitle>themes and events</NeonTitle>
          </RevealOnScroll>
          <Link
            href="/events"
            className="font-script inline-block py-2 text-2xl text-gold underline decoration-rose decoration-2 underline-offset-4 hover:text-gold-bright"
          >
            see all events
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
          {categoryList.map((category, i) => {
            const list = getEventsByCategory(category.slug);
            const l = LAYOUT[category.slug];
            const big = category.slug === "music";
            return (
              <div
                key={category.slug}
                className={cn(
                  "relative",
                  l.span,
                  l.drop,
                  i === 4 && "sm:col-span-2 lg:col-span-2",
                )}
                style={{ rotate: `${l.tilt}deg` }}
              >
                <Link
                  href={`/events/${category.slug}`}
                  data-category={category.slug}
                  className={cn(
                    "group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[6px] bg-category-bg p-6 shadow-[6px_7px_0_var(--category)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[9px_10px_0_var(--category)]",
                    l.min,
                  )}
                >
                  <div
                    className="halftone absolute inset-0 -z-10 opacity-70"
                    aria-hidden
                  />
                  <div
                    className={cn(
                      "sticker-edge absolute -right-2 -bottom-2 -z-10 aspect-square transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2",
                      big ? "w-3/5" : "w-2/3",
                    )}
                    aria-hidden
                  >
                    <Image
                      quality={90}
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
                      <span className="font-serif-dev text-lg text-category-light">
                        {category.hindiName}
                      </span>
                      <span
                        className="font-nastaliq text-lg text-category-light"
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
                          ? "text-5xl sm:text-7xl"
                          : "text-4xl xl:text-[2.6rem]",
                      )}
                    >
                      {category.name}
                    </h3>
                    <p className="font-script mt-1 text-2xl text-category-light">
                      {list.length} {list.length === 1 ? "event" : "events"}
                    </p>
                    <p className="font-body mt-1 max-w-[16rem] text-xs leading-relaxed text-cream/90">
                      {list.map((e) => e.title).join(", ")}
                    </p>
                  </div>
                </Link>

                <Sticker
                  tilt={i % 2 ? -14 : 12}
                  className={cn(
                    "absolute -top-5 z-10 size-14",
                    i % 2 ? "left-[58%]" : "right-16",
                    category.slug === "business" && "h-12 w-[5.5rem]",
                  )}
                >
                  {categoryStickers[category.slug]}
                </Sticker>
              </div>
            );
          })}
        </div>
      </div>
    </SectionGround>
  );
}
