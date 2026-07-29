export type ContentFormat = "Article" | "Short video" | "Market update" | "Q&A" | "Local guide" | "Client story";
export type ContentChannel = "Website" | "Instagram" | "YouTube" | "Facebook" | "TikTok" | "Google Business Profile";

export type ContentSeries = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  editorialPurpose: string;
  formats: ContentFormat[];
  channels: ContentChannel[];
  theme: "gold" | "sand" | "navy" | "clay";
};

export type ContentItem = {
  id: string;
  title: string;
  summary: string;
  seriesSlug: string;
  format: ContentFormat;
  channels: ContentChannel[];
  status: "published";
  href?: string;
  location?: string;
};

export const contentSeries: ContentSeries[] = [
  { slug: "what-500k-buys-you", name: "Shopping Around $500K", shortName: "$500K Buying Guide", description: "A practical framework for comparing location, condition, costs, and housing tradeoffs around a target budget.", editorialPurpose: "Help buyers turn a price target into a complete, property-specific comparison.", formats: ["Article"], channels: ["Website"], theme: "gold" },
  { slug: "community-comparisons", name: "Community Comparisons", shortName: "Community Comparisons", description: "Neutral, criteria-based comparisons of Greater Phoenix locations and housing patterns.", editorialPurpose: "Help relocation and local buyers build a shortlist around real routes and property preferences—not rankings.", formats: ["Article"], channels: ["Website"], theme: "sand" },
  { slug: "moving-to-arizona", name: "Moving to Arizona", shortName: "Moving to Arizona", description: "Practical relocation guidance for researching communities, planning logistics, and buying from out of state.", editorialPurpose: "Answer high-intent relocation questions with clear next steps and authoritative-source reminders.", formats: ["Article", "Local guide"], channels: ["Website"], theme: "navy" },
  { slug: "new-construction-watch", name: "New Construction Watch", shortName: "New Construction", description: "Builder questions, contract considerations, complete-cost planning, and due diligence.", editorialPurpose: "Help buyers approach new construction with independent representation and careful verification.", formats: ["Article"], channels: ["Website"], theme: "clay" },
  { slug: "neighborhood-spotlight", name: "Neighborhood Spotlight", shortName: "Neighborhoods", description: "Property-neutral introductions to local housing, routes, recreation, shopping, and development.", editorialPurpose: "Build local knowledge while avoiding demographic targeting, school rankings, and subjective safety claims.", formats: ["Article", "Local guide"], channels: ["Website"], theme: "gold" },
  { slug: "ask-akanksha", name: "Ask Akanksha", shortName: "Ask Akanksha", description: "Direct answers to common Arizona real-estate questions, shaped by what clients want to understand.", editorialPurpose: "Turn real questions into helpful educational content while routing personal advice to a human conversation.", formats: ["Q&A", "Article"], channels: ["Website"], theme: "sand" },
];

export const contentItems: ContentItem[] = [
  { id: "price-peoria-500", title: "How to Shop Around $500K in Peoria", summary: "Compare the complete budget, Peoria search zones, property condition, fees, and ownership tradeoffs.", seriesSlug: "what-500k-buys-you", format: "Article", channels: ["Website"], status: "published", href: "/blog/what-500k-buys-in-peoria", location: "Peoria" },
  { id: "compare-peoria-surprise", title: "Peoria vs. Surprise", summary: "Compare subareas, routes, housing, development, and property priorities using the same criteria.", seriesSlug: "community-comparisons", format: "Article", channels: ["Website"], status: "published", href: "/blog/peoria-vs-surprise", location: "Northwest Valley" },
  { id: "compare-goodyear-buckeye", title: "Goodyear vs. Buckeye", summary: "A geography-first comparison of two growing parts of the West Valley.", seriesSlug: "community-comparisons", format: "Article", channels: ["Website"], status: "published", href: "/blog/goodyear-vs-buckeye", location: "West Valley" },
  { id: "relocation-phoenix", title: "Moving to Phoenix: Build Your Shortlist", summary: "A relocation scorecard based on exact routes, housing preferences, and everyday needs.", seriesSlug: "moving-to-arizona", format: "Article", channels: ["Website"], status: "published", href: "/blog/moving-to-phoenix", location: "Greater Phoenix" },
  { id: "builder-first-visit", title: "Before Your First Builder Visit", summary: "Questions about representation, registration, incentives, and the complete purchase price.", seriesSlug: "new-construction-watch", format: "Article", channels: ["Website"], status: "published", href: "/blog/buying-new-construction-arizona", location: "Greater Phoenix" },
  { id: "spotlight-surprise", title: "Surprise Neighborhood Research Guide", summary: "A ranking-free process for comparing locations and individual properties.", seriesSlug: "neighborhood-spotlight", format: "Article", channels: ["Website"], status: "published", href: "/blog/best-neighborhoods-in-surprise-az", location: "Surprise" },
  { id: "spotlight-sun-city", title: "Understanding Sun City Housing", summary: "Eligibility, recreation structures, property types, fees, and due diligence.", seriesSlug: "neighborhood-spotlight", format: "Article", channels: ["Website"], status: "published", href: "/blog/sun-city-retirement-living", location: "Sun City" },
  { id: "ask-closing-costs", title: "What Are Arizona Closing Costs?", summary: "Common cost categories, why estimates vary, and which professionals provide authoritative figures.", seriesSlug: "ask-akanksha", format: "Q&A", channels: ["Website"], status: "published", href: "/blog/arizona-closing-costs-explained" },
];

export function getContentSeries(slug: string) {
  return contentSeries.find((series) => series.slug === slug);
}
