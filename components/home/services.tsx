import { services } from "@/data/homepage";
import { ArrowUpRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrackedLink } from "@/components/analytics/tracked-link";

export function Services() {
  return (
    <section className="section services-section">
      <div className="container">
        <SectionHeading eyebrow="How I can help" title="Real estate guidance, centered on you." description="Every move is different. Choose where you’d like to begin." />
        <div className="services-grid">
          {services.map((service) => (
            <TrackedLink className="service-card" href={service.href} key={service.title} event={{ name: "cta_click", params: { cta_name: service.title, cta_location: "homepage-services", destination: service.href } }}>
              <span className="service-number">{service.number}</span>
              <div className="service-icon"><ArrowUpRight /></div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="text-link">{service.action} <ArrowUpRight /></span>
            </TrackedLink>
          ))}
        </div>
      </div>
    </section>
  );
}
