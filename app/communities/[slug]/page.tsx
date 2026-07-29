import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommunityTemplate } from "@/components/communities/community-template";
import { communityDetails, getCommunity } from "@/data/community-details";
import { siteConfig } from "@/data/site";
import { getCommunityImage } from "@/data/communities";

type CommunityPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return communityDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CommunityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) return {};
  const description = `Explore housing, lifestyle, recreation, shopping, new construction, and relocation considerations for ${community.name}, Arizona.`;
  return {
    title: `${community.name}, AZ Real Estate & Community Guide`,
    description,
    alternates: { canonical: `/communities/${community.slug}` },
    openGraph: { title: `Living in ${community.name}, Arizona`, description, images: [getCommunityImage(community.slug)] },
  };
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Communities", item: `${siteConfig.url}/communities` },
      { "@type": "ListItem", position: 3, name: community.name, item: `${siteConfig.url}/communities/${community.slug}` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: community.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <CommunityTemplate community={community} />
      {[breadcrumbSchema, faqSchema].map((schema) => (
        <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
