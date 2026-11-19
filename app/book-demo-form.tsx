"use client";
import React, { useState } from "react";
import "./book-demo-form.css";

const TEAM = [
  { v: "just_me", l: "Just me" },
  { v: "2_5", l: "2–5" },
  { v: "6_20", l: "6–20" },
  { v: "21_plus", l: "21+" },
];

type Errors = Partial<Record<"name" | "email" | "teamSize" | "form", string>>;

export default function BookDemoForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<Errors>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.email = "Add a valid email address.";
    setErr(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    try {
      const r = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, teamSize, message, website }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) setDone(true);
      else setErr(j.field ? { [j.field]: j.error } : { form: j.error || "That didn't go through. Try again in a minute." });
    } catch {
      setErr({ form: "No connection. Check your internet and try again." });
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="bd bd-done" role="status">
        <span className="bd-tick" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
        </span>
        <b>Request sent. Thanks, {name.trim().split(" ")[0]}.</b>
        <p>We'll email {email.trim()} within a day to pick a time that suits you.</p>
      </div>
    );
  }

  return (
    <form className="bd" onSubmit={submit} noValidate aria-label="Book a demo">
      <div className="bd-row">
        <label className="bd-f">
          <span>Your name</span>
          <input value={name} onChange={(e) => { setName(e.target.value); if (err.name) setErr({ ...err, name: undefined }); }} autoComplete="name" placeholder="Nadia Rahman" aria-invalid={!!err.name} />
          {err.name && <em>{err.name}</em>}
        </label>
        <label className="bd-f">
          <span>Work email</span>
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (err.email) setErr({ ...err, email: undefined }); }} autoComplete="email" placeholder="nadia@studio.com" aria-invalid={!!err.email} />
          {err.email && <em>{err.email}</em>}
        </label>
      </div>
      <label className="bd-f">
        <span>Company <i>optional</i></span>
        <input value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" placeholder="Studio Lumen" />
      </label>
      <fieldset className="bd-f bd-team">
        <legend>Team size</legend>
        <div className="bd-chips">
          {TEAM.map((t) => (
            <button type="button" key={t.v} className={"bd-chip" + (teamSize === t.v ? " on" : "")} aria-pressed={teamSize === t.v} onClick={() => setTeamSize(teamSize === t.v ? "" : t.v)}>
              {t.l}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="bd-f">
        <span>What should we show you? <i>optional</i></span>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} maxLength={2000} placeholder="e.g. quotes to invoices, chasing late payments, project profit" />
      </label>
      <label className="bd-hp" aria-hidden="true">
        Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </label>
      {err.form && <p className="bd-err" role="alert">{err.form}</p>}
      <button type="submit" className="bd-submit" disabled={busy}>
        {busy ? <span className="bd-spin" aria-hidden="true" /> : null}
        {busy ? "Sending…" : "Book my demo"}
      </button>
      <p className="bd-note">We only use your details to set up the demo.</p>
    </form>
  );
}
