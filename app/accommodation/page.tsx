import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { venue } from "@/data/contacts";
import { accommodationNote, hotels } from "@/data/content";

export const metadata: Metadata = {
  title: "Stay",
  description:
    "Hotels near Plaksha University for Fitoor 2026 participants, and how to get there.",
};

export default function AccommodationPage() {
  return (
    <>
      <PageHeader
        title="stay"
        script="where to crash near campus"
        intro="Fitoor doesn't run on-campus accommodation, but these hotels are a short ride from the gate."
        art={{
          src: "/art/auto-rickshaw.webp",
          alt: "A yellow-and-green auto rickshaw",
          width: 973,
          height: 604,
        }}
      />

      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:py-24">
        <RevealOnScroll>
          <h2 className="font-title neon text-5xl lowercase">nearby hotels</h2>
          <ul className="mt-8 space-y-4">
            {hotels.map((hotel, i) => (
              <li
                key={hotel.name}
                className="flex items-stretch overflow-hidden rounded-2xl border border-dashed border-gold/40 bg-maroon"
              >
                <span className="font-display grid w-16 shrink-0 place-items-center border-r border-dashed border-gold/40 text-3xl text-rose">
                  {i + 1}
                </span>
                <div className="flex flex-1 items-center justify-between gap-4 px-5 py-5">
                  <span className="font-title text-2xl text-cream sm:text-3xl">
                    {hotel.name}
                  </span>
                  <span className="text-right">
                    <span className="font-display block text-3xl leading-none text-gold">
                      {hotel.distance}
                    </span>
                    <span className="font-body text-[10px] font-semibold tracking-[0.2em] text-cream/50 uppercase">
                      from campus
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="font-body mt-6 max-w-xl text-sm leading-relaxed text-cream/65">
            {accommodationNote}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="rounded-2xl bg-gold p-7 text-maroon-deepest">
            <MapPin className="size-6" />
            <h2 className="font-title mt-3 text-4xl lowercase">getting here</h2>
            <p className="font-body mt-3 font-semibold">{venue.name}</p>
            <p className="font-body text-sm">{venue.address}</p>
            <p className="font-body mt-1 text-sm">{venue.region}</p>
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="font-body mt-6 inline-flex rounded-full bg-maroon-deepest px-5 py-2.5 text-sm font-bold text-gold hover:bg-maroon"
            >
              Open in Google Maps
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </>
  );
}
