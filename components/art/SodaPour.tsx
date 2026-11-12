import Image from "next/image";
import type { CSSProperties } from "react";

/** Where the can's mouth tips over on the art, as a share of its box. */
const SPOUT = { left: "80%", top: "22%" };
/** The unbroken column of cola, then the gap it breaks up and drips through.
 *  Fixed lengths, so the pour ends inside the header instead of running on
 *  down the page. */
const STREAM_LENGTH = "clamp(7rem, 22vh, 13rem)";
const FALL_LENGTH = "clamp(5rem, 14vh, 8rem)";
const COLA = "#5a230c";

/** Each drop's head start through the fall, staggered so one is always
 *  leaving the stream. `at` is where it rests when motion is reduced. */
const DROPS = [
  { delay: "0s", at: 0.1, size: "size-2.5 sm:size-3" },
  { delay: "0.15s", at: 0.38, size: "size-2 sm:size-2.5" },
  { delay: "0.3s", at: 0.62, size: "size-2.5 sm:size-3" },
  { delay: "0.45s", at: 0.86, size: "size-2 sm:size-2.5" },
] as const;
/** Fizz kicked back up out of the puddle, to either side. */
const REBOUNDS = [
  { dir: -1, delay: "0.05s" },
  { dir: 1, delay: "0.25s" },
  { dir: -0.5, delay: "0.45s" },
] as const;

interface SodaPourProps {
  /** The tilt the header gives the can, in degrees. The pour turns back by
   *  the same amount so it falls straight down, not on a slant. */
  tilt?: number;
}

/** Two bangled hands tipping a can of diet cola: a short stream that breaks
 *  into falling drops and lands in a frothing splash. */
export function SodaPour({ tilt = 0 }: SodaPourProps) {
  return (
    <div className="relative">
      <Image
        quality={90}
        src="/art/soda-can.webp"
        alt="Two hands stacked with bangles, tipping a can of cola"
        width={613}
        height={899}
        preload
        sizes="240px"
        className="sticker-edge h-auto w-full"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute block -translate-x-1/2"
        style={
          {
            ...SPOUT,
            rotate: `${-tilt}deg`,
            transformOrigin: "50% 0",
            "--fall": FALL_LENGTH,
          } as CSSProperties
        }
      >
        {/* The lip where the cola curls over the rim. */}
        <span
          className="cola-lip absolute top-0 left-1/2 block h-4 w-4 -translate-x-1/2 rounded-[50%_50%_45%_45%] border-2 border-cream/85 sm:h-5 sm:w-6"
          style={{ background: COLA }}
        />
        <span
          className="cola-stream relative mx-auto block w-2 rounded-b-full border-x-2 border-b-2 border-cream/80 shadow-[3px_0_0_rgb(0_0_0/0.3)] sm:w-3.5"
          style={{ height: STREAM_LENGTH, backgroundColor: COLA }}
        />
        {/* Where the stream gives out, it falls as separate drops. */}
        <span className="relative mx-auto block w-0" style={{ height: FALL_LENGTH }}>
          {DROPS.map((drop) => (
            <span
              key={drop.delay}
              className={`coke-drop absolute top-0 left-0 block border-2 border-cream/80 shadow-[2px_1px_0_rgb(0_0_0/0.3)] ${drop.size}`}
              style={
                {
                  background: COLA,
                  animationDelay: drop.delay,
                  "--at": drop.at,
                } as CSSProperties
              }
            />
          ))}
        </span>
        {/* The puddle, frothing where the drops land, with fizz kicking back. */}
        <span className="relative mx-auto block h-3 w-0">
          <span
            className="cola-splash absolute top-0 left-0 block h-3 w-12 -translate-x-1/2 rounded-[50%] border-2 border-cream/80 sm:w-16"
            style={{ background: COLA }}
          />
          {REBOUNDS.map((hop) => (
            <span
              key={hop.delay}
              className="cola-hop absolute top-0 left-0 block size-1.5 -translate-x-1/2 rounded-full border border-cream/80"
              style={
                {
                  background: COLA,
                  animationDelay: hop.delay,
                  "--dir": hop.dir,
                } as CSSProperties
              }
            />
          ))}
        </span>
      </span>
    </div>
  );
}
