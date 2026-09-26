import type { Club, ClubId } from "./types";

export const clubs: Record<ClubId, Club> = {
  crescendo: {
    id: "crescendo",
    name: "Crescendo",
    description: "the Plaksha Music Club",
    logo: "/clubs/crescendo.jpg",
  },
  "one-o-one": {
    id: "one-o-one",
    name: "One-O-One",
    description: "the Plaksha Dance Club",
    logo: "/clubs/one-o-one.jpg",
  },
  rangrez: {
    id: "rangrez",
    name: "Rangrez",
    description: "the Plaksha Art Club",
    logo: "/clubs/rangrez.png",
  },
  spine: {
    id: "spine",
    name: "Spine",
    description: "the Plaksha Literary Society",
    logo: "/clubs/spine.jpg",
  },
  pqc: {
    id: "pqc",
    name: "PQC",
    description: "the Plaksha Quizzing Club",
    logo: "/clubs/pqc.jpg",
  },
  lamhe: {
    id: "lamhe",
    name: "Lamhe",
    description: "the Plaksha Film & Photography Club",
    logo: "/clubs/lamhe.jpg",
  },
  spotlight: {
    id: "spotlight",
    name: "Spotlight",
    description: "the Plaksha Dramatics Club",
    logo: "/clubs/spotlight.jpg",
  },
  ecell: {
    id: "ecell",
    name: "E-Cell",
    description: "the Plaksha Entrepreneurship Cell",
    logo: "/clubs/ecell.jpg",
  },
  pfc: {
    id: "pfc",
    name: "PFC",
    description: "the Plaksha Finance Cell",
    logo: "/clubs/pfc.jpg",
  },
  pcc: {
    id: "pcc",
    name: "PCC",
    description: "the Plaksha Consulting Club",
    logo: "/clubs/pcc.jpg",
  },
};

export const clubList: Club[] = Object.values(clubs);
