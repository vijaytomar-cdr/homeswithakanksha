import type { LeadPayload, LeadReceipt } from "@/lib/leads/types";

export interface CrmProvider {
  readonly name: string;
  readonly isLive: boolean;
  createLead(payload: LeadPayload): Promise<LeadReceipt>;
}

