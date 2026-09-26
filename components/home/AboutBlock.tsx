import Image from "next/image";
import Link from "next/link";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { about, stats } from "@/data/content";

export function AboutBlock() {
  return (
    <section className="relative overflow-hidden bg-maroon">
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
        <RevealOnScroll>
          <NeonTitle script="the theme, and why">
            young, dumb &amp; desi
          </NeonTitle>
          <p className="font-body mt-8 max-w-xl text-lg leading-relaxed text-cream/85">
            {about.theme}
          </p>
          <p className="font-body mt-4 max-w-xl leading-relaxed text-cream/60">
            {about.fitoor[0]}
          </p>
          <Link
            href="/about"
            className="font-body mt-6 inline-block border-b border-gold/50 pb-0.5 text-sm font-semibold text-gold hover:border-gold"
          >
            More about Fitoor &amp; Plaksha →
          </Link>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-gold/20 bg-gold/20 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-maroon px-4 py-5">
                <dt className="font-body text-[11px] font-semibold tracking-[0.2em] text-cream/55 uppercase">
                  {stat.label}
                </dt>
                <dd className="font-display mt-1 text-5xl leading-none text-gold">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </RevealOnScroll>

        <RevealOnScroll
          delay={0.1}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <Image
            src="/art/auto-rickshaw.webp"
            alt="A yellow-and-green auto rickshaw"
            width={973}
            height={604}
            sizes="(min-width: 1024px) 520px, 90vw"
            className="relative z-10 h-auto w-full -rotate-3 drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
          />
          <p className="font-script absolute -bottom-6 right-4 z-20 rotate-[-6deg] text-3xl text-gold">
            chalo, fitoor!
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
