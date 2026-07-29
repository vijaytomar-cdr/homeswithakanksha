import { contentItems, contentSeries, getContentSeries } from "@/data/content-series";
import type { ContentProvider } from "./types";

export class LocalContentProvider implements ContentProvider {
  readonly name = "Local typed content";
  async getSeries() { return contentSeries; }
  async getSeriesBySlug(slug: string) { return getContentSeries(slug); }
  async getItems(seriesSlug?: string) { return seriesSlug ? contentItems.filter((item) => item.seriesSlug === seriesSlug) : contentItems; }
}

