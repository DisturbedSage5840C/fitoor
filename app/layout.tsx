import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontVariables } from "@/lib/fonts";
import { siteUrl } from "@/lib/site";
import { Grain } from "@/components/shared/Grain";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fitoor 2026 — Young, Dumb & Desi | Plaksha University",
    template: "%s | Fitoor 2026",
  },
  description:
    "Fitoor is Plaksha University's inter-collegiate techno-cultural fest — 14–15 Nov 2026, Mohali. 20 competitions across music, dance, art, business and more. Theme: Young, Dumb & Desi.",
  openGraph: {
    title: "Fitoor 2026 — Young, Dumb & Desi",
    description:
      "Plaksha University's inter-collegiate techno-cultural fest — 14–15 Nov 2026.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitoor 2026 — Young, Dumb & Desi",
    description:
      "Plaksha University's inter-collegiate techno-cultural fest — 14–15 Nov 2026.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Grain />
        <MotionConfig reducedMotion="user">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionConfig>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
