import Image from "next/image";

const WIDTH = 613;
const HEIGHT = 899;
/** The pour sprite's box on the 613x899 can art, as built by
 *  scripts/build-cola-pour.py (its BOX and SPOUT): 8 frames stacked top to bottom. */
const SPRITE_BOX = { left: 280, top: 150, right: 720, bottom: 1010 };
const SPOUT = { x: 490, y: 200 };
const pct = (n: number, of: number) => `${(n / of) * 100}%`;

interface SodaPourProps {
  /** The header's tilt on the art, undone here so the cola falls straight down. */
  tilt?: number;
}

/** The bangled hands tipping a can: a thick, glossy cola stream pours out of
 *  it without end and lands in a cartoon crown splash, drawn frame by frame. */
export function SodaPour({ tilt = 0 }: SodaPourProps) {
  return (
    <div className="relative">
      <Image
        quality={90}
        src="/art/soda-can.webp"
        alt="Two hands stacked with bangles, tipping a can of cola"
        width={WIDTH}
        height={HEIGHT}
        preload
        sizes="240px"
        className="sticker-edge h-auto w-full"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          rotate: `${-tilt}deg`,
          transformOrigin: `${pct(SPOUT.x, WIDTH)} ${pct(SPOUT.y, HEIGHT)}`,
        }}
      >
        <span
          className="cola-pour sticker-edge absolute block bg-[url(/art/cola-pour.webp)] bg-no-repeat"
          style={{
            left: pct(SPRITE_BOX.left, WIDTH),
            top: pct(SPRITE_BOX.top, HEIGHT),
            width: pct(SPRITE_BOX.right - SPRITE_BOX.left, WIDTH),
            height: pct(SPRITE_BOX.bottom - SPRITE_BOX.top, HEIGHT),
          }}
        />
      </div>
    </div>
  );
}
