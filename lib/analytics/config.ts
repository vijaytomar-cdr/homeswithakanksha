export const analyticsConfig = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
  googleAdsLeadLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
} as const;

export const analyticsConfigured = Boolean(
  analyticsConfig.ga4Id || analyticsConfig.googleAdsId || analyticsConfig.gtmId || analyticsConfig.metaPixelId,
);

