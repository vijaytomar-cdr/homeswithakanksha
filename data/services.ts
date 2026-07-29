export type JourneyStep = {
  title: string;
  description: string;
};

export const buyerSteps: JourneyStep[] = [
  { title: "Buyer consultation", description: "Clarify your goals, timing, preferred areas, and what a comfortable move looks like." },
  { title: "Financing preparation", description: "Connect with a trusted lender and understand your budget before the search begins." },
  { title: "Home search", description: "Build a focused search and evaluate homes with context—not pressure." },
  { title: "New construction", description: "Compare communities, builder incentives, timelines, and contract considerations." },
  { title: "Offer strategy", description: "Review the property, market context, terms, and tradeoffs before writing an offer." },
  { title: "Inspection", description: "Navigate due diligence, inspection findings, and repair conversations with a clear plan." },
  { title: "Appraisal", description: "Stay informed through lender valuation and any next decisions the result may require." },
  { title: "Closing", description: "Move through final walkthrough, documents, and key handoff with every detail accounted for." },
];

export const buyerTypes = [
  "First-time buyers",
  "VA buyers",
  "FHA buyers",
  "Conventional buyers",
  "Investors",
  "Relocation clients",
];

export const sellerSteps: JourneyStep[] = [
  { title: "Pricing strategy", description: "Review your property, current competition, recent activity, and the positioning options available." },
  { title: "Property preparation", description: "Prioritize the updates and presentation details that support your goals and timeline." },
  { title: "Professional photography", description: "Prepare a polished visual presentation designed to make a strong first impression." },
  { title: "Marketing plan", description: "Create a coordinated launch across property marketing, digital channels, and buyer outreach." },
  { title: "MLS exposure", description: "Prepare accurate property details for broad distribution when a live MLS connection is established." },
  { title: "Social media marketing", description: "Extend the property story through thoughtful, platform-appropriate short-form content." },
  { title: "Open houses", description: "Use in-person opportunities strategically, with organized feedback and follow-up." },
  { title: "Negotiation", description: "Compare more than price—terms, financing, timing, and risk all shape a strong offer." },
  { title: "Closing", description: "Coordinate deadlines, documents, walkthrough, and handoff through the final day." },
];

export const sellerPrinciples = [
  "Thoughtful positioning",
  "Clear communication",
  "Elevated presentation",
  "Careful negotiation",
];

export const sellingTimelines = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "Within 6–12 months",
  "Just exploring",
];

