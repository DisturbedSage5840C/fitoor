import type { Metadata } from "next";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactChip } from "@/components/shared/ContactChip";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { generalContact, studentCoordinators } from "@/data/contacts";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Fitoor 2026 organizing committee.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-14 px-4 py-16 sm:px-6 sm:py-20">
      <div className="flex flex-col gap-6">
        <SectionHeading eyebrow="06 — Contact Us" title="Reach the committee" />
        <RevealOnScroll className="flex flex-wrap gap-3">
          <ContactChip icon={AtSign} label={generalContact.instagram.handle} href={generalContact.instagram.url} />
          <ContactChip icon={Mail} label={generalContact.email} href={`mailto:${generalContact.email}`} />
          <ContactChip icon={MapPin} label={generalContact.address} />
        </RevealOnScroll>
      </div>

      <div className="flex flex-col gap-6">
        <SectionHeading title="Student coordinators" />
        <RevealOnScroll>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {studentCoordinators.map((person) => (
              <li
                key={person.role}
                className="flex flex-col gap-1 bg-maroon px-5 py-4 sm:px-6"
              >
                <span className="font-body text-xs tracking-wide text-category-light uppercase">
                  {person.role}
                </span>
                <span className="font-display text-lg text-cream">{person.name}</span>
                <span className="font-body inline-flex items-center gap-1.5 text-sm text-cream/60">
                  <Phone className="size-3.5" aria-hidden />
                  {person.phone}
                </span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </div>
  );
}
