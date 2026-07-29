import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Homes with Akanksha collects, uses, and protects information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy policy"
      introduction="This policy explains what information this website collects, why it is used, and the choices available to you."
      sections={[
        {
          heading: "Information collected",
          paragraphs: ["Information is collected when you submit a contact, home-value, search, or Ask Akanksha form. The exact fields depend on the form."],
          items: ["Name, email address, phone number, and message", "Property address, real-estate goals, or timeline when you choose to provide them", "Page, referral, and campaign details such as UTM parameters or ad click identifiers", "Technical request information used for security and reliability"],
        },
        {
          heading: "How information is used",
          paragraphs: ["Submitted information is used to respond to your request, provide the service you asked for, understand website performance, prevent abuse, and improve the site. Submitting a form does not create an agency relationship."],
        },
        {
          heading: "Storage and service providers",
          paragraphs: ["The browser stores your privacy choice and first-touch campaign attribution locally on your device. When CRM, email, hosting, IDX, or analytics providers are configured, they may process information only as needed to provide those services. The website does not sell personal information."],
        },
        {
          heading: "Analytics and advertising",
          paragraphs: ["Optional Google Analytics, Google Ads, Google Tag Manager, and Meta technologies remain off unless you allow the relevant category in Privacy choices and the site owner has configured that service. You can reopen Privacy choices at any time to change your selection."],
        },
        {
          heading: "Retention and security",
          paragraphs: ["Information is retained only as reasonably needed for the purpose for which it was collected, legal obligations, and business records. Reasonable safeguards are used, but no internet transmission or storage system can be guaranteed completely secure."],
        },
        {
          heading: "Your choices",
          paragraphs: ["You may ask to access, correct, or delete information you submitted, subject to applicable legal and recordkeeping requirements. You may also decline optional analytics and advertising storage without losing access to the website’s core content."],
        },
        {
          heading: "Updates",
          paragraphs: ["This policy may change as integrations are added or legal requirements evolve. The updated date above identifies the current version."],
        },
      ]}
    />
  );
}
