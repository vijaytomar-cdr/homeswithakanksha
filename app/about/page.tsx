import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About Akanksha Tomar | Greater Phoenix REALTOR®",
  description:
    "Meet Akanksha Tomar, a REALTOR® with eXp Realty | Kumler Group providing personal, patient real estate guidance across Greater Phoenix.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Akanksha Tomar",
    description:
      "Personal, patient real estate guidance for buyers and sellers throughout Greater Phoenix.",
    images: ["/images/akanksha-navy-v2.jpg"],
  },
};

export default function AboutRoute() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    worksFor: { "@type": "Organization", name: siteConfig.brokerage },
    url: `${siteConfig.url}/about`,
    image: `${siteConfig.url}/images/akanksha-navy-v2.jpg`,
    areaServed: "Greater Phoenix, Arizona",
  };

  return (
    <>
      <AboutPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
