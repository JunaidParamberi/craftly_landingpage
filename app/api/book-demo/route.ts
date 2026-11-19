import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TEAM = new Set(["just_me", "2_5", "6_20", "21_plus"]);
const TEAM_LABEL: Record<string, string> = { just_me: "Just me", "2_5": "2–5", "6_20": "6–20", "21_plus": "21+" };

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const company = clean(body.company, 160);
  const teamSize = clean(body.teamSize, 20);
  const message = clean(body.message, 2000);

  if (!name) return NextResponse.json({ ok: false, field: "name", error: "Add your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return NextResponse.json({ ok: false, field: "email", error: "Add a valid email address." }, { status: 400 });
  if (teamSize && !TEAM.has(teamSize)) return NextResponse.json({ ok: false, field: "teamSize", error: "Pick a team size." }, { status: 400 });

  const row = { name, email, company: company || null, team_size: teamSize || null, message: message || null, source: "landing" };

  // 1) Save to Supabase (public key; RLS allows insert only).
  let saved = false;
  const url = process.env.DEMO_SUPABASE_URL;
  const key = process.env.DEMO_SUPABASE_KEY;
  if (url && key) {
    try {
      const r = await fetch(`${url}/rest/v1/demo_requests`, {
        method: "POST",
        headers: { apikey: key, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify(row),
        cache: "no-store",
      });
      saved = r.ok;
      if (!r.ok) console.error("demo_requests insert failed", r.status, await r.text());
    } catch (e) {
      console.error("demo_requests insert error", e);
    }
  }

  // 2) Email the team.
  let mailed = false;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.DEMO_NOTIFY_EMAIL;
  if (resendKey && to) {
    const lines = [
      ["Name", name],
      ["Email", email],
      ["Company", company || "—"],
      ["Team size", teamSize ? TEAM_LABEL[teamSize] : "—"],
      ["Message", message || "—"],
    ];
    const html = `<div style="font-family:Inter,Arial,sans-serif;font-size:14px;color:#0E1330">
      <h2 style="font-size:18px;margin:0 0 12px">New demo request</h2>
      <table cellpadding="6" style="border-collapse:collapse">${lines
        .map(([k, v]) => `<tr><td style="color:#6B7092;vertical-align:top">${k}</td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`)
        .join("")}</table>
      <p style="color:#6B7092;font-size:12px;margin-top:16px">Sent from the Book a demo form on craftlyai.app. Reply to this email to answer ${esc(name)} directly.</p></div>`;
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.DEMO_FROM_EMAIL || "CraftlyAI <hello@craftlyai.app>",
          to: to.split(",").map((s) => s.trim()).filter(Boolean),
          reply_to: email,
          subject: `Demo request: ${name}${company ? ` · ${company}` : ""}`,
          html,
          text: lines.map(([k, v]) => `${k}: ${v}`).join("\n"),
        }),
      });
      mailed = r.ok;
      if (!r.ok) console.error("resend failed", r.status, await r.text());
    } catch (e) {
      console.error("resend error", e);
    }
  }

  if (!saved && !mailed) {
    return NextResponse.json({ ok: false, error: "We couldn't send that just now. Please try again in a minute." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
