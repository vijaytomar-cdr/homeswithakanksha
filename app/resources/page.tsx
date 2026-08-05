import type { Metadata } from "next";
import Link from "next/link";
import { ContentItemCard } from "@/components/content/content-item-card";
import { ContentSeriesCard } from "@/components/content/content-series-card";
import { ArrowRight } from "@/components/ui/icons";
import { getContentProvider } from "@/lib/content";
import { contentItems } from "@/data/content-series";
import { createSocialMetadata } from "@/lib/metadata";
import { TrackedDownloadLink } from "@/components/analytics/tracked-download-link";
import { TrackedLink } from "@/components/analytics/tracked-link";

const description = "Explore Akanksha Tomar’s Greater Phoenix buyer education, relocation guides, community spotlights, market explainers, and local content series.";

export const metadata: Metadata = {
  title: "Greater Phoenix Real Estate Resources",
  description,
  alternates: { canonical: "/resources" },
  ...createSocialMetadata({ title: "Greater Phoenix Real Estate Resources", description, path: "/resources", image: "/images/blog/moving-to-phoenix.jpg", imageAlt: "Greater Phoenix landscape featured in Akanksha Tomar's real estate resources", imageWidth: 1672, imageHeight: 941 }),
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
      <section className="section resource-downloads">
        <div className="container">
          <div className="resource-heading"><div><p className="eyebrow">Take it with you</p><h2>Two practical planning worksheets.</h2></div><p>Download, open, and print these ungated resources. No email address is required.</p></div>
          <div className="resource-download-grid">
            <article><span>01 · Buyer checklist</span><h3>Greater Phoenix Home Buyer Checklist</h3><p>Organize financing, search criteria, property review, contract deadlines, and closing preparation.</p><TrackedDownloadLink href="/downloads/greater-phoenix-home-buyer-checklist.html" fileName="greater-phoenix-home-buyer-checklist.html">Download the checklist</TrackedDownloadLink></article>
            <article><span>02 · Relocation worksheet</span><h3>Moving to Greater Phoenix Planning Guide</h3><p>Build a community scorecard around routes, housing, daily needs, total cost, setting, and timing.</p><TrackedDownloadLink href="/downloads/moving-to-greater-phoenix-planning-guide.html" fileName="moving-to-greater-phoenix-planning-guide.html">Download the guide</TrackedDownloadLink></article>
          </div>
        </div>
      </section>
      <section className="resource-engine-note">
        <div className="container"><div><p className="eyebrow eyebrow-light">Make it property-specific</p><h2>Still deciding what applies to you?</h2></div><div><p>Guides can organize the research, but the strongest next step is a conversation about your timing, property, budget, and priorities.</p><TrackedLink className="button button-gold" href="/contact" event={{ name: "cta_click", params: { cta_name: "Ask Akanksha", cta_location: "resources-footer", destination: "/contact" } }}>Ask Akanksha <ArrowRight /></TrackedLink></div></div>
      </section>
    </>
  );
}
