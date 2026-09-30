import type { ReactNode } from "react";
import { NeonTitle } from "@/components/shared/NeonTitle";

interface LegalPageProps {
  title: string;
  updated: string;
  children: ReactNode;
}

/** Plain reading layout for the legal pages. Content first, no decoration fighting the text. */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <div className="bg-maroon-deepest">
      <div className="mx-auto max-w-3xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24">
        <NeonTitle as="h1" size="lg">
          {title}
        </NeonTitle>
        <p className="font-body mt-4 text-sm text-cream/70">
          Last updated {updated}
        </p>
        <div className="font-body mt-10 space-y-8 leading-relaxed text-cream/85 [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 [&_h2]:font-title [&_h2]:mb-3 [&_h2]:text-3xl [&_h2]:text-gold [&_h2]:lowercase [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </div>
  );
}
