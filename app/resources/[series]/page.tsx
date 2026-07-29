import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AskForm } from "@/components/content/ask-form";
import { ContentItemCard } from "@/components/content/content-item-card";
import { ArrowRight } from "@/components/ui/icons";
import { contentItems, contentSeries } from "@/data/content-series";
import { getContentProvider } from "@/lib/content";
import { siteConfig } from "@/data/site";

type SeriesPageProps = { params: Promise<{ series: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return contentSeries
    .filter(({ slug }) => contentItems.some((item) => item.seriesSlug === slug && item.status === "published"))
    .map(({ slug }) => ({ series: slug }));
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { series: slug } = await params;
  const provider = getContentProvider();
  const [series, items] = await Promise.all([provider.getSeriesBySlug(slug), provider.getItems(slug)]);
  if (!series) return {};
  const hasPublishedContent = items.some((item) => item.status === "published");
  return {
    title: series.name,
    description: series.description,
    alternates: { canonical: `/resources/${series.slug}` },
    robots: hasPublishedContent ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { title: `${series.name} | Greater Phoenix Real Estate`, description: series.description, images: ["/images/phoenix-neighborhood.jpg"] },
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series: slug } = await params;
  const provider = getContentProvider();
  const [series, items] = await Promise.all([provider.getSeriesBySlug(slug), provider.getItems(slug)]);
  if (!series) notFound();
  const publishedItems = items.filter((item) => item.status === "published");
  if (!publishedItems.length) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${siteConfig.url}/resources` },
      { "@type": "ListItem", position: 3, name: series.name, item: `${siteConfig.url}/resources/${series.slug}` },
    ],
  };

  return (
    <>
      <section className={`series-hero series-hero-${series.theme}`}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/resources">Resources</Link><span>/</span><span>{series.shortName}</span></nav>
          <p className="eyebrow eyebrow-light">Akanksha’s local content series</p>
          <h1>{series.name}</h1>
          <p>{series.description}</p>
          <div>{series.formats.map((format) => <span key={format}>{format}</span>)}</div>
        </div>
      </section>
      <section className="section series-about">
        <div className="container">
          <div><p className="eyebrow">Why this series exists</p><h2>Useful context, carefully framed.</h2></div>
          <div><p>{series.editorialPurpose}</p><span>Available on</span><ul>{series.channels.map((channel) => <li key={channel}>{channel}</li>)}</ul></div>
        </div>
      </section>
      <section className="section series-items">
        <div className="container">
          <div className="resource-heading"><div><p className="eyebrow">In this series</p><h2>Published guides and answers.</h2></div><p>Explore complete, reviewed website content with practical frameworks and authoritative sources.</p></div>
          <div className="resource-item-grid">{publishedItems.map((item) => <ContentItemCard item={item} key={item.id} />)}</div>
        </div>
      </section>
      {series.slug === "ask-akanksha" ? (
        <section className="ask-series">
          <div className="container ask-series-grid"><div><p className="eyebrow eyebrow-light">Ask a real person</p><h2>Your question can start a private conversation.</h2><p>This is a contact form, not an AI assistant. Akanksha can respond personally, and recurring questions may inspire general educational content without identifying you.</p></div><div><AskForm /></div></div>
        </section>
      ) : (
        <section className="series-cta"><div className="container"><div><p className="eyebrow eyebrow-light">Have a question for this series?</p><h2>Help shape what Akanksha covers next.</h2></div><Link className="button button-gold" href="/resources/ask-akanksha">Ask Akanksha <ArrowRight /></Link></div></section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
