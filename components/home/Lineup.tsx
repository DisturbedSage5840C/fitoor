import Image from "next/image";
import Link from "next/link";
import { categoryList } from "@/data/categories";
import { getEventsByCategory } from "@/data/events";

/** One flat colour band per category, the way the brochure spreads them. */
export function Lineup() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-12 sm:px-6 lg:pt-32">
        <h2 className="font-display text-5xl text-gold sm:text-6xl">
          themes and events
        </h2>
        <Link
          href="/events"
          className="font-body mt-4 inline-flex min-h-12 items-center font-semibold text-cream underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
        >
          See all events
        </Link>
      </div>

      {categoryList.map((category, i) => {
        const list = getEventsByCategory(category.slug);
        const flip = i % 2 === 1;
        return (
          <div
            key={category.slug}
            data-category={category.slug}
            className="bg-category-bg"
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
              <div className={flip ? "lg:order-2" : ""}>
                <h3 className="font-display text-4xl text-category-light sm:text-5xl">
                  <Link
                    href={`/events/${category.slug}`}
                    className="hover:underline decoration-2 underline-offset-8"
                  >
                    {category.name}
                  </Link>
                </h3>
                <p className="font-body prose-copy mt-5 text-cream/90">
                  {category.description}
                </p>
                <p className="font-body mt-5 text-cream/90">
                  {list.map((event) => event.title).join(", ")}
                </p>
              </div>
              <Image
                src={category.art}
                alt={category.artAlt}
                width={640}
                height={640}
                sizes="(min-width: 1024px) 420px, 60vw"
                className={`mx-auto h-64 w-auto max-w-full object-contain lg:h-80 ${
                  flip ? "lg:order-1" : ""
                }`}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
