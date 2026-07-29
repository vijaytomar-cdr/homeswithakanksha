import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { allCommunities } from "@/data/communities";
import type { RawSearchParams } from "@/lib/idx";

export const metadata: Metadata = {
  title: "Search Greater Phoenix Homes",
  description: "Tell Akanksha what you want in a Greater Phoenix home and request a current, personalized property search.",
  alternates: { canonical: "/search" },
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const params = await searchParams;
  const value = (key: keyof RawSearchParams) => {
    const raw = params[key];
    return Array.isArray(raw) ? raw[0] : raw;
  };
  const criteria = [
    value("location") && `Location: ${value("location")}`,
    value("minPrice") && `Minimum price: $${Number(value("minPrice")).toLocaleString()}`,
    value("maxPrice") && `Maximum price: $${Number(value("maxPrice")).toLocaleString()}`,
    value("beds") && `Bedrooms: ${value("beds")}+`,
    value("baths") && `Bathrooms: ${value("baths")}+`,
    value("propertyType") && `Property type: ${value("propertyType")}`,
    value("newConstruction") === "true" && "New construction preferred",
  ].filter(Boolean);
  const initialMessage = criteria.length
    ? `I would like a current Greater Phoenix home search with these criteria:\n${criteria.join("\n")}`
    : "I would like help creating a current Greater Phoenix home search.";

  return (
    <>
      <section className="search-page-hero">
        <div className="container">
          <div><p className="eyebrow eyebrow-light">Personalized home search</p><h1>Tell Akanksha what fits <em>your next move.</em></h1></div>
          <div><strong>Current options, prepared for you</strong><p>Share your priorities and Akanksha can follow up with current property options, questions to refine, and a practical next step.</p></div>
        </div>
      </section>
      <section className="section search-request-section">
        <div className="container search-request-grid">
          <div>
            <p className="eyebrow">Build your search</p>
            <h2>A useful search starts with the life around the home.</h2>
            <p>Price and bedroom count matter, but so do daily routes, property condition, fees, timing, and the tradeoffs you are comfortable making. Your request goes directly to Akanksha.</p>
            <div className="search-community-links">
              <span>Or research a community first</span>
              {allCommunities.slice(0, 8).map((community) => <Link href={`/communities/${community.slug}`} key={community.slug}>{community.name}</Link>)}
              <Link href="/communities">View all communities</Link>
            </div>
          </div>
          <div className="search-request-form">
            <p className="form-kicker">Request current options</p>
            <h2>Share your home wish list.</h2>
            <ContactForm initialIntent="Buying" initialMessage={initialMessage} source="home-search" />
          </div>
        </div>
      </section>
      <section className="idx-disclosure">
        <div className="container"><h2>Prefer to talk through it?</h2><p>Call or text Akanksha at <a href="tel:+12179791262">(217) 979-1262</a>. Property availability changes quickly and will be confirmed from the appropriate current source before it is presented as available.</p></div>
      </section>
    </>
  );
}
