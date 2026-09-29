import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionGround } from "@/components/shared/SectionGround";
import { Marigold } from "@/components/shared/Stickers";
import { Tape } from "@/components/shared/Tape";
import { venue } from "@/data/contacts";
import { accommodationIntro, accommodationNote, hotels } from "@/data/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Stay",
  description:
    "Hotels near Plaksha University for Fitoor 2026 participants, and how to get there.",
};

/** Hung by hand: each tag has its own tilt, drop and stamp angle. */
const TAGS = [
  { tilt: -3, drop: "md:mt-0", stamp: 6, shadow: "var(--rose)" },
  { tilt: 2, drop: "md:mt-10", stamp: -5, shadow: "var(--gold)" },
  { tilt: -1.5, drop: "md:mt-4", stamp: 4, shadow: "var(--rose)" },
];

export default function AccommodationPage() {
  return (
    <>
      <PageHeader
        title="accommodation"
        intro={accommodationIntro}
        ground="plain"
        artTilt={-4}
        sticker={<Marigold />}
        art={{
          src: "/art/auto-rickshaw.webp",
          alt: "A yellow-and-green auto rickshaw",
          width: 973,
          height: 604,
        }}
      />

      <SectionGround ground="grain">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 pt-24 pb-20 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:pb-28">
          <div>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
              {hotels.map((hotel, i) => {
                const tag = TAGS[i % TAGS.length];
                return (
                  <li key={hotel.name} className={tag.drop}>
                    <div
                      className="drop-shadow-[5px_6px_0_var(--tag-shadow)]"
                      style={{ rotate: `${tag.tilt}deg`, "--tag-shadow": tag.shadow } as React.CSSProperties}
                    >
                      <div className="relative flex min-h-64 flex-col items-center bg-cream px-5 pt-14 pb-6 text-center text-maroon-deepest [clip-path:polygon(22%_0,78%_0,100%_8%,100%_100%,0_100%,0_8%)]">
                        <span
                          aria-hidden
                          className="absolute top-4 left-1/2 size-4 -translate-x-1/2 rounded-full bg-maroon shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]"
                        />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-2 top-8 border border-dashed border-maroon-deepest/40"
                        />
                        <h2 className="font-title relative text-3xl leading-tight lowercase">
                          {hotel.name}
                        </h2>
                        <p
                          className="font-display relative mt-auto inline-block border-[3px] border-double border-rose-ink px-4 py-1.5 text-3xl text-rose-ink"
                          style={{ rotate: `${tag.stamp}deg` }}
                        >
                          {hotel.distance}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="font-body mt-14 max-w-xl leading-relaxed text-cream/85">
              {accommodationNote}
            </p>
          </div>

          <div className="lg:pt-10">
            <div className="rotate-1 drop-shadow-[6px_7px_0_var(--rose)]">
              <div className="torn-ends relative bg-gold px-7 pt-14 pb-9 text-maroon-deepest">
                <Tape tilt={-3} tone="bandage" className="absolute top-3 left-6 px-8 py-2" />
                <MapPin className="size-6" />
                <h2 className="font-title mt-3 text-4xl lowercase">address</h2>
                <p className="font-body mt-3 font-semibold">{venue.name}</p>
                <p className="font-body text-sm">{venue.address}</p>
                <p className="font-body mt-1 text-sm">{venue.region}</p>
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "font-body mt-6 inline-flex min-h-11 items-center bg-maroon-deepest px-5 text-sm font-bold text-gold",
                    "shadow-[3px_3px_0_var(--rose)] transition-transform hover:-translate-y-0.5 hover:bg-maroon",
                  )}
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionGround>
    </>
  );
}
