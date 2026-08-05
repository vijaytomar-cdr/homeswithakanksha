import Image from "next/image";
import type { BlogPost } from "@/data/blog";
import { formatPublishDate } from "@/data/blog";
import { ArrowUpRight } from "@/components/ui/icons";
import { TrackedLink } from "@/components/analytics/tracked-link";

export function ContentCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const href = `/blog/${post.slug}`;
  const event = { name: "select_content" as const, params: { content_type: "blog_post", item_id: post.slug, item_name: post.title, item_location: "blog-index" } };
  return (
    <article className={`blog-card ${featured ? "blog-card-featured" : ""}`}>
      <TrackedLink href={href} className="blog-card-image" event={event}>
        <Image src={post.featuredImage} alt="" fill sizes={featured ? "(max-width: 760px) 92vw, 58vw" : "(max-width: 760px) 92vw, 31vw"} style={{ objectPosition: post.imagePosition }} />
        <span>{post.category}</span>
      </TrackedLink>
      <div className="blog-card-copy">
        <p>{post.category} <i /> {post.series}</p>
        <h2><TrackedLink href={href} event={event}>{post.title}</TrackedLink></h2>
        <span>{post.excerpt}</span>
        <div><small>{formatPublishDate(post.publishDate)} · {post.readingTime}</small><TrackedLink href={href} ariaLabel={`Read ${post.title}`} event={event}><ArrowUpRight /></TrackedLink></div>
      </div>
    </article>
  );
}
