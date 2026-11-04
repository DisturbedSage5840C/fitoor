import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Sticker } from "@/components/shared/Sticker";
import { Tape } from "@/components/shared/Tape";
import { categoryStickers } from "@/components/shared/categoryStickers";
import type { Category, EventItem } from "@/data/types";
import { cn } from "@/lib/utils";

const TONES = ["rose", "gold", "bandage"] as const;
const TILTS = [-2.5, 2, -1.5, 3, -3];

export function CategoryHero({
  category,
  events,
}: {
  category: Category;
  events: EventItem[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-category-bg">
      <div className="halftone absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 pt-10 pb-14 sm:px-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:pt-14 md:pb-20">
        <div>
          <Link
            href="/events"
            className="font-body inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-category-light uppercase hover:text-category-light"
          >
            <ArrowLeft className="size-3.5" /> All events
          </Link>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-4">
            <h1
              className={cn(
                "font-title neon leading-none lowercase",
                // Longer names ("Art & Expression", "Wit & Whim") need a smaller cap to stay on one line.
                category.name.length > 8
                  ? "text-[clamp(2.5rem,12vw,5.5rem)]"
                  : "text-7xl sm:text-8xl lg:text-9xl",
              )}
            >
              {category.name}
            </h1>
            <span className="font-serif-dev text-2xl text-category-light">
              {category.hindiName}
            </span>
            <span className="font-nastaliq text-2xl text-category-light" dir="rtl">
              {category.urduName}
            </span>
          </div>
          <p className="font-script mt-2 text-2xl text-cream sm:text-3xl">
            {events.length} events
          </p>
          <p className="font-body mt-6 max-w-xl text-base leading-relaxed text-cream sm:text-lg">
            {category.description}
          </p>

          <nav
            aria-label={`${category.name} events`}
            className="mt-8 flex flex-wrap gap-x-3 gap-y-1"
          >
            {events.map((event, i) => (
              <a
                key={event.id}
                href={`#${event.id}`}
                className="font-body inline-flex min-h-11 items-center text-sm font-bold transition-transform hover:-translate-y-0.5"
              >
                <Tape tilt={TILTS[i % TILTS.length]} tone={TONES[i % TONES.length]}>
                  {event.title}
                </Tape>
              </a>
            ))}
          </nav>
        </div>

        <div className="group relative mx-auto aspect-square w-3/4 max-w-sm md:w-full">
          <Image
            quality={90}
            src={category.art}
            alt={category.artAlt}
            fill
            preload
            sizes="(min-width: 768px) 380px, 75vw"
            className="sticker-edge boil-on-hover rotate-3 object-contain"
          />
          <Sticker tilt={-12} className="absolute top-0 -left-2 size-16 sm:size-20">
            {categoryStickers[category.slug]}
          </Sticker>
        </div>
      </div>
    </section>
  );
}
