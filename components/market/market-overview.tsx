import Link from "next/link";
import { allMarketSnapshots, marketDataSource } from "@/data/market";
import { ArrowRight } from "@/components/ui/icons";

export function MarketOverview() {
  return (
    <>
      <header className="market-page-hero">
        <div className="container">
          <p className="eyebrow eyebrow-light">Greater Phoenix market data</p>
          <h1>One clear view across 14 local communities.</h1>
          <p>Compare recent city-level sale prices, activity, and market time before exploring the details that matter for your move.</p>
        </div>
      </header>
      <section className="section market-page-section">
        <div className="container">
          <div className="market-page-heading">
            <div>
              <p className="eyebrow">Current reporting period</p>
              <h2>{allMarketSnapshots[0]?.reportingPeriod}</h2>
            </div>
            <span className={`data-pill data-${marketDataSource.freshness}`}>Verified public data</span>
          </div>
          <div className="market-overview-grid">
            {allMarketSnapshots.map((market) => (
              <article key={market.slug}>
                <div>
                  <p>Community snapshot</p>
                  <h3>{market.city}</h3>
                </div>
                <dl>
                  <div><dt>Median sale price</dt><dd>{market.medianSalePrice}</dd></div>
                  <div><dt>Year over year</dt><dd>{market.medianSalePriceChange}</dd></div>
                  <div><dt>Median market time</dt><dd>{market.medianDaysOnMarket}</dd></div>
                  <div><dt>Homes sold</dt><dd>{market.homesSold}</dd></div>
                </dl>
                <footer>
                  <Link href={`/communities/${market.slug}`}>Explore {market.city} <ArrowRight /></Link>
                  <a href={market.sourceUrl} target="_blank" rel="noreferrer">Source <ArrowRight /></a>
                </footer>
              </article>
            ))}
          </div>
          <div className="market-methodology">
            <div>
              <p className="eyebrow">How to read this</p>
              <h2>Context, not a prediction.</h2>
            </div>
            <div>
              <p>Figures are rolling three-month, city-level calculations for all home types. A city-wide median does not estimate the value of a specific property or describe every neighborhood.</p>
              <p>Data comes from <a href={marketDataSource.url} target="_blank" rel="noreferrer">Redfin Data Center</a>, based on MLS and/or public-record data, and may be revised. This is not an ARMLS report. Review the <a href={marketDataSource.methodologyUrl} target="_blank" rel="noreferrer">source methodology</a>.</p>
              <p>The automated archive begins with the June 2026 reporting period and retains up to 36 monthly snapshots as new source releases become available.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
