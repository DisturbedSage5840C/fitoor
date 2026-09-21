import Image from "next/image";
import { CollageCard } from "@/components/zine/CollageCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";

const CUTOUTS = [
  {
    src: "/brand/monalisa-image41.png",
    seed: 11,
    torn: "top" as const,
    className: "left-[2%] top-0 w-[38%] rotate-[-4deg] sm:left-[4%]",
  },
  {
    src: "/brand/monalisa-image51.png",
    seed: 23,
    torn: "right" as const,
    className: "right-[3%] top-[8%] w-[32%] rotate-[3deg] sm:right-[6%]",
  },
  {
    src: "/brand/monalisa-image42.png",
    seed: 37,
    torn: "left" as const,
    className: "bottom-[4%] left-[10%] w-[28%] rotate-[2deg]",
  },
  {
    src: "/brand/monalisa-image52.png",
    seed: 41,
    torn: "bottom" as const,
    className: "right-[8%] bottom-0 w-[24%] rotate-[-3deg]",
  },
];

export function CollageMoment() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="The Mood Board"
        title="A page from the guide"
        description="Torn, taped, overlapping — the way the actual Fitoor brand guide feels flipped through by hand."
        frame="zine"
        className="mb-10"
      />

      <RevealOnScroll variant="collage-in">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl">
          <CollageCard
            seed={1}
            torn="bottom"
            intensity="high"
            className="absolute inset-6 overflow-hidden rounded-sm sm:inset-10"
          >
            <Image
              src="/brand/monalisa-rectangle11.png"
              alt="Fitoor brand guide mood board base collage"
              fill
              sizes="(min-width: 768px) 640px, 90vw"
              className="object-cover"
            />
          </CollageCard>

          {CUTOUTS.map((cutout) => (
            <div key={cutout.src} className={`absolute aspect-[3/4] ${cutout.className}`}>
              <CollageCard
                seed={cutout.seed}
                torn={cutout.torn}
                intensity="high"
                tape
                className="relative h-full w-full overflow-hidden rounded-sm shadow-[0_20px_45px_-14px_rgba(0,0,0,0.7)]"
              >
                <Image
                  src={cutout.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 220px, 35vw"
                  className="object-cover"
                />
              </CollageCard>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
