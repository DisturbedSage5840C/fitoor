import {
  Baloo_2,
  Baloo_Bhaijaan_2,
  Noto_Nastaliq_Urdu,
  Playfair_Display,
  Noto_Serif_Devanagari,
  Inter,
  Noto_Sans_Devanagari,
  Press_Start_2P,
} from "next/font/google";

export const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "devanagari"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const balooBhaijaan = Baloo_Bhaijaan_2({
  variable: "--font-baloo-bhaijaan",
  subsets: ["latin", "arabic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const nastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-serif-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const fontVariables = [
  baloo.variable,
  balooBhaijaan.variable,
  nastaliq.variable,
  playfair.variable,
  notoSerifDevanagari.variable,
  inter.variable,
  notoSansDevanagari.variable,
  pressStart.variable,
].join(" ");
