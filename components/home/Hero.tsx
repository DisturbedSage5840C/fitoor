import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Countdown } from "@/components/home/Countdown";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { MascotStamp } from "@/components/shared/MascotStamp";
import { socials } from "@/data/contacts";
import { fest } from "@/data/content";
import { events } from "@/data/events";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Mobile: the cover art sits behind the type, dimmed. */}
      <div className="absolute inset-0 -z-10 lg:hidden" aria-hidden>
        <Image
          src="/art/cover-hands.jpg"
          alt=""
          fill
          preload
          sizes="(min-width: 1024px) 1px, 100vw"
          className="object-cover object-top opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-deepest/40 via-maroon-deepest/70 to-maroon-deepest" />
      </div>
      <div
        className="halftone-light absolute inset-0 -z-10 opacity-60"
        aria-hidden
      />

      <div className="mx-auto grid grid-cols-1 max-w-6xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-6 lg:pt-20 lg:pb-24">
        <div className="relative">
          <p className="font-body text-xs font-semibold tracking-[0.25em] text-gold/80 uppercase">
            {fest.university} presents · {fest.edition} edition
          </p>

          <h1 className="mt-4">
            <span className="sr-only">Fitoor 2026</span>
            <span
              aria-hidden
              className="font-wordmark neon block text-[clamp(5.5rem,22vw,12.5rem)] leading-[0.8] tracking-tight"
            >
              {fest.name}
            </span>
          </h1>

          <div
            className="mt-3 flex items-baseline gap-4 text-cream/70"
            aria-hidden
          >
            <span className="font-serif-dev text-2xl sm:text-3xl">
              {fest.devanagariName}
            </span>
            <span className="h-px w-8 bg-gold/40" />
            <span className="font-nastaliq text-2xl sm:text-3xl" dir="rtl">
              {fest.nastaliqName}
            </span>
          </div>

          <p className="font-script mt-5 text-4xl text-gold sm:text-5xl">
            young, dumb &amp; desi
          </p>

          <p className="font-body mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold tracking-[0.18em] text-cream uppercase sm:text-base">
            <span>{fest.dates}</span>
            <span className="text-rose" aria-hidden>
              ✦
            </span>
            <span>{fest.university}</span>
            <span className="text-rose" aria-hidden>
              ✦
            </span>
            <span>{fest.region}</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/events"
              className="font-body group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-maroon-deepest transition-colors hover:bg-gold-bright"
            >
              Explore the {events.length} events
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-body inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <InstagramIcon className="size-4" />
              Registrations opening soon
            </a>
          </div>

          <div className="mt-10">
            <p className="font-body mb-2 text-[11px] font-semibold tracking-[0.25em] text-cream/50 uppercase">
              Gates open in
            </p>
            <Countdown />
          </div>
        </div>

        {/* Desktop: the brochure cover as a pasted-up poster. */}
        <div className="relative hidden lg:block">
          <Image
            src="/art/nimbu-mirchi.webp"
            alt=""
            width={152}
            height={293}
            className="absolute -top-20 left-10 z-20 w-16 origin-top rotate-3 drop-shadow-xl"
          />
          <div className="relative rotate-[2.5deg] border-[10px] border-cream bg-cream shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            <Image
              src="/art/cover-hands.jpg"
              alt="A bangled hand holding a red flower — the Fitoor 2026 brochure cover"
              width={907}
              height={1024}
              preload
              sizes="(min-width: 1024px) 460px, 0px"
              className="block h-auto w-full"
            />
            <span className="font-body absolute right-0 -bottom-8 text-[10px] font-semibold tracking-[0.3em] text-cream/40 uppercase">
              cover, fitoor &apos;26 brochure
            </span>
          </div>
          <span
            aria-hidden
            className="absolute -top-3 right-16 z-10 h-7 w-28 rotate-[8deg] bg-gold/70 mix-blend-screen"
          />
          <MascotStamp className="absolute -bottom-10 -left-12 z-20 w-40" />
        </div>
      </div>
    </section>
  );
}
