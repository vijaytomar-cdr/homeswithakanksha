import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/data/site";
import type { LeadIntent } from "@/lib/leads/types";
import { TrackedContactLink } from "@/components/analytics/tracked-contact-link";
import { createSocialMetadata } from "@/lib/metadata";

const description = "Contact Akanksha Tomar about buying, selling, relocation, investment property, or new construction across Greater Phoenix.";

export const metadata: Metadata = {
  title: "Contact Akanksha Tomar",
  description,
  alternates: { canonical: "/contact" },
  ...createSocialMetadata({ title: "Contact Akanksha Tomar", description, path: "/contact", image: "/images/akanksha-arizona-v2.jpg", imageAlt: "Akanksha Tomar, Greater Phoenix REALTOR", imageWidth: 948, imageHeight: 1660 }),
};

const intentMap: Record<string, LeadIntent> = {
  buying: "Buying",
  selling: "Selling",
  relocation: "Relocation",
  investment: "Investment",
  "new-construction": "New Construction",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const rawIntent = Array.isArray(params.interest) ? params.interest[0] : params.interest;
  const rawMessage = Array.isArray(params.message) ? params.message[0] : params.message;
  const rawSource = Array.isArray(params.source) ? params.source[0] : params.source;
  const initialIntent = rawIntent ? intentMap[rawIntent.toLowerCase()] : undefined;
  const initialMessage = rawMessage?.slice(0, 1000);

  return (
    <section className="contact-page">
      <div className="container contact-page-grid">
        <div className="contact-intro">
          <p className="eyebrow eyebrow-light">Let’s talk</p>
          <h1>Ready for a clear <em>next step?</em></h1>
          <p>Share what you’re considering and where you are in the process. The first conversation is about understanding your goals—not applying pressure.</p>
          <div className="contact-methods">
            <TrackedContactLink href={`tel:${siteConfig.phoneHref}`} method="call" location="contact-page"><span>Call</span><strong>{siteConfig.phoneDisplay}</strong></TrackedContactLink>
            <TrackedContactLink href={`sms:${siteConfig.phoneHref}`} method="text" location="contact-page"><span>Text</span><strong>{siteConfig.phoneDisplay}</strong></TrackedContactLink>
            <TrackedContactLink href={`mailto:${siteConfig.email}`} method="email" location="contact-page"><span>Email</span><strong>{siteConfig.email}</strong></TrackedContactLink>
          </div>
          <div className="contact-credentials" aria-label="Professional information">
            <span>Professional information</span>
            <strong>{siteConfig.title} · Arizona license #{siteConfig.licenseNumber}</strong>
            <p>{siteConfig.brokerage}</p>
          </div>
        </div>
        <div className="contact-form-wrap">
          <p className="form-kicker">How can Akanksha help?</p>
          <h2>Start the conversation.</h2>
          <ContactForm initialIntent={initialIntent} initialMessage={initialMessage} source={rawSource === "home-search" ? "home-search" : "contact"} />
        </div>
      </div>
    </section>
  );
}
