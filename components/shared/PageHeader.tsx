import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  intro?: ReactNode;
}

/** Top of every inner page: a plain Druk heading, optional brochure intro. */
export function PageHeader({ title, intro }: PageHeaderProps) {
  return (
    <header className="bg-maroon">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
        <h1 className="font-display text-6xl text-gold sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        {intro ? (
          <div className="font-body prose-copy mt-6 text-lg text-cream/85">
            {intro}
          </div>
        ) : null}
      </div>
    </header>
  );
}
