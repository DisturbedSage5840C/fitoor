import type { ContactPerson } from "./types";

/** Organising team contacts, as listed on the brochure's "contact us" page. */
export const contacts: ContactPerson[] = [
  { name: "Aadi Batra", phone: "+91 63609 06386" },
  { name: "Sia Jain", phone: "+91 96670 35800" },
  { name: "Sahil Gada", phone: "+91 83698 07001" },
  { name: "Sameera John", phone: "+91 98405 74132" },
  { name: "Mukund", phone: "+91 97790 53750" },
  { name: "Jigisha", phone: "+91 89297 50700" },
];

export const socials = {
  instagramHandle: "fitoor.plaksha",
  instagram: "https://www.instagram.com/fitoor.plaksha/",
};

export const venue = {
  name: "Plaksha University",
  address: "Sector 101, SAS Nagar (Mohali), Punjab",
  region: "Tricity Chandigarh",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Plaksha+University+Mohali",
};

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
