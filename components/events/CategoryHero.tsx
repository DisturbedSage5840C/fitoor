import Image from "next/image";
import Link from "next/link";
import type { Category, EventItem } from "@/data/types";

export function CategoryHero({
  category,
  events,
}: {
  category: Category;
  events: EventItem[];
}) {
  return (
    <section className="bg-category-bg">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 pt-10 pb-14 sm:px-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:pt-14 md:pb-20">
        <div>
          <Link
            href="/events"
            className="font-body inline-flex min-h-12 items-center font-semibold text-category-light underline underline-offset-4"
          >
            All events
          </Link>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-5">
            <h1 className="font-display text-[clamp(3rem,13vw,7rem)] text-category-light">
              {category.name}
            </h1>
            <span className="font-serif-dev text-2xl text-cream/80">
              {category.hindiName}
            </span>
            <span className="font-nastaliq text-2xl text-cream/80" dir="rtl">
              {category.urduName}
            </span>
          </div>
          <p className="font-body prose-copy mt-6 text-lg text-cream/90">
            {category.description}
          </p>

          <nav aria-label={`${category.name} events`} className="mt-6">
            <ul className="flex flex-wrap gap-x-6">
              {events.map((event) => (
                <li key={event.id}>
                  <a
                    href={`#${event.id}`}
                    className="font-body inline-flex min-h-12 items-center font-semibold text-cream underline decoration-category-light/60 underline-offset-4 hover:decoration-category-light"
                  >
                    {event.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="relative mx-auto aspect-square w-3/4 max-w-sm md:w-full">
          <Image
            src={category.art}
            alt={category.artAlt}
            fill
            preload
            sizes="(min-width: 768px) 380px, 75vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
