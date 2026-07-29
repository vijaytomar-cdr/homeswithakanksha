import { reviews } from "@/data/homepage";
import { SectionHeading } from "@/components/ui/section-heading";

export function Reviews() {
  return (
    <section className="section reviews-section">
      <div className="container">
        <SectionHeading eyebrow="What to expect" title="A clear, personal way to move forward." align="center" description="These are Akanksha’s service commitments—not testimonials or performance claims." />
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <article className="review-card" key={review.quote}>
              <div className="review-stars" aria-hidden="true">0{index + 1}</div>
              <blockquote>“{review.quote}”</blockquote>
              <div className="review-author"><span>{review.name.charAt(0)}</span><p><strong>{review.name}</strong><small>{review.context}</small></p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
