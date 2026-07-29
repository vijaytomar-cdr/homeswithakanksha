import Link from "next/link";
import Image from "next/image";
import type { ContentItem } from "@/data/content-series";
import { ArrowUpRight, Play } from "@/components/ui/icons";
import { blogPosts } from "@/data/blog";

export function ContentItemCard({ item }: { item: ContentItem }) {
  const post = item.href ? blogPosts.find(({ canonicalPath }) => canonicalPath === item.href) : undefined;
  const content = (
    <>
      <div className="resource-item-visual">
        {post && <Image src={post.featuredImage} alt="" fill sizes="(max-width: 760px) 92vw, 31vw" />}
        {post && <span className="resource-image-shade" />}
        <span>{item.format}</span>
        {item.format === "Short video" && <i><Play /></i>}
        <b>Published guide</b>
      </div>
      <div className="resource-item-copy">
        <p>{item.location ?? "Greater Phoenix"} · {item.channels.join(" / ")}</p>
        <h3>{item.title}</h3>
        <span>{item.summary}</span>
        <strong>Read the guide <ArrowUpRight /></strong>
      </div>
    </>
  );
  return <Link className="resource-item-card" href={item.href!}>{content}</Link>;
}
