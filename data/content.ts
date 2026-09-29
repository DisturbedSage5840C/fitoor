import type { FaqItem } from "./types";

export const fest = {
  name: "fitoor",
  // Kasra under the fe disambiguates the vowel so it reads "fitoor", not "fatoor"/"futoor".
  nastaliqName: "فِتور",
  devanagariName: "फ़ितूर",
  year: 2026,
  edition: "3rd",
  theme: "Young, Dumb & Desi",
  dates: "14th and 15th November, 2026",
  datesLong: "14th & 15th November, 2026",
  startDateISO: "2026-11-14T09:00:00+05:30",
  university: "Plaksha University",
  region: "Tricity Chandigarh",
  address:
    "Alpha, Sector 101, IT City Rd, Sahibzada Ajit Singh Nagar, Punjab - 140306",
  site: "www.plaksha.edu.in",
};

/** Copy from the brochure's about pages. */
export const about = {
  theme:
    "This year's theme, Young, Dumb & Desi, is all about the raw energy of youth through the vibrant lens of Indian street style and hip-hop. Fitoor brings together bold fashion, music, movement, and desi culture, creating a space where tradition meets contemporary expression and creativity knows no rules.",
  fitoor: [
    "Fitoor 2026 marks the third edition of our fest, a prestigious two-day event where we unite creativity and innovation. This unique cultural fest offers participants the chance to showcase their talents, connect with peers, industry leaders, and potential sponsors, all within a dynamic and creative environment.",
    "With over 400 students from Plaksha University and more than 400 expected from the Tricity Area and Delhi NCR, the fest promises to be vibrant, competitive, and diverse. Immerse yourself in a celebration of art and culture, that fosters innovation, collaboration, and entrepreneurship.",
    "Join us for Fitoor 2026 at Plaksha University and be part of a memorable celebration of talent, culture and innovation. Let's create unforgettable memories together as we embark on this thrilling journey of artistic expression.",
  ],
  plaksha: [
    "Located in Mohali, Punjab, Plaksha University aims to reimagine technology education. Its inception dates back to 2015, when conversations among friends began to take shape as an idea. The vision was endorsed by eminent entrepreneurs and business leaders in 2017, eventually culminating in the establishment of the university in 2021.",
    "Plaksha offers a bold, interdisciplinary model that breaks away from conventional engineering education. Its curriculum integrates engineering, design, and entrepreneurship to nurture tech leaders who can think across disciplines and address real-world challenges.",
    "Plaksha's students engage in hands-on learning through coursework, research, and industry-linked internships. Faculty are drawn from leading global institutions, and the learning experience emphasises both technical depth and leadership. Plaksha is transforming higher education in India by building a new kind of technology university from a clean slate, one that is truly interdisciplinary, globally connected, and purpose-driven.",
  ],
};

/** General rules and information, as printed in the brochure. */
export const generalRules: string[] = [
  "Participants must be UG/PG under the age of 25. They must present a valid physical Aadhaar card and College ID during registration.",
  "Each university/college/institution must designate a Point of Contact for each event who will be in contact with the Fitoor OC team for registration and updates and will be responsible for all actions undertaken by the participants during the tournament.",
  "Team/Group POCs who are not participating in the event are not allowed in the fest.",
  "Group music and dance teams may bring one or two additional non-performing members to help with sound cues, light cues, and other technical support. These participants will also need to pay the event fee and will count as a member of the team.",
  "Participants can register for as many events as they would like provided there are no scheduling conflicts. Registering for one event allows entry on both the days of the fest.",
  "Day 1 concludes at 10 PM, and Day 2 concludes at 8 PM; all participants must leave by these times.",
  "All event participants will be given an e-certificate of participation. Those who win events will be given a certificate of merit in addition.",
  "No refund will be provided for the registration fee.",
  "A 30% tax deduction applies to individual prize amounts exceeding ₹10,000.",
  "The schedule and prize pool are subject to change.",
];

export const security: string[] = [
  "Every participant must always carry their college ID card. Adherence to Plaksha University's rules and regulations is mandatory for all participants and contingent members while on the premises.",
  "On arrival at the gate, all participants and attendees will be provided with an ID card and they must wear their ID cards at all times. These are non-transferable.",
  "Plaksha maintains strict policies against Substance Abuse, Violence, and Sexual Harassment and Property Damage. Violations will result in disqualification from the event without a refund.",
  "The fest or the University cannot be held responsible for any loss/theft of items.",
  "The decision made by the Organising Committee will be final and binding.",
];

export const accommodationIntro =
  "For the accommodation of the participants, we recommend the following conveniently located and well-appointed options.";

export const hotels = [
  { name: "Hotel Tamarind", distance: "6.2 km" },
  { name: "Hotel Anande", distance: "4.6 km" },
  { name: "Hotel Kenview", distance: "4.9 km" },
];

export const accommodationNote =
  "Additionally, participants may choose to stay in nearby homestays available. Team Fitoor is not responsible for the booking of hotels or the provision of transport facilities. The participants would bear the costs related to the hotel rooms and any damage.";

export interface ScheduleEntry {
  time: string;
  title: string;
  /** Event id in data/events.ts, when the row is a competition. */
  id?: string;
}

export interface FestDay {
  day: number;
  weekday: string;
  date: string;
  concludes: string;
  schedule: ScheduleEntry[];
}

/** Day by day, in the order the brochure's schedule pages read. */
export const festDays: FestDay[] = [
  {
    day: 1,
    weekday: "Saturday",
    date: "14 November",
    concludes: "10 PM",
    schedule: [
      { time: "10 AM to 2 PM", title: "Canvas", id: "canvas" },
      { time: "10 AM to 12 PM", title: "Baal ki Khaal", id: "baal-ki-khaal" },
      { time: "10 AM to 12:30 PM", title: "20/20 Vision", id: "20-20-vision" },
      { time: "10 AM to 3 PM", title: "The Wolf of Dalal Street", id: "wolf-of-dalal-street" },
      { time: "10 AM to 9 PM", title: "Climax", id: "climax" },
      { time: "12 PM to 3 PM", title: "Pandora's Box", id: "pandoras-box" },
      { time: "12:30 PM to 3 PM", title: "Slumdog Questionnaire", id: "slumdog-questionnaire" },
      { time: "3 PM to 4:30 PM", title: "Sargam", id: "sargam" },
      { time: "4 PM to 6 PM", title: "Revival", id: "revival" },
      { time: "4:30 PM to 6 PM", title: "Euphony", id: "euphony" },
      { time: "6 PM to 10 PM", title: "Battle of Bands", id: "battle-of-bands" },
    ],
  },
  {
    day: 2,
    weekday: "Sunday",
    date: "15 November",
    concludes: "8 PM",
    schedule: [
      { time: "10 AM to 12 PM", title: "Rooh", id: "rooh" },
      { time: "10 AM to 12 PM", title: "Riwayat", id: "riwayat" },
      { time: "10 AM to 6 PM", title: "Rangeen Jeevan", id: "rangeen-jeevan" },
      { time: "10 AM to 6 PM", title: "Murder Ballad 3.0", id: "murder-ballad" },
      { time: "10 AM to 6 PM", title: "Climax", id: "climax" },
      { time: "11 AM to 2 PM", title: "Jugaad Couture", id: "jugaad-couture" },
      { time: "11 AM to 2 PM", title: "Cut to the Case", id: "cut-to-the-case" },
      { time: "12 PM to 1 PM", title: "Rivals Riot", id: "rivals-riot" },
      { time: "2 PM to 5 PM", title: "Rogue", id: "rogue" },
      { time: "2 PM to 5 PM", title: "Reverb", id: "reverb" },
      { time: "2 PM to 5 PM", title: "Revolution", id: "revolution" },
    ],
  },
];

export const stats = [
  { value: "3rd", label: "edition" },
  { value: "2", label: "days" },
  { value: "21", label: "events" },
  { value: "800+", label: "students" },
];

/** The one-liners people need before they turn up, from the general rules. */
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
    body: "Enter as many as you like, as long as they don't clash.",
  },
  { title: "Curfew", body: "Day 1 wraps at 10 PM, Day 2 at 8 PM." },
];

export const generalFaqs: FaqItem[] = [
  {
    question: "How do I register?",
    answer:
      "Registration links are on our Instagram (@fitoor.plaksha). Each college also nominates a Point of Contact per event.",
  },
  {
    question: "How much are fees and prizes?",
    answer:
      "Every event lists its own fee and prize pool. Fees are not refundable, and prizes over ₹10,000 per person carry a 30% tax deduction.",
  },
  {
    question: "Who can participate?",
    answer:
      "Any UG or PG student under 25 from any college, with a physical Aadhaar card and a college ID.",
  },
  {
    question: "Can I take part in more than one event?",
    answer:
      "Yes, as many as you want, provided the slots don't clash. One registration gets you entry on both days.",
  },
  {
    question: "Is accommodation provided?",
    answer:
      "No, but we've listed hotels close to campus (Anande, Kenview, Tamarind) and there are homestays nearby. Bookings and transport are on you.",
  },
  {
    question: "Where is the schedule?",
    answer:
      "On the schedule page. Timings and prize pools are subject to change, so keep an eye on Instagram for updates.",
  },
];
