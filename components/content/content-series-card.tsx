import type { ContentSeries } from "@/data/content-series";
import { ArrowUpRight } from "@/components/ui/icons";
import { TrackedLink } from "@/components/analytics/tracked-link";

export function ContentSeriesCard({ series, index }: { series: ContentSeries; index: number }) {
  return (
    <TrackedLink className={`series-card series-${series.theme}`} href={`/resources/${series.slug}`} event={{ name: "select_content", params: { content_type: "resource_series", item_id: series.slug, item_name: series.name, item_location: "resources-index" } }}>
      <div><span>{String(index + 1).padStart(2, "0")}</span><b>{series.formats.join(" · ")}</b></div>
      <h2>{series.name}</h2>
      <p>{series.description}</p>
      <strong>Explore the series <ArrowUpRight /></strong>
    </TrackedLink>
  );
}
