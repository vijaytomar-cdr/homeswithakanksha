"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/events";

export function TrackedDownloadLink({ href, fileName, children }: { href: string; fileName: string; children: ReactNode }) {
  return (
    <a
      className="button button-navy"
      href={href}
      download={fileName}
      onClick={() => trackEvent({ name: "file_download", params: { file_name: fileName, link_text: String(children), link_location: "resources-downloads" } })}
    >
      {children}
    </a>
  );
}
