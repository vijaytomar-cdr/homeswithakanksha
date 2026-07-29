import Link from "next/link";
import { services } from "@/data/homepage";
import { ArrowUpRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

export function Services() {
  return (
    <section className="section services-section">
      <div className="container">
        <SectionHeading eyebrow="How I can help" title="Real estate guidance, centered on you." description="Every move is different. Choose where you’d like to begin." />
        <div className="services-grid">
          {services.map((service) => (
            <Link className="service-card" href={service.href} key={service.title}>
              <span className="service-number">{service.number}</span>
              <div className="service-icon"><ArrowUpRight /></div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="text-link">{service.action} <ArrowUpRight /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

