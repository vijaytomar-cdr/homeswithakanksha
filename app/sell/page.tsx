import type { Metadata } from "next";
import { AudienceSection } from "@/components/services/audience-section";
import { JourneySection } from "@/components/services/journey-section";
import { ServiceHero } from "@/components/services/service-hero";
import { sellerPrinciples, sellerSteps } from "@/data/services";

export const metadata: Metadata = {
  title: "Sell Your Greater Phoenix Home",
  description: "Thoughtful pricing, presentation, marketing, and negotiation guidance for home sellers across Greater Phoenix.",
  alternates: { canonical: "/sell" },
};

export default function SellPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Selling in Greater Phoenix"
        title="A considered strategy for"
        accent="your next move."
        description="Position your home with care and move forward with clear communication, elevated presentation, and focused representation."
        cta="Get My Home Value"
        href="/home-value"
        marker="SELL"
      />
      <JourneySection
        eyebrow="Your selling plan"
        title="Every detail supports the whole story."
        description="A strong sale brings preparation, positioning, exposure, and negotiation into one coordinated plan."
        steps={sellerSteps}
      />
      <AudienceSection
        eyebrow="The approach"
        title="Professional strategy. Personal service."
        description="Your priorities remain at the center—from the first pricing conversation through the final handoff."
        items={sellerPrinciples}
        cta="Get My Home Value"
        href="/home-value"
      />
    </>
  );
}

