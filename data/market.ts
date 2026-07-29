import snapshot from "@/data/generated/market-snapshot.json";

export type MarketSnapshot = {
  city: string;
  slug: string;
  reportingPeriod: string;
  reportingPeriodISO: string;
  medianSalePrice: string;
  medianSalePriceChange: string;
  medianDaysOnMarket: string;
  homesSold: string;
  sourceUrl: string;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

function formatChange(value: number) {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${Math.abs(value).toFixed(Math.abs(value) < 1 ? 2 : 1)}% YoY`;
}

function sourceUrl(redfinId: number, slug: string) {
  return `https://www.redfin.com/city/${redfinId}/AZ/${slug}/housing-market`;
}

export const allMarketSnapshots: MarketSnapshot[] = snapshot.markets.map((market) => ({
  city: market.city,
  slug: market.slug,
  reportingPeriod: snapshot.metadata.reportingPeriod,
  reportingPeriodISO: snapshot.metadata.reportingPeriodISO,
  medianSalePrice: currency.format(market.medianSalePrice),
  medianSalePriceChange: formatChange(market.medianSalePriceChange),
  medianDaysOnMarket: `${integer.format(market.medianDaysOnMarket)} days`,
  homesSold: integer.format(market.homesSold),
  sourceUrl: sourceUrl(market.redfinId, market.slug),
}));

const homepageCities = new Set(["Peoria", "Surprise", "Scottsdale"]);
export const marketSnapshots = allMarketSnapshots.filter(({ city }) => homepageCities.has(city));

export const marketDataSource = {
  name: snapshot.metadata.sourceName,
  url: snapshot.metadata.sourcePageUrl,
  dataUrl: snapshot.metadata.sourceDataUrl,
  methodologyUrl: snapshot.metadata.methodologyUrl,
  updatedLabel: snapshot.metadata.reportingPeriod.replace("3 months ending ", ""),
  updatedISO: snapshot.metadata.reportingPeriodISO,
  checkedAt: snapshot.metadata.checkedAt,
  sourceLastUpdated: snapshot.metadata.sourceLastUpdated,
  freshness: snapshot.metadata.freshness as "current" | "stale",
} as const;
