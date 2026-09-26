import Image from "next/image";
import type { ReactNode } from "react";
import { NeonTitle } from "@/components/shared/NeonTitle";

interface PageHeaderProps {
  title: string;
  script: string;
  intro?: ReactNode;
  art?: { src: string; alt: string; width: number; height: number };
}

/** Top of every inner page: neon title, script line, optional cut-out art on the right. */
export function PageHeader({ title, script, intro, art }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden border-b border-gold/15 bg-maroon">
      <div
        className="halftone-light absolute inset-0 -z-10 opacity-60"
        aria-hidden
      />
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-4 pt-14 pb-12 sm:px-6 sm:pt-20">
        <div>
          <NeonTitle as="h1" size="xl" script={script}>
            {title}
          </NeonTitle>
          {intro ? (
            <div className="font-body mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
              {intro}
            </div>
          ) : null}
        </div>
        {art ? (
          <Image
            src={art.src}
            alt={art.alt}
            width={art.width}
            height={art.height}
            preload
            sizes="240px"
            className="-mb-12 hidden h-auto w-44 shrink-0 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] sm:block lg:w-60"
          />
        ) : null}
      </div>
    </header>
  );
}
