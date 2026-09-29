import Image from "next/image";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { contacts, socials, telHref } from "@/data/contacts";

export function ContactBlock() {
  return (
    <section className="bg-maroon">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:py-32">
        <div>
          <h2 className="font-display text-5xl text-gold sm:text-6xl">
            contact us
          </h2>
          <ul className="mt-10 divide-y divide-cream/15 border-y border-cream/15">
            {contacts.map((person) => (
              <li key={person.phone}>
                <a
                  href={telHref(person.phone)}
                  className="font-body flex min-h-14 items-baseline justify-between gap-4 py-4 hover:text-gold"
                >
                  <span className="font-semibold text-cream">{person.name}</span>
                  <span className="text-cream/75 tabular-nums">{person.phone}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-body mt-6 inline-flex min-h-12 items-center gap-2 font-semibold text-cream underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
          >
            <InstagramIcon className="size-4" />@{socials.instagramHandle}
          </a>
        </div>

        <Image
          src="/art/glass-hand.webp"
          alt="A ringed hand crushing a soda can"
          width={636}
          height={985}
          sizes="(min-width: 1024px) 340px, 60vw"
          className="mx-auto h-auto w-full max-w-xs"
        />
      </div>
    </section>
  );
}
