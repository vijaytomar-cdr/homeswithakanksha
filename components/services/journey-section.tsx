import type { JourneyStep } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";

export function JourneySection({
  eyebrow,
  title,
  description,
  steps,
}: {
  eyebrow: string;
  title: string;
  description: string;
  steps: JourneyStep[];
}) {
  return (
    <section className="section journey-section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <ol className="journey-grid">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{step.title}</h3><p>{step.description}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

