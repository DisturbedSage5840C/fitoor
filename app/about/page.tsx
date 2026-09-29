import Image from "next/image";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { about, fest, stats } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: about.fitoor[0],
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="about"
        script="the fest, the theme, the campus"
        art={{
          src: "/art/boombox-hand.webp",
          alt: "A hand carrying a boombox",
          width: 422,
          height: 458,
        }}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <RevealOnScroll>
          <p className="font-script text-3xl text-gold">
            this year&apos;s theme
          </p>
          <blockquote className="font-title mt-2 max-w-4xl text-3xl leading-snug text-cream text-balance sm:text-4xl">
            &ldquo;{about.theme}&rdquo;
          </blockquote>
        </RevealOnScroll>
      </section>

      <section className="border-y border-gold/15 bg-maroon">
        <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <RevealOnScroll>
            <h2 className="font-title neon text-5xl lowercase">
              what is {fest.name}?
            </h2>
            {about.fitoor.map((p) => (
              <p
                key={p}
                className="font-body mt-5 leading-relaxed text-cream/80"
              >
                {p}
              </p>
            ))}
            <dl className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse border-l-2 border-rose pl-4"
                >
                  <dt className="font-body mt-1 text-xs font-semibold tracking-[0.2em] text-cream/75 uppercase">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-5xl leading-none text-gold">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="font-title neon text-5xl lowercase">
              where it happens
            </h2>
            {about.plaksha.map((p) => (
              <p
                key={p}
                className="font-body mt-5 leading-relaxed text-cream/80"
              >
                {p}
              </p>
            ))}
            <Image quality={90}
              src="/brand/plaksha.png"
              alt="Plaksha University"
              width={600}
              height={180}
              className="mt-10 h-12 w-auto opacity-80"
            />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
