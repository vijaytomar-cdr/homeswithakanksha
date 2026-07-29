import type { Metadata } from "next";
import { BlogGrid } from "@/components/content/blog-grid";
import { ContentCard } from "@/components/content/content-card";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Greater Phoenix Real Estate Guides",
  description: "Practical Greater Phoenix guides for buyers, sellers, relocation clients, community research, and new construction.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Arizona Real Estate Insights from Akanksha Tomar",
    description: "Helpful, pressure-free guidance for navigating Greater Phoenix real estate.",
    images: ["/images/phoenix-neighborhood.jpg"],
  },
};

export default function BlogPage() {
  const [featured, ...posts] = blogPosts;
  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <p className="eyebrow eyebrow-light">Arizona real estate insights</p>
          <h1>Useful local guidance for <em>confident decisions.</em></h1>
          <p>Explore buyer education, relocation planning, community comparisons, and new-construction questions—without hype or pressure.</p>
          <span>Nine practical guides, reviewed against current primary and authoritative sources.</span>
        </div>
      </section>
      <section className="section blog-featured">
        <div className="container">
          <div className="blog-section-heading"><div><p className="eyebrow">Featured guide</p><h2>Start with a practical framework.</h2></div><p>Clear education, local context, and links to the sources that matter—organized for useful reading first.</p></div>
          <ContentCard post={featured} featured />
        </div>
      </section>
      <section className="section blog-library">
        <div className="container">
          <div className="blog-section-heading"><div><p className="eyebrow">Browse the library</p><h2>Explore by what matters now.</h2></div><p>Filter the guide library by topic, from first purchases and closing costs to relocation and community research.</p></div>
          <BlogGrid posts={posts} />
        </div>
      </section>
    </>
  );
}
