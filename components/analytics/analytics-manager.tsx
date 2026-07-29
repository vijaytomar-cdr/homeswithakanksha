"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { analyticsConfig } from "@/lib/analytics/config";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY, readConsent, saveConsent, trackEvent } from "@/lib/analytics/events";
import type { ConsentPreferences } from "@/lib/analytics/types";
import { Close } from "@/components/ui/icons";
import Link from "next/link";

function TrackingScripts({ consent }: { consent: ConsentPreferences }) {
  const googleEnabled = consent.analytics || consent.marketing;
  const googleId = analyticsConfig.ga4Id || analyticsConfig.googleAdsId;
  const consentState = useMemo(() => ({
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  }), [consent]);

  return (
    <>
      {googleEnabled && (
        <Script id="google-consent-bootstrap" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.gtag('consent','default',${JSON.stringify({ analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", wait_for_update: 500 })});window.gtag('consent','update',${JSON.stringify(consentState)});`}
        </Script>
      )}
      {googleEnabled && analyticsConfig.gtmId && (
        <>
          <Script id="gtm-start" strategy="afterInteractive">{`window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});`}</Script>
          <Script src={`https://www.googletagmanager.com/gtm.js?id=${analyticsConfig.gtmId}`} strategy="afterInteractive" />
        </>
      )}
      {googleEnabled && !analyticsConfig.gtmId && googleId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`} strategy="afterInteractive" />
          <Script id="google-tag-config" strategy="afterInteractive">
            {`${analyticsConfig.ga4Id ? `window.gtag('config','${analyticsConfig.ga4Id}',{send_page_view:false});` : ""}${analyticsConfig.googleAdsId ? `window.gtag('config','${analyticsConfig.googleAdsId}');` : ""}`}
          </Script>
        </>
      )}
      {consent.marketing && analyticsConfig.metaPixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${analyticsConfig.metaPixelId}');window.__metaLastPage=location.href;fbq('track','PageView');`}
          </Script>
        </>
      )}
    </>
  );
}

function PageViewTracker({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!enabled) return;
    const query = searchParams.toString();
    trackEvent({ name: "page_view", params: { page_location: window.location.href, page_path: query ? `${pathname}?${query}` : pathname, page_title: document.title } });
  }, [enabled, pathname, searchParams]);
  return null;
}

function ConsentUi({ consent }: { consent: ConsentPreferences | null }) {
  const [customizing, setCustomizing] = useState(false);
  const [manuallyOpen, setManuallyOpen] = useState(false);
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);
  const open = !consent || manuallyOpen;

  function apply(next: { analytics: boolean; marketing: boolean }) {
    const value = saveConsent(next);
    setAnalytics(value.analytics);
    setMarketing(value.marketing);
    setManuallyOpen(false);
    setCustomizing(false);
  }

  return (
    <>
      {!open && <button className="privacy-trigger" type="button" onClick={() => setManuallyOpen(true)}>Privacy choices</button>}
      {open && (
        <aside className="consent-panel" role="dialog" aria-modal="true" aria-labelledby="consent-title">
          <button type="button" className="consent-close" aria-label="Close privacy choices" onClick={() => consent && setManuallyOpen(false)} disabled={!consent}><Close /></button>
          <p className="eyebrow">Your privacy choices</p>
          <h2 id="consent-title">Choose how this site measures visits.</h2>
          <p>Essential storage supports forms and saved privacy choices. Optional analytics and advertising technologies stay off unless you allow them.</p>
          {customizing && (
            <div className="consent-options">
              <div><span><strong>Essential</strong><small>Forms, security, and preference storage</small></span><b>Always on</b></div>
              <label><span><strong>Analytics</strong><small>GA4 or approved site measurement</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></label>
              <label><span><strong>Advertising</strong><small>Google Ads and Meta conversion measurement</small></span><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} /></label>
            </div>
          )}
          <div className="consent-actions">
            {customizing ? <button type="button" onClick={() => apply({ analytics, marketing })}>Save choices</button> : <button type="button" onClick={() => setCustomizing(true)}>Customize</button>}
            <button type="button" onClick={() => apply({ analytics: false, marketing: false })}>Essential only</button>
            <button type="button" className="consent-accept" onClick={() => apply({ analytics: true, marketing: true })}>Accept all</button>
          </div>
          <small>Learn how information is handled in the <Link href="/privacy">privacy policy</Link>.</small>
        </aside>
      )}
    </>
  );
}

let cachedConsentRaw: string | null | undefined;
let cachedConsent: ConsentPreferences | null = null;

function getConsentSnapshot() {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
  if (raw === cachedConsentRaw) return cachedConsent;
  cachedConsentRaw = raw;
  cachedConsent = readConsent();
  return cachedConsent;
}

function subscribeConsent(callback: () => void) {
  const consentListener = () => callback();
  const storageListener = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) callback();
  };
  window.addEventListener(CONSENT_EVENT, consentListener);
  window.addEventListener("storage", storageListener);
  return () => {
    window.removeEventListener(CONSENT_EVENT, consentListener);
    window.removeEventListener("storage", storageListener);
  };
}

function AnalyticsManagerInner() {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, () => null);
  useEffect(() => {
    if (!consent) return;
    window.gtag?.("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
    window.fbq?.("consent", consent.marketing ? "grant" : "revoke");
  }, [consent]);

  return (
    <>
      {consent && <TrackingScripts consent={consent} />}
      <PageViewTracker enabled={Boolean(consent?.analytics)} />
      <ConsentUi consent={consent} />
    </>
  );
}

export function AnalyticsManager() {
  return <Suspense fallback={null}><AnalyticsManagerInner /></Suspense>;
}
