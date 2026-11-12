import Image from "next/image";

const WIDTH = 907;
const HEIGHT = 1024;
/** The bloom sprite's box on the 907x1024 art, as built by
 *  scripts/build-lily-bloom.py (its CROP): 14 frames stacked top to bottom. */
const SPRITE_BOX = { left: 180, top: 0, right: 907, bottom: 470 };
const pct = (n: number, of: number) => `${(n / of) * 100}%`;

/** The ringed hand from the cover. Its red lily starts as a closed bud on
 *  the stem and opens petal by petal, frame by frame, on load, then holds. */
export function LilyBloom() {
  return (
    <div className="sticker-edge relative">
      <Image
        quality={90}
        src="/art/lily-base.webp"
        alt="A hand heavy with rings and chains holding a red lily"
        width={WIDTH}
        height={HEIGHT}
        preload
        sizes="240px"
        className="h-auto w-full"
      />
      <span
        aria-hidden
        className="lily-bloom absolute block bg-[url(/art/lily-bloom.webp)] bg-no-repeat"
        style={{
          left: pct(SPRITE_BOX.left, WIDTH),
          top: pct(SPRITE_BOX.top, HEIGHT),
          width: pct(SPRITE_BOX.right - SPRITE_BOX.left, WIDTH),
          height: pct(SPRITE_BOX.bottom - SPRITE_BOX.top, HEIGHT),
        }}
      />
    </div>
  );
}
