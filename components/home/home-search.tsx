"use client";

import type { FormEvent } from "react";
import { Home, MapPin, Search } from "@/components/ui/icons";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { trackEvent } from "@/lib/analytics/events";

export function HomeSearch() {
  function trackSearch(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const minPrice = Number(data.get("minPrice")) || undefined;
    const maxPrice = Number(data.get("maxPrice")) || undefined;
    trackEvent({
      name: "search",
      params: {
        search_term: String(data.get("location") ?? "") || undefined,
        min_price: minPrice,
        max_price: maxPrice,
      },
    });
  }

  return (
    <section className="search-section" id="search-homes">
      <div className="container">
        <div className="search-intro">
          <div><p className="eyebrow eyebrow-light">Your search starts here</p><h2>Explore homes across<br /><em>Greater Phoenix.</em></h2></div>
          <p>Share a few starting criteria and Akanksha can prepare current options around your priorities.</p>
        </div>
        {/* IDX/MLS: Replace this presentational form with the approved provider adapter. */}
        <form className="idx-search" action="/search" onSubmit={trackSearch}>
          <label className="location-field"><span>Location</span><div><MapPin /><input name="location" placeholder="City, neighborhood, or ZIP" /></div></label>
          <label><span>Minimum price</span><select name="minPrice" defaultValue=""><option value="">No minimum</option><option value="300000">$300,000</option><option value="500000">$500,000</option><option value="750000">$750,000</option></select></label>
          <label><span>Maximum price</span><select name="maxPrice" defaultValue=""><option value="">No maximum</option><option value="500000">$500,000</option><option value="750000">$750,000</option><option value="1000000">$1,000,000</option></select></label>
          <label><span>Beds</span><select name="beds" defaultValue=""><option value="">Any</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label>
          <label><span>Baths</span><select name="baths" defaultValue=""><option value="">Any</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label>
          <button type="submit"><Search /> Request a Search</button>
        </form>
        <div className="search-options">
          <TrackedLink href="/communities" event={{ name: "cta_click", params: { cta_name: "Explore Communities", cta_location: "homepage-search", destination: "/communities" } }}><MapPin /> Explore Communities</TrackedLink>
          <TrackedLink href="/search?propertyType=New%20construction&newConstruction=true" event={{ name: "cta_click", params: { cta_name: "New Construction", cta_location: "homepage-search", destination: "/search?propertyType=New%20construction&newConstruction=true" } }}><Home /> New Construction</TrackedLink>
          <span>Your request is delivered directly to Akanksha.</span>
        </div>
      </div>
    </section>
  );
}
