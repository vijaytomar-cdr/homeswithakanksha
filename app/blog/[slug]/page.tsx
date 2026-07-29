import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/article-layout";
import { blogPosts, getBlogPost } from "@/data/blog";
import { siteConfig } from "@/data/site";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: post.canonicalPath },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      title: post.seoTitle,
      description: post.seoDescription,
      url: post.canonicalPath,
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate ?? post.reviewedDate,
      authors: [post.author],
      tags: [post.category, post.series, "Greater Phoenix real estate"],
      images: [{ url: post.featuredImage, width: 1672, height: 941, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.seoTitle, description: post.seoDescription, images: [post.featuredImage] },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    image: `${siteConfig.url}${post.featuredImage}`,
    datePublished: post.publishDate,
    dateModified: post.updatedDate ?? post.reviewedDate,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.brokerage },
    mainEntityOfPage: `${siteConfig.url}${post.canonicalPath}`,
    articleSection: post.category,
    keywords: [post.category, post.series, "Greater Phoenix", "Arizona real estate"].join(", "),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.url}${post.canonicalPath}` },
    ],
  };

  return (
    <>
      <ArticleLayout post={post} related={related} />
      {[articleSchema, breadcrumbSchema].map((schema) => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
    </>
  );
}
