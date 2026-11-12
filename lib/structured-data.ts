import { socials, venue } from "@/data/contacts";
import { artists } from "@/data/artists";
import { fest } from "@/data/content";
import { siteUrl } from "@/lib/site";

/** Event and organisation markup that lets Google show Fitoor as an event result. */
export function festJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "@id": `${siteUrl}/#event`,
        name: "Fitoor 2026: Young, Dumb & Desi",
        description: fest.theme,
        startDate: fest.startDateISO,
        endDate: "2026-11-15T22:00:00+05:30",
        performer: artists.map((artist) => ({
          "@type": artist.role === "dj" ? "Person" : "PerformingGroup",
          name: artist.name,
        })),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        url: siteUrl,
        image: [`${siteUrl}/opengraph-image`],
        location: {
          "@type": "Place",
          name: venue.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Alpha, Sector 101, IT City Rd",
            addressLocality: "Sahibzada Ajit Singh Nagar",
            addressRegion: "Punjab",
            postalCode: "140306",
            addressCountry: "IN",
          },
        },
        organizer: { "@id": `${siteUrl}/#org` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#org`,
        name: "Fitoor, Plaksha University",
        url: siteUrl,
        logo: `${siteUrl}/icon.png`,
        sameAs: [socials.instagram],
      },
    ],
  };
}
