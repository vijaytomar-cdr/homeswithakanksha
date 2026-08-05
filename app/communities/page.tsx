import type { Metadata } from "next";
import { CommunityIndex } from "@/components/communities/community-index";
import { createSocialMetadata } from "@/lib/metadata";

const description = "Compare practical community guides across Greater Phoenix, including the West Valley, Central Valley, Northwest Valley, and East Valley.";

export const metadata: Metadata = {
  title: "Greater Phoenix Community Guides",
  description,
  alternates: { canonical: "/communities" },
  ...createSocialMetadata({ title: "Greater Phoenix Community Guides", description, path: "/communities", image: "/images/phoenix-neighborhood.jpg", imageAlt: "Greater Phoenix desert neighborhood representing the community guide collection", imageWidth: 1672, imageHeight: 941 }),
};

export default function CommunitiesPage() {
  return <CommunityIndex />;
}
