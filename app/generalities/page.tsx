import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionGround } from "@/components/shared/SectionGround";
import { SwordsGlyph } from "@/components/shared/Stickers";
import { Tape } from "@/components/shared/Tape";
import { generalRules, security } from "@/data/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "General rules",
  alternates: { canonical: "/generalities" },
  description: "General rules and security guidelines for Fitoor 2026 participants.",
};

/** Pinned up over the years: paper, fixing and lean change note to note. */
const PAPERS = [
  { paper: "bg-cream", numeral: "text-rose-ink", fix: "tape", tone: "rose" },
  { paper: "bg-gold-bright", numeral: "text-maroon", fix: "pin" },
  { paper: "bg-bandage", numeral: "text-dupatta", fix: "tape", tone: "gold" },
  { paper: "bg-rose", numeral: "text-maroon-deepest", fix: "pin" },
] as const;
const TILTS = [-1.5, 1.2, -0.6, 2, -2, 0.8, 1.8];
const PADS = ["pt-7 pb-5", "pt-6 pb-7", "pt-8 pb-4", "pt-6 pb-5"];

export default function GeneralitiesPage() {
  return (
    <>
      <PageHeader
        title="general rules"
        ground="halftone"
        artTilt={-3}
        sticker={
          <span className="flex size-full items-center justify-center rounded-full bg-maroon-deepest p-2 text-gold">
            <SwordsGlyph />
          </span>
        }
        stickerTilt={-12}
        art={{
          src: "/art/cover-hands.jpg",
          alt: "A hand heavy with rings and chains holding a red lily",
          width: 907,
          height: 1024,
        }}
      />

      <SectionGround ground="polka">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 pt-24 pb-20 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:gap-12 lg:pb-28">
          <ol className="columns-1 gap-x-8 sm:columns-2">
            {generalRules.map((rule, i) => {
              const style = PAPERS[i % PAPERS.length];
              return (
                <li key={rule} className="mb-5 break-inside-avoid pt-4">
                  <div style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}>
                    <div
                      className={cn(
                        "relative px-5 text-maroon-deepest shadow-[4px_5px_0_rgb(0_0_0/0.4)]",
                        style.paper,
                        PADS[(i * 3) % PADS.length],
                      )}
                    >
                      {style.fix === "tape" ? (
                        <Tape
                          tilt={i % 2 ? 4 : -3}
                          tone={style.tone}
                          className="absolute -top-3 left-1/2 -translate-x-1/2 px-7 py-1.5"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rounded-full bg-maroon-deepest ring-2 ring-cream/70 shadow-[0_2px_3px_rgb(0_0_0/0.5)]"
                        />
                      )}
                      <span
                        className={cn(
                          "font-display block text-4xl leading-none",
                          style.numeral,
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-body mt-3 leading-relaxed">{rule}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="lg:sticky lg:top-24 lg:self-start lg:pt-6">
            <div className="rotate-1 drop-shadow-[7px_8px_0_var(--gold)]">
              <div className="caution-tape p-3">
                <div className="bg-maroon-deepest px-6 py-8">
                  <h2 className="font-title neon-soft text-4xl text-cream lowercase">security</h2>
                  <ul className="mt-6 space-y-4">
                    {security.map((point) => (
                      <li key={point} className="font-body flex gap-3 text-sm leading-relaxed text-cream/85">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-rose" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionGround>
    </>
  );
}
