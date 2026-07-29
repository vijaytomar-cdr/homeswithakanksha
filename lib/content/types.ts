import type { ContentItem, ContentSeries } from "@/data/content-series";

export interface ContentProvider {
  readonly name: string;
  getSeries(): Promise<ContentSeries[]>;
  getSeriesBySlug(slug: string): Promise<ContentSeries | undefined>;
  getItems(seriesSlug?: string): Promise<ContentItem[]>;
}

