import Image from "next/image";
import Link from "next/link";
import { MascotFaceLogomark } from "@/components/mascot/MascotFaceLogomark";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { Sticker } from "@/components/shared/Sticker";
import { BarcodeTag, Smiley } from "@/components/shared/Stickers";
import { TrimDivider } from "@/components/shared/TrimDivider";
import { categoryList } from "@/data/categories";
import { socials } from "@/data/contacts";
import { fest } from "@/data/content";

const infoLinks = [
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
  { label: "General rules", href: "/generalities" },
  { label: "Stay", href: "/accommodation" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-maroon-deepest">
      <TrimDivider />
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 px-4 pt-14 pb-8 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <MascotFaceLogomark size={56} className="rounded-full bg-cream ring-2 ring-gold/60" />
            <div>
              <p className="font-wordmark text-4xl leading-none text-gold">
                {fest.name}
              </p>
              <p className="font-script text-xl text-cream/80">
                {fest.theme.toLowerCase()}
              </p>
            </div>
          </div>
          <p className="font-body mt-5 max-w-xs text-sm leading-relaxed text-cream/75">
            {fest.dates}, {fest.university}, {fest.address}
          </p>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-body mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold hover:text-gold-bright"
          >
            <InstagramIcon className="size-4" />@{socials.instagramHandle}
          </a>
          <div className="mt-6 flex items-end gap-4">
            <Sticker tilt={-8} className="size-16">
              <Smiley />
            </Sticker>
            <Sticker tilt={5} className="h-16 w-28" live={false}>
              <BarcodeTag />
            </Sticker>
          </div>
        </div>

        <FooterList
          title="events"
          links={[
            { label: "All events", href: "/events" },
            ...categoryList.map((c) => ({
              label: c.name,
              href: `/events/${c.slug}`,
            })),
          ]}
        />
        <FooterList title="info" links={infoLinks} />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-cream/10 px-4 py-6 sm:flex-row sm:items-center sm:px-6">
        <p className="font-body text-xs text-cream/70">
© {fest.year} {fest.university}
        </p>
        <Image quality={90}
          src="/brand/plaksha.png"
          alt="Plaksha University"
          width={120}
          height={36}
          className="h-7 w-auto opacity-70"
        />
      </div>

      <p
        aria-hidden
        className="font-wordmark pointer-events-none -mb-[0.28em] text-center text-[26vw] leading-none text-transparent select-none [-webkit-text-stroke:2px_rgb(232_199_126/0.4)]"
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
      <p className="font-script text-3xl text-gold">{title}</p>
      <ul className="mt-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-body inline-block py-3 text-sm text-cream/75 hover:text-gold sm:py-1.5"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
