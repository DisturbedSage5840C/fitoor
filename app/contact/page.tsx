import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { SodaPour } from "@/components/art/SodaPour";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionGround } from "@/components/shared/SectionGround";
import { BarcodeTag } from "@/components/shared/Stickers";
import { Sticker } from "@/components/shared/Sticker";
import { Tape } from "@/components/shared/Tape";
import { contacts, socials, telHref, venue } from "@/data/contacts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description: "Phone numbers and Instagram for the Fitoor 2026 organising team.",
};

/** Torn off a roll by hand: each stub has its own tilt, paper and shadow. */
const STUBS = [
  { tilt: 1.5, paper: "bg-cream", shadow: "var(--rose)" },
  { tilt: -1, paper: "bg-gold-bright", shadow: "var(--emerald)" },
  { tilt: -2, paper: "bg-gold-bright", shadow: "var(--rose)" },
  { tilt: 2, paper: "bg-cream", shadow: "var(--emerald)" },
  { tilt: 1, paper: "bg-cream", shadow: "var(--rose)" },
  { tilt: -1.5, paper: "bg-gold-bright", shadow: "var(--emerald)" },
];

/** The can's tilt in the header; the cola stream turns back by the same. */
const CAN_TILT = 5;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="contact us"
        ground="polka"
        artTilt={CAN_TILT}
        sticker={<BarcodeTag />}
        stickerTilt={-10}
        artElement={<SodaPour tilt={CAN_TILT} />}
      />

      <SectionGround ground="grain">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 pt-44 pb-20 sm:pt-56 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:gap-14 lg:pb-28">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-9 md:grid-cols-2 md:[&>li:nth-child(even)]:translate-y-8">
            {contacts.map((person, i) => {
              const stub = STUBS[i % STUBS.length];
              return (
                <li key={person.name}>
                  <div
                    className="drop-shadow-[5px_6px_0_var(--stub-shadow)]"
                    style={{ rotate: `${stub.tilt}deg`, "--stub-shadow": stub.shadow } as React.CSSProperties}
                  >
                    <a
                      href={telHref(person.phone)}
                      className={cn(
                        "stub-notches group flex min-h-24 items-stretch text-maroon-deepest transition-transform hover:-translate-y-0.5",
                        stub.paper,
                      )}
                    >
                      <span className="flex min-w-0 flex-1 flex-col justify-center px-5 py-4">
                        <span className="font-title text-2xl leading-tight lowercase">
                          {person.name}
                        </span>
                        <span className="font-display mt-1 text-2xl tracking-wide tabular-nums">
                          {person.phone}
                        </span>
                      </span>
                      <span className="flex w-[4.75rem] shrink-0 items-center justify-center border-l-2 border-dashed border-maroon-deepest/45">
                        <span className="flex size-11 items-center justify-center rounded-full bg-maroon-deepest text-gold transition-transform group-hover:rotate-12">
                          <Phone className="size-5" />
                          <span className="sr-only">Call {person.name}</span>
                        </span>
                      </span>
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-14 lg:pt-6">
            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative -rotate-2 self-start border-2 border-dashed border-gold bg-dupatta px-6 py-4 text-gold shadow-[6px_7px_0_var(--gold)] transition-transform hover:-translate-y-0.5 hover:rotate-0"
            >
              <span className="flex min-h-11 items-center gap-3">
                <InstagramIcon className="size-8 shrink-0" />
                <span className="font-display text-3xl tracking-wide">
                  @{socials.instagramHandle}
                </span>
              </span>
            </a>

            <div className="relative rotate-1">
              <div className="drop-shadow-[6px_7px_0_var(--rose)]">
                <div
                  className="torn-ends relative bg-bandage px-7 pt-12 pb-9 text-maroon-deepest"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgb(28 4 7 / 0.07) 1.5px, transparent 1.5px), linear-gradient(90deg, rgb(28 4 7 / 0.07) 1.5px, transparent 1.5px)",
                    backgroundSize: "34px 34px",
                  }}
                >
                  <h2 className="font-title relative text-4xl lowercase">{venue.name}</h2>
                  <p className="font-body relative mt-3 font-semibold">{venue.address}</p>
                  <p className="font-body relative text-sm">{venue.region}</p>
                  <a
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-body relative mt-6 inline-flex min-h-11 items-center bg-maroon-deepest px-5 text-sm font-bold text-gold shadow-[3px_3px_0_var(--rose)] transition-transform hover:-translate-y-0.5 hover:bg-maroon"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              <Tape tilt={-4} tone="gold" className="absolute -top-3 left-8 px-9 py-2" />
              <Sticker tilt={14} className="absolute -top-6 right-5 size-14">
                <span className="flex size-full items-center justify-center rounded-full bg-rose text-maroon-deepest">
                  <MapPin className="size-7" />
                </span>
              </Sticker>
            </div>
          </div>
        </div>
      </SectionGround>
    </>
  );
}
