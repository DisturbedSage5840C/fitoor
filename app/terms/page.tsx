import Link from "next/link";
import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";
import { fest } from "@/data/content";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description:
    "Terms for using the Fitoor 2026 website and taking part in the fest.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="terms and conditions" updated="1 October 2026">
      <section>
        <h2>Using this site</h2>
        <p>
          This website is run by the Fitoor organising team at {fest.university}{" "}
          to share information about Fitoor 2026 ({fest.dates}). Details such as
          timings and events can change, so check back close to the date.
        </p>
      </section>
      <section>
        <h2>Taking part</h2>
        <p>
          The rules for participants, teams and conduct are on the{" "}
          <Link href="/generalities">general rules</Link> page. They apply to
          everyone who registers. Registration fees are not refunded.
        </p>
      </section>
      <section>
        <h2>Our content</h2>
        <p>
          The Fitoor name, artwork, logos and text belong to the Fitoor team and{" "}
          {fest.university}. Please do not reuse them without asking.
        </p>
      </section>
      <section>
        <h2>Third parties</h2>
        <p>
          Registration is on Unstop, which has its own terms. We are not
          responsible for content on sites we link to.
        </p>
      </section>
      <section>
        <h2>Privacy</h2>
        <p>
          How the site handles data is on the{" "}
          <Link href="/privacy">privacy policy</Link> page.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Reach the team from the <Link href="/contact">contact</Link> page.
        </p>
      </section>
    </LegalPage>
  );
}
