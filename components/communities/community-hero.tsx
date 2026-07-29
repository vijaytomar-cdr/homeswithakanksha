import Image from "next/image";
import Link from "next/link";
import type { CommunityDetail } from "@/data/community-details";
import { getCommunityImage } from "@/data/communities";
import { ArrowRight, MapPin } from "@/components/ui/icons";

export function CommunityHero({ community }: { community: CommunityDetail }) {
  return (
    <section className="community-hero">
      <Image
        src={getCommunityImage(community.slug)}
        alt={`${community.name}, Arizona`}
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: community.imagePosition }}
      />
      <div className="community-hero-shade" />
      <div className="container community-hero-content">
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          <Link href="/">Home</Link><span>/</span><Link href="/communities">Communities</Link><span>/</span><span>{community.name}</span>
        </nav>
        <p className="hero-location"><MapPin /> {community.eyebrow} · Arizona</p>
        <h1>Living in<br /><em>{community.name}</em></h1>
        <p>{community.tagline}</p>
        <div>
          <Link className="button button-gold" href="#community-search">Search {community.name} Homes <ArrowRight /></Link>
          <Link className="button button-outline" href="#relocation">Plan Your Move</Link>
        </div>
      </div>
    </section>
  );
}
