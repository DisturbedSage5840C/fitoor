import Link from "next/link";
import type { Metadata } from "next";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { categoryList } from "@/data/categories";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="polka-purple bg-dupatta">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center gap-6 px-4 py-24 sm:px-6">
        <p className="font-display text-[8rem] leading-none text-transparent [-webkit-text-stroke:3px_var(--gold)] sm:text-[12rem]">
          404
        </p>
        <NeonTitle as="h1" size="xl">
          wrong turn
        </NeonTitle>
        <p className="font-body max-w-md text-lg leading-relaxed text-cream/85">
          This page does not exist, or it moved. Head back to the fest.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="font-body inline-flex min-h-11 items-center bg-gold px-6 font-bold text-maroon-deepest shadow-[4px_4px_0_var(--rose)] transition-transform hover:-translate-y-0.5"
          >
            Back home
          </Link>
          <Link
            href="/events"
            className="font-body inline-flex min-h-11 items-center border-2 border-gold px-6 font-bold text-gold transition-colors hover:bg-gold/10"
          >
            All events
          </Link>
        </div>
        <ul className="font-body flex flex-wrap gap-x-5 gap-y-1 text-sm text-cream/75">
          {categoryList.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/events/${c.slug}`}
                className="inline-block py-2 hover:text-gold"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
