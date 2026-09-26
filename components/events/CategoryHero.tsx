import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Category, EventItem } from "@/data/types";
import { cn } from "@/lib/utils";

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
      <div className="mx-auto grid grid-cols-1 max-w-6xl items-center gap-8 px-4 pt-10 pb-14 sm:px-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:pt-14 md:pb-20">
        <div>
          <Link
            href="/events"
            className="font-body inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-category-light/80 uppercase hover:text-category-light"
          >
            <ArrowLeft className="size-3.5" /> All events
          </Link>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-4">
            <h1
              className={cn(
                "font-title neon leading-none lowercase",
                // "miscellaneous" needs a smaller cap than "art" to stay on one line.
                category.name.length > 8
                  ? "text-[clamp(2.5rem,12vw,5.5rem)]"
                  : "text-7xl sm:text-8xl lg:text-9xl",
              )}
            >
              {category.name}
            </h1>
            <span className="font-serif-dev text-2xl text-category-light/80">
              {category.hindiName}
            </span>
          </div>
          <p className="font-script mt-2 text-2xl text-cream/85 sm:text-3xl">
            competitions and informations
          </p>
          <p className="font-body mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {category.description}
          </p>

          <nav
            aria-label={`${category.name} events`}
            className="mt-8 flex flex-wrap gap-2"
          >
            {events.map((event) => (
              <a
                key={event.id}
                href={`#${event.id}`}
                className="font-body rounded-full border border-category-light/30 px-4 py-1.5 text-sm font-semibold text-category-light transition-colors hover:bg-category hover:text-white"
              >
                {event.title}
              </a>
            ))}
          </nav>
        </div>

        <div className="relative mx-auto aspect-square w-3/4 max-w-sm md:w-full">
          <Image
            src={category.art}
            alt={category.artAlt}
            fill
            preload
            sizes="(min-width: 768px) 380px, 75vw"
            className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}
