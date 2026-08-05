import Image from "next/image";
import { clientTypes } from "@/data/homepage";
import { ArrowRight } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button-link";

export function MeetAkanksha() {
  return (
    <section className="meet-section">
      <div className="container meet-grid">
        <div className="meet-visual">
          <Image src="/images/akanksha-interior-v2.jpg" alt="Akanksha Tomar, REALTOR®" fill sizes="(max-width: 768px) 92vw, 42vw" />
          <span className="meet-initials">AT</span>
        </div>
        <div className="meet-copy">
          <p className="eyebrow">Meet Akanksha</p>
          <h2>Real estate is personal.<br /><em>Your guidance should be, too.</em></h2>
          <p className="meet-lede">Akanksha Tomar is a REALTOR® with eXp Realty | Kumler Group serving buyers and sellers throughout Greater Phoenix.</p>
          <p>Her approach is personal, patient, and responsive—focused on helping you understand your options and make confident decisions without pressure.</p>
          <div className="client-tags">{clientTypes.map((type) => <span key={type}>{type}</span>)}</div>
          <ButtonLink href="/about" variant="navy" tracking={{ name: "Get to know Akanksha", location: "homepage-about" }}>Get to know Akanksha <ArrowRight /></ButtonLink>
        </div>
      </div>
    </section>
  );
}
