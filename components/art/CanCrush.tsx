"use client";

import Image from "next/image";
import { useState } from "react";
import { Burst } from "@/components/shared/Stickers";
import { playCanCrush } from "@/lib/sound";

const WIDTH = 636;
const HEIGHT = 985;
const SIZES = "(min-width: 1024px) 380px, 70vw";

/** The can above and below the fist, each on its own layer behind the hand. */
const CAN_PARTS = [
  { src: "/art/glass-hand-can-top.webp", motion: "can-top-crush origin-[50%_20%]" },
  { src: "/art/glass-hand-can-bottom.webp", motion: "can-bottom-crush origin-[35%_71%]" },
];

/** A ringed fist round a soda can. Point at it (or tap it) and the fist
 *  clenches towards its wrist while the can's ends kink out of the grip,
 *  with a crunch and a crackle. */
export function CanCrush() {
  // Each new crush re-keys the layers so their animations start over.
  const [crushes, setCrushes] = useState(0);
  const [crushed, setCrushed] = useState(false);

  const crush = () => {
    if (crushed) return;
    playCanCrush();
    setCrushed(true);
    setCrushes((n) => n + 1);
  };
  const release = () => setCrushed(false);

  return (
    <button
      type="button"
      onPointerEnter={crush}
      onPointerLeave={release}
      onFocus={crush}
      onBlur={release}
      onClick={() => (crushed ? release() : crush())}
      aria-label="Crush the can"
      className="relative mx-auto block w-full max-w-xs cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-rose"
    >
      <span className="sticker-edge relative block rotate-2">
        {CAN_PARTS.map((part) => (
          <span key={`${part.src}-${crushes}`} className={`absolute inset-0 block ${crushed ? part.motion : ""}`}>
            <Image quality={90} src={part.src} alt="" width={WIDTH} height={HEIGHT} sizes={SIZES} className="h-auto w-full" />
          </span>
        ))}
        {/* The hand is drawn last, on top, and clenches round the wrist. */}
        <Image
          key={`hand-${crushes}`}
          quality={90}
          src="/art/glass-hand-hand.webp"
          alt="A ringed hand crushing a soda can"
          width={WIDTH}
          height={HEIGHT}
          sizes={SIZES}
          className={`relative block h-auto w-full origin-[85%_100%] ${crushed ? "hand-squeeze" : ""}`}
        />
      </span>
      <span
        key={crushes}
        className={`pointer-events-none absolute -top-6 -left-6 block size-24 rotate-[-12deg] text-gold ${crushes ? "crush-pop" : ""}`}
      >
        <Burst />
      </span>
    </button>
  );
}
