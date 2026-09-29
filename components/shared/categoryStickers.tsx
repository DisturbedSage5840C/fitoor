import type { ReactNode } from "react";
import { BarcodeTag, Burst, Marigold, Smiley, SwordsGlyph } from "@/components/shared/Stickers";
import type { CategorySlug } from "@/data/types";

/** One sticker glyph per category, drawn to sit inside a `Sticker` wrapper. */
export const categoryStickers: Record<CategorySlug, ReactNode> = {
  music: <Smiley />,
  dance: <Marigold />,
  art: (
    <span className="block size-full text-gold">
      <Burst />
    </span>
  ),
  "wit-whim": (
    <span className="block size-full text-gold">
      <SwordsGlyph />
    </span>
  ),
  business: <BarcodeTag />,
};
