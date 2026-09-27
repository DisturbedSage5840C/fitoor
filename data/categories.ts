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
    artAlt:
      "A worn high-top sneaker next to an embroidered jutti with ghungroo",
  },
  art: {
    slug: "art",
    name: "Art & Expression",
    hindiName: "कला",
    description:
      "A celebration of creativity across art, photography, theatre and fashion — traditional forms and bold, innovative expressions sharing one stage.",
    art: "/art/painting.jpg",
    artAlt: "A bangled hand painting a miniature-style portrait",
  },
  "wit-whim": {
    slug: "wit-whim",
    name: "Wit & Whim",
    hindiName: "चतुराई",
    description:
      "From quizzing and clever challenges to literary treasure hunts and murder mysteries — events that put your wit, curiosity and problem-solving skills to the test.",
    art: "/art/puppets.webp",
    artAlt: "A row of string puppets",
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
