import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { venue } from "@/data/contacts";
import { accommodationIntro, accommodationNote, hotels } from "@/data/content";

export const metadata: Metadata = {
  title: "Accommodation",
  description: accommodationIntro,
};

export default function AccommodationPage() {
  return (
    <>
      <PageHeader title="accommodation" intro={accommodationIntro} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:py-24">
        <div>
          <ul className="divide-y divide-cream/15 border-y border-cream/15">
            {hotels.map((hotel) => (
              <li
                key={hotel.name}
                className="flex items-baseline justify-between gap-4 py-5"
              >
                <span className="font-display text-3xl text-cream">
                  {hotel.name}
                </span>
                <span className="font-body text-cream/75 tabular-nums">
                  {hotel.distance}
                </span>
              </li>
            ))}
          </ul>
          <p className="font-body prose-copy mt-8 text-cream/80">
            {accommodationNote}
          </p>
        </div>

        <div>
          <p className="font-body font-semibold text-cream">{venue.name}</p>
          <p className="font-body prose-copy mt-1 text-cream/80">
            {venue.address}
          </p>
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="font-body mt-4 inline-flex min-h-12 items-center font-semibold text-gold underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </>
  );
}
