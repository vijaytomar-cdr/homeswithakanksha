import type { Metadata } from "next";
import { MarketOverview } from "@/components/market/market-overview";
import { createSocialMetadata } from "@/lib/metadata";

const description = "Compare sourced city-level housing market snapshots across 17 Greater Phoenix communities.";

export const metadata: Metadata = {
  title: "Greater Phoenix Market Data",
  description,
  alternates: { canonical: "/market" },
  ...createSocialMetadata({ title: "Greater Phoenix Market Data", description, path: "/market", image: "/images/communities/phoenix.jpg", imageAlt: "Phoenix skyline representing sourced Greater Phoenix housing market data", imageWidth: 2048, imageHeight: 1500 }),
};

export default function MarketPage() {
  return <MarketOverview />;
}
