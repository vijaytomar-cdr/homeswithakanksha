export type ListingStatus = "live";
export type PropertyType = "Single family" | "Townhome" | "Condominium" | "New construction";
export type SearchView = "grid" | "map";
export type SortOption = "recommended" | "price-asc" | "price-desc" | "newest";

export type Listing = {
  id: string;
  status: ListingStatus;
  title: string;
  city: string;
  state: "AZ";
  zip: string;
  price: number;
  beds: number;
  baths: number;
  squareFeet: number;
  propertyType: PropertyType;
  newConstruction: boolean;
  image: string;
  imagePosition: string;
  coordinates: { lat: number; lng: number };
  attribution: string;
};

export type ListingSearchQuery = {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  propertyType?: PropertyType;
  newConstruction?: boolean;
  view: SearchView;
  sort: SortOption;
  page: number;
  pageSize: number;
};

export type ListingSearchResult = {
  listings: Listing[];
  total: number;
  page: number;
  pageSize: number;
  source: "idx";
  sourceLabel: string;
  lastUpdated?: string;
};

export interface IdxProvider {
  readonly name: string;
  readonly isLive: boolean;
  search(query: ListingSearchQuery): Promise<ListingSearchResult>;
}
