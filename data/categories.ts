import {
  Music,
  PersonStanding,
  Palette,
  PartyPopper,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import type { Category, CategorySlug } from "./types";

export const categories: Record<CategorySlug, Category> = {
  music: {
    slug: "music",
    name: "Music",
    hindiName: "संगीत",
    tagline: "Boombox nostalgia meets open mic",
    description:
      "From solo crooners to full bands — battle it out across genres, decades, and languages on Fitoor's biggest stage.",
    icon: "Music",
  },
  dance: {
    slug: "dance",
    name: "Dance",
    hindiName: "नृत्य",
    tagline: "Bollywood beats, desi footwork",
    description:
      "Classical, western, fusion, or straight-up filmy — bring the choreography that gets the whole crowd on its feet.",
    icon: "PersonStanding",
  },
  art: {
    slug: "art",
    name: "Art",
    hindiName: "कला",
    tagline: "Retro visuals, Y2K color palettes",
    description:
      "Canvas, digital, street-style, or improvised on the spot — every category for every kind of visual artist.",
    icon: "Palette",
  },
  misc: {
    slug: "misc",
    name: "Miscellaneous",
    hindiName: "विविध",
    tagline: "The wildcard lineup",
    description:
      "Gaming, quizzing, stand-up, fashion — the events that don't fit a neat box but you'd never skip.",
    icon: "PartyPopper",
  },
  business: {
    slug: "business",
    name: "Business",
    hindiName: "व्यवसाय",
    tagline: "Case studies with a Fitoor twist",
    description:
      "Pitch decks, case competitions, and strategy sprints for the crowd that came to fest AND to hustle.",
    icon: "Briefcase",
  },
};

export const categoryList: Category[] = Object.values(categories);

/** Resolved icon components, keyed by category — avoids a runtime string→component lookup. */
export const categoryIcons: Record<CategorySlug, LucideIcon> = {
  music: Music,
  dance: PersonStanding,
  art: Palette,
  misc: PartyPopper,
  business: Briefcase,
};
