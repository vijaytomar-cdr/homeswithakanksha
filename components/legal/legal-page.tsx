import Link from "next/link";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export function LegalPage({
  eyebrow,
  title,
  introduction,
  sections,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: LegalSection[];
}) {
  return (
    <article className="legal-page">
      <header className="legal-hero">
        <div className="container legal-hero-inner">
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{introduction}</p>
          <span>Last updated July 29, 2026</span>
        </div>
      </header>
      <div className="container legal-layout">
        <nav aria-label={`${title} sections`}>
          <strong>On this page</strong>
          {sections.map((section) => (
            <a key={section.heading} href={`#${section.heading.toLowerCase().replaceAll(" ", "-")}`}>
              {section.heading}
            </a>
          ))}
        </nav>
        <div className="legal-content">
          {sections.map((section) => (
            <section key={section.heading} id={section.heading.toLowerCase().replaceAll(" ", "-")}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
          <p className="legal-contact">
            Questions? <Link href="/contact">Contact Akanksha</Link>, email{" "}
            <a href="mailto:akanksha.azhomes@gmail.com">akanksha.azhomes@gmail.com</a>, or call{" "}
            <a href="tel:+12179791262">(217) 979-1262</a>.
          </p>
        </div>
      </div>
    </article>
  );
}
