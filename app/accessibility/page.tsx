import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "The accessibility commitment and feedback process for Homes with Akanksha.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="A website designed to be usable"
      introduction="Homes with Akanksha is committed to providing a useful digital experience for visitors with a wide range of abilities and technologies."
      sections={[
        {
          heading: "Our approach",
          paragraphs: ["The site is built with semantic structure, keyboard navigation, visible focus states, text alternatives, responsive layouts, and form labels. Ongoing reviews use the Web Content Accessibility Guidelines as a practical reference."],
        },
        {
          heading: "Known limitations",
          paragraphs: ["Third-party listing, map, video, review, or scheduling tools may have accessibility behavior outside our direct control. Those integrations will be evaluated before launch and alternatives will be offered when practical."],
        },
        {
          heading: "Need assistance",
          paragraphs: ["If any page or feature is difficult to use, please identify the page, the task you were trying to complete, and the assistive technology or browser involved when comfortable doing so. Akanksha can provide the information by phone or email."],
        },
        {
          heading: "Ongoing improvement",
          paragraphs: ["Accessibility is treated as an ongoing practice. Feedback is reviewed as the website, content, and third-party services change."],
        },
      ]}
    />
  );
}
