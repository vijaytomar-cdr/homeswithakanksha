import Link from "next/link";
import type { ReactNode } from "react";
import { TrackedLink } from "@/components/analytics/tracked-link";

export function ButtonLink({
  href,
  children,
  variant = "gold",
  className = "",
  tracking,
}: {
  href: string;
  children: ReactNode;
  variant?: "gold" | "navy" | "outline" | "light";
  className?: string;
  tracking?: { name: string; location: string };
}) {
  if (tracking) {
    return (
      <TrackedLink className={`button button-${variant} ${className}`} href={href} event={{ name: "cta_click", params: { cta_name: tracking.name, cta_location: tracking.location, destination: href } }}>
        {children}
      </TrackedLink>
    );
  }
  return (
    <Link className={`button button-${variant} ${className}`} href={href}>
      {children}
    </Link>
  );
}
