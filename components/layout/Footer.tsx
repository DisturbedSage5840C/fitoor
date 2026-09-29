import Image from "next/image";
import Link from "next/link";
import { MascotFaceLogomark } from "@/components/mascot/MascotFaceLogomark";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { categoryList } from "@/data/categories";
import { socials, venue } from "@/data/contacts";
import { fest } from "@/data/content";

const infoLinks = [
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
  { label: "Rules & FAQ", href: "/generalities" },
  { label: "Stay", href: "/accommodation" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-maroon-deepest">
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 px-4 pt-14 pb-8 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <MascotFaceLogomark size={56} className="rounded-full bg-cream" />
            <div>
              <p className="font-wordmark text-4xl leading-none text-gold">
                {fest.name}
              </p>
              <p className="font-script text-xl text-cream/80">
                {fest.theme.toLowerCase()}
              </p>
            </div>
          </div>
          <p className="font-body mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
            {fest.datesLong} · {venue.name}, {venue.address}
          </p>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-body mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold hover:text-gold-bright"
          >
            <InstagramIcon className="size-4" />@{socials.instagramHandle}
          </a>
        </div>

        <FooterList
          title="Events"
          links={[
            { label: "All events", href: "/events" },
            ...categoryList.map((c) => ({
              label: c.name,
              href: `/events/${c.slug}`,
            })),
          ]}
        />
        <FooterList title="Info" links={infoLinks} />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-cream/10 px-4 py-6 sm:flex-row sm:items-center sm:px-6">
        <p className="font-body text-xs text-cream/45">
          © {fest.year} Fitoor, {fest.university}. Made by students, for
          students.
        </p>
        <Image
          src="/brand/plaksha.png"
          alt="Plaksha University"
          width={120}
          height={36}
          className="h-7 w-auto opacity-70"
        />
      </div>

      <p
        aria-hidden
        className="font-wordmark pointer-events-none -mb-[0.28em] text-center text-[26vw] leading-none text-gold/[0.06] select-none"
      >
        {fest.name}
      </p>
    </footer>
  );
}

function FooterList({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="font-body text-xs font-semibold tracking-[0.2em] text-gold/70 uppercase">
        {title}
      </p>
      <ul className="mt-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-body inline-block py-2.5 text-sm text-cream/75 hover:text-gold sm:py-1.5"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
