import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Fair Housing",
  description: "The fair housing commitment for Homes with Akanksha.",
  alternates: { canonical: "/fair-housing" },
};

export default function FairHousingPage() {
  return (
    <LegalPage
      eyebrow="Equal Housing Opportunity"
      title="Fair housing commitment"
      introduction="Every person deserves equal access to professional real-estate service and housing opportunities."
      sections={[
        {
          heading: "Commitment",
          paragraphs: ["Homes with Akanksha supports the letter and spirit of federal, state, and local fair housing laws and provides service without unlawful discrimination."],
        },
        {
          heading: "Objective guidance",
          paragraphs: ["Community content focuses on homes, transportation, amenities, housing patterns, and other objective considerations. Akanksha does not steer clients toward or away from an area based on protected characteristics or describe an area as right for a particular type of person."],
        },
        {
          heading: "Make your own assessment",
          paragraphs: ["Clients are encouraged to identify the factors important to them and consult reliable, first-party sources for schools, crime, accessibility, zoning, and other personal priorities. Akanksha can help locate sources without deciding which community someone should choose."],
        },
        {
          heading: "Report a concern",
          paragraphs: ["If you have a fair housing question or believe website content or service did not meet this commitment, please contact Akanksha so the concern can be reviewed promptly."],
        },
      ]}
    />
  );
}
