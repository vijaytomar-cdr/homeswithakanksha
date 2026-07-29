import Link from "next/link";
import type { ContentSeries } from "@/data/content-series";
import { ArrowUpRight } from "@/components/ui/icons";

export function ContentSeriesCard({ series, index }: { series: ContentSeries; index: number }) {
  return (
    <Link className={`series-card series-${series.theme}`} href={`/resources/${series.slug}`}>
      <div><span>{String(index + 1).padStart(2, "0")}</span><b>{series.formats.join(" · ")}</b></div>
      <h2>{series.name}</h2>
      <p>{series.description}</p>
      <strong>Explore the series <ArrowUpRight /></strong>
    </Link>
  );
}

