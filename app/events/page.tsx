import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { MascotStamp } from "@/components/shared/MascotStamp";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Sticker } from "@/components/shared/Sticker";
import { Tape } from "@/components/shared/Tape";
import { TicketCard } from "@/components/shared/TicketCard";
import { categoryStickers } from "@/components/shared/categoryStickers";
import { categoryList } from "@/data/categories";
import { getEventsByCategory } from "@/data/events";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
  alternates: { canonical: "/events" },
  description:
    "All 21 Fitoor 2026 competitions across Music, Dance, Art & Expression, Wit & Whim and Business.",
};

const TAB_TONES = ["rose", "gold", "bandage", "rose", "gold"] as const;
const TAB_TILTS = [-3, 2, -1.5, 3, -2.5];
const ROW_TILTS = [-0.6, 0.5, -0.3, 0.7, -0.5];
const ROW_NOTCH = ["50%", "38%", "62%", "45%", "55%"];

export default function EventsPage() {
  return (
    <>
      <header className="relative mx-auto max-w-6xl px-4 pt-14 pb-12 sm:px-6 sm:pt-20">
        <MascotStamp className="absolute top-16 right-6 hidden w-44 md:block" />
        <RevealOnScroll variant="stamp">
          <NeonTitle as="h1" size="xl" script="competitions and informations">
            events
          </NeonTitle>
        </RevealOnScroll>
        <nav className="mt-10 flex flex-wrap gap-x-3 gap-y-2" aria-label="Categories">
          {categoryList.map((c, i) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="font-body inline-flex min-h-11 items-center py-1 text-sm font-bold transition-transform hover:-translate-y-0.5"
            >
              <Tape tilt={TAB_TILTS[i]} tone={TAB_TONES[i]}>
                {c.name}
              </Tape>
            </a>
          ))}
        </nav>
      </header>

      {categoryList.map((category, bandIndex) => {
        const list = getEventsByCategory(category.slug);
        const flip = bandIndex % 2 === 1;
        return (
          <section
            key={category.slug}
            id={category.slug}
            data-category={category.slug}
            className="relative isolate scroll-mt-16 overflow-hidden bg-category-bg"
          >
            <div className="halftone absolute inset-0 -z-10 opacity-60" aria-hidden />
            <div
              className={cn(
                "mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:py-20",
                flip ? "md:grid-cols-[1.5fr_1fr]" : "md:grid-cols-[1fr_1.5fr]",
              )}
            >
              <div className={cn("self-start", flip && "md:order-2")}>
                <div className="relative mb-6 aspect-square w-44 sm:w-56">
                  <Image
                    quality={90}
                    src={category.art}
                    alt={category.artAlt}
                    fill
                    sizes="224px"
                    className="sticker-edge object-contain"
                    style={{ rotate: flip ? "4deg" : "-4deg" }}
                  />
                  <Sticker
                    tilt={flip ? -10 : 12}
                    className={cn(
                      "absolute -top-3 size-14 sm:size-16",
                      flip ? "-left-3" : "-right-3",
                    )}
                  >
                    {categoryStickers[category.slug]}
                  </Sticker>
                </div>
                <h2 className="font-title neon text-6xl lowercase sm:text-7xl">
                  {category.name}
                </h2>
                <p className="font-body mt-4 max-w-sm text-sm leading-relaxed text-cream/90">
                  {category.description}
                </p>
                <Link
                  href={`/events/${category.slug}`}
                  className="font-body mt-5 inline-flex min-h-11 items-center"
                >
                  <Tape tilt={flip ? 2 : -2} tone="gold" className="inline-flex items-center gap-1.5 font-bold">
                    Rules and details <ArrowUpRight className="size-4" />
                  </Tape>
                </Link>
              </div>

              <ul className={cn("flex flex-col gap-5 self-center", flip && "md:order-1")}>
                {list.map((event, i) => (
                  <li key={event.id}>
                    <TicketCard
                      tilt={ROW_TILTS[(i + bandIndex) % ROW_TILTS.length]}
                      notchY={ROW_NOTCH[(i + bandIndex) % ROW_NOTCH.length]}
                      shadow="var(--category)"
                    >
                      <Link
                        href={`/events/${category.slug}#${event.id}`}
                        className="group flex min-h-16 items-center justify-between gap-4 px-6 py-4"
                      >
                        <span>
                          <span className="font-title block text-2xl leading-tight lowercase sm:text-3xl">
                            {event.title}
                          </span>
                          <span className="font-body block text-sm text-maroon-deepest/75">
                            {event.subtitle} · {event.format}
                          </span>
                        </span>
                        <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </TicketCard>
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
