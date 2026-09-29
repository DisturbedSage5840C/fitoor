import Image from "next/image";
import Link from "next/link";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionGround } from "@/components/shared/SectionGround";
import { Smiley } from "@/components/shared/Stickers";
import { Sticker } from "@/components/shared/Sticker";
import { StatTapes } from "@/components/shared/StatTapes";
import { about } from "@/data/content";

export function AboutBlock() {
  return (
    <SectionGround ground="grain">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
        <div>
          <RevealOnScroll>
            <NeonTitle>about us</NeonTitle>
          </RevealOnScroll>
          <p className="font-body mt-8 max-w-xl text-lg leading-relaxed text-cream/90">
            {about.theme}
          </p>
          <p className="font-body mt-4 max-w-xl leading-relaxed text-cream/80">
            {about.fitoor[0]}
          </p>
          <Link
            href="/about"
            className="font-script mt-4 inline-block py-2 text-2xl text-gold underline decoration-rose decoration-2 underline-offset-4 hover:text-gold-bright"
          >
            more about Fitoor and Plaksha
          </Link>

          <StatTapes className="mt-12" />
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:translate-x-12">
          <Image
            quality={90}
            src="/art/auto-rickshaw.webp"
            alt="A yellow-and-green auto rickshaw"
            width={973}
            height={604}
            sizes="(min-width: 1024px) 560px, 90vw"
            className="relative z-10 h-auto w-full -rotate-3 drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
          />
          <Sticker tilt={12} className="absolute -top-4 right-2 z-20 size-16 sm:size-20">
            <Smiley />
          </Sticker>
        </div>
      </div>
    </SectionGround>
  );
}
