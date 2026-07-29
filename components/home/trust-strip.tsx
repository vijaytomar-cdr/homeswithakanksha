import { trustItems } from "@/data/homepage";

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Service commitments">
      <div className="container trust-grid">
        {trustItems.map((item, index) => (
          <div key={item}><span>0{index + 1}</span><p>{item}</p></div>
        ))}
      </div>
    </section>
  );
}

