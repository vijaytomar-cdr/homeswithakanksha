import type { Metadata } from "next";
import { AskAkanksha } from "@/components/home/ask-akanksha";
import { Communities } from "@/components/home/communities";
import { Hero } from "@/components/home/hero";
import { HomeSearch } from "@/components/home/home-search";
import { LatestContent } from "@/components/home/latest-content";
import { MarketIntelligence } from "@/components/home/market-intelligence";
import { MeetAkanksha } from "@/components/home/meet-akanksha";
import { Reviews } from "@/components/home/reviews";
import { Services } from "@/components/home/services";
import { TrustStrip } from "@/components/home/trust-strip";

export const metadata: Metadata = {
  title: "Greater Phoenix REALTOR®",
  description: "Personal real estate guidance for buyers, sellers, and relocation clients across Greater Phoenix, Arizona.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <MeetAkanksha />
      <Communities />
      <HomeSearch />
      <MarketIntelligence />
      <Reviews />
      <LatestContent />
      <AskAkanksha />
    </>
  );
}

