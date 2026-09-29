import type { Metadata } from "next";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { PageHeader } from "@/components/shared/PageHeader";
import { contacts, socials, telHref, venue } from "@/data/contacts";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Phone numbers and Instagram for the Fitoor 2026 organising team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="contact us" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 pb-24 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
        <ul className="divide-y divide-cream/15 border-y border-cream/15">
          {contacts.map((person) => (
            <li key={person.phone}>
              <a
                href={telHref(person.phone)}
                className="font-body flex min-h-16 items-baseline justify-between gap-4 py-5 hover:text-gold"
              >
                <span className="font-display text-3xl text-cream">
                  {person.name}
                </span>
                <span className="text-cream/75 tabular-nums">
                  {person.phone}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="space-y-8">
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-body inline-flex min-h-12 items-center gap-2 font-semibold text-gold underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
          >
            <InstagramIcon className="size-4" />@{socials.instagramHandle}
          </a>
          <div>
            <p className="font-body font-semibold text-cream">{venue.name}</p>
            <p className="font-body mt-1 text-cream/80">{venue.address}</p>
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="font-body mt-3 inline-flex min-h-12 items-center font-semibold text-gold underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
