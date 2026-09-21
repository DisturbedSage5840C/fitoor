import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { CollageCard } from "@/components/zine/CollageCard";
import { SpacingDivider } from "@/components/zine/SpacingDivider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { generalRules, generalFaqs } from "@/data/content";

export const metadata: Metadata = {
  title: "Generalities",
  description: "General rules and frequently asked questions for Fitoor 2026.",
};

export default function GeneralitiesPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-4 py-16 sm:px-6 sm:py-20">
      <div className="flex flex-col gap-10">
        <SectionHeading eyebrow="04 — Generalities" title="General rules" frame="zine" />
        <RevealOnScroll variant="collage-in">
          <CollageCard seed={8} torn="top" intensity="high" className="p-6 sm:p-8">
            <ol className="font-body flex flex-col gap-3 text-base text-cream/80">
              {generalRules.map((rule, i) => (
                <li key={rule} className="flex gap-3">
                  <span className="font-pixel shrink-0 text-sm text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-pretty">{rule}</span>
                </li>
              ))}
            </ol>
          </CollageCard>
        </RevealOnScroll>
      </div>

      <SpacingDivider label="PG. 04" seed={9} />

      <div className="flex flex-col gap-10">
        <SectionHeading eyebrow="FAQs" title="Frequently asked questions" frame="zine" />
        <RevealOnScroll variant="collage-in">
          <CollageCard seed={10} torn="bottom" intensity="high" className="p-6 sm:p-8">
            <Accordion>
              {generalFaqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`faq-${i}`}>
                  <AccordionTrigger className="font-body text-base text-cream hover:text-gold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-body text-sm text-cream/70 text-pretty">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CollageCard>
        </RevealOnScroll>
      </div>
    </div>
  );
}
