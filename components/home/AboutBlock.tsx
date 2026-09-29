import Image from "next/image";
import Link from "next/link";
import { about } from "@/data/content";

export function AboutBlock() {
  return (
    <section className="bg-maroon">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-32">
        <div>
          <h2 className="font-display text-5xl text-gold sm:text-6xl">
            about us
          </h2>
          <p className="font-body prose-copy mt-8 text-lg text-cream">
            {about.theme}
          </p>
          <p className="font-body prose-copy mt-6 text-cream/80">
            {about.fitoor[0]}
          </p>
          <Link
            href="/about"
            className="font-body mt-6 inline-flex min-h-12 items-center font-semibold text-gold underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
          >
            Read more about Fitoor and Plaksha
          </Link>
        </div>

        <Image
          src="/art/auto-rickshaw.webp"
          alt="A yellow and green auto rickshaw"
          width={973}
          height={604}
          sizes="(min-width: 1024px) 460px, 90vw"
          className="mx-auto h-auto w-full max-w-md lg:max-w-none"
        />
      </div>
    </section>
  );
}
