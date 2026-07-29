import Link from "next/link";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "gold",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "gold" | "navy" | "outline" | "light";
  className?: string;
}) {
  return (
    <Link className={`button button-${variant} ${className}`} href={href}>
      {children}
    </Link>
  );
}

