import Link from "next/link";
import { Home, Message, Phone, Search } from "@/components/ui/icons";
import { siteConfig } from "@/data/site";
import { TrackedContactLink } from "@/components/analytics/tracked-contact-link";

export function MobileActionBar() {
  const actions = [
    { label: "Call", href: `tel:${siteConfig.phoneHref}`, icon: Phone },
    { label: "Text", href: `sms:${siteConfig.phoneHref}`, icon: Message },
    { label: "Search", href: "/search", icon: Search },
    { label: "Home Value", href: "/home-value", icon: Home },
  ];

  return (
    <nav className="mobile-actions" aria-label="Quick contact actions">
      {actions.map(({ label, href, icon: Icon }) => (
        label === "Call" || label === "Text" ? (
          <TrackedContactLink key={label} href={href} method={label === "Call" ? "call" : "text"}><Icon /><span>{label}</span></TrackedContactLink>
        ) : (
          <Link key={label} href={href}><Icon /><span>{label}</span></Link>
        )
      ))}
    </nav>
  );
}
