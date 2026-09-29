import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { generalRules, security } from "@/data/content";

export const metadata: Metadata = {
  title: "General rules",
  description:
    "General rules, information and security guidelines for Fitoor 2026 participants.",
};

export default function GeneralitiesPage() {
  return (
    <>
      <PageHeader title="general rules" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 pb-24 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        <section aria-labelledby="rules">
          <h2 id="rules" className="sr-only">
            General rules and information
          </h2>
          <ol className="font-body list-decimal space-y-5 pl-6 text-cream/90 marker:text-gold">
            {generalRules.map((rule) => (
              <li key={rule} className="prose-copy pl-2">
                {rule}
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="security">
          <h2
            id="security"
            className="font-display text-4xl text-gold sm:text-5xl"
          >
            security
          </h2>
          <ul className="font-body mt-6 list-disc space-y-4 pl-5 text-cream/85 marker:text-gold">
            {security.map((point) => (
              <li key={point} className="prose-copy pl-1">
                {point}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
