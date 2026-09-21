import Image from "next/image";
import { cn } from "@/lib/utils";

const TONES = {
  mono: "/brand/mascot-logomark-mono.png",
  coral: "/brand/mascot-logomark-coral.png",
  retro: "/brand/mascot-logomark-retro.png",
  blue: "/brand/mascot-logomark-blue.png",
} as const;

export type MascotLogomarkTone = keyof typeof TONES;

/**
 * Maps the site's 5 event categories onto the 4 exported logomark
 * treatments (Figma only shipped 4) — picked for rough temperature/energy
 * match rather than a literal color match.
 */
const CATEGORY_TONE: Record<string, MascotLogomarkTone> = {
  music: "coral",
  dance: "blue",
  art: "retro",
  business: "mono",
  misc: "mono",
};

interface MascotFaceLogomarkProps {
  /** Explicit tone. Omit to auto-pick from `category`. */
  tone?: MascotLogomarkTone;
  /** Event category slug (music/dance/art/business/misc) used to auto-pick a tone. */
  category?: string;
  size?: number;
  className?: string;
}

/**
 * The "seal" mark — face-only, used for favicon/nav/stamps. Never pair with
 * the full-body mascot (components/mascot/MascotSVG.tsx) in the same
 * viewport; that one is the narrative character, this one is the brand mark.
 */
export function MascotFaceLogomark({
  tone,
  category,
  size = 40,
  className,
}: MascotFaceLogomarkProps) {
  const resolvedTone = tone ?? (category ? CATEGORY_TONE[category] : undefined) ?? "mono";

  return (
    <Image
      src={TONES[resolvedTone]}
      alt=""
      width={size}
      height={size}
      className={cn("object-contain", className)}
    />
  );
}
