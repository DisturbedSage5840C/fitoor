import type { FaqItem } from "./types";

export const fest = {
  name: "Fitoor",
  year: 2026,
  theme: "Retro, Reloaded.",
  dates: "Nov 14–15, 2026",
  startDateISO: "2026-11-14T09:00:00+05:30",
  university: "Plaksha University",
};

export const hero = {
  eyebrow: "Plaksha University presents",
  title: "Fitoor",
  subtitle:
    "Two days. Four categories. One obsession. Bold type, retro shades, and neon-bright energy — Fitoor is Plaksha's biggest stage for gaming, music, theatre, and art.",
  cta: {
    primary: { label: "See the Line-up", href: "/events" },
    secondary: { label: "View Schedule", href: "/schedule" },
  },
};

export const about = {
  intro:
    "Fitoor is Plaksha University's annual cultural fest — two days where the campus turns into a stage, a gallery, an arena, and a dance floor all at once. It's the one weekend a year built entirely around obsession: with music, with performance, with color, with competition.",
  themeStatement:
    "\"Retro, Reloaded.\" is this year's theme — vintage line-art glamour and bold, oversized type, rewired with neon-bright modern energy. Be bold. Be retro. Be Fitoor.",
  paragraphs: [
    "Every year, Fitoor brings together gamers, performers, artists, and musicians from across the country for a weekend of competition, performance, and pure chaos in the best sense.",
    "Whether you're here to compete, perform, watch, or just vibe — there's a place for you across our four event categories: Esports, Fitoor (Music), Naatak (Theatre), and 1900AD (Artwork).",
  ],
};

export const generalRules: string[] = [
  "Valid college/university ID is mandatory for all participants and attendees.",
  "Registrations for individual events close 24 hours before the event's scheduled slot, unless stated otherwise.",
  "Fitoor merchandise and event passes are non-transferable.",
  "The organizing committee's decision on all competitive matters is final.",
  "Any change in event schedule, venue, or rules will be communicated via the official Instagram page (@fitoor.plaksha) and on-ground notice boards.",
  "Participants are expected to conduct themselves respectfully — any form of misconduct will lead to immediate disqualification.",
];

export const generalFaqs: FaqItem[] = [
  {
    question: "How do I register for an event?",
    answer:
      "Registration details and links will be posted on the official Instagram page (@fitoor.plaksha) and updated here closer to the event.",
  },
  {
    question: "Is there a registration fee?",
    answer: "Fee details vary by event category and will be announced alongside registration links.",
  },
  {
    question: "Can outside colleges participate?",
    answer:
      "Yes — Fitoor welcomes participants from other colleges and universities across most event categories. Specific eligibility will be listed per event.",
  },
  {
    question: "Where can I get updates during the fest?",
    answer:
      "Follow @fitoor.plaksha on Instagram for real-time schedule changes, venue updates, and announcements.",
  },
];

export const accommodation = {
  intro:
    "Outstation participants can request on-campus accommodation for the duration of the fest. Availability is limited and allotted on a first-come, first-served basis once registrations open.",
  points: [
    "Accommodation requests must be submitted along with event registration.",
    "Separate arrangements are made for male and female participants.",
    "Basic bedding is provided; participants should carry personal essentials and any required medication.",
    "Campus accommodation is available from the evening of Nov 13 through the morning of Nov 16, 2026.",
  ],
};

export const security = {
  intro:
    "Plaksha University's security team is present across the campus throughout Fitoor to ensure a safe experience for all participants and guests.",
  points: [
    "All attendees must carry a valid ID at all times during the fest.",
    "Entry to event venues may require a Fitoor wristband or pass — collect yours at the registration desk on arrival.",
    "Medical assistance is available on campus for the duration of the event — locations will be shared via on-ground signage.",
    "In case of an emergency, reach out to any volunteer in Fitoor merchandise or the nearest security personnel.",
  ],
};
