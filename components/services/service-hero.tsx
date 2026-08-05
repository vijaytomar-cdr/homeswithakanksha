import { ArrowRight } from "@/components/ui/icons";
import { TrackedLink } from "@/components/analytics/tracked-link";

export function ServiceHero({
  eyebrow,
  title,
  accent,
  description,
  cta,
  href,
  marker,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  cta: string;
  href: string;
  marker: string;
}) {
  return (
    <section className="interior-hero">
      <div className="container interior-hero-grid">
        <div>
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h1>{title}<br /><em>{accent}</em></h1>
          <p>{description}</p>
          <TrackedLink className="button button-gold" href={href} event={{ name: "cta_click", params: { cta_name: cta, cta_location: `${marker.toLowerCase()}-hero`, destination: href } }}>{cta}<ArrowRight /></TrackedLink>
        </div>
        <div className="interior-art" aria-hidden="true">
          <span>{marker}</span>
          <div />
          <p>Greater Phoenix<br />Real Estate</p>
        </div>
      </div>
    </section>
  );
}
