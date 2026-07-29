import type { LeadApiResponse, LeadAttribution, LeadPayload } from "./types";
import { trackEvent } from "@/lib/analytics/events";

const formStartedAt = new Date().toISOString();

function attribution(): LeadAttribution {
  const url = new URL(window.location.href);
  const storageKey = "akanksha_first_touch";
  const current: LeadAttribution = {
    landingPage: url.href,
    referrer: document.referrer || undefined,
    utmSource: url.searchParams.get("utm_source") || undefined,
    utmMedium: url.searchParams.get("utm_medium") || undefined,
    utmCampaign: url.searchParams.get("utm_campaign") || undefined,
    utmContent: url.searchParams.get("utm_content") || undefined,
    utmTerm: url.searchParams.get("utm_term") || undefined,
    gclid: url.searchParams.get("gclid") || undefined,
    fbclid: url.searchParams.get("fbclid") || undefined,
  };
  let firstTouch = current;
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) firstTouch = JSON.parse(saved) as LeadAttribution;
    else window.localStorage.setItem(storageKey, JSON.stringify(current));
  } catch {
    // Storage may be unavailable; current-touch attribution still submits.
  }
  return { ...firstTouch, conversionPage: url.href };
}

export async function submitLead(payload: Omit<LeadPayload, "attribution">): Promise<LeadApiResponse> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, formStartedAt, attribution: attribution() }),
    });
    const data = await response.json() as LeadApiResponse;
    if (!response.ok && data.ok) return { ok: false, errors: { form: "Unable to submit your request." } };
    if (data.ok) trackEvent({ name: "generate_lead", params: { lead_source: payload.source, lead_intent: payload.intent, crm_provider: data.receipt.provider } });
    return data;
  } catch {
    return { ok: false, errors: { form: "We couldn’t send your request. Please call, text, or try again." } };
  }
}
