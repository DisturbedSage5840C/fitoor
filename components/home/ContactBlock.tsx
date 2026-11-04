import { CanCrush } from "@/components/art/CanCrush";
import { Phone } from "lucide-react";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionGround } from "@/components/shared/SectionGround";
import { TicketCard } from "@/components/shared/TicketCard";
import { contacts, socials, telHref } from "@/data/contacts";

const TILTS = [-2, 1.5, 2.5, -1.5, 1, -2.5];

export function ContactBlock() {
  return (
    <SectionGround ground="halftone">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-28">
        <div>
          <RevealOnScroll variant="stamp">
            <NeonTitle>contact us</NeonTitle>
          </RevealOnScroll>
          <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
            {contacts.map((person, i) => (
              <li key={person.phone}>
                <a
                  href={telHref(person.phone)}
                  className="group block transition-transform hover:-translate-y-1"
                >
                  <TicketCard tilt={TILTS[i % TILTS.length]} notchY={i % 2 ? "38%" : "62%"}>
                    <span className="flex items-center justify-between gap-3 px-6 py-4">
                      <span>
                        <span className="font-title block text-xl leading-tight">
                          {person.name}
                        </span>
                        <span className="font-display block text-2xl tracking-wide tabular-nums">
                          {person.phone}
                        </span>
                      </span>
                      <Phone className="size-5 shrink-0 text-rose" />
                    </span>
                  </TicketCard>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="group relative mt-12 inline-flex min-h-12 items-center"
          >
            <span
              className="sticker-edge -rotate-3 rounded-[3px] bg-rose transition-transform group-hover:rotate-2 group-hover:scale-105"
            >
              <span className="font-display flex items-center gap-3 px-6 py-3 text-2xl text-maroon-deepest">
                <InstagramIcon className="size-6" />@{socials.instagramHandle}
              </span>
            </span>
          </a>
        </div>

        <CanCrush />
      </div>
    </SectionGround>
  );
}
