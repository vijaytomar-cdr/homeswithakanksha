"use client";

import { useState } from "react";
import { Close, Message } from "@/components/ui/icons";
import { AskForm } from "@/components/content/ask-form";

export function AskAkanksha() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="ask-fab" type="button" onClick={() => setOpen(true)}>
        <span><Message /></span><span><strong>Ask Akanksha</strong><small>About Arizona real estate</small></span>
      </button>
      {open && <div className="panel-backdrop" onMouseDown={() => setOpen(false)} />}
      <aside className={`ask-panel ${open ? "is-open" : ""}`} aria-hidden={!open} aria-label="Ask Akanksha contact panel">
        <button className="panel-close" type="button" onClick={() => setOpen(false)} aria-label="Close panel"><Close /></button>
        <p className="eyebrow">Start a conversation</p>
        <h2>What can I help you explore?</h2>
        <p>Choose a question or write your own. This opens a personal follow-up—not an AI chat.</p>
        <AskForm />
      </aside>
    </>
  );
}
