import type { Category, CategorySlug } from "./types";

export const categories: Record<CategorySlug, Category> = {
  music: {
    slug: "music",
    name: "Music",
    hindiName: "संगीत",
    description:
      "Battles that bring solo singers, bands and instrumentalists to the stage — Western and Classical — filling the air with melodies and harmonies.",
    art: "/art/mic-hand.webp",
    artAlt: "A ringed hand gripping a vintage microphone",
  },
  dance: {
    slug: "dance",
    name: "Dance",
    hindiName: "नृत्य",
    description:
      "Competitions spanning classical to contemporary, solo and group, for anyone who wants to show off their rhythm and moves.",
    art: "/art/sneaker-jutti.webp",
    artAlt: "A worn high-top sneaker next to an embroidered jutti with ghungroo",
  },
  art: {
    slug: "art",
    name: "Art",
    hindiName: "कला",
    description:
      "A platform for creativity to shine — traditional art and innovative mixed-media work, made live on the day.",
    art: "/art/painting.jpg",
    artAlt: "A bangled hand painting a miniature-style portrait",
  },
  misc: {
    slug: "misc",
    name: "Miscellaneous",
    hindiName: "विविध",
    description:
      "Quizzes, interactive challenges, murder mysteries, theatre, film and style showcases — the events that refuse to fit in a box.",
    art: "/art/soda-can.webp",
    artAlt: "Henna-painted hands crushing a soda can",
  },
  business: {
    slug: "business",
    name: "Business",
    hindiName: "व्यवसाय",
    description:
      "Case competitions, market simulations and more — sharp strategy, quick thinking and business acumen, on stage.",
    art: "/art/business-collage.webp",
    artAlt: "Collage of gold jewellery, a vintage car and a colonial facade",
  },
};

export const categoryList: Category[] = Object.values(categories);
