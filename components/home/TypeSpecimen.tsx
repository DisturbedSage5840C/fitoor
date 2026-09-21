import { CollageCard } from "@/components/zine/CollageCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";

const SPECIMENS = [
  {
    word: "BE BOLD.",
    font: "font-display",
    role: "Display — headlines, numerals, anything that needs to shout",
    seed: 2,
    torn: "top" as const,
  },
  {
    word: "BE CLEAR.",
    font: "font-body-alt",
    role: "Documentation — captions, labels, the fine print with a spine",
    seed: 5,
    torn: "bottom" as const,
  },
  {
    word: "be swift.",
    font: "font-script",
    role: "Script accent — taglines, signatures, used sparingly",
    seed: 8,
    torn: "left" as const,
  },
];

export function TypeSpecimen() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Be Clear"
        title="The type system"
        description="Three voices, one guide: DRUK for volume, Montserrat for structure, Amithen for the moments that need a signature."
        frame="zine"
        className="mb-10"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {SPECIMENS.map((specimen, i) => (
          <RevealOnScroll key={specimen.word} variant="collage-in" delay={i * 0.08}>
            <CollageCard
              seed={specimen.seed}
              torn={specimen.torn}
              intensity="high"
              className="flex h-full flex-col justify-between gap-6 p-6 sm:p-8"
            >
              <p className={`${specimen.font} text-4xl text-gold sm:text-5xl`}>{specimen.word}</p>
              <p className="font-body text-sm text-cream/70">{specimen.role}</p>
            </CollageCard>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
