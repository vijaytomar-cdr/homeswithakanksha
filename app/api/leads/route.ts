import { NextResponse, type NextRequest } from "next/server";
import { getCrmProvider } from "@/lib/crm";
import { validateLead } from "@/lib/leads/validation";

const MAX_BODY_BYTES = 16_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const attempts = new Map<string, number[]>();

function rateLimited(request: NextRequest) {
  // Instance-local protection. Add an edge-backed limiter after the production
  // host is selected so limits can be shared across server instances.
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || request.headers.get("x-real-ip") || "unknown";
  const cutoff = Date.now() - RATE_WINDOW_MS;
  const recent = (attempts.get(key) ?? []).filter((time) => time > cutoff);
  recent.push(Date.now());
  attempts.set(key, recent);
  return recent.length > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  if (rateLimited(request)) {
    return NextResponse.json({ ok: false, errors: { form: "Too many attempts. Please wait a few minutes or call Akanksha at (217) 979-1262." } }, { status: 429 });
  }
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) return NextResponse.json({ ok: false, errors: { form: "Request is too large." } }, { status: 413 });

  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.nextUrl.host) {
    return NextResponse.json({ ok: false, errors: { form: "Invalid request origin." } }, { status: 403 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }

  const validation = validateLead(input);
  if (validation.spam) {
    return NextResponse.json({ ok: true, receipt: { id: `accepted_${crypto.randomUUID()}`, createdAt: new Date().toISOString(), provider: "mock" } });
  }
  if (!validation.data) return NextResponse.json({ ok: false, errors: validation.errors }, { status: 422 });

  try {
    const provider = getCrmProvider();
    if (!provider.isLive) {
      return NextResponse.json(
        { ok: false, errors: { form: "Online form delivery is being configured. Please call or text Akanksha at (217) 979-1262, or email akanksha.azhomes@gmail.com." } },
        { status: 503 },
      );
    }
    const receipt = await provider.createLead({
      ...validation.data,
      consentRecordedAt: new Date().toISOString(),
      consentPolicyVersion: "2026-07-29",
    });
    return NextResponse.json({ ok: true, receipt }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Your request could not be saved. Please call or try again." } }, { status: 502 });
  }
}
