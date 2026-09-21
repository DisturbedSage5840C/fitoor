import type { Metadata } from "next";
import { ShieldCheck, Home } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { CollageCard } from "@/components/zine/CollageCard";
import { accommodation, security } from "@/data/content";

export const metadata: Metadata = {
  title: "Security & Accommodation",
  description: "On-campus accommodation and security information for Fitoor 2026.",
};

function InfoBlock({
  icon: Icon,
  title,
  intro,
  points,
  seed,
  torn,
}: {
  icon: typeof Home;
  title: string;
  intro: string;
  points: string[];
  seed: number;
  torn: "top" | "bottom";
}) {
  return (
    <RevealOnScroll variant="collage-in">
      <CollageCard seed={seed} torn={torn} intensity="high" className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full border border-gold/40 text-gold">
            <Icon className="size-5" aria-hidden />
          </span>
          <h2 className="font-display text-2xl text-cream">{title}</h2>
        </div>
        <p className="font-body text-base text-cream/75 text-pretty">{intro}</p>
        <ul className="font-body flex flex-col gap-2.5 text-sm text-cream/70">
          {points.map((point) => (
            <li key={point} className="flex gap-2.5">
              <span className="text-gold/70" aria-hidden>
                &bull;
              </span>
              <span className="text-pretty">{point}</span>
            </li>
          ))}
        </ul>
      </CollageCard>
    </RevealOnScroll>
  );
}

export default function AccommodationPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="05 — Security & Accommodation"
        title="Staying safe, staying over"
        frame="zine"
      />

      <div className="flex flex-col gap-6">
        <InfoBlock
          icon={Home}
          title="Accommodation"
          intro={accommodation.intro}
          points={accommodation.points}
          seed={6}
          torn="top"
        />
        <InfoBlock
          icon={ShieldCheck}
          title="Security"
          intro={security.intro}
          points={security.points}
          seed={7}
          torn="bottom"
        />
      </div>
    </div>
  );
}
