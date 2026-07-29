import Link from "next/link";
import Image from "next/image";
import { socialContent } from "@/data/homepage";
import { ArrowRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

export function LatestContent() {
  return (
    <section className="section latest-section">
      <div className="container">
        <div className="section-heading-row">
          <SectionHeading eyebrow="Local insight, in your feed" title="Latest from Akanksha." description="Short, useful guidance for navigating Arizona real estate." />
          <Link className="view-all" href="/blog">Explore resources <ArrowRight /></Link>
        </div>
        <div className="content-grid">
          {socialContent.map((item, index) => (
            <Link className="content-card" href={item.href} key={item.title} aria-label={`${item.title} — read the guide`}>
              <article>
                <div className="content-visual">
                  <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 760px) 80vw, 25vw" />
                  <span className="content-image-shade" />
                  <span className="content-number">0{index + 1}</span>
                  <span className="content-format">Published guide</span>
                </div>
                <div className="content-copy"><p>{item.platform} · {item.series}</p><h3>{item.title}</h3><span className="content-card-action">Read the guide <ArrowRight /></span></div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
