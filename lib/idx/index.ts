import type { IdxProvider, ListingSearchQuery, PropertyType, SearchView, SortOption } from "./types";

export type RawSearchParams = Record<string, string | string[] | undefined>;

const propertyTypes: PropertyType[] = ["Single family", "Townhome", "Condominium", "New construction"];
const sortOptions: SortOption[] = ["recommended", "price-asc", "price-desc", "newest"];

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function positiveNumber(value: string | undefined) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export function parseListingQuery(params: RawSearchParams): ListingSearchQuery {
  const propertyType = first(params.propertyType);
  const sort = first(params.sort);
  const view = first(params.view);
  return {
    location: first(params.location)?.trim() || undefined,
    minPrice: positiveNumber(first(params.minPrice)),
    maxPrice: positiveNumber(first(params.maxPrice)),
    beds: positiveNumber(first(params.beds)),
    baths: positiveNumber(first(params.baths)),
    propertyType: propertyTypes.includes(propertyType as PropertyType) ? propertyType as PropertyType : undefined,
    newConstruction: first(params.type) === "new-construction" || first(params.newConstruction) === "true",
    view: view === "map" ? "map" : "grid" as SearchView,
    sort: sortOptions.includes(sort as SortOption) ? sort as SortOption : "recommended",
    page: positiveNumber(first(params.page)) ?? 1,
    pageSize: 12,
  };
}

/**
 * IDX provider factory.
 *
 * Add the approved vendor adapter here after credentials are issued. Validate
 * server-only variables and never expose IDX secrets through NEXT_PUBLIC_*.
 */
export function getIdxProvider(): IdxProvider {
  throw new Error("An approved IDX provider has not been configured.");
}

export type { IdxProvider, Listing, ListingSearchQuery, ListingSearchResult } from "./types";
