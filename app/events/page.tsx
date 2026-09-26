import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { MascotStamp } from "@/components/shared/MascotStamp";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { categoryList } from "@/data/categories";
import { events, getEventsByCategory } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "All 20 Fitoor 2026 competitions across Music, Dance, Art, Miscellaneous and Business.",
};

export default function EventsPage() {
  return (
    <>
      <header className="relative mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
        <MascotStamp className="absolute top-16 right-6 hidden w-44 md:block" />
        <NeonTitle as="h1" size="xl" script="competitions and informations">
          events
        </NeonTitle>
        <p className="font-body mt-6 max-w-xl text-lg text-cream/75">
          {events.length} competitions across {categoryList.length} stages. Pick
          one, read the rules, round up your crew.
        </p>
        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Categories">
          {categoryList.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              data-category={c.slug}
              className="font-body rounded-full bg-category-bg px-4 py-1.5 text-sm font-semibold text-category-light ring-1 ring-category/40 hover:ring-category"
            >
              {c.name}
            </a>
          ))}
        </nav>
      </header>

      {categoryList.map((category) => {
        const list = getEventsByCategory(category.slug);
        return (
          <section
            key={category.slug}
            id={category.slug}
            data-category={category.slug}
            className="relative isolate scroll-mt-16 overflow-hidden bg-category-bg"
          >
            <div
              className="halftone absolute inset-0 -z-10 opacity-60"
              aria-hidden
            />
            <div className="mx-auto grid grid-cols-1 max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1.5fr] md:py-20">
              <RevealOnScroll>
                <div className="relative mb-4 aspect-square w-40 sm:w-52">
                  <Image
                    src={category.art}
                    alt={category.artAlt}
                    fill
                    sizes="208px"
                    className="object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.5)]"
                  />
                </div>
                <h2 className="font-title neon text-6xl lowercase sm:text-7xl">
                  {category.name}
                </h2>
                <p className="font-body mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
                  {category.description}
                </p>
                <Link
                  href={`/events/${category.slug}`}
                  className="font-body mt-5 inline-flex items-center gap-1.5 rounded-full bg-category px-5 py-2 text-sm font-bold text-white hover:opacity-90"
                >
                  Rules &amp; details <ArrowUpRight className="size-4" />
                </Link>
              </RevealOnScroll>

              <ul className="divide-y divide-cream/10 self-center border-y border-cream/10">
                {list.map((event) => (
                  <li key={event.id}>
                    <Link
                      href={`/events/${category.slug}#${event.id}`}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span>
                        <span className="font-title block text-3xl text-cream lowercase transition-colors group-hover:text-category-light">
                          {event.title}
                        </span>
                        <span className="font-body block text-sm text-cream/60">
                          {event.subtitle} · {event.format}
                        </span>
                      </span>
                      <ArrowUpRight className="size-5 shrink-0 text-cream/40 transition-colors group-hover:text-category-light" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </>
  );
}
