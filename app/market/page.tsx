import type { Metadata } from "next";
import { MarketOverview } from "@/components/market/market-overview";

export const metadata: Metadata = {
  title: "Greater Phoenix Market Data",
  description: "Compare sourced city-level housing market snapshots across 14 Greater Phoenix communities.",
  alternates: { canonical: "/market" },
};

export default function MarketPage() {
  return <MarketOverview />;
}
