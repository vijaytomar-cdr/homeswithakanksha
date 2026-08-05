import Image from "next/image";
import { socialContent } from "@/data/homepage";
import { ArrowRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/analytics/tracked-link";

export function LatestContent() {
  return (
    <section className="section latest-section">
      <div className="container">
        <div className="section-heading-row">
          <SectionHeading eyebrow="Local insight, in your feed" title="Latest from Akanksha." description="Short, useful guidance for navigating Arizona real estate." />
          <TrackedLink className="view-all" href="/blog" event={{ name: "cta_click", params: { cta_name: "Explore resources", cta_location: "homepage-latest", destination: "/blog" } }}>Explore resources <ArrowRight /></TrackedLink>
        </div>
        <div className="content-grid">
          {socialContent.map((item, index) => (
            <TrackedLink className="content-card" href={item.href} key={item.title} ariaLabel={`${item.title} — read the guide`} event={{ name: "select_content", params: { content_type: "guide", item_id: item.href, item_name: item.title, item_location: "homepage-latest" } }}>
              <article>
                <div className="content-visual">
                  <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 760px) 80vw, 25vw" />
                  <span className="content-image-shade" />
                  <span className="content-number">0{index + 1}</span>
                  <span className="content-format">Published guide</span>
                </div>
                <div className="content-copy"><p>{item.platform} · {item.series}</p><h3>{item.title}</h3><span className="content-card-action">Read the guide <ArrowRight /></span></div>
              </article>
            </TrackedLink>
          ))}
        </div>
      </div>
    </section>
  );
}
