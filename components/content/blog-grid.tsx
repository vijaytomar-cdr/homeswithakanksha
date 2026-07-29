"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/data/blog";
import { blogCategories } from "@/data/blog";
import { ContentCard } from "./content-card";

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<(typeof blogCategories)[number]>("All");
  const visiblePosts = useMemo(
    () => category === "All" ? posts : posts.filter((post) => post.category === category),
    [category, posts],
  );

  return (
    <>
      <div className="blog-filters" aria-label="Filter articles by category">
        {blogCategories.map((item) => (
          <button type="button" key={item} className={item === category ? "is-active" : ""} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="blog-grid">
        {visiblePosts.map((post) => <ContentCard key={post.slug} post={post} />)}
      </div>
    </>
  );
}

