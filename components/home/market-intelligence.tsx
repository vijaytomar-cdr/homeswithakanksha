import Link from "next/link";
import { marketDataSource, marketSnapshots } from "@/data/market";
import { ArrowRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

export function MarketIntelligence() {
  const checkedLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Phoenix",
  }).format(new Date(marketDataSource.checkedAt));

  return (
    <section className="section market-section">
      <div className="container">
        <div className="section-heading-row">
          <SectionHeading eyebrow="Local perspective" title="What’s happening around Greater Phoenix?" description="A sourced view of recent sale prices, activity, and market time in three Greater Phoenix cities." />
          <span className={`data-pill data-${marketDataSource.freshness}`}>
            Data through <time dateTime={marketDataSource.updatedISO}>{marketDataSource.updatedLabel}</time>
          </span>
        </div>
        <div className="market-grid">
          {marketSnapshots.map((snapshot, index) => (
            <article className="market-card" key={snapshot.city}>
              <div className="market-card-head">
                <div><span>0{index + 1}</span><p>Community snapshot</p></div>
                <strong><time dateTime={snapshot.reportingPeriodISO}>{snapshot.reportingPeriod}</time></strong>
              </div>
              <h3>{snapshot.city}</h3>
              <dl>
                <div><dt>Median sale price</dt><dd>{snapshot.medianSalePrice}</dd></div>
                <div><dt>Price change</dt><dd>{snapshot.medianSalePriceChange}</dd></div>
                <div><dt>Median days on market</dt><dd>{snapshot.medianDaysOnMarket}</dd></div>
                <div><dt>Homes sold</dt><dd>{snapshot.homesSold}</dd></div>
              </dl>
              <div className="market-card-links">
                <Link href={`/communities/${snapshot.slug}`}>Explore {snapshot.city} <ArrowRight /></Link>
                <a href={snapshot.sourceUrl} target="_blank" rel="noreferrer">View source <ArrowRight /></a>
              </div>
            </article>
          ))}
        </div>
        <p className="data-note">
          Data provided by <a href={marketDataSource.url} target="_blank" rel="noreferrer">Redfin</a>, a national real estate brokerage, for all home types. Figures are rolling three-month city-level calculations based on MLS and/or public-record data and may be revised. Last checked <time dateTime={marketDataSource.checkedAt}>{checkedLabel}</time>. {marketDataSource.freshness === "stale" && "The source is older than expected and is being retained as the last verified snapshot. "}This is not an ARMLS report. <a href={marketDataSource.methodologyUrl} target="_blank" rel="noreferrer">Read the methodology.</a>
        </p>
        <Link className="market-all-link" href="/market">Compare all 14 communities <ArrowRight /></Link>
      </div>
    </section>
  );
}
