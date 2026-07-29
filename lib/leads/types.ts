export type LeadSource = "home-search" | "ask-akanksha" | "home-value" | "contact";
export type LeadIntent = "Buying" | "Selling" | "Relocation" | "Investment" | "New Construction" | "General Question";

export type LeadAttribution = {
  landingPage?: string;
  conversionPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
};

export type LeadPayload = {
  source: LeadSource;
  name?: string;
  email?: string;
  phone?: string;
  intent?: LeadIntent;
  message?: string;
  propertyAddress?: string;
  sellingTimeline?: string;
  consent: boolean;
  attribution?: LeadAttribution;
  website?: string;
  formStartedAt?: string;
  consentRecordedAt?: string;
  consentPolicyVersion?: string;
};

export type LeadField = "name" | "email" | "phone" | "intent" | "message" | "propertyAddress" | "sellingTimeline" | "consent";
export type LeadErrors = Partial<Record<LeadField | "form", string>>;

export type LeadReceipt = {
  id: string;
  createdAt: string;
  provider: "mock" | "resend" | "hubspot" | "other";
};

export type LeadApiResponse =
  | { ok: true; receipt: LeadReceipt }
  | { ok: false; errors: LeadErrors };
