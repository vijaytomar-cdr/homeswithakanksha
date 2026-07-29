import type { Metadata } from "next";
import { AudienceSection } from "@/components/services/audience-section";
import { JourneySection } from "@/components/services/journey-section";
import { ServiceHero } from "@/components/services/service-hero";
import { buyerSteps, buyerTypes } from "@/data/services";

export const metadata: Metadata = {
  title: "Buy a Home in Greater Phoenix",
  description: "A clear, patient home-buying process for first-time buyers, relocation clients, investors, and more across Greater Phoenix.",
  alternates: { canonical: "/buy" },
};

export default function BuyPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Buying in Greater Phoenix"
        title="A thoughtful path to"
        accent="the right home."
        description="From understanding your options to getting the keys, you’ll have patient, responsive guidance at every decision."
        cta="Start Your Home Search"
        href="#buyer-journey"
        marker="BUY"
      />
      <div id="buyer-journey">
        <JourneySection
          eyebrow="Your buying journey"
          title="Clear guidance, from first conversation to closing."
          description="The process becomes more manageable when you know what comes next and why it matters."
          steps={buyerSteps}
        />
      </div>
      <AudienceSection
        eyebrow="Designed around your move"
        title="There is no one-size-fits-all buyer."
        description="Your financing, timeline, experience, and goals shape the right strategy. We’ll build yours together."
        items={buyerTypes}
        cta="Start Your Home Search"
        href="/contact"
      />
    </>
  );
}

