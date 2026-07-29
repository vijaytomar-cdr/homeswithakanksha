"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { submitLead } from "@/lib/leads/client";
import type { LeadErrors, LeadIntent, LeadSource } from "@/lib/leads/types";

const interests: LeadIntent[] = ["Buying", "Selling", "Relocation", "Investment", "New Construction"];

export function ContactForm({ initialIntent, initialMessage, source = "contact" }: { initialIntent?: LeadIntent; initialMessage?: string; source?: LeadSource }) {
  const [errors, setErrors] = useState<LeadErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const feedbackRef = useRef<HTMLDivElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setErrors({});
    setSubmitting(true);
    const response = await submitLead({
      source,
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      intent: String(form.get("intent") ?? "") as LeadIntent,
      message: String(form.get("message") ?? ""),
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
    });
    setSubmitting(false);
    if (!response.ok) {
      setErrors(response.errors);
      requestAnimationFrame(() => feedbackRef.current?.focus());
      return;
    }
    setErrors({});
    setReceiptId(response.receipt.id);
  }

  if (receiptId) {
    return (
      <div className="contact-success" role="status">
        <span>Message received</span>
        <h2>Thank you for reaching out.</h2>
        <p>Your request was delivered. Akanksha can follow up using the contact details you provided.</p>
        <small>Reference: {receiptId}</small>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate aria-busy={submitting}>
      {Object.keys(errors).length > 0 && (
        <div className="form-feedback" role="alert" tabIndex={-1} ref={feedbackRef}>
          <strong>We couldn&apos;t send this yet.</strong>
          <p>{errors.form ?? "Please review the highlighted fields below and try again."}</p>
        </div>
      )}
      <div className="form-row">
        <div className="form-field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} />{errors.name && <span className="field-error" id="contact-name-error">{errors.name}</span>}</div>
        <div className="form-field"><label htmlFor="contact-phone">Phone</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "contact-phone-error" : undefined} />{errors.phone && <span className="field-error" id="contact-phone-error">{errors.phone}</span>}</div>
      </div>
      <div className="form-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} />{errors.email && <span className="field-error" id="contact-email-error">{errors.email}</span>}</div>
      <fieldset>
        <legend>I am interested in</legend>
        <div className="interest-options">{interests.map((interest) => <label key={interest}><input type="radio" name="intent" value={interest} defaultChecked={initialIntent === interest} /><span>{interest}</span></label>)}</div>
        {errors.intent && <span className="field-error">{errors.intent}</span>}
      </fieldset>
      <div className="form-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" defaultValue={initialMessage} placeholder="How can Akanksha help?" /></div>
      <label className="lead-consent"><input type="checkbox" name="consent" /><span>Akanksha Tomar may contact me about this real estate request.</span></label>
      {errors.consent && <span className="field-error">{errors.consent}</span>}
      <div className="lead-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="button button-gold" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send Message"} {!submitting && <ArrowRight />}</button>
      <p className="form-privacy">Your information will be used only to respond to your request and will not be sold. Submission does not create an agency relationship.</p>
    </form>
  );
}
