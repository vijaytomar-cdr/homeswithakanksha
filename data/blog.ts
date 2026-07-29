import { fullArticleContent } from "@/data/blog-content";

export type ArticleSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type ArticleSource = {
  label: string;
  url: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Buying" | "Relocation" | "Communities" | "New Construction" | "Market Education";
  series: string;
  author: string;
  publishDate: string;
  updatedDate?: string;
  readingTime: string;
  featuredImage: string;
  imagePosition: string;
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  status: "published";
  sections: ArticleSection[];
  sources: ArticleSource[];
  reviewedDate: string;
};

const shared = {
  author: "Akanksha Tomar",
  publishDate: "2026-07-27",
  readingTime: "6 min read",
  featuredImage: "/images/phoenix-neighborhood.jpg",
  status: "published" as const,
};

const blogPostDrafts = [
  {
    ...shared,
    slug: "best-neighborhoods-in-surprise-az",
    featuredImage: "/images/blog/surprise-neighborhoods.jpg",
    title: "Best Neighborhoods in Surprise, AZ",
    excerpt: "A ranking-free framework for comparing Surprise neighborhoods around your routes, housing preferences, and everyday priorities.",
    category: "Communities",
    series: "Neighborhood Spotlight",
    imagePosition: "34% 54%",
    seoTitle: "Surprise AZ Neighborhood Guide",
    seoDescription: "Compare Surprise, Arizona neighborhoods using location, housing, amenities, fees, and development considerations.",
    canonicalPath: "/blog/best-neighborhoods-in-surprise-az",
    sections: [
      { heading: "Start with your daily map", body: "The most useful neighborhood shortlist begins with the places you expect to visit regularly. Map work, healthcare, family, recreation, and airport routes before comparing individual homes." },
      { heading: "Compare the property and the community", body: "Home age, lot location, association structure, nearby development, and access to major roads can vary across Surprise.", bullets: ["Home type and construction era", "Association fees and community amenities", "Current and planned nearby development", "Exact route to regular destinations"] },
      { heading: "Turn a shortlist into a search", body: "Once two or three areas stand out, compare active inventory and visit at different times. No neighborhood is universally best; the right fit depends on the property and your goals." },
    ],
  },
  {
    ...shared,
    slug: "buying-your-first-home-in-arizona",
    featuredImage: "/images/blog/first-home-arizona.jpg",
    title: "Buying Your First Home in Arizona",
    excerpt: "A practical overview of financing preparation, the home search, offers, inspections, appraisal, and closing.",
    category: "Buying",
    series: "Home Buying Tips",
    imagePosition: "14% 66%",
    seoTitle: "First-Time Home Buyer Guide for Arizona",
    seoDescription: "Understand the major steps in buying your first Arizona home, from financing preparation through closing.",
    canonicalPath: "/blog/buying-your-first-home-in-arizona",
    sections: [
      { heading: "Prepare before opening listing apps", body: "A lender conversation helps define a comfortable range and explains how cash, credit, loan type, taxes, insurance, and monthly costs work together." },
      { heading: "Search with a complete budget", body: "Look beyond the list price. Association fees, utility patterns, insurance, maintenance, and planned improvements all influence the ownership picture.", bullets: ["Purchase funds and reserves", "Estimated monthly payment", "Association and special district costs", "Likely maintenance priorities"] },
      { heading: "Protect time for due diligence", body: "Arizona contracts contain important deadlines. Your agent, lender, inspectors, and title team each support a different part of the transaction, but the decisions remain yours." },
    ],
  },
  {
    ...shared,
    slug: "arizona-closing-costs-explained",
    featuredImage: "/images/blog/arizona-closing-costs.jpg",
    title: "Arizona Closing Costs Explained",
    excerpt: "A plain-language look at common buyer and seller closing-cost categories without pretending every transaction is the same.",
    category: "Market Education",
    series: "Ask Akanksha",
    imagePosition: "53% 68%",
    seoTitle: "Arizona Real Estate Closing Costs Explained",
    seoDescription: "Learn the common categories of Arizona buyer and seller closing costs and why exact amounts vary by transaction.",
    canonicalPath: "/blog/arizona-closing-costs-explained",
    sections: [
      { heading: "Closing costs are transaction-specific", body: "Loan program, price, negotiated terms, title arrangements, taxes, association requirements, and timing can all change the final figures." },
      { heading: "Common buyer-side categories", body: "Buyer costs may include lender charges, appraisal, inspection services, title-related items, prepaid expenses, insurance, and deposits.", bullets: ["Lender and appraisal items", "Inspection and due diligence services", "Title and escrow items", "Prepaids and reserves"] },
      { heading: "Review estimates early and often", body: "Ask for written estimates and compare them as the transaction develops. Your lender and escrow or title professionals provide the authoritative transaction figures." },
    ],
  },
  {
    ...shared,
    slug: "moving-to-phoenix",
    featuredImage: "/images/blog/moving-to-phoenix.jpg",
    title: "Moving to Phoenix",
    excerpt: "A relocation planning framework for comparing Greater Phoenix communities without relying on generic rankings.",
    category: "Relocation",
    series: "Moving to Arizona",
    imagePosition: "75% 60%",
    seoTitle: "Moving to Phoenix: Relocation Planning Guide",
    seoDescription: "Plan a Greater Phoenix relocation around routes, housing, climate, practical timing, and property-specific research.",
    canonicalPath: "/blog/moving-to-phoenix",
    sections: [
      { heading: "Greater Phoenix is a collection of distinct locations", body: "The metro area is geographically broad. City names alone do not explain travel patterns, housing age, development, or proximity to your regular destinations." },
      { heading: "Build a relocation scorecard", body: "Choose criteria before touring so each home is evaluated consistently.", bullets: ["Exact work and family routes", "Housing type and maintenance preference", "Access to regular services and recreation", "Timing, financing, and move logistics"] },
      { heading: "Verify from the address outward", body: "Test actual routes, review property disclosures, research official municipal information, and avoid assumptions based on neighborhood labels." },
    ],
  },
  {
    ...shared,
    slug: "sun-city-retirement-living",
    featuredImage: "/images/blog/sun-city-retirement.jpg",
    title: "Sun City Retirement Living",
    excerpt: "An objective introduction to housing, recreation, eligibility, fees, and property due diligence in Sun City.",
    category: "Communities",
    series: "Neighborhood Spotlight",
    imagePosition: "68% 54%",
    seoTitle: "Sun City AZ Community and Housing Guide",
    seoDescription: "Explore Sun City housing, recreation, age restrictions, community fees, and property-specific considerations.",
    canonicalPath: "/blog/sun-city-retirement-living",
    sections: [
      { heading: "Understand the community structure", body: "Sun City is age-restricted and has established recreation systems. Verify current eligibility, occupancy requirements, fees, and rules through official sources." },
      { heading: "Compare property types carefully", body: "Single-family, patio, attached, and condominium properties can have different responsibilities and association arrangements.", bullets: ["Ownership and association structure", "Renovation and property condition", "Recreation and other applicable fees", "Insurance and maintenance considerations"] },
      { heading: "Make the decision property-specific", body: "A community overview is only a starting point. Review recorded documents, inspections, costs, and the exact location before purchasing." },
    ],
  },
  {
    ...shared,
    slug: "buying-new-construction-arizona",
    featuredImage: "/images/blog/arizona-new-construction.jpg",
    title: "Things to Know Before Buying New Construction",
    excerpt: "A buyer-focused checklist for builder contracts, representation, incentives, options, timelines, and final walkthroughs.",
    category: "New Construction",
    series: "New Construction Watch",
    imagePosition: "28% 70%",
    seoTitle: "Buying New Construction in Arizona",
    seoDescription: "Prepare for an Arizona new-construction purchase by reviewing builder contracts, incentives, options, costs, and timelines.",
    canonicalPath: "/blog/buying-new-construction-arizona",
    sections: [
      { heading: "The builder representative works for the builder", body: "Independent buyer representation can help you understand questions to ask and decisions to examine. Registration rules may require your agent to accompany your first visit." },
      { heading: "Compare the complete price", body: "Base price rarely tells the whole story.", bullets: ["Lot premiums and structural options", "Design-center selections", "Landscaping, window coverings, and appliances", "Association and special district costs", "Financing incentive tradeoffs"] },
      { heading: "Expect a changing timeline", body: "Construction schedules can move. Plan rate-lock decisions, current housing, moving arrangements, inspections, and contingency options around the builder’s written terms." },
    ],
  },
  {
    ...shared,
    slug: "peoria-vs-surprise",
    featuredImage: "/images/blog/peoria-vs-surprise.jpg",
    title: "Peoria vs. Surprise",
    excerpt: "A neutral comparison of location patterns, housing, development, recreation, and daily routes in two Northwest Valley cities.",
    category: "Communities",
    series: "Peoria vs. Surprise",
    imagePosition: "44% 55%",
    seoTitle: "Peoria vs Surprise AZ: Community Comparison",
    seoDescription: "Compare Peoria and Surprise, Arizona around geography, housing, development, recreation, and your regular routes.",
    canonicalPath: "/blog/peoria-vs-surprise",
    sections: [
      { heading: "Compare subareas, not only city names", body: "Both cities cover varied geography. North Peoria differs from central Peoria, just as eastern Surprise differs from areas near Loop 303." },
      { heading: "Use the same criteria on both sides", body: "A consistent scorecard makes tradeoffs easier to see.", bullets: ["Exact travel routes", "Home age and property type", "New-construction availability", "Fees and community amenities", "Nearby services and recreation"] },
      { heading: "Let current inventory shape the final comparison", body: "The right choice may come down to individual properties and current availability rather than a broad preference for one city." },
    ],
  },
  {
    ...shared,
    slug: "goodyear-vs-buckeye",
    featuredImage: "/images/blog/goodyear-vs-buckeye.jpg",
    title: "Goodyear vs. Buckeye",
    excerpt: "Compare two Southwest and West Valley cities through routes, geography, housing, new construction, and development patterns.",
    category: "Communities",
    series: "Community Comparison",
    imagePosition: "61% 70%",
    seoTitle: "Goodyear vs Buckeye AZ: Community Comparison",
    seoDescription: "Compare Goodyear and Buckeye, Arizona based on exact location, housing, development, new construction, and regular routes.",
    canonicalPath: "/blog/goodyear-vs-buckeye",
    sections: [
      { heading: "Geography changes the answer", body: "Goodyear and Buckeye both cover broad areas. An exact address can be more informative than the city name when evaluating freeway access and everyday destinations." },
      { heading: "New construction deserves full-cost analysis", body: "Both markets may offer new homes, but builder terms and community costs vary.", bullets: ["Active phase and completion timing", "Lot, option, and design costs", "Association and special district fees", "Planned surrounding development"] },
      { heading: "Test the practical routine", body: "Drive likely routes, locate regular services, compare individual properties, and use current official information before narrowing the search." },
    ],
  },
  {
    ...shared,
    slug: "what-500k-buys-in-peoria",
    featuredImage: "/images/blog/what-500k-peoria.jpg",
    title: "How to Shop Around $500K in Peoria",
    excerpt: "A practical framework for comparing Peoria locations, property condition, fees, and ownership tradeoffs around a $500,000 target.",
    category: "Market Education",
    series: "What $500K Buys You",
    imagePosition: "17% 59%",
    seoTitle: "How to Shop Around $500K in Peoria AZ",
    seoDescription: "Evaluate Peoria homes around a $500,000 target using complete costs, location, condition, fees, and property-specific due diligence.",
    canonicalPath: "/blog/what-500k-buys-in-peoria",
    sections: [
      { heading: "Define the complete budget", body: "A list-price target is only one part of the decision. Compare financing, closing funds, taxes, insurance, association costs, maintenance, and reserves before choosing a comfortable search range." },
      { heading: "Compare Peoria by useful search zones", body: "Peoria extends from established areas near Loop 101 toward newer development near Lake Pleasant. Exact routes, construction era, fees, lot characteristics, and property condition can create different tradeoffs at the same price.", bullets: ["Exact daily routes", "Construction era and condition", "Home and lot characteristics", "Association and district costs", "Likely near-term improvements"] },
      { heading: "Make every comparison property-specific", body: "Use the same scorecard for each current option and verify availability, disclosures, inspections, governing documents, and complete costs before making a decision." },
    ],
  },
] satisfies Omit<BlogPost, "sources" | "reviewedDate">[];

export const blogPosts: BlogPost[] = blogPostDrafts.map((post) => ({
  ...post,
  ...fullArticleContent[post.slug],
  status: "published",
  reviewedDate: "2026-07-27",
}));

export const blogCategories = ["All", "Buying", "Relocation", "Communities", "New Construction", "Market Education"] as const;

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatPublishDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}
