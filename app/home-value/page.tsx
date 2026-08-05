import type { Metadata } from "next";
import { ValuationForm } from "@/components/services/valuation-form";
import { createSocialMetadata } from "@/lib/metadata";

const description = "Request a personalized conversation about your Greater Phoenix property, selling timeline, and current market position.";

export const metadata: Metadata = {
  title: "Greater Phoenix Home Valuation",
  description,
  alternates: { canonical: "/home-value" },
  ...createSocialMetadata({ title: "Greater Phoenix Home Valuation", description, path: "/home-value", image: "/images/blog/arizona-closing-costs.jpg", imageAlt: "Keys, property plans, and a calculator representing an Arizona home-value consultation", imageWidth: 1672, imageHeight: 941 }),
};

export default function HomeValuePage() {
  return (
    <section className="valuation-page">
      <div className="container valuation-grid">
        <div className="valuation-copy">
          <p className="eyebrow eyebrow-light">Personalized home valuation</p>
          <h1>Understand your home&apos;s position in <em>today&apos;s market.</em></h1>
          <p>Online estimates can be a starting point. A useful pricing conversation considers your property, its condition, nearby competition, recent activity, and your timing.</p>
          <div className="valuation-points">
            <div><span>01</span><p><strong>Your property</strong>Share the address and the context that makes your home distinct.</p></div>
            <div><span>02</span><p><strong>Your timing</strong>Discuss how your goals and preferred timeline shape the plan.</p></div>
            <div><span>03</span><p><strong>Your options</strong>Review thoughtful next steps without pressure or inflated promises.</p></div>
          </div>
          <p className="valuation-note">This request is for a personalized real estate consultation and is not an appraisal.</p>
        </div>
        <div className="valuation-form-wrap">
          <p className="form-kicker">Tell me about your property</p>
          <h2>Let&apos;s begin with a few details.</h2>
          <ValuationForm />
        </div>
      </div>
    </section>
  );
}
