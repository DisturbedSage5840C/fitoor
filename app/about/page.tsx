import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { about, fest } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow="01 — About Us" title={`What is ${fest.name}?`} />

      <RevealOnScroll className="flex flex-col gap-6">
        <p className="font-body text-lg text-cream/85 text-pretty">{about.intro}</p>

        <blockquote className="border-l-2 border-pink/60 pl-5">
          <p className="font-body text-base text-cream/75 italic text-pretty">
            {about.themeStatement}
          </p>
        </blockquote>

        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="font-body text-base text-cream/70 text-pretty">
            {paragraph}
          </p>
        ))}
      </RevealOnScroll>
    </div>
  );
}
