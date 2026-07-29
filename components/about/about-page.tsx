import Image from "next/image";
import Link from "next/link";
import { aboutContent } from "@/data/about";
import { ArrowRight } from "@/components/ui/icons";

export function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <nav aria-label="Breadcrumb" className="breadcrumbs">
              <Link href="/">Home</Link><span>/</span><span>About</span>
            </nav>
            <p className="eyebrow eyebrow-light">{aboutContent.eyebrow}</p>
            <h1>{aboutContent.title}</h1>
            <p>{aboutContent.introduction}</p>
            <Link className="button button-gold" href="/contact">
              Start a conversation <ArrowRight />
            </Link>
          </div>
          <div className="about-portrait">
            <Image
              src="/images/akanksha-navy-v2.jpg"
              alt="Akanksha Tomar, REALTOR®"
              fill
              priority
              sizes="(max-width: 760px) 92vw, 42vw"
            />
            <span>REALTOR® · eXp Realty | Kumler Group</span>
          </div>
        </div>
      </section>

      <section className="section about-intro">
        <div className="container about-intro-grid">
          <div>
            <p className="eyebrow">A thoughtful approach</p>
            <h2>Clarity before pressure.</h2>
          </div>
          <div>
            <p className="about-lede">{aboutContent.approach}</p>
            <p>{aboutContent.serviceArea}</p>
          </div>
        </div>
      </section>

      <section className="about-principles">
        <div className="container">
          <div className="about-principles-heading">
            <p className="eyebrow eyebrow-light">What you can expect</p>
            <h2>A steady process, centered on your decisions.</h2>
          </div>
          <div className="about-principles-grid">
            {aboutContent.principles.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-clients">
        <div className="container about-clients-grid">
          <div>
            <p className="eyebrow">Ways Akanksha can help</p>
            <h2>Guidance for different kinds of moves.</h2>
            <p>Every client and transaction is different. Support is tailored to the decisions, professionals, and due-diligence steps relevant to your situation.</p>
          </div>
          <div className="about-client-list">
            {aboutContent.clientTypes.map((clientType, index) => (
              <span key={clientType}><b>0{index + 1}</b>{clientType}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div>
            <p className="eyebrow eyebrow-light">Your next step</p>
            <h2>Tell Akanksha what you’re considering.</h2>
            <p>A relaxed first conversation can help turn broad questions into a practical next step.</p>
          </div>
          <Link className="button button-gold" href="/contact">
            Contact Akanksha <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
