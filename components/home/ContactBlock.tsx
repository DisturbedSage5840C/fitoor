import Image from "next/image";
import { Phone } from "lucide-react";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { contacts, socials, telHref } from "@/data/contacts";

export function ContactBlock() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:py-28">
        <RevealOnScroll>
          <NeonTitle>contact us</NeonTitle>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {contacts.map((person) => (
              <li key={person.phone}>
                <a
                  href={telHref(person.phone)}
                  className="group flex items-center justify-between rounded-xl border border-cream/10 bg-maroon px-5 py-4 transition-colors hover:border-gold/60"
                >
                  <span>
                    <span className="font-body block font-semibold text-cream">
                      {person.name}
                    </span>
                    <span className="font-body block text-sm text-cream/80 tabular-nums">
                      {person.phone}
                    </span>
                  </span>
                  <Phone className="size-4 text-gold/60 group-hover:text-gold" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-body mt-6 inline-flex items-center gap-2 rounded-full bg-rose px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            <InstagramIcon className="size-4" />@{socials.instagramHandle}
          </a>
        </RevealOnScroll>

        <RevealOnScroll
          delay={0.1}
          className="relative mx-auto w-full max-w-xs"
        >
          <Image
            src="/art/glass-hand.webp"
            alt="A ringed hand crushing a soda can"
            width={636}
            height={985}
            sizes="(min-width: 1024px) 380px, 70vw"
            className="h-auto w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
