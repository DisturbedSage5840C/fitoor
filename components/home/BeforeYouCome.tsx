import Image from "next/image";
import Link from "next/link";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionGround } from "@/components/shared/SectionGround";
import { Tape } from "@/components/shared/Tape";
import { generalRules } from "@/data/content";

/** Notes on the board: each one a different tilt, tape spot and starting height. */
const NOTES = [
  { tilt: -2.5, tape: "left-6 -rotate-6", drop: "sm:mt-0", tone: "bg-bandage" },
  { tilt: 2, tape: "right-8 rotate-3", drop: "sm:mt-12", tone: "bg-gold-bright" },
  { tilt: 1.5, tape: "left-1/2 -rotate-2", drop: "sm:-mt-6", tone: "bg-gold-bright" },
  { tilt: -1.5, tape: "right-6 rotate-6", drop: "sm:mt-4", tone: "bg-bandage" },
] as const;

export function BeforeYouCome() {
  return (
    <SectionGround ground="polka">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="relative">
            <RevealOnScroll variant="slide">
              <NeonTitle>general rules</NeonTitle>
            </RevealOnScroll>
            <Image
              quality={90}
              src="/art/puppets.webp"
              alt="Two Rajasthani kathputli puppets, one wearing sunglasses"
              width={768}
              height={1024}
              sizes="(min-width: 1024px) 320px, 60vw"
              className="sticker-edge mt-10 h-auto w-3/4 max-w-xs -rotate-2 lg:w-full"
            />
          </div>

          <div>
            <ol className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2">
              {generalRules.slice(0, 4).map((rule, i) => {
                const n = NOTES[i];
                return (
                  <li
                    key={rule}
                    className={`relative ${n.drop}`}
                    style={{ rotate: `${n.tilt}deg` }}
                  >
                    <Tape
                      tilt={0}
                      tone="rose"
                      className={`absolute -top-3 z-10 h-6 w-16 px-0 py-0 ${n.tape}`}
                    />
                    <div
                      className={`${n.tone} px-5 pt-7 pb-6 text-maroon-deepest shadow-[4px_6px_0_rgb(0_0_0/0.4)]`}
                    >
                      <span className="font-script text-5xl leading-none text-rose">
                        {i + 1}
                      </span>
                      <p className="font-body mt-2 text-sm leading-relaxed font-medium">
                        {rule}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/generalities"
                className="font-script inline-block py-2 text-2xl text-gold underline decoration-rose decoration-2 underline-offset-4 hover:text-gold-bright"
              >
                all rules and security
              </Link>
              <Link href="/accommodation" className="inline-block py-2">
                <Tape
                  tilt={-3}
                  tone="gold"
                  className="font-title text-xl transition-transform hover:rotate-2"
                >
                  where to stay
                </Tape>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionGround>
  );
}
