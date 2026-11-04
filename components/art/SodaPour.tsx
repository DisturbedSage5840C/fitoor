"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** Where the can's mouth tips over on the art, as a share of its box. */
const SPOUT = { left: "80%", top: "22%" };
/** Stops the stream a hair short of the page end so it never stretches it. */
const BOTTOM_GAP_PX = 2;

interface SodaPourProps {
  /** The tilt the header gives the can, in degrees. The stream turns back by
   *  the same amount so it falls straight down the page, not on a slant. */
  tilt?: number;
}

/** Two bangled hands tipping a can of diet cola that never runs dry: one
 *  unbroken waterfall from the can's mouth all the way to the foot of the page. */
export function SodaPour({ tilt = 0 }: SodaPourProps) {
  const streamRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stream = streamRef.current;
    if (!stream) return;

    const fit = () => {
      // Collapse first so the old stream doesn't hold the page open, then
      // run it from the spout to the very bottom of the document.
      stream.style.height = "0px";
      const top = stream.getBoundingClientRect().top + window.scrollY;
      const bottom = document.documentElement.scrollHeight;
      stream.style.height = `${Math.max(0, bottom - top - BOTTOM_GAP_PX)}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(document.body);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

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
        style={{ ...SPOUT, rotate: `${-tilt}deg`, transformOrigin: "50% 0" }}
      >
        {/* The lip where the cola curls over the rim. */}
        <span className="cola-lip absolute top-0 left-1/2 block h-4 w-4 -translate-x-1/2 rounded-[50%_50%_45%_45%] border-2 border-cream/85 bg-[#5a230c] sm:h-5 sm:w-6" />
        <span
          ref={streamRef}
          className="cola-stream relative mx-auto block h-0 w-2 border-x-2 border-cream/80 bg-[#5a230c] shadow-[3px_0_0_rgb(0_0_0/0.3)] sm:w-3.5"
        />
        {/* A puddle frothing where the fall hits the bottom of the page. */}
        <span className="cola-splash absolute bottom-0 left-1/2 block h-3 w-12 -translate-x-1/2 rounded-[50%] border-2 border-cream/80 bg-[#5a230c] sm:w-16" />
      </span>
    </div>
  );
}
