"use client";

import dynamic from "next/dynamic";
import { CanvasGate } from "@/components/three/CanvasGate";
import { categoryList, categoryIcons } from "@/data/categories";

const IconClusterScene = dynamic(() => import("@/components/three/IconClusterScene"), {
  ssr: false,
});

function StaticRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {categoryList.map((category) => {
        const Icon = categoryIcons[category.slug];
        return (
          <div
            key={category.slug}
            data-category={category.slug}
            className="flex flex-col items-center gap-2 rounded-2xl border border-category bg-maroon/90 px-4 py-5 text-center"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-category/20 text-category-light">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="font-display text-sm whitespace-nowrap text-cream">
              {category.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function EventsIconCluster() {
  return (
    <CanvasGate className="mx-auto flex h-[320px] w-full max-w-2xl items-center justify-center sm:h-[380px]" fallback={<StaticRow />}>
      <IconClusterScene />
    </CanvasGate>
  );
}
