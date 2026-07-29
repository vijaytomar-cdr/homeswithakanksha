import type { Metadata } from "next";
import Link from "next/link";
import { ContentItemCard } from "@/components/content/content-item-card";
import { ContentSeriesCard } from "@/components/content/content-series-card";
import { ArrowRight } from "@/components/ui/icons";
import { getContentProvider } from "@/lib/content";
import { contentItems } from "@/data/content-series";

export const metadata: Metadata = {
  title: "Greater Phoenix Real Estate Resources",
  description: "Explore Akanksha Tomar’s Greater Phoenix buyer education, relocation guides, community spotlights, market explainers, and local content series.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesPage() {
  const provider = getContentProvider();
  const [series, items] = await Promise.all([provider.getSeries(), provider.getItems()]);
  const publishedSeries = series.filter(({ slug }) => contentItems.some((item) => item.seriesSlug === slug && item.status === "published"));
  const publishedItems = items.filter((item) => item.status === "published").slice(0, 6);

  return (
    <>
      <section className="resources-hero">
        <div className="container">
          <p className="eyebrow eyebrow-light">Local content, built to be useful</p>
          <h1>Greater Phoenix guidance in the format <em>you’ll actually use.</em></h1>
          <p>Read a practical guide, compare communities, review local market context, or ask a property-specific question directly.</p>
          <div><Link className="button button-gold" href="/blog">Read the Guides <ArrowRight /></Link><Link className="button button-outline" href="/resources/ask-akanksha">Ask Akanksha</Link></div>
        </div>
      </section>
      <section className="section resource-series-section">
        <div className="container">
          <div className="resource-heading"><div><p className="eyebrow">Content series</p><h2>Follow the questions that matter to your move.</h2></div><p>Each series is designed once and reused across the website, short video, social channels, and Google Business Profile—with format-specific editing rather than copy-and-paste publishing.</p></div>
          <div className="series-grid">{publishedSeries.map((item, index) => <ContentSeriesCard series={item} index={index} key={item.slug} />)}</div>
        </div>
      </section>
      <section className="section resource-preview-section">
        <div className="container">
          <div className="resource-heading"><div><p className="eyebrow">Published guidance</p><h2>Start with a practical question.</h2></div><p>Every item shown here leads to a complete guide with useful context and sources for further research.</p></div>
          <div className="resource-item-grid">{publishedItems.map((item) => <ContentItemCard item={item} key={item.id} />)}</div>
        </div>
      </section>
      <section className="resource-engine-note">
        <div className="container"><div><p className="eyebrow eyebrow-light">Publishing foundation</p><h2>Local today. CMS-ready tomorrow.</h2></div><p>Content currently comes from a typed local provider. A Sanity adapter can replace it later without rewriting cards, series pages, SEO routes, or publishing states.</p></div>
      </section>
    </>
  );
}
