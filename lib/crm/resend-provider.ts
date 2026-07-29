import type { CrmProvider } from "./types";
import type { LeadPayload, LeadReceipt } from "@/lib/leads/types";

function line(label: string, value?: string) {
  return value ? `${label}: ${value}` : undefined;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export class ResendProvider implements CrmProvider {
  readonly name = "Resend email delivery";
  readonly isLive: boolean;

  constructor(
    private readonly apiKey = process.env.RESEND_API_KEY,
    private readonly from = process.env.CONTACT_FROM_EMAIL,
    private readonly to = process.env.CONTACT_TO_EMAIL,
  ) {
    this.isLive = Boolean(apiKey && from && to);
  }

  async createLead(payload: LeadPayload): Promise<LeadReceipt> {
    if (!this.apiKey || !this.from || !this.to) throw new Error("Resend is not configured");

    const details = [
      line("Name", payload.name),
      line("Email", payload.email),
      line("Phone", payload.phone),
      line("Interest", payload.intent),
      line("Source form", payload.source),
      line("Property address", payload.propertyAddress),
      line("Selling timeline", payload.sellingTimeline),
      line("Message", payload.message),
      line("Conversion page", payload.attribution?.conversionPage),
      line("UTM source", payload.attribution?.utmSource),
      line("UTM campaign", payload.attribution?.utmCampaign),
      line("Consent recorded", payload.consentRecordedAt),
    ].filter((value): value is string => Boolean(value));

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `lead-${crypto.randomUUID()}`,
        "User-Agent": "HomesWithAkanksha/1.0",
      },
      body: JSON.stringify({
        from: this.from,
        to: [this.to],
        reply_to: payload.email,
        subject: `New website inquiry${payload.intent ? ` · ${payload.intent}` : ""}`,
        text: details.join("\n\n"),
        html: `<div style="font-family:Arial,sans-serif;color:#132631;line-height:1.6"><h1 style="color:#071d2d">New website inquiry</h1>${details.map((detail) => {
          const [label, ...value] = detail.split(": ");
          return `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value.join(": "))}</p>`;
        }).join("")}</div>`,
        tags: [
          { name: "source", value: payload.source.replaceAll("_", "-") },
          ...(payload.intent ? [{ name: "intent", value: payload.intent.toLowerCase().replaceAll(" ", "-") }] : []),
        ],
      }),
    });

    const result = await response.json() as { id?: string; message?: string };
    if (!response.ok || !result.id) throw new Error(result.message || "Email delivery failed");

    return {
      id: result.id,
      createdAt: new Date().toISOString(),
      provider: "resend",
    };
  }
}
