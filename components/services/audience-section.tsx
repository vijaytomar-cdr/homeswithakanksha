import { ButtonLink } from "@/components/ui/button-link";

export function AudienceSection({
  eyebrow,
  title,
  description,
  items,
  cta,
  href,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly string[];
  cta: string;
  href: string;
}) {
  return (
    <section className="audience-section">
      <div className="container audience-grid">
        <div><p className="eyebrow eyebrow-light">{eyebrow}</p><h2>{title}</h2><p>{description}</p><ButtonLink href={href} tracking={{ name: cta, location: "service-audience" }}>{cta}</ButtonLink></div>
        <div className="audience-list">{items.map((item, index) => <div key={item}><span>0{index + 1}</span><h3>{item}</h3></div>)}</div>
      </div>
    </section>
  );
}
