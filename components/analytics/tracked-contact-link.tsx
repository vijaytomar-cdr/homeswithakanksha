"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/events";

export function TrackedContactLink({ href, method, children, className }: { href: string; method: "call" | "text" | "email"; children: ReactNode; className?: string }) {
  return <a href={href} className={className} onClick={() => trackEvent({ name: "contact_click", params: { method } })}>{children}</a>;
}

