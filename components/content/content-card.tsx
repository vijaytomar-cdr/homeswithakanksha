import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import { formatPublishDate } from "@/data/blog";
import { ArrowUpRight } from "@/components/ui/icons";

export function ContentCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={`blog-card ${featured ? "blog-card-featured" : ""}`}>
      <Link href={`/blog/${post.slug}`} className="blog-card-image">
        <Image src={post.featuredImage} alt="" fill sizes={featured ? "(max-width: 760px) 92vw, 58vw" : "(max-width: 760px) 92vw, 31vw"} style={{ objectPosition: post.imagePosition }} />
        <span>{post.category}</span>
      </Link>
      <div className="blog-card-copy">
        <p>{post.category} <i /> {post.series}</p>
        <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
        <span>{post.excerpt}</span>
        <div><small>{formatPublishDate(post.publishDate)} · {post.readingTime}</small><Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}><ArrowUpRight /></Link></div>
      </div>
    </article>
  );
}
