import type { FaqItem } from "./types";

export const fest = {
  name: "fitoor",
  // Kasra under the fe disambiguates the vowel so it reads "fitoor", not "fatoor"/"futoor".
  nastaliqName: "فِتور",
  devanagariName: "फ़ितूर",
  year: 2026,
  edition: "3rd",
  theme: "Young, Dumb & Desi",
  dates: "14–15 Nov 2026",
  datesLong: "14th & 15th November, 2026",
  startDateISO: "2026-11-14T09:00:00+05:30",
  university: "Plaksha University",
  region: "Tricity Chandigarh",
};

export const stats = [
  { value: "3rd", label: "edition" },
  { value: "2", label: "days" },
  { value: "21", label: "events" },
  { value: "800+", label: "students expected" },
];

export const about = {
  theme:
    "This year's theme, Young, Dumb & Desi, is all about the raw energy of youth through the vibrant lens of Indian street style and hip-hop. Fitoor brings together bold fashion, music, movement and desi culture — a space where tradition meets contemporary expression and creativity knows no rules.",
  fitoor: [
    "Fitoor 2026 marks the third edition of our fest — a two-day inter-collegiate techno-cultural event where creativity and innovation meet. It's a chance to show off your talent and connect with peers, industry leaders and sponsors.",
    "With over 400 students from Plaksha University and 400+ more expected from the Tricity area and Delhi NCR, it promises to be vibrant, competitive and diverse — through workshops, talks, hackathons and competitions.",
  ],
  plaksha: [
    "Located in Mohali, Punjab, Plaksha University aims to reimagine technology education. It began in 2015 as a conversation among friends, took shape as an idea endorsed by entrepreneurs and business leaders in 2017, and became a university in 2021.",
    "Its curriculum integrates engineering, design and entrepreneurship to nurture tech leaders who can think across disciplines — hands-on, research-driven, and built from a clean slate.",
  ],
};

export const generalRules: string[] = [
  "Participants must be UG/PG students under the age of 25, and must present a valid physical Aadhaar card and college ID at registration.",
  "Every university/college must designate a Point of Contact for each event, who stays in touch with the Fitoor team and is responsible for their participants' actions during the fest.",
  "Team/group POCs who aren't participating in the event are not allowed into the fest.",
  "Group music and dance teams may bring one or two non-performing members for sound cues, light cues and tech support. They pay the event fee and count as team members.",
  "Register for as many events as you like, as long as there are no scheduling conflicts. One registration gets you in on both days.",
  "Day 1 wraps at 9 PM and Day 2 at 8 PM — all participants must leave by then.",
  "Every participant gets an e-certificate of participation; winners also get a certificate of merit.",
  "A 30% tax deduction applies to individual prize amounts over ₹10,000. The prize pool is subject to change.",
];

export const security: string[] = [
  "Carry your college ID at all times. Plaksha University's rules apply to every participant and contingent member on campus.",
  "Everyone gets an entry wristband at the gate. Wear it at all times — it's non-transferable.",
  "Plaksha has strict policies against substance abuse, violence, sexual harassment and property damage. Violations mean disqualification, without a refund.",
  "The fest can't be held responsible for any loss or theft of belongings.",
  "The Organising Committee's decision is final and binding.",
];

export const hotels = [
  { name: "Hotel Anande", distance: "4.6 km" },
  { name: "Hotel Kenview", distance: "4.9 km" },
  { name: "Hotel Tamarind", distance: "6.2 km" },
];

export const accommodationNote =
  "Participants can also stay at homestays nearby. Team Fitoor × Prayas isn't responsible for hotel bookings or transport — participants bear the cost of rooms and any damages.";

/** The one-liners people actually need before they turn up. */
export const quickRules = [
  {
    title: "Under 25, UG/PG",
    body: "Bring a physical Aadhaar card and your college ID.",
  },
  {
    title: "One entry, two days",
    body: "Register for any event and you're in on both days.",
  },
  {
    title: "Stack events",
    body: "Enter as many as you like — as long as they don't clash.",
  },
  { title: "Curfew", body: "Day 1 wraps at 9 PM, Day 2 at 8 PM." },
];

export const generalFaqs: FaqItem[] = [
  {
    question: "How do I register?",
    answer:
      "Registrations open soon. Links will go up on Instagram (@fitoor.plaksha) and on this site — each college also nominates a Point of Contact per event.",
  },
  {
    question: "How much are registration fees and prizes?",
    answer:
      "Fees and prize pools for each event will be announced with registrations. Prizes over ₹10,000 per person carry a 30% tax deduction.",
  },
  {
    question: "Who can participate?",
    answer:
      "Any UG or PG student under 25 from any college — bring a physical Aadhaar card and your college ID.",
  },
  {
    question: "Can I take part in more than one event?",
    answer:
      "Yes, as many as you want, provided the slots don't clash. One registration gets you entry on both days.",
  },
  {
    question: "Is accommodation provided?",
    answer:
      "No — but we've listed hotels close to campus (Anande, Kenview, Tamarind) and there are homestays nearby. Bookings and transport are on you.",
  },
  {
    question: "When is the schedule out?",
    answer:
      "The timetable is being locked. It'll be announced on Instagram and posted on the schedule page.",
  },
];

export const festDays = [
  {
    day: 1,
    weekday: "Saturday",
    date: "14 Nov",
    wrapsAt: "9 PM",
    notes: [
      "Jeevanth Jeevan teams shoot their footage and hand in clips + wristbands.",
    ],
    schedule: [
      { time: "10 AM", title: "Canvas" },
      { time: "10 AM", title: "Baal ki Khaal" },
      { time: "10 AM", title: "20/20 Vision" },
      { time: "10 AM", title: "Slumdog Questionnaire" },
      { time: "10 AM", title: "Jeevanth Jeevan (shoot day)" },
      { time: "11 AM", title: "The Wolf of Dalal Street" },
      { time: "12 PM", title: "Pandora's Box" },
      { time: "3 PM", title: "Sargam" },
      { time: "4 PM", title: "Revival" },
      { time: "4:30 PM", title: "Euphony" },
      { time: "6 PM", title: "Battle of Bands" },
    ],
  },
  {
    day: 2,
    weekday: "Sunday",
    date: "15 Nov",
    wrapsAt: "8 PM",
    notes: ["Jeevanth Jeevan's 5-hour edit submission window opens."],
    schedule: [
      { time: "10 AM", title: "Rooh" },
      { time: "10 AM", title: "Riwayat" },
      { time: "10 AM", title: "Rivals Riot" },
      { time: "10 AM", title: "Rangeen Jeevan" },
      { time: "10 AM", title: "Jeevanth Jeevan (submission)" },
      { time: "10 AM", title: "Jugaad Couture" },
      { time: "11 AM", title: "Cut to the Case" },
      { time: "2 PM", title: "Rogue" },
      { time: "2 PM", title: "Reverb" },
      { time: "2 PM", title: "Revolution" },
      { time: "TBA", title: "Murder Ballad 3.0" },
    ],
  },
] as const;
