import Image from "next/image";
import Link from "next/link";
import { communityDetails } from "@/data/community-details";
import { getCommunityImage } from "@/data/communities";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

export function CommunityIndex() {
  return (
    <>
      <section className="communities-index-hero">
        <div className="container">
          <p className="eyebrow eyebrow-light">Explore Greater Phoenix</p>
          <h1>Find the community that fits <em>your next chapter.</em></h1>
          <p>Compare locations, housing patterns, recreation, everyday conveniences, and new-construction opportunities across fourteen Greater Phoenix communities.</p>
        </div>
      </section>
      <section className="section communities-index-section">
        <div className="container">
          <div className="communities-index-intro">
            <div><p className="eyebrow">Community guides</p><h2>Start with place. Then get property-specific.</h2></div>
            <p>These guides provide neutral orientation—not rankings. Once an area interests you, Akanksha can help you evaluate individual homes, routes, fees, and current availability.</p>
          </div>
          <div className="communities-index-grid">
            {communityDetails.map((community, index) => (
              <Link href={`/communities/${community.slug}`} key={community.slug}>
                <div>
                  <Image src={getCommunityImage(community.slug)} alt={`${community.name}, Arizona`} fill sizes="(max-width: 760px) 92vw, 31vw" style={{ objectPosition: community.imagePosition }} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p>{community.eyebrow}</p>
                <h3>{community.name}</h3>
                <span>{community.tagline}</span>
                <b>Explore {community.name} <ArrowUpRight /></b>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="communities-relocation">
        <div className="container">
          <div><p className="eyebrow eyebrow-light">Relocating to Arizona?</p><h2>Compare communities around your real life.</h2></div>
          <div><p>Work routes, regular destinations, housing preferences, and timing create a more useful shortlist than generic “best neighborhood” lists.</p><Link className="button button-gold" href="/contact">Plan Your Relocation <ArrowRight /></Link></div>
        </div>
      </section>
    </>
  );
}
