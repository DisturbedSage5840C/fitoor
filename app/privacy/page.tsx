import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";
import { contacts, registerUrl, socials, telHref } from "@/data/contacts";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What the Fitoor 2026 website collects and what it does not. No accounts, no forms, no ad tracking.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const contact = contacts[0];
  return (
    <LegalPage title="privacy policy" updated="1 October 2026">
      <section>
        <h2>The short version</h2>
        <p>
          This site does not ask you to sign up, log in or fill in a form. We do
          not sell data and we do not run ads.
        </p>
      </section>
      <section>
        <h2>What we collect</h2>
        <ul>
          <li>
            Visit counts and page speed, through Vercel Web Analytics and Speed
            Insights. These do not use cookies and do not follow you across
            other websites.
          </li>
          <li>
            A single note in your browser (local storage) that remembers you
            dismissed the cookie notice. It never leaves your device.
          </li>
        </ul>
      </section>
      <section>
        <h2>Registration</h2>
        <p>
          Registration happens on Unstop, not here. Whatever you enter there is
          handled under{" "}
          <a href={registerUrl} target="_blank" rel="noreferrer">
            Unstop&apos;s own terms and privacy policy
          </a>
          . Fitoor does not see your password.
        </p>
      </section>
      <section>
        <h2>Links to other sites</h2>
        <p>
          We link to Unstop, Instagram and Google Maps. Once you click through,
          their policies apply, not ours.
        </p>
      </section>
      <section>
        <h2>Questions</h2>
        <p>
          Call {contact.name} on{" "}
          <a href={telHref(contact.phone)}>{contact.phone}</a>, or message{" "}
          <a href={socials.instagram} target="_blank" rel="noreferrer">
            @{socials.instagramHandle}
          </a>{" "}
          on Instagram.
        </p>
      </section>
    </LegalPage>
  );
}
