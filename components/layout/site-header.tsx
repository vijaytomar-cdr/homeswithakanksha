"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation } from "@/data/site";
import { Close, Menu } from "@/components/ui/icons";
import { TrackedLink } from "@/components/analytics/tracked-link";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Akanksha Tomar home">
          <span className="brand-name">Akanksha Tomar</span>
          <span className="brand-meta">REALTOR® <i /> eXp Realty</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <TrackedLink className="header-cta" href="/home-value" event={{ name: "cta_click", params: { cta_name: "Home Valuation", cta_location: "desktop-header", destination: "/home-value" } }}>Home Valuation</TrackedLink>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <TrackedLink className="button button-gold" href="/home-value" onClick={() => setOpen(false)} event={{ name: "cta_click", params: { cta_name: "Home Valuation", cta_location: "mobile-menu", destination: "/home-value" } }}>
            Home Valuation
          </TrackedLink>
        </nav>
      )}
    </header>
  );
}
