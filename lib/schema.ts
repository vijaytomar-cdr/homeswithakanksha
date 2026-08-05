import { allCommunities } from "@/data/communities";
import { siteConfig } from "@/data/site";

const ids = {
  website: `${siteConfig.url}/#website`,
  business: `${siteConfig.url}/#real-estate-agent`,
  person: `${siteConfig.url}/about#akanksha-tomar`,
  brokerage: `${siteConfig.url}/#brokerage`,
} as const;

const personSchema = {
  "@type": "Person",
  "@id": ids.person,
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  url: `${siteConfig.url}/about`,
  image: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/images/akanksha-navy-v2.jpg`,
    caption: `${siteConfig.name}, ${siteConfig.title}`,
  },
  email: siteConfig.email,
  telephone: siteConfig.phoneHref,
  worksFor: { "@id": ids.brokerage },
  memberOf: { "@id": ids.business },
  identifier: {
    "@type": "PropertyValue",
    name: "Arizona real estate license",
    value: siteConfig.licenseNumber,
  },
};

export const siteSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": ids.website,
      url: siteConfig.url,
      name: "Homes with Akanksha",
      description: siteConfig.description,
      inLanguage: "en-US",
      publisher: { "@id": ids.business },
    },
    {
      "@type": "RealEstateAgent",
      "@id": ids.business,
      name: "Homes with Akanksha",
      alternateName: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      image: `${siteConfig.url}/images/akanksha-arizona-v2.jpg`,
      telephone: siteConfig.phoneHref,
      email: siteConfig.email,
      employee: { "@id": ids.person },
      parentOrganization: { "@id": ids.brokerage },
      areaServed: [
        { "@type": "Place", name: "Greater Phoenix, Arizona" },
        ...allCommunities.map(({ name }) => ({ "@type": "City", name: `${name}, Arizona` })),
      ],
    },
    personSchema,
    {
      "@type": "Organization",
      "@id": ids.brokerage,
      name: siteConfig.brokerage,
    },
  ],
};

export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteConfig.url}/about#profile-page`,
  url: `${siteConfig.url}/about`,
  name: `About ${siteConfig.name}`,
  description: `Meet ${siteConfig.name}, a ${siteConfig.title} providing real estate guidance across Greater Phoenix, Arizona.`,
  inLanguage: "en-US",
  isPartOf: { "@id": ids.website },
  mainEntity: { "@id": ids.person },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "About", item: `${siteConfig.url}/about` },
    ],
  },
};

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
