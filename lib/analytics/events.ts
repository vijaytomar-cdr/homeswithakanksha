"use client";

import { analyticsConfig } from "./config";
import type { AnalyticsEvent, ConsentPreferences } from "./types";

export const CONSENT_STORAGE_KEY = "akanksha_privacy_preferences";
export const CONSENT_EVENT = "akanksha:consent-change";

export function readConsent(): ConsentPreferences | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value ? JSON.parse(value) as ConsentPreferences : null;
  } catch {
    return null;
  }
}

export function saveConsent(preferences: Omit<ConsentPreferences, "version" | "updatedAt">) {
  const value: ConsentPreferences = { version: 1, ...preferences, updatedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Preferences still apply for this page through the dispatched event.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  return value;
}

export function trackEvent(event: AnalyticsEvent) {
  const consent = readConsent();
  if (!consent) return;

  if (consent.analytics && window.gtag) {
    window.gtag("event", event.name, event.params);
  } else if (consent.analytics) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: event.name, ...event.params });
  }

  if (consent.marketing && window.fbq) {
    if (event.name === "generate_lead") window.fbq("track", "Lead", event.params);
    else if (event.name === "page_view" && window.__metaLastPage !== event.params.page_location) {
      window.__metaLastPage = event.params.page_location;
      window.fbq("track", "PageView");
    }
    else if (event.name === "search") window.fbq("track", "Search", event.params);
    else window.fbq("trackCustom", event.name, event.params);
  }

  if (consent.marketing && event.name === "generate_lead" && window.gtag && analyticsConfig.googleAdsId && analyticsConfig.googleAdsLeadLabel) {
    window.gtag("event", "conversion", { send_to: `${analyticsConfig.googleAdsId}/${analyticsConfig.googleAdsLeadLabel}` });
  }
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: {
      (...args: unknown[]): void;
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: Window["fbq"];
    __metaLastPage?: string;
  }
}
