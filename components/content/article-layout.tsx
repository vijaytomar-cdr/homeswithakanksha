import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import { formatPublishDate } from "@/data/blog";
import { ArrowRight } from "@/components/ui/icons";
import { ContentCard } from "./content-card";

export function ArticleLayout({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  return (
    <article className="article-page">
      <header className="article-header">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/blog">Blog</Link><span>/</span><span>{post.category}</span></nav>
          <p className="eyebrow eyebrow-light">{post.category} · {post.series}</p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="article-byline">
            <Image src="/images/akanksha-navy-v2.jpg" alt="" width={48} height={48} />
            <span><strong>By {post.author}</strong><small>{formatPublishDate(post.publishDate)} · Reviewed {formatPublishDate(post.reviewedDate)} · {post.readingTime}</small></span>
          </div>
        </div>
      </header>
      <div className="container article-image">
        <Image src={post.featuredImage} alt={`Greater Phoenix landscape for ${post.title}`} fill priority sizes="(max-width: 760px) 92vw, 1120px" style={{ objectPosition: post.imagePosition }} />
      </div>
      <div className="container article-layout">
        <aside>
          <span>In this guide</span>
          {post.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.heading}>0{index + 1} {section.heading}</a>)}
          <p>General educational guidance. Confirm property- and transaction-specific details with the appropriate licensed or authoritative source.</p>
        </aside>
        <div className="article-body">
          {post.sections.map((section, index) => (
            <section id={`section-${index + 1}`} key={section.heading}>
              <span>0{index + 1}</span>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
              {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
          <section className="article-sources" aria-labelledby="article-sources-heading">
            <span>Sources</span>
            <h2 id="article-sources-heading">Sources and further reading</h2>
            <p>Primary and authoritative references used to develop and review this guide:</p>
            <ul>
              {post.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer noopener">{source.label}</a>
                </li>
              ))}
            </ul>
          </section>
          <div className="article-disclaimer">
            <h3>Important context</h3>
            <p>This general information is not legal, tax, lending, appraisal, inspection, or financial advice. Rules, costs, inventory, and market conditions can change. Verify transaction-specific information with the appropriate licensed or authoritative source.</p>
          </div>
        </div>
      </div>
      <section className="article-cta">
        <div className="container"><div><p className="eyebrow eyebrow-light">Have a property-specific question?</p><h2>Ask Akanksha about your Arizona move.</h2></div><Link className="button button-gold" href="/contact">Start a conversation <ArrowRight /></Link></div>
      </section>
      {related.length > 0 && (
        <section className="section related-posts">
          <div className="container"><div className="related-heading"><p className="eyebrow">Keep exploring</p><h2>Related guides</h2></div><div className="blog-grid">{related.map((item) => <ContentCard post={item} key={item.slug} />)}</div></div>
        </section>
      )}
    </article>
  );
}
