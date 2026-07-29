import { Home, MapPin, Search } from "@/components/ui/icons";
import Link from "next/link";

export function HomeSearch() {
  return (
    <section className="search-section" id="search-homes">
      <div className="container">
        <div className="search-intro">
          <div><p className="eyebrow eyebrow-light">Your search starts here</p><h2>Explore homes across<br /><em>Greater Phoenix.</em></h2></div>
          <p>Share a few starting criteria and Akanksha can prepare current options around your priorities.</p>
        </div>
        {/* IDX/MLS: Replace this presentational form with the approved provider adapter. */}
        <form className="idx-search" action="/search">
          <label className="location-field"><span>Location</span><div><MapPin /><input name="location" placeholder="City, neighborhood, or ZIP" /></div></label>
          <label><span>Minimum price</span><select name="minPrice" defaultValue=""><option value="">No minimum</option><option value="300000">$300,000</option><option value="500000">$500,000</option><option value="750000">$750,000</option></select></label>
          <label><span>Maximum price</span><select name="maxPrice" defaultValue=""><option value="">No maximum</option><option value="500000">$500,000</option><option value="750000">$750,000</option><option value="1000000">$1,000,000</option></select></label>
          <label><span>Beds</span><select name="beds" defaultValue=""><option value="">Any</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label>
          <label><span>Baths</span><select name="baths" defaultValue=""><option value="">Any</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label>
          <button type="submit"><Search /> Request a Search</button>
        </form>
        <div className="search-options">
          <Link href="/communities"><MapPin /> Explore Communities</Link>
          <Link href="/search?propertyType=New%20construction&newConstruction=true"><Home /> New Construction</Link>
          <span>Your request is delivered directly to Akanksha.</span>
        </div>
      </div>
    </section>
  );
}
