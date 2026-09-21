"use client";

import dynamic from "next/dynamic";
import { CanvasGate } from "@/components/three/CanvasGate";
import { SpacingDivider } from "@/components/zine/SpacingDivider";

const PageTurn = dynamic(() => import("@/components/three/PageTurn"), { ssr: false });

export function PageTurnMoment({ label, seed }: { label: string; seed: number }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <CanvasGate
        className="mx-auto h-[45vh] max-h-[420px] w-full max-w-sm sm:h-[55vh]"
        fallback={
          <div className="flex h-full items-center">
            <SpacingDivider label={label} seed={seed} className="w-full" />
          </div>
        }
      >
        <PageTurn />
      </CanvasGate>
    </div>
  );
}
