import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Mascot } from "@/components/home/Mascot";
import { Countdown } from "@/components/home/Countdown";
import { hero, fest } from "@/data/content";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div className="flex flex-col gap-6">
          <span className="font-pixel text-[10px] tracking-[0.2em] text-gold/80 uppercase sm:text-xs">
            {hero.eyebrow}
          </span>

          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h1 className="font-wordmark text-6xl italic text-gold sm:text-7xl lg:text-8xl">
              {hero.title}
            </h1>
            <span className="font-nastaliq text-3xl text-cream/80 sm:text-4xl" dir="rtl">
              {fest.nastaliqName}
            </span>
            <span className="font-serif-dev text-2xl text-cream/70 sm:text-3xl">
              {fest.devanagariName}
            </span>
          </div>

          <p className="font-display text-2xl text-category-light sm:text-3xl">
            &ldquo;{fest.theme}&rdquo;
          </p>

          <p className="font-body max-w-xl text-base text-cream/75 sm:text-lg text-pretty">
            {hero.subtitle}
          </p>

          <p className="font-body text-sm text-cream/60">
            {fest.dates} &middot; {fest.university}
          </p>

          <Countdown />

          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href={hero.cta.primary.href}
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full px-6")}
            >
              {hero.cta.primary.label}
            </Link>
            <Link
              href={hero.cta.secondary.href}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-6")}
            >
              {hero.cta.secondary.label}
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 opacity-40 blur-2xl"
            style={{
              background:
                "radial-gradient(55% 55% at 50% 40%, var(--sunset), var(--apricot) 60%, transparent 75%)",
            }}
            aria-hidden
          />
          <Mascot className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md" />
        </div>
      </div>
    </section>
  );
}
