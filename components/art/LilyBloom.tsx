import Image from "next/image";

const WIDTH = 907;
const HEIGHT = 1024;

/** A closed red bud in green sepals, drawn at the lily's heart. It sways and
 *  swells, then the petals open out of it and it fades under them. */
function LilyBud() {
  return (
    <svg
      viewBox="0 0 60 90"
      aria-hidden
      className="lily-bud absolute top-[40%] left-[64%] block w-[15%] -translate-x-1/2 -translate-y-1/2 origin-[50%_90%] drop-shadow-[2px_3px_0_rgb(0_0_0/0.35)]"
    >
      <path d="M30 4 C46 22 50 46 44 62 C40 72 20 72 16 62 C10 46 14 22 30 4 Z" fill="#c8242b" stroke="#2a0a0a" strokeWidth="2.5" />
      <path d="M30 10 C34 26 34 46 30 64" fill="none" stroke="#7d1018" strokeWidth="2" />
      <path d="M24 18 C20 30 20 42 23 52" fill="none" stroke="#f4a3a0" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 58 C20 66 26 70 30 86 C34 70 40 66 46 58 C40 64 34 66 30 66 C26 66 20 64 14 58 Z" fill="#3f7a2e" stroke="#1d3a14" strokeWidth="2" />
    </svg>
  );
}

/** The ringed hand from the cover, with its red lily cut onto its own layer
 *  so the flower opens out of a bud at the fingertips, frame by frame, on load. */
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
      <LilyBud />
      <Image
        quality={90}
        src="/art/lily-flower.webp"
        alt=""
        width={WIDTH}
        height={HEIGHT}
        preload
        sizes="240px"
        className="lily-bloom absolute inset-0 h-auto w-full origin-[64%_40%]"
      />
    </div>
  );
}
