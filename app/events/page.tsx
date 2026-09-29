import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { categoryList } from "@/data/categories";
import { events, getEventsByCategory } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description: `All ${events.length} Fitoor 2026 competitions across music, dance, art, wit and business.`,
};

export default function EventsPage() {
  return (
    <>
      <header className="bg-maroon">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 sm:pt-24">
          <h1 className="font-display text-6xl text-gold sm:text-7xl lg:text-8xl">
            events
          </h1>
          <nav aria-label="Categories" className="mt-6">
            <ul className="flex flex-wrap gap-x-6">
              {categoryList.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`#${c.slug}`}
                    className="font-body inline-flex min-h-12 items-center font-semibold text-cream underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {categoryList.map((category) => {
        const list = getEventsByCategory(category.slug);
        return (
          <section
            key={category.slug}
            id={category.slug}
            data-category={category.slug}
            className="scroll-mt-16 bg-category-bg"
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1.5fr] md:py-20">
              <div>
                <div className="relative mb-4 aspect-square w-32 sm:w-44">
                  <Image
                    src={category.art}
                    alt={category.artAlt}
                    fill
                    sizes="176px"
                    className="object-contain"
                  />
                </div>
                <h2 className="font-display text-5xl text-category-light sm:text-6xl">
                  {category.name}
                </h2>
                <p className="font-body prose-copy mt-4 text-cream/85">
                  {category.description}
                </p>
                <Link
                  href={`/events/${category.slug}`}
                  className="font-body mt-3 inline-flex min-h-12 items-center font-semibold text-category-light underline underline-offset-4"
                >
                  Rules and details
                </Link>
              </div>

              <ul className="divide-y divide-cream/20 self-center border-y border-cream/20">
                {list.map((event) => (
                  <li key={event.id}>
                    <Link
                      href={`/events/${category.slug}#${event.id}`}
                      className="group block py-4"
                    >
                      <span className="font-display block text-3xl text-cream group-hover:text-category-light">
                        {event.title}
                      </span>
                      <span className="font-body block text-cream/90">
                        {event.subtitle}, {event.format}
                      </span>
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
