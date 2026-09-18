import Link from "next/link";
import { AtSign, Mail } from "lucide-react";
import { fest } from "@/data/content";
import { generalContact } from "@/data/contacts";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-cream/10 bg-maroon-deepest">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-baseline gap-2">
              <p className="font-wordmark text-3xl italic text-gold">fitoor</p>
              <span className="flex items-center gap-1" aria-hidden>
                <span className="size-1.5 rounded-full bg-dance" />
                <span className="size-1.5 rounded-full bg-gold" />
                <span className="size-1.5 rounded-full bg-sunset" />
              </span>
            </div>
            <p className="font-body mt-1 text-sm text-cream/60">
              {fest.university} &middot; {fest.dates}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-cream/70 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <a
              href={generalContact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-body text-sm text-cream/70 transition-colors hover:text-gold"
            >
              <AtSign className="size-4" aria-hidden />
              {generalContact.instagram.handle}
            </a>
            <a
              href={`mailto:${generalContact.email}`}
              className="flex items-center gap-1.5 font-body text-sm text-cream/70 transition-colors hover:text-gold"
            >
              <Mail className="size-4" aria-hidden />
              {generalContact.email}
            </a>
          </div>
          <p className="font-body text-xs text-cream/60">
            &copy; {fest.year} {fest.name} &mdash; {fest.university}. Theme: {fest.theme}.
          </p>
        </div>
      </div>
    </footer>
  );
}
