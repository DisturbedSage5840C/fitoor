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

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Events", href: "/events" },
  { label: "Generalities", href: "/generalities" },
  { label: "Accommodation", href: "/accommodation" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-cream/10 bg-maroon-deepest/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <MascotFaceLogomark size={28} className="shrink-0" />
          <span className="flex items-baseline gap-2">
            <span className="font-wordmark text-2xl italic text-gold">fitoor</span>
            <span className="font-nastaliq text-lg text-cream/70" dir="rtl">
              فتور
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-body rounded-full px-3.5 py-2 text-sm transition-colors",
                  active
                    ? "bg-gold/15 text-gold"
                    : "text-cream/75 hover:bg-cream/5 hover:text-cream",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" className="md:hidden" />}
          >
            <Menu />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="border-cream/10 bg-maroon-deepest">
            <SheetHeader>
              <SheetTitle className="font-wordmark text-xl italic text-gold">
                fitoor
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 pb-4">
              {navLinks.map((link) => (
                <SheetClose key={link.href} render={<Link href={link.href} />}>
                  <span
                    className={cn(
                      "font-body block rounded-lg px-3 py-2.5 text-base",
                      pathname === link.href
                        ? "bg-gold/15 text-gold"
                        : "text-cream/80",
                    )}
                  >
                    {link.label}
                  </span>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
