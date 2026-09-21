import { Mascot } from "@/components/home/Mascot";
import { CollageCard } from "@/components/zine/CollageCard";
import { ClippingText } from "@/components/zine/ClippingText";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";

const traits = [
  { label: "Signature move", value: "Boombox on one shoulder, jhumkas swinging" },
  { label: "Vibe", value: "Y2K aunty who's seen every Bollywood decade" },
  { label: "Currently obsessing over", value: "Whatever's loudest on the mixtape" },
];

export function MascotReveal() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="The Face of Fitoor"
        title="Meet Fitoor Aunty"
        frame="zine"
        className="mb-10"
      />

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <RevealOnScroll variant="collage-in">
          <CollageCard seed={4} torn="left" intensity="high" tape className="mx-auto max-w-xs p-6 sm:p-8">
            <Mascot className="w-full h-auto" />
          </CollageCard>
        </RevealOnScroll>

        <RevealOnScroll variant="torn" delay={0.1} className="flex flex-col gap-6">
          <ClippingText
            text="She's loud, she's extra, she's ours."
            seed={7}
            className="font-display text-3xl text-cream sm:text-4xl"
          />
          <p className="font-body max-w-xl text-base text-cream/75 sm:text-lg text-pretty">
            Every fest needs a mascot who means it. Fitoor Aunty is equal parts nostalgia and
            noise — oversized sunglasses, gold jhumkas, a boombox she refuses to put down. She's
            the household everyone grew up in, remixed for a stage.
          </p>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {traits.map((trait) => (
              <div key={trait.label} className="border-l-2 border-gold/40 pl-3">
                <dt className="font-pixel text-[9px] tracking-[0.15em] text-gold/70 uppercase">
                  {trait.label}
                </dt>
                <dd className="font-body mt-1 text-sm text-cream/80">{trait.value}</dd>
              </div>
            ))}
          </dl>
        </RevealOnScroll>
      </div>
    </section>
  );
}
