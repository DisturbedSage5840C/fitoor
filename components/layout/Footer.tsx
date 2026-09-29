import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { socials, venue } from "@/data/contacts";
import { fest } from "@/data/content";

const links = [
  { label: "Events", href: "/events" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
  { label: "Rules", href: "/generalities" },
  { label: "Stay", href: "/accommodation" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-cream/15 bg-maroon-deepest">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-wordmark text-4xl leading-none text-gold">
            {fest.name}
          </p>
          <p className="font-body mt-4 max-w-sm text-cream/75">
            {fest.dates}
            <br />
            {venue.name}, {venue.address}
          </p>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-body mt-2 inline-flex min-h-12 items-center gap-2 font-semibold text-gold hover:text-gold-bright"
          >
            <InstagramIcon className="size-4" />@{socials.instagramHandle}
          </a>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body inline-flex min-h-11 items-center text-cream/80 hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-t border-cream/15 px-4 py-6 sm:px-6">
        <p className="font-body text-sm text-cream/70">
          © {fest.year} {fest.university}
        </p>
        <Image
          src="/brand/plaksha.png"
          alt="Plaksha University"
          width={120}
          height={36}
          className="h-7 w-auto"
        />
      </div>
    </footer>
  );
}
