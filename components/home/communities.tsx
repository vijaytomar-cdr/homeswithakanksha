import Image from "next/image";
import Link from "next/link";
import { getCommunityImage, homepageCommunities } from "@/data/communities";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

export function Communities() {
  return (
    <section className="section communities-section">
      <div className="container">
        <div className="section-heading-row">
          <SectionHeading eyebrow="Explore the Valley" title="Find your place in Greater Phoenix." description="From established neighborhoods to growing communities, each part of the Valley offers a different way to live." />
          <Link className="view-all" href="/communities">View all communities <ArrowRight /></Link>
        </div>
        <div className="communities-grid">
          {homepageCommunities.map((community, index) => (
            <Link className={`community-card community-${index + 1}`} href={`/communities/${community.slug}`} key={community.slug}>
              <Image
                src={getCommunityImage(community.slug)}
                alt={`${community.name}, Arizona`}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                style={{ objectPosition: community.imagePosition }}
              />
              <span className="community-shade" />
              <div><p>{community.eyebrow}</p><h3>{community.name}</h3><span>Explore community <ArrowUpRight /></span></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
