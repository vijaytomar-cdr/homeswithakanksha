import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type SocialMetadataInput = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export function createSocialMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
}: SocialMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Homes with Akanksha",
      url: path,
      title,
      description,
      images: [{ url: image, width: imageWidth, height: imageHeight, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: imageAlt }],
      creator: siteConfig.name,
    },
  };
}
