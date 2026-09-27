export type CategorySlug = "music" | "dance" | "art" | "wit-whim" | "business";

export interface Category {
  slug: CategorySlug;
  name: string;
  hindiName: string;
  /** Blurb lifted from the brochure's "themes and events" page. */
  description: string;
  /** Brochure cut-out used as the category's hero illustration. */
  art: string;
  artAlt: string;
}

export type ClubId =
  | "crescendo"
  | "one-o-one"
  | "rangrez"
  | "spine"
  | "pqc"
  | "lamhe"
  | "spotlight"
  | "ecell"
  | "pfc"
  | "pcc";

export interface Club {
  id: ClubId;
  name: string;
  /** e.g. "the Plaksha Music Club" — as printed on the brochure. */
  description: string;
  logo: string;
}

export interface EventItem {
  /** URL-safe slug, also used as the anchor id on the category page. */
  id: string;
  category: CategorySlug;
  title: string;
  /** Script subtitle from the brochure, e.g. "classical vocal performance". */
  subtitle: string;
  description: string;
  /** Participation format exactly as the brochure words it. */
  format: string;
  /** Extra one-liner facts (duration, rounds…) shown as chips. */
  facts?: string[];
  rules: string[];
  club?: ClubId;
  /** As printed on the brochure, e.g. "₹100 per head". */
  fee: string;
  /** As printed on the brochure, e.g. "₹8,000". */
  prizePool: string;
  /** As printed on the brochure, e.g. "14 Nov · 3 – 4:30 PM". */
  dateTime: string;
}

export interface ContactPerson {
  name: string;
  phone: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
