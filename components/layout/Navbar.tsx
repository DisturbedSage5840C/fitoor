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
import { socials } from "@/data/contacts";
import { fest } from "@/data/content";

const navLinks = [
  { label: "Events", href: "/events" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
  { label: "Rules", href: "/generalities" },
  { label: "Stay", href: "/accommodation" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-cream/15 bg-maroon-deepest">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5"
          aria-label="Fitoor home"
        >
          <MascotFaceLogomark
            size={36}
            className="shrink-0 rounded-full bg-cream"
          />
          <span className="font-wordmark text-2xl leading-none text-gold">
            {fest.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={cn(
                "font-body border-b-2 py-2 text-sm font-medium transition-colors",
                isActive(pathname, link.href)
                  ? "border-gold text-gold"
                  : "border-transparent text-cream/80 hover:text-cream",
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="grid size-11 place-items-center text-gold hover:text-gold-bright"
          >
            <InstagramIcon className="size-4" />
            <span className="sr-only">Fitoor on Instagram</span>
          </a>
        </nav>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-11 text-cream md:hidden [&_svg:not([class*=size-])]:size-6"
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
              {[{ label: "Home", href: "/" }, ...navLinks].map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : isActive(pathname, link.href);
                return (
                  <SheetClose
                    key={link.href}
                    render={<Link href={link.href} />}
                  >
                    <span
                      className={cn(
                        "font-display block px-3 py-3 text-3xl",
                        active ? "text-gold" : "text-cream/85",
                      )}
                    >
                      {link.label}
                    </span>
                  </SheetClose>
                );
              })}
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="font-body mt-4 flex min-h-12 items-center gap-2 px-3 text-gold"
              >
                <InstagramIcon className="size-4" />@{socials.instagramHandle}
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
