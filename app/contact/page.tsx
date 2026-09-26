import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { PageHeader } from "@/components/shared/PageHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { contacts, socials, telHref, venue } from "@/data/contacts";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Phone numbers and Instagram for the Fitoor 2026 organising team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="contact"
        script="call, text, or slide into the DMs"
        art={{
          src: "/art/glass-hand.webp",
          alt: "A ringed hand crushing a soda can",
          width: 636,
          height: 985,
        }}
      />

      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:py-24">
        <RevealOnScroll>
          <h2 className="font-title neon text-5xl lowercase">
            the organising team
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {contacts.map((person) => (
              <li key={person.phone}>
                <a
                  href={telHref(person.phone)}
                  className="group flex items-center justify-between rounded-xl border border-cream/10 bg-maroon px-5 py-4 transition-colors hover:border-gold/60"
                >
                  <span>
                    <span className="font-title block text-2xl text-cream">
                      {person.name}
                    </span>
                    <span className="font-body block text-sm text-cream/60 tabular-nums">
                      {person.phone}
                    </span>
                  </span>
                  <span className="grid size-10 place-items-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-maroon-deepest">
                    <Phone className="size-4" />
                    <span className="sr-only">Call {person.name}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="flex flex-col gap-4">
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl bg-rose p-7 text-white"
          >
            <InstagramIcon className="size-7" />
            <p className="font-title mt-3 text-4xl lowercase">
              @{socials.instagramHandle}
            </p>
            <p className="font-body mt-2 text-sm text-white/85">
              Registration links, schedule drops and announcements land here
              first.
            </p>
          </a>
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-gold/30 bg-maroon p-7 hover:border-gold"
          >
            <MapPin className="size-6 text-gold" />
            <p className="font-body mt-3 font-semibold text-cream">
              {venue.name}
            </p>
            <p className="font-body text-sm text-cream/65">{venue.address}</p>
            <p className="font-body mt-3 text-sm font-semibold text-gold">
              Open in Google Maps →
            </p>
          </a>
        </RevealOnScroll>
      </div>
    </>
  );
}
