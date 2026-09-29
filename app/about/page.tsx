import Image from "next/image";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { about } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: about.fitoor[0],
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="about us" intro={about.theme} />

      <div className="border-t border-cream/15 bg-maroon-deepest">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <section>
            <h2 className="font-display text-4xl text-gold sm:text-5xl">
              fitoor
            </h2>
            {about.fitoor.map((p) => (
              <p key={p} className="font-body prose-copy mt-5 text-cream/85">
                {p}
              </p>
            ))}
          </section>

          <section>
            <h2 className="font-display text-4xl text-gold sm:text-5xl">
              plaksha university
            </h2>
            {about.plaksha.map((p) => (
              <p key={p} className="font-body prose-copy mt-5 text-cream/85">
                {p}
              </p>
            ))}
            <Image
              src="/brand/plaksha.png"
              alt="Plaksha University"
              width={600}
              height={180}
              className="mt-10 h-12 w-auto"
            />
          </section>
        </div>
      </div>
    </>
  );
}
