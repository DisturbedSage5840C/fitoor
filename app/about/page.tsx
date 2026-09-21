import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { CollageCard } from "@/components/zine/CollageCard";
import { ClippingText } from "@/components/zine/ClippingText";
import { SpacingDivider } from "@/components/zine/SpacingDivider";
import { about, fest } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow="01 — About Us" title={`What is ${fest.name}?`} frame="zine" />

      <RevealOnScroll variant="collage-in">
        <CollageCard seed={2} torn="top" intensity="high" className="flex flex-col gap-6 p-6 sm:p-8">
          <p className="font-body text-lg text-cream/85 text-pretty">{about.intro}</p>

          <ClippingText text={`"${fest.theme}"`} seed={3} className="text-lg sm:text-xl" />

          <blockquote className="border-l-2 border-gold/60 pl-5">
            <p className="font-body text-base text-cream/75 italic text-pretty">
              {about.themeStatement}
            </p>
          </blockquote>
        </CollageCard>
      </RevealOnScroll>

      <SpacingDivider label="PG. 01" seed={4} />

      <RevealOnScroll variant="collage-in">
        <CollageCard seed={5} torn="bottom" intensity="high" className="flex flex-col gap-6 p-6 sm:p-8">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="font-body text-base text-cream/70 text-pretty">
              {paragraph}
            </p>
          ))}
        </CollageCard>
      </RevealOnScroll>
    </div>
  );
}
