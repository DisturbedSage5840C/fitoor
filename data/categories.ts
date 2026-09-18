import { Gamepad2, Music, Drama, Palette, type LucideIcon } from "lucide-react";
import type { Category, CategorySlug } from "./types";

export const categories: Record<CategorySlug, Category> = {
  esports: {
    slug: "esports",
    name: "Esports",
    subLabel: "GAMING",
    tagline: "Gaming",
    description:
      "Valorant, FIFA, and everything in between — squad up and battle it out across the fest's biggest gaming lineup.",
    icon: "Gamepad2",
  },
  music: {
    slug: "music",
    name: "Fitoor",
    subLabel: "BANDS",
    tagline: "Music",
    description:
      "From solo crooners to full bands — battle it out across genres, decades, and languages on Fitoor's biggest stage.",
    icon: "Music",
  },
  naatak: {
    slug: "naatak",
    name: "Naatak",
    subLabel: "DRAMATICS",
    tagline: "Theatre",
    description:
      "Street plays, stage drama, and everything theatrical — for performers who live for the spotlight.",
    icon: "Drama",
  },
  artwork: {
    slug: "artwork",
    name: "1900AD",
    subLabel: "ARTWORK",
    tagline: "Artwork",
    description:
      "Canvas, digital, street-style, or improvised on the spot — every category for every kind of visual artist.",
    icon: "Palette",
  },
};

export const categoryList: Category[] = Object.values(categories);

/** Resolved icon components, keyed by category — avoids a runtime string→component lookup. */
export const categoryIcons: Record<CategorySlug, LucideIcon> = {
  esports: Gamepad2,
  music: Music,
  naatak: Drama,
  artwork: Palette,
};
