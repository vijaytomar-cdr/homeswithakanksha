import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";
import { aboutPageSchema, serializeJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Akanksha Tomar | Greater Phoenix REALTOR®",
  description:
    "Meet Akanksha Tomar, a REALTOR® with eXp Realty | Kumler Group providing personal, patient real estate guidance across Greater Phoenix.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Akanksha Tomar",
    description:
      "Personal, patient real estate guidance for buyers and sellers throughout Greater Phoenix.",
    images: ["/images/akanksha-navy-v2.jpg"],
  },
};

export default function AboutRoute() {
  return (
    <>
      <AboutPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(aboutPageSchema) }}
      />
    </>
  );
}
