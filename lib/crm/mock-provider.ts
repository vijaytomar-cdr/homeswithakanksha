import type { CrmProvider } from "./types";
import type { LeadPayload, LeadReceipt } from "@/lib/leads/types";

export class MockCrmProvider implements CrmProvider {
  readonly name = "Mock CRM adapter";
  readonly isLive = false;

  async createLead(payload: LeadPayload): Promise<LeadReceipt> {
    const receipt: LeadReceipt = {
      id: `mock_${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
      provider: "mock",
    };
    // Deliberately avoid logging contact details or message content.
    console.info("Mock CRM accepted lead", { id: receipt.id, source: payload.source, intent: payload.intent });
    return receipt;
  }
}

