"use client";

import { FormEvent, useState } from "react";
import { askPrompts } from "@/data/homepage";
import { ArrowRight } from "@/components/ui/icons";
import { submitLead } from "@/lib/leads/client";
import type { LeadErrors } from "@/lib/leads/types";

export function AskForm({ showPrompts = true }: { showPrompts?: boolean }) {
  const [prompt, setPrompt] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<LeadErrors>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    const response = await submitLead({
      source: "ask-akanksha",
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: prompt,
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
      intent: "General Question",
    });
    setSubmitting(false);
    if (!response.ok) return setErrors(response.errors);
    setErrors({});
    setSent(true);
  }

  if (sent) return <div className="panel-success"><strong>Thanks for reaching out.</strong><p>Your question was delivered. It may also help shape a future Ask Akanksha topic, without using your identity or details publicly.</p></div>;

  return (
    <>
      {showPrompts && <div className="prompt-list">{askPrompts.map((item) => <button type="button" key={item} onClick={() => setPrompt(item)}>{item}<ArrowRight /></button>)}</div>}
      <form className="ask-form" onSubmit={submit}>
        <label><span>Name</span><input name="name" autoComplete="name" aria-invalid={!!errors.name} /></label>
        {errors.name && <span className="field-error">{errors.name}</span>}
        <label><span>Your question</span><textarea required value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Tell me what you’re thinking about..." /></label>
        {errors.message && <span className="field-error">{errors.message}</span>}
        <label><span>Email</span><input name="email" type="email" required autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} /></label>
        {errors.email && <span className="field-error">{errors.email}</span>}
        <label className="lead-consent"><input type="checkbox" name="consent" /><span>Akanksha may contact me about this question.</span></label>
        {errors.consent && <span className="field-error">{errors.consent}</span>}
        <div className="lead-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        {errors.form && <p className="form-error" role="alert">{errors.form}</p>}
        <button className="button button-gold" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send my question"} {!submitting && <ArrowRight />}</button>
      </form>
    </>
  );
}
