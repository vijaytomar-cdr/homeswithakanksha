import type { Metadata } from "next";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { serializeJsonLd, siteSchemaGraph } from "@/lib/schema";
import { siteConfig } from "@/data/site";
import { AnalyticsManager } from "@/components/analytics/analytics-manager";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Greater Phoenix REALTOR®`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: "Homes with Akanksha",
  creator: siteConfig.name,
  publisher: siteConfig.brokerage,
  category: "Real estate",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Greater Phoenix REALTOR®`,
    description: siteConfig.description,
    images: [{ url: "/images/phoenix-neighborhood.jpg", width: 1672, height: 941, alt: "Greater Phoenix desert neighborhood" }],
  },
  twitter: { card: "summary_large_image", title: `${siteConfig.name} | Greater Phoenix REALTOR®`, description: siteConfig.description, images: ["/images/phoenix-neighborhood.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <MobileActionBar />
        <AnalyticsManager />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteSchemaGraph) }} />
      </body>
    </html>
  );
}
