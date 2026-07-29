export type ConsentPreferences = {
  version: 1;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export type AnalyticsEvent =
  | { name: "generate_lead"; params: { lead_source: string; lead_intent?: string; crm_provider: string } }
  | { name: "view_search_results"; params: { search_location?: string; result_count: number; new_construction: boolean } }
  | { name: "search"; params: { search_term?: string; min_price?: number; max_price?: number } }
  | { name: "page_view"; params: { page_location: string; page_path: string; page_title: string } }
  | { name: "contact_click"; params: { method: "call" | "text" | "email" } };

