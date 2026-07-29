"use client";

import { FormEvent, useState } from "react";
import { sellingTimelines } from "@/data/services";
import { ArrowRight } from "@/components/ui/icons";
import { submitLead } from "@/lib/leads/client";
import type { LeadErrors } from "@/lib/leads/types";

export function ValuationForm() {
  const [errors, setErrors] = useState<LeadErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      propertyAddress: String(form.get("propertyAddress") ?? "").trim(),
      sellingTimeline: String(form.get("sellingTimeline") ?? "").trim(),
      website: String(form.get("website") ?? "").trim(),
      consent: form.get("consent") === "on",
    };
    const nextErrors: LeadErrors = {};
    if (values.name.length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[+()\d\s.-]{7,}$/.test(values.phone)) nextErrors.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Please enter a valid email address.";
    if (values.propertyAddress.length < 6) nextErrors.propertyAddress = "Please enter the property address.";
    if (!values.sellingTimeline) nextErrors.sellingTimeline = "Please select a timeline.";
    if (!values.consent) nextErrors.consent = "Please confirm that Akanksha may respond.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    const response = await submitLead({ source: "home-value", ...values });
    setSubmitting(false);
    if (!response.ok) return setErrors(response.errors);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="valuation-success" role="status">
        <span>Request received</span>
        <h2>Thank you. Let&apos;s take the next step personally.</h2>
        <p>Your request was delivered. Akanksha can follow up using the contact details you provided.</p>
        <button type="button" className="button button-navy" onClick={() => setSubmitted(false)}>Submit another property</button>
      </div>
    );
  }

  return (
    <form className="valuation-form" onSubmit={submit} noValidate>
      <div className="form-field">
        <label htmlFor="valuation-name">Name</label>
        <input id="valuation-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="valuation-phone">Phone</label>
          <input id="valuation-phone" name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {errors.phone && <span id="phone-error" className="field-error">{errors.phone}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="valuation-email">Email</label>
          <input id="valuation-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="valuation-address">Property address</label>
        <input id="valuation-address" name="propertyAddress" autoComplete="street-address" placeholder="Street address, city, ZIP" aria-invalid={!!errors.propertyAddress} aria-describedby={errors.propertyAddress ? "address-error" : undefined} />
        {errors.propertyAddress && <span id="address-error" className="field-error">{errors.propertyAddress}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="valuation-timeline">Selling timeline</label>
        <select id="valuation-timeline" name="sellingTimeline" defaultValue="" aria-invalid={!!errors.sellingTimeline} aria-describedby={errors.sellingTimeline ? "timeline-error" : undefined}>
          <option value="" disabled>Select your timing</option>
          {sellingTimelines.map((timeline) => <option key={timeline}>{timeline}</option>)}
        </select>
        {errors.sellingTimeline && <span id="timeline-error" className="field-error">{errors.sellingTimeline}</span>}
      </div>
      <label className="lead-consent"><input type="checkbox" name="consent" /><span>Akanksha Tomar may contact me about this request.</span></label>
      {errors.consent && <span className="field-error">{errors.consent}</span>}
      <div className="lead-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {errors.form && <p className="form-error" role="alert">{errors.form}</p>}
      <button className="button button-gold" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Request my home value"} {!submitting && <ArrowRight />}</button>
      <p className="form-privacy">Your information will be used only to respond to your real estate request and will not be sold. This is not an automated appraisal or offer to purchase.</p>
    </form>
  );
}
