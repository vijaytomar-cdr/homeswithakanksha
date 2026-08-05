import Image from "next/image";
import { ArrowRight, MapPin } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button-link";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-location"><MapPin /> Greater Phoenix, Arizona</p>
          <h1>Helping You Find the <em>Right Home</em> in Arizona</h1>
          <p className="hero-lede">
            Whether you&apos;re buying your first home, upgrading, investing, or relocating, I&apos;m here to guide you every step of the way.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/search" tracking={{ name: "Search Homes", location: "homepage-hero" }}>Search Homes <ArrowRight /></ButtonLink>
            <ButtonLink href="/home-value" variant="outline" tracking={{ name: "Home Valuation", location: "homepage-hero" }}>Home Valuation</ButtonLink>
          </div>
          <ButtonLink href="/contact" variant="light" className="consult-link" tracking={{ name: "Schedule a Consultation", location: "homepage-hero" }}>Schedule a Consultation <ArrowRight /></ButtonLink>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame">
            <Image
              src="/images/akanksha-arizona-v2.jpg"
              alt="Akanksha Tomar, REALTOR®"
              fill
              sizes="(max-width: 768px) 92vw, 48vw"
              priority
            />
          </div>
          <div className="hero-card">
            <span className="script-mark">AT</span>
            <p><strong>Personal guidance.</strong><br />Confident decisions.</p>
          </div>
        </div>
      </div>
      <span className="hero-side-label">Luxury, made approachable</span>
    </section>
  );
}
