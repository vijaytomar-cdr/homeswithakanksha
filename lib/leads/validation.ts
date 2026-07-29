import type { LeadErrors, LeadPayload, LeadSource } from "./types";

const sources: LeadSource[] = ["home-search", "ask-akanksha", "home-value", "contact"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s.-]{7,}$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : undefined;
}

export function validateLead(input: unknown): { data?: LeadPayload; errors: LeadErrors; spam: boolean } {
  if (!input || typeof input !== "object") return { errors: { form: "Invalid request." }, spam: false };
  const raw = input as Record<string, unknown>;
  const source = clean(raw.source, 40) as LeadSource;
  const data: LeadPayload = {
    source,
    name: clean(raw.name, 100),
    email: clean(raw.email, 160)?.toLowerCase(),
    phone: clean(raw.phone, 40),
    intent: clean(raw.intent, 40) as LeadPayload["intent"],
    message: clean(raw.message, 3000),
    propertyAddress: clean(raw.propertyAddress, 250),
    sellingTimeline: clean(raw.sellingTimeline, 100),
    consent: raw.consent === true,
    website: clean(raw.website, 200),
    formStartedAt: clean(raw.formStartedAt, 40),
    attribution: raw.attribution && typeof raw.attribution === "object"
      ? Object.fromEntries(Object.entries(raw.attribution as Record<string, unknown>).map(([key, value]) => [key, clean(value, 500)])) as LeadPayload["attribution"]
      : undefined,
  };
  const errors: LeadErrors = {};

  if (!sources.includes(source)) errors.form = "Unknown lead source.";
  if (!data.name || data.name.length < 2) errors.name = "Please enter your name.";
  if (!data.email || !emailPattern.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.phone && !phonePattern.test(data.phone)) errors.phone = "Please enter a valid phone number.";
  if (!data.consent) errors.consent = "Please confirm that Akanksha may respond to your request.";

  if (source === "home-value") {
    if (!data.phone) errors.phone = "Please enter your phone number.";
    if (!data.propertyAddress || data.propertyAddress.length < 6) errors.propertyAddress = "Please enter the property address.";
    if (!data.sellingTimeline) errors.sellingTimeline = "Please select a selling timeline.";
    data.intent = "Selling";
  }
  if (source === "ask-akanksha" && (!data.message || data.message.length < 8)) errors.message = "Please add a little more detail to your question.";
  if (source === "contact" && !data.intent) errors.intent = "Please select what you are interested in.";

  const startedAt = data.formStartedAt ? Date.parse(data.formStartedAt) : Number.NaN;
  const implausiblyFast = Number.isFinite(startedAt) && Date.now() - startedAt < 1_200;
  return { data: Object.keys(errors).length ? undefined : data, errors, spam: Boolean(data.website) || implausiblyFast };
}
