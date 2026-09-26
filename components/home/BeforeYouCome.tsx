import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { venue } from "@/data/contacts";
import { hotels, quickRules } from "@/data/content";

export function BeforeYouCome() {
  return (
    <section className="relative overflow-hidden border-y border-gold/15 bg-maroon-deepest">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
          <RevealOnScroll className="relative">
            <NeonTitle script="the fine print, but short">
              know before you come
            </NeonTitle>
            <Image
              src="/art/puppets.webp"
              alt="Two Rajasthani kathputli puppets, one wearing sunglasses"
              width={768}
              height={1024}
              sizes="(min-width: 1024px) 320px, 60vw"
              className="mt-10 h-auto w-3/4 max-w-xs drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] lg:w-full"
            />
          </RevealOnScroll>

          <div>
            <RevealOnScroll>
              <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {quickRules.map((rule, i) => (
                  <li
                    key={rule.title}
                    className="h-full rounded-2xl border border-cream/10 bg-maroon p-6"
                  >
                    <span className="font-display text-4xl leading-none text-rose">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-title mt-3 text-2xl text-gold lowercase">
                      {rule.title}
                    </p>
                    <p className="font-body mt-2 text-sm leading-relaxed text-cream/70">
                      {rule.body}
                    </p>
                  </li>
                ))}
              </ol>
            </RevealOnScroll>
            <Link
              href="/generalities"
              className="font-body mt-6 inline-block text-sm font-semibold text-gold hover:text-gold-bright"
            >
              Full rules, security &amp; FAQ →
            </Link>

            <RevealOnScroll className="mt-14">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-title text-3xl text-cream lowercase">
                  staying over?
                </h3>
                <p className="font-body flex items-center gap-1.5 text-xs text-cream/55">
                  <MapPin className="size-3.5" />
                  Distances from {venue.name}
                </p>
              </div>
              <ul className="mt-4 divide-y divide-dashed divide-gold/25 rounded-2xl border border-dashed border-gold/35">
                {hotels.map((hotel) => (
                  <li
                    key={hotel.name}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <span className="font-body font-semibold text-cream">
                      {hotel.name}
                    </span>
                    <span className="font-display text-2xl text-gold">
                      {hotel.distance}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/accommodation"
                className="font-body mt-4 inline-block text-sm font-semibold text-gold hover:text-gold-bright"
              >
                Stay &amp; getting here →
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
