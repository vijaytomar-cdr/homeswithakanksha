import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Terms governing use of the Homes with Akanksha website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Website terms"
      title="Terms of use"
      introduction="By using this website, you agree to these terms. If you do not agree, please do not use the site."
      sections={[
        {
          heading: "Informational purpose",
          paragraphs: ["Website content is general educational information, not legal, tax, lending, appraisal, inspection, or financial advice. Market conditions and property information change and should be independently verified before a decision."],
        },
        {
          heading: "No agency relationship",
          paragraphs: ["Using the website, reading content, or submitting a form does not create a broker-client or agency relationship. Any representation relationship must be established through the appropriate written agreement."],
        },
        {
          heading: "Listings and market data",
          paragraphs: ["Property availability and listing details change frequently and must be confirmed from a current authorized source. Public market summaries identify their source and reporting period. No property availability, price, estimate, or market outcome is guaranteed."],
        },
        {
          heading: "Acceptable use",
          items: ["Do not attempt to disrupt, scrape excessively, reverse engineer, or gain unauthorized access to the site.", "Do not submit unlawful, deceptive, abusive, or third-party personal information without authorization.", "Do not reuse site content or branding in a way that implies endorsement or affiliation."],
        },
        {
          heading: "Third party services",
          paragraphs: ["Links and embedded services may be operated by others under their own terms and privacy practices. Their availability, accuracy, and conduct are not controlled by Homes with Akanksha."],
        },
        {
          heading: "Changes and availability",
          paragraphs: ["The site, content, and these terms may be updated, suspended, or discontinued. Continued use after an update indicates acceptance of the revised terms."],
        },
      ]}
    />
  );
}
