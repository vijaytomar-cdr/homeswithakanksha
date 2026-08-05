"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/events";

export function TrackedContactLink({ href, method, location, children, className }: { href: string; method: "call" | "text" | "email"; location?: string; children: ReactNode; className?: string }) {
  return <a href={href} className={className} onClick={() => trackEvent({ name: "contact_click", params: { method, link_location: location } })}>{children}</a>;
}
