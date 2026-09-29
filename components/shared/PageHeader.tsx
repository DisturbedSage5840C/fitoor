import Image from "next/image";
import type { ReactNode } from "react";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Sticker } from "@/components/shared/Sticker";
import { TrimDivider } from "@/components/shared/TrimDivider";
import { cn } from "@/lib/utils";

const GROUNDS = {
  halftone: "bg-maroon halftone",
  polka: "bg-dupatta polka-purple",
  plain: "bg-maroon-deepest",
} as const;

interface PageHeaderProps {
  title: string;
  script?: string;
  intro?: ReactNode;
  art?: { src: string; alt: string; width: number; height: number };
  /** Each page gets its own surface, art tilt and sticker so no two headers match. */
  ground?: keyof typeof GROUNDS;
  artTilt?: number;
  /** A glyph from `Stickers.tsx`, stuck on the corner of the art. */
  sticker?: ReactNode;
  stickerTilt?: number;
}

/**
 * Top of every inner page. The title stamps in once, and the cut-out art hangs
 * over the bottom edge into the next section instead of sitting inside a box.
 */
export function PageHeader({
  title,
  script,
  intro,
  art,
  ground = "halftone",
  artTilt = 4,
  sticker,
  stickerTilt = 12,
}: PageHeaderProps) {
  return (
    <header className="relative z-10">
      <div className={cn("relative isolate overflow-hidden", GROUNDS[ground])}>
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-4 pt-14 pb-24 sm:px-6 sm:pt-20 sm:pb-16">
          <div className="min-w-0">
            <RevealOnScroll variant="stamp">
              <NeonTitle as="h1" size={title.length > 9 ? "xl-long" : "xl"} script={script}>
                {title}
              </NeonTitle>
            </RevealOnScroll>
            {intro ? (
              <div className="font-body mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
                {intro}
              </div>
            ) : null}
          </div>
          {art ? <div className="hidden w-44 shrink-0 sm:block lg:w-60" aria-hidden /> : null}
        </div>
        <TrimDivider className="absolute inset-x-0 bottom-0 text-gold/60" />
      </div>

      {art ? (
        <div className="pointer-events-none absolute right-4 bottom-0 w-24 translate-y-1/3 sm:right-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] sm:w-44 lg:w-60">
          <Image
            quality={90}
            src={art.src}
            alt={art.alt}
            width={art.width}
            height={art.height}
            preload
            sizes="240px"
            className="sticker-edge h-auto w-full"
            style={{ rotate: `${artTilt}deg` }}
          />
          {sticker ? (
            <Sticker tilt={stickerTilt} className="animate-slap absolute -top-4 -left-5 size-14 sm:-top-4 sm:-left-6 sm:size-16">
              {sticker}
            </Sticker>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
