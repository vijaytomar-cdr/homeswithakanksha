import { MockCrmProvider } from "./mock-provider";
import { ResendProvider } from "./resend-provider";
import type { CrmProvider } from "./types";

/**
 * CRM provider factory.
 *
 * Add a HubSpot or other vendor adapter implementing CrmProvider, validate its
 * server-only credentials, map consent and lifecycle fields, then select it here.
 * Never expose private CRM tokens through NEXT_PUBLIC_* variables.
 */
export function getCrmProvider(): CrmProvider {
  if (process.env.LEAD_DELIVERY_PROVIDER === "resend") return new ResendProvider();
  return new MockCrmProvider();
}

export type { CrmProvider } from "./types";
