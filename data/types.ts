export type CategorySlug = "music" | "dance" | "art" | "misc" | "business";

export interface Category {
  slug: CategorySlug;
  name: string;
  hindiName: string;
  tagline: string;
  description: string;
  /** lucide-react icon component name, e.g. "Music", "Drama" */
  icon: string;
}

export interface EventCoordinator {
  name: string;
  phone: string;
}

export interface EventItem {
  id: string;
  category: CategorySlug;
  title: string;
  tagline: string;
  description: string;
  format: "Solo" | "Duo" | "Team";
  teamSize?: string;
  day: 1 | 2;
  time: string;
  venue: string;
  prize: string;
  rules: string[];
  coordinators: EventCoordinator[];
  /** true while real event details are still placeholders */
  isPlaceholder: boolean;
}

export type ScheduleEntryKind = "event" | "ceremony" | "performance" | "break";

export interface ScheduleEntry {
  id: string;
  day: 1 | 2;
  date: string;
  time: string;
  title: string;
  venue: string;
  category?: CategorySlug;
  kind: ScheduleEntryKind;
}

export interface ContactPerson {
  name: string;
  role: string;
  phone: string;
  email?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
