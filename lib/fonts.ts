import { Anton, Cormorant, Pacifico, Montserrat } from "next/font/google";

/**
 * Fitoor's real Figma brand guide specifies four non-Google fonts — Druk
 * Text Trial (display), Amithen/Amithen Extra (script accent), Maung (thin
 * serif for titles + wordmark) — none of which exist on Google Fonts, so
 * each is paired with the closest available substitute below. Montserrat is
 * the one role that's a literal 1:1 match with the brand guide.
 */

export const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const fontVariables = [
  anton.variable,
  cormorant.variable,
  pacifico.variable,
  montserrat.variable,
].join(" ");
