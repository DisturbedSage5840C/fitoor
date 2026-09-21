"use client";

import dynamic from "next/dynamic";
import { CanvasGate } from "@/components/three/CanvasGate";

const RocketStarfield = dynamic(() => import("@/components/three/RocketStarfield"), {
  ssr: false,
});

function StaticGlow() {
  return (
    <>
      <div
        className="pointer-events-none absolute -inset-10 opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, var(--sunset), var(--apricot) 55%, transparent 78%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-4 opacity-40 blur-xl"
        style={{
          background:
            "radial-gradient(50% 50% at 30% 65%, var(--electric-magenta), transparent 70%)",
        }}
        aria-hidden
      />
    </>
  );
}

export function HeroScene() {
  return (
    <CanvasGate
      className="pointer-events-none absolute -inset-16 sm:-inset-24"
      fallback={<StaticGlow />}
    >
      <RocketStarfield />
    </CanvasGate>
  );
}
