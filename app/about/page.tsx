import Image from "next/image";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionGround } from "@/components/shared/SectionGround";
import { StatTapes } from "@/components/shared/StatTapes";
import { Smiley } from "@/components/shared/Stickers";
import { Tape } from "@/components/shared/Tape";
import { TicketCard } from "@/components/shared/TicketCard";
import { about, fest } from "@/data/content";

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
        ground="halftone"
        artTilt={-5}
        sticker={<Smiley />}
        art={{
          src: "/art/boombox-hand.webp",
          alt: "A hand carrying a boombox",
          width: 422,
          height: 458,
        }}
      />

      <SectionGround ground="polka">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:pt-32 lg:pb-24">
          <div>
            <p className="font-script text-3xl text-gold sm:text-4xl">this year&apos;s theme</p>
            <p
              className="font-display mt-2 text-6xl leading-[0.92] text-cream uppercase sm:text-8xl"
              style={{ textShadow: "5px 5px 0 var(--rose)" }}
            >
              {fest.theme}
            </p>
          </div>
          <TicketCard tilt={-1} className="px-7 py-8 sm:px-10 sm:py-10" notchY="30%">
            <blockquote className="font-title text-2xl leading-snug text-balance sm:text-3xl">
              &ldquo;{about.theme}&rdquo;
            </blockquote>
          </TicketCard>
        </div>
      </SectionGround>

      <section className="border-y border-gold/15 bg-maroon">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <Tape tilt={-2} tone="gold" className="px-6 py-2">
              <h2 className="font-title text-3xl lowercase sm:text-4xl">what is {fest.name}?</h2>
            </Tape>
            {about.fitoor.map((p) => (
              <p key={p} className="font-body mt-5 leading-relaxed text-cream/85">
                {p}
              </p>
            ))}
            <StatTapes className="mt-12" />
          </div>

          <div className="lg:pt-16">
            <TicketCard
              tilt={1}
              notchY="22%"
              shadow="var(--gold)"
              className="px-7 py-8 sm:px-9 sm:py-10"
            >
              <h2 className="font-title text-3xl lowercase sm:text-4xl">where it happens</h2>
              {about.plaksha.map((p) => (
                <p key={p} className="font-body mt-4 leading-relaxed text-maroon-deepest/85">
                  {p}
                </p>
              ))}
              <Image
                quality={90}
                src="/brand/plaksha.png"
                alt="Plaksha University"
                width={600}
                height={180}
                sizes="200px"
                className="mt-8 h-12 w-auto brightness-0"
              />
            </TicketCard>
          </div>
        </div>
      </section>
    </>
  );
}
