import Link from "next/link";
import { allCommunities } from "@/data/communities";
import { navigation, siteConfig } from "@/data/site";
import { ArrowUpRight } from "@/components/ui/icons";
import { TrackedContactLink } from "@/components/analytics/tracked-contact-link";
import { TrackedLink } from "@/components/analytics/tracked-link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-intro">
          <p className="eyebrow eyebrow-light">Let&apos;s talk Arizona</p>
          <h2>Ready for a clear next step?</h2>
          <p>Start with a relaxed conversation about your goals, questions, and timing.</p>
          <TrackedLink className="footer-contact" href="/contact" event={{ name: "cta_click", params: { cta_name: "Schedule a consultation", cta_location: "footer", destination: "/contact" } }}>
            Schedule a consultation <ArrowUpRight />
          </TrackedLink>
        </div>
        <div className="footer-links">
          <div><h3>Navigate</h3>{navigation.slice(1).map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}</div>
          <div className="footer-community-links"><h3>Communities</h3>{allCommunities.map((item) => <Link key={item.slug} href={`/communities/${item.slug}`}>{item.name}</Link>)}</div>
          <div>
            <h3>Connect</h3>
            <TrackedContactLink href={`tel:${siteConfig.phoneHref}`} method="call" location="footer">{siteConfig.phoneDisplay}</TrackedContactLink>
            <TrackedContactLink href={`mailto:${siteConfig.email}`} method="email" location="footer">{siteConfig.email}</TrackedContactLink>
            <TrackedLink href="/contact" event={{ name: "cta_click", params: { cta_name: "Contact Akanksha", cta_location: "footer", destination: "/contact" } }}>Contact Akanksha</TrackedLink>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <div className="brand brand-footer">
          <span className="brand-name">Akanksha Tomar</span>
          <span className="brand-meta">REALTOR® <i /> Arizona license #{siteConfig.licenseNumber} <i /> {siteConfig.brokerage}</span>
        </div>
        <p>© {new Date().getFullYear()} Akanksha Tomar. All rights reserved.</p>
        <div><Link href="/privacy">Privacy</Link><Link href="/accessibility">Accessibility</Link><Link href="/terms">Terms</Link><Link href="/fair-housing">Fair housing</Link></div>
      </div>
      <p className="container footer-disclaimer">
        Arizona real estate license #{siteConfig.licenseNumber}. Equal Housing Opportunity. Property availability and details must be verified from a current authorized source; market summaries identify their public source and reporting period.
      </p>
    </footer>
  );
}
