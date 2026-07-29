import Image from "next/image";
import Link from "next/link";
import type { CommunityDetail } from "@/data/community-details";
import { communityImageCredits, getCommunityImage } from "@/data/communities";
import { allMarketSnapshots, marketDataSource } from "@/data/market";
import { ArrowRight, Home, MapPin, Search } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { CommunityHero } from "./community-hero";

export function CommunityTemplate({ community }: { community: CommunityDetail }) {
  const imageCredit = communityImageCredits[community.slug];
  const market = allMarketSnapshots.find(({ slug }) => slug === community.slug);
  const localSections = [
    { number: "01", title: "Parks & recreation", body: community.parks },
    { number: "02", title: "Shopping & essentials", body: community.shopping },
    { number: "03", title: "Restaurants & dining", body: community.restaurants },
  ];

  return (
    <>
      <CommunityHero community={community} />

      <section className="section community-intro">
        <div className="container community-intro-grid">
          <div>
            <p className="eyebrow">Get oriented</p>
            <h2>A closer look at {community.name}.</h2>
          </div>
          <div>
            <p className="community-lede">{community.introduction}</p>
            <p>{community.lifestyle}</p>
          </div>
        </div>
      </section>

      <section className="community-housing">
        <div className="container community-housing-grid">
          <div className="community-housing-art">
            <Image src={getCommunityImage(community.slug)} alt={`${community.name}, Arizona`} fill sizes="(max-width: 760px) 92vw, 46vw" style={{ objectPosition: community.imagePosition }} />
            {imageCredit && <span>Photo: <a href={imageCredit.sourceUrl} target="_blank" rel="noreferrer">{imageCredit.photographer}</a> · <a href={imageCredit.licenseUrl} target="_blank" rel="noreferrer">{imageCredit.license}</a></span>}
          </div>
          <div>
            <p className="eyebrow">Housing overview</p>
            <h2>Homes and neighborhoods in {community.name}</h2>
            <p>{community.housing}</p>
            <h3>Areas to begin exploring</h3>
            <ul>{community.highlights.map((highlight) => <li key={highlight}><MapPin />{highlight}</li>)}</ul>
            <p className="housing-note">Neighborhood names are starting points, not rankings or endorsements. Property details and availability must be verified.</p>
          </div>
        </div>
      </section>

      <section className="section community-local">
        <div className="container">
          <SectionHeading eyebrow="Around town" title={`Everyday life in ${community.name}.`} description="Use these local touchpoints to begin mapping the places and routines that matter to your move." />
          <div className="community-local-grid">
            {localSections.map((section) => <article key={section.title}><span>{section.number}</span><h3>{section.title}</h3><p>{section.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="community-planning">
        <div className="container community-planning-grid">
          <article>
            <span><Home /></span>
            <p className="eyebrow eyebrow-light">New construction</p>
            <h2>Building new in and around {community.name}</h2>
            <p>{community.newConstruction}</p>
            <Link href="/buy">Explore buyer representation <ArrowRight /></Link>
          </article>
          <article>
            <span><MapPin /></span>
            <p className="eyebrow eyebrow-light">Location overview</p>
            <h2>Plan from the exact address.</h2>
            <p>{community.location}</p>
            <p className="planning-note">No commute times are quoted because traffic, route, and destination materially affect every trip.</p>
          </article>
        </div>
      </section>

      <section className="section community-market">
        <div className="container community-market-grid">
          <div>
            <p className="eyebrow">Market snapshot</p>
            <h2>{community.name} market context, without the guesswork.</h2>
            {market ? (
              <p>
                A recent, source-attributed city-level snapshot for all home types. These rolling figures provide orientation—not a valuation or substitute for property-specific analysis.
              </p>
            ) : (
              <p>No verified public city-level snapshot is currently available for this community.</p>
            )}
          </div>
          {market && (
            <div>
              <p className={`community-market-period data-${marketDataSource.freshness}`}>
                <span>{market.reportingPeriod}</span>
                <a href={market.sourceUrl} target="_blank" rel="noreferrer">View source <ArrowRight /></a>
              </p>
              <dl>
                <div><dt>Median sale price</dt><dd>{market.medianSalePrice}</dd></div>
                <div><dt>Price change</dt><dd>{market.medianSalePriceChange}</dd></div>
                <div><dt>Median days on market</dt><dd>{market.medianDaysOnMarket}</dd></div>
                <div><dt>Homes sold</dt><dd>{market.homesSold}</dd></div>
              </dl>
              <p className="community-market-source">
                Data provided by <a href={marketDataSource.url} target="_blank" rel="noreferrer">Redfin</a>. Figures may be revised and are not an ARMLS report. <a href={marketDataSource.methodologyUrl} target="_blank" rel="noreferrer">Methodology</a>.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="community-search-cta" id="community-search">
        <div className="container">
          <p className="eyebrow eyebrow-light">Current home search</p>
          <h2>Looking for a home in {community.name}?</h2>
          <p>Share your budget, timing, and property priorities. Akanksha can follow up with current options and help you refine the search.</p>
          <div><Link className="button button-gold" href={`/search?location=${encodeURIComponent(community.name)}`}><Search /> Request Current Options</Link><Link className="button button-outline" href="/contact">Ask a Question</Link></div>
          <span>Availability and property details are confirmed from current sources before being presented as active.</span>
        </div>
      </section>

      <section className="section community-faq">
        <div className="container community-faq-grid">
          <div><p className="eyebrow">Common questions</p><h2>Planning a move to {community.name}?</h2><p>Start with clear, property-specific questions and verify important details through authoritative sources.</p></div>
          <div>{community.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="community-contact" id="relocation">
        <div className="container community-contact-grid">
          <div className="community-agent-photo"><Image src="/images/akanksha-arizona-v2.jpg" alt="Akanksha Tomar, REALTOR®" fill sizes="(max-width: 760px) 92vw, 34vw" /></div>
          <div>
            <p className="eyebrow">Your Greater Phoenix guide</p>
            <h2>Let’s make {community.name} feel less unfamiliar.</h2>
            <p>Whether you’re nearby or planning from another state, Akanksha can help you compare locations, housing options, and practical next steps without pressure.</p>
            <div><Link className="button button-navy" href="/contact">Contact Akanksha <ArrowRight /></Link><Link className="community-contact-link" href="/buy">View the buying process</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
