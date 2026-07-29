import type { Metadata } from "next";
import { CommunityIndex } from "@/components/communities/community-index";

export const metadata: Metadata = {
  title: "Greater Phoenix Community Guides",
  description: "Explore neutral, practical guides to Peoria, Surprise, Glendale, Sun City, Sun City West, Scottsdale, Goodyear, Buckeye, and Avondale.",
  alternates: { canonical: "/communities" },
};

export default function CommunitiesPage() {
  return <CommunityIndex />;
}

