import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { generalRules, security } from "@/data/content";

export const metadata: Metadata = {
  title: "General rules",
  description:
    "General rules and security guidelines for Fitoor 2026 participants.",
};

export default function GeneralitiesPage() {
  return (
    <>
      <PageHeader
        title="general rules"
        art={{
          src: "/art/puppets.webp",
          alt: "Two Rajasthani kathputli puppets, one wearing sunglasses",
          width: 768,
          height: 1024,
        }}
      />

      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-16 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:py-24">
        <RevealOnScroll>
          <h2 className="font-title neon text-5xl lowercase">rules</h2>
          <ol className="mt-8 space-y-5">
            {generalRules.map((rule, i) => (
              <li key={rule} className="flex gap-5">
                <span className="font-display w-10 shrink-0 text-3xl leading-none text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body leading-relaxed text-cream/80">
                  {rule}
                </p>
              </li>
            ))}
          </ol>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="rounded-2xl border border-rose/40 bg-maroon p-7">
            <h2 className="font-title text-4xl text-cream lowercase">
              security
            </h2>
            <ul className="mt-6 space-y-4">
              {security.map((point) => (
                <li
                  key={point}
                  className="font-body flex gap-3 text-sm leading-relaxed text-cream/75"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-rose"
                    aria-hidden
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </div>
    </>
  );
}
