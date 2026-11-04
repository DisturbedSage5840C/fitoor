"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MascotFaceLogomark } from "@/components/mascot/MascotFaceLogomark";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { registerUrl, socials } from "@/data/contacts";
import { fest } from "@/data/content";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Schedule", href: "/schedule" },
  { label: "Rules", href: "/generalities" },
  { label: "Stay", href: "/accommodation" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  // Every path starts with "/", so Home only lights up on an exact match.
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-maroon-deepest/90 backdrop-blur-md">
      <div className="flex h-20 w-full items-center justify-between gap-4 pl-4 pr-3 sm:pl-6 sm:pr-4">
        <Link
          href="/"
          className="group flex min-h-11 shrink-0 items-center gap-3"
        >
          <MascotFaceLogomark
            size={58}
            className="shrink-0 rounded-full bg-cream ring-2 ring-gold/60 transition-transform group-hover:-rotate-12 group-hover:scale-110"
          />
          <span className="font-wordmark text-4xl leading-none text-gold">
            {fest.name}
          </span>
          <span className="font-display hidden -rotate-6 rounded-[3px] bg-rose px-2 pt-0.5 text-lg leading-none text-maroon-deepest sm:inline">
            &apos;{String(fest.year).slice(2)}
          </span>
          <span className="sr-only">home</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={cn(
                "font-body px-2.5 py-2.5 text-base font-semibold transition-colors xl:px-4",
                isActive(pathname, link.href)
                  ? "torn-ends -rotate-2 bg-bandage text-maroon-deepest shadow-[0_2px_0_var(--rose)]"
                  : "rounded-full text-cream/75 hover:text-gold",
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="ml-2 grid size-11 place-items-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-maroon-deepest"
          >
            <InstagramIcon className="size-5" />
            <span className="sr-only">Fitoor on Instagram</span>
          </a>
          <a
            href={registerUrl}
            target="_blank"
            rel="noreferrer"
            className="font-body ml-3 inline-flex min-h-12 items-center rounded-sm bg-gold px-5 text-base font-bold text-maroon-deepest shadow-[3px_3px_0_var(--rose)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-gold-bright"
          >
            Register
            <span className="sr-only"> (opens Unstop in a new tab)</span>
          </a>
        </nav>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-12 text-cream lg:hidden [&_svg:not([class*=size-])]:size-6"
              />
            }
          >
            <Menu />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-gold/15 bg-maroon-deepest"
          >
            <SheetHeader>
              <SheetTitle className="font-wordmark flex items-center gap-2 text-2xl text-gold">
                <MascotFaceLogomark
                  size={32}
                  className="rounded-full bg-cream"
                />
                {fest.name}
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 pb-4" aria-label="Main">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <SheetClose
                    key={link.href}
                    render={<Link href={link.href} />}
                  >
                    <span
                      className={cn(
                        "font-title block px-3 py-2 text-2xl lowercase",
                        active ? "torn-ends -rotate-1 bg-bandage text-maroon-deepest" : "text-cream/85",
                      )}
                    >
                      {link.label}
                    </span>
                  </SheetClose>
                );
              })}
              <a
                href={registerUrl}
                target="_blank"
                rel="noreferrer"
                className="font-body mx-3 mt-4 inline-flex min-h-12 items-center justify-center rounded-sm bg-gold px-6 font-bold text-maroon-deepest shadow-[4px_4px_0_var(--rose)]"
              >
                Register now
                <span className="sr-only"> (opens Unstop in a new tab)</span>
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="font-body mt-2 flex min-h-11 items-center gap-2 px-3 text-sm text-gold"
              >
                <InstagramIcon className="size-4" />@{socials.instagramHandle}
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      {/* Lace hem: the nav reads as the edge of a dupatta */}
      <div
        aria-hidden
        className="trim-lace pointer-events-none absolute inset-x-0 top-full text-gold/50"
        style={{ height: 10 }}
      />
    </header>
  );
}
