import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";

const TINTS = [100, 200, 300, 400, 500, 600] as const;

const RAMPS = [
  { name: "Apricot", slug: "apricot", note: "warmth, daylight energy" },
  { name: "Sunset", slug: "sunset", note: "the golden-hour push" },
  { name: "Magenta", slug: "magenta", note: "the loud, unapologetic one" },
  { name: "Blue", slug: "blue", note: "interdimensional, a little sci-fi" },
] as const;

export function ColorRamps() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Be Vivid"
        title="The palette"
        description="Four families lifted straight from the Fitoor brand guide, each with six tints — from paper-light to ink-deep."
        frame="zine"
        className="mb-10"
      />

      <div className="flex flex-col gap-6">
        {RAMPS.map((ramp, i) => (
          <RevealOnScroll key={ramp.slug} variant="fade" delay={i * 0.06}>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg text-cream sm:text-xl">{ramp.name}</h3>
                <span className="font-body text-xs text-cream/50 italic">{ramp.note}</span>
              </div>
              <div className="grid grid-cols-6 overflow-hidden rounded-xl border border-cream/10">
                {TINTS.map((tint) => (
                  <div
                    key={tint}
                    className="flex aspect-square flex-col items-center justify-end pb-2"
                    style={{ backgroundColor: `var(--${ramp.slug}-${tint})` }}
                  >
                    <span className="font-pixel text-[8px] text-maroon-deepest/70 mix-blend-luminosity">
                      {tint}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
