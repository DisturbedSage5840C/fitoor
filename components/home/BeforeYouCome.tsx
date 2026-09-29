import Link from "next/link";
import { accommodationIntro, generalRules, hotels } from "@/data/content";

/** Short version of the brochure's rules and accommodation pages. */
export function BeforeYouCome() {
  return (
    <section className="bg-maroon-deepest">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
        <div>
          <h2 className="font-display text-4xl text-gold sm:text-5xl">
            general rules
          </h2>
          <ul className="font-body mt-8 space-y-4 text-cream/85">
            {generalRules.slice(0, 4).map((rule) => (
              <li key={rule} className="prose-copy">
                {rule}
              </li>
            ))}
          </ul>
          <Link
            href="/generalities"
            className="font-body mt-4 inline-flex min-h-12 items-center font-semibold text-gold underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
          >
            All rules and security
          </Link>
        </div>

        <div>
          <h2 className="font-display text-4xl text-gold sm:text-5xl">
            accommodation
          </h2>
          <p className="font-body prose-copy mt-8 text-cream/85">
            {accommodationIntro}
          </p>
          <ul className="mt-6 divide-y divide-cream/15 border-y border-cream/15">
            {hotels.map((hotel) => (
              <li
                key={hotel.name}
                className="flex items-baseline justify-between py-4"
              >
                <span className="font-body font-semibold text-cream">
                  {hotel.name}
                </span>
                <span className="font-body text-cream/75 tabular-nums">
                  {hotel.distance}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/accommodation"
            className="font-body mt-4 inline-flex min-h-12 items-center font-semibold text-gold underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
          >
            Stay details
          </Link>
        </div>
      </div>
    </section>
  );
}
