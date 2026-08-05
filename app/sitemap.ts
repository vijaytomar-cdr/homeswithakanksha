import type { MetadataRoute } from "next";
import { featuredCommunities } from "@/data/communities";
import { communityReviewedDate } from "@/data/community-details";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/data/site";
import { contentItems, contentSeries } from "@/data/content-series";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteReviewedDate = "2026-08-04";
  const routes = ["", "/about", "/buy", "/sell", "/communities", "/home-value", "/search", "/market", "/resources", "/blog", "/contact", "/privacy", "/accessibility", "/terms", "/fair-housing"];
  return [
    ...routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: siteReviewedDate, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...featuredCommunities.map(({ slug }) => ({ url: `${siteConfig.url}/communities/${slug}`, lastModified: communityReviewedDate, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...contentSeries
      .filter(({ slug }) => contentItems.some((item) => item.seriesSlug === slug && item.status === "published"))
      .map(({ slug }) => ({ url: `${siteConfig.url}/resources/${slug}`, lastModified: siteReviewedDate, changeFrequency: "monthly" as const, priority: 0.55 })),
    ...blogPosts
      .filter(({ status }) => status === "published")
      .map(({ canonicalPath, updatedDate, publishDate }) => ({
        url: `${siteConfig.url}${canonicalPath}`,
        lastModified: updatedDate ?? publishDate,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      })),
  ];
}
