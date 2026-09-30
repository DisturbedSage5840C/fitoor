import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontVariables } from "@/lib/fonts";
import { googleVerification, siteUrl } from "@/lib/site";
import { Grain } from "@/components/shared/Grain";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { StickyRegister } from "@/components/layout/StickyRegister";
import { JsonLd } from "@/components/shared/JsonLd";
import { festJsonLd } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fitoor 2026: Young, Dumb & Desi | Plaksha University",
    template: "%s | Fitoor 2026",
  },
  description:
    "Fitoor is Plaksha University's inter-collegiate cultural fest on 14th and 15th November, 2026 in Mohali. 21 competitions across music, dance, art, wit and business. This year's theme is Young, Dumb & Desi.",
  applicationName: "Fitoor 2026",
  keywords: [
    "Fitoor 2026",
    "Fitoor Plaksha",
    "Plaksha University fest",
    "college cultural fest Mohali",
    "inter-collegiate fest Punjab",
    "Young, Dumb & Desi",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  openGraph: {
    siteName: "Fitoor 2026",
    locale: "en_IN",
    title: "Fitoor 2026: Young, Dumb & Desi",
    description:
      "Plaksha University's inter-collegiate cultural fest, 14th and 15th November, 2026.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitoor 2026: Young, Dumb & Desi",
    description:
      "Plaksha University's inter-collegiate cultural fest, 14th and 15th November, 2026.",
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
          <div aria-hidden className="h-16 lg:hidden" />
        </MotionConfig>
        <CookieNotice />
        <StickyRegister />
        <JsonLd data={festJsonLd()} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
