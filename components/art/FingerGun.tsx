"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Burst } from "@/components/shared/Stickers";
import { playGunshot } from "@/lib/sound";

/** Where the fingertip "barrel" ends on the art, as a share of its box. */
const MUZZLE = { left: "97%", top: "46%" };
/** Smoke puffs leave the barrel one after another. */
const SMOKE_DELAYS = [0.08, 0.3, 0.52];

/** The ringed finger-gun. It fires once when the page opens: a stop-motion
 *  kick, a muzzle flash, a curl of smoke and a quiet, muffled shot. Press it
 *  to fire again. */
export function FingerGun() {
  const [shots, setShots] = useState(0);
  const firedRef = useRef(false);

  useEffect(() => {
    // StrictMode runs effects twice in development; the ref keeps it to one shot.
    if (firedRef.current) return;
    firedRef.current = true;
    playGunshot();
  }, []);

  const fire = () => {
    playGunshot();
    setShots((n) => n + 1);
  };

  return (
    <button
      type="button"
      onClick={fire}
      aria-label="Fire the finger-gun"
      title="Fire again"
      className="pointer-events-auto relative block w-full cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-rose"
    >
      {/* Re-keying restarts every animation inside on each shot. */}
      <span key={shots} className="relative block">
        <span className="gun-recoil sticker-edge block origin-[10%_75%]">
          <Image
            quality={90}
            src="/art/finger-gun.webp"
            alt="A ringed hand making a finger-gun"
            width={993}
            height={722}
            preload
            sizes="240px"
            className="h-auto w-full"
          />
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 max-sm:scale-[0.6]"
          style={MUZZLE}
        >
          <span className="muzzle-flash block size-12 text-gold-bright sm:size-16">
            <Burst />
          </span>
          {SMOKE_DELAYS.map((delay) => (
            <span
              key={delay}
              className="gun-smoke absolute top-1/2 left-1/2 size-5 -translate-1/2 rounded-full border-2 border-maroon-deepest/30 bg-cream/70 sm:size-7"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </span>
      </span>
    </button>
  );
}
