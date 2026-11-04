import Image from "next/image";
import Link from "next/link";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionGround } from "@/components/shared/SectionGround";
import { Kulhad } from "@/components/shared/Stickers";
import { Sticker } from "@/components/shared/Sticker";
import { StatTapes } from "@/components/shared/StatTapes";
import { about } from "@/data/content";

/** Staggered starts so the puffs leave the tailpipe one after another. */
const EXHAUST_DELAYS = [0, 0.27, 0.53];

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

        <div className="group relative mx-auto w-full max-w-md lg:max-w-none lg:translate-x-12">
          {/* Hover: the rickshaw lurches forward frame by frame, coughing exhaust out the back. */}
          <div className="jolt-on-hover relative z-10 -rotate-3">
            <Image
              quality={90}
              src="/art/auto-rickshaw.webp"
              alt="A yellow-and-green auto rickshaw"
              width={973}
              height={604}
              sizes="(min-width: 1024px) 560px, 90vw"
              className="h-auto w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
            />
            {EXHAUST_DELAYS.map((delay) => (
              <span
                key={delay}
                aria-hidden
                className="exhaust-puff pointer-events-none absolute top-[58%] right-[-2%] size-7 rounded-full border-2 border-maroon-deepest/40 bg-cream/75 sm:size-9"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
          <Sticker tilt={12} className="absolute -top-4 right-2 z-20 size-16 sm:size-20">
            <Kulhad />
          </Sticker>
        </div>
      </div>
    </SectionGround>
  );
}
