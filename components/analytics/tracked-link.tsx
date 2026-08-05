"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/events";
import type { AnalyticsEvent } from "@/lib/analytics/types";

export function TrackedLink({
  href,
  event,
  children,
  className,
  ariaLabel,
  onClick,
}: {
  href: string;
  event: AnalyticsEvent;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} className={className} aria-label={ariaLabel} onClick={() => { trackEvent(event); onClick?.(); }}>
      {children}
    </Link>
  );
}
