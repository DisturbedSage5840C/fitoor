import type { Category, CategorySlug } from "./types";

export const categories: Record<CategorySlug, Category> = {
  music: {
    slug: "music",
    name: "Music",
    hindiName: "संगीत",
    urduName: "موسیقی",
    description:
      "Battles will bring solo singers, bands, and instrumentalists across Western and Classical styles to the stage, filling the air with melodies and harmonies.",
    art: "/art/mic-hand.webp",
    artAlt: "A ringed hand gripping a vintage microphone",
  },
  dance: {
    slug: "dance",
    name: "Dance",
    hindiName: "नृत्य",
    urduName: "رقص",
    description:
      "Competitions span classical to western styles, with solo, group and battle formats, allowing dance enthusiasts to showcase their rhythm and moves.",
    art: "/art/sneaker-jutti.webp",
    artAlt:
      "A worn high-top sneaker next to an embroidered jutti with ghungroo",
  },
  art: {
    slug: "art",
    name: "Art & Expression",
    hindiName: "कला",
    urduName: "فن",
    description:
      "A celebration of creativity across art, photography, theatre, and fashion, bringing traditional forms and bold, innovative expressions together on one stage.",
    art: "/art/painting.jpg",
    artAlt: "A bangled hand painting a miniature-style portrait",
  },
  "wit-whim": {
    slug: "wit-whim",
    name: "Wit & Whim",
    hindiName: "चतुराई",
    urduName: "ذہانت",
    description:
      "From quizzing and clever challenges to literary treasure hunts and murder mysteries, these events put your wit, curiosity, and problem-solving skills to the test.",
    art: "/art/puppets.webp",
    artAlt: "A row of string puppets",
  },
  business: {
    slug: "business",
    name: "Business",
    hindiName: "व्यवसाय",
    urduName: "کاروبار",
    description:
      "Case competitions, M&A simulations, and more will bring sharp strategy, quick thinking, and business acumen to the stage, showcasing corporate intellect.",
    art: "/art/business-collage.webp",
    artAlt: "Collage of gold jewellery, a vintage car and a colonial facade",
  },
};

export const categoryList: Category[] = Object.values(categories);
