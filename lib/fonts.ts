import {
  Montserrat,
  Noto_Nastaliq_Urdu,
  Noto_Serif_Devanagari,
  Rozha_One,
  Yatra_One,
} from "next/font/google";
import localFont from "next/font/local";

/**
 * Yatra One: the Devanagari-flavoured Latin display face that matches the
 * brochure's neon section titles ("music", "dance", "general"…).
 */
export const yatra = Yatra_One({
  variable: "--font-yatra",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Rozha One: high-contrast serif for the "fitoor" wordmark, after the brochure cover. */
export const rozha = Rozha_One({
  variable: "--font-rozha",
  subsets: ["latin", "devanagari"],
  weight: "400",
  display: "swap",
});

/** Montserrat: the brochure's body copy. */
export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const nastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-serif-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

/**
 * Amithen: the italic script used for the brochure's subtitles
 * ("competitions and informations", "classical vocal performance").
 * Not on Google Fonts, so it's loaded from assets/fonts.
 */
export const amithen = localFont({
  src: "../assets/fonts/Amithen.otf",
  variable: "--font-amithen",
  display: "swap",
});

/** Druk: condensed display face for big numerals (countdown, stats). */
export const druk = localFont({
  src: "../assets/fonts/Druk-Bold.otf",
  variable: "--font-druk",
  weight: "700",
  display: "swap",
});

export const fontVariables = [
  yatra.variable,
  rozha.variable,
  montserrat.variable,
  nastaliq.variable,
  notoSerifDevanagari.variable,
  amithen.variable,
  druk.variable,
].join(" ");
