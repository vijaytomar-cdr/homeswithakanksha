import { siteConfig } from "@/data/site";

export const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/images/akanksha-arizona-v2.jpg`,
  telephone: siteConfig.phoneHref,
  email: siteConfig.email,
  identifier: {
    "@type": "PropertyValue",
    name: "Arizona real estate license",
    value: siteConfig.licenseNumber,
  },
  areaServed: [
    "Greater Phoenix, Arizona",
    "Phoenix, Arizona",
    "Peoria, Arizona",
    "Surprise, Arizona",
    "Glendale, Arizona",
    "Scottsdale, Arizona",
    "Chandler, Arizona",
    "Gilbert, Arizona",
    "Mesa, Arizona",
  ],
  parentOrganization: {
    "@type": "Organization",
    name: siteConfig.brokerage,
  },
};
