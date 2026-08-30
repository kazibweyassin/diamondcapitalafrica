"use client";

import { useEffect, useState } from "react";
import GoldSavingsDepositWizard from "./GoldSavingsDepositWizard";

type Dashboard = {
  customer: { name: string; email: string; phone: string | null };
  balanceGrams: number;
  creditedGrams: number;
  reservedGrams: number;
  deposits: Array<{ reference: string; amountUsd: string; grams: string; status: string; createdAt: string }>;
  redemptions: Array<{ reference: string; grams: string; method: string; collectionCentre: string | null; status: string; createdAt: string }>;
};

function formatBalanceKg(grams: number) {
  return `${(grams / 1000).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  })} kg`;
}

export default function GoldSavingsAccount() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [redemption, setRedemption] = useState({ grams: "20", method: "collection", collectionCentre: "Kampala" });

  async function load() {
    const res = await fetch("/api/gold-account/me");
    const json = await res.json();
    setDashboard(res.ok ? json.data : null);
    setLoading(false);
  }
  useEffect(() => {
    let active = true;
    fetch("/api/gold-account/me")
      .then(async (res) => ({ ok: res.ok, json: await res.json() }))
      .then(({ ok, json }) => { if (active) setDashboard(ok ? json.data : null); })
      .catch(() => { if (active) setDashboard(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function authenticate(e: React.FormEvent) {
    e.preventDefault(); setError("");
    const res = await fetch(`/api/gold-account/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const json = await res.json();
    if (!res.ok) return setError(json.error ?? "Request failed");
    await load();
  }

  async function logout() { await fetch("/api/gold-account/logout", { method: "POST" }); setDashboard(null); }

  async function requestRedemption(e: React.FormEvent) {
    e.preventDefault(); setError("");
    const res = await fetch("/api/gold-account/redemptions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(redemption) });
    const json = await res.json();
    if (!res.ok) return setError(json.error ?? "Request failed");
    await load();
  }

  if (loading) return <p className="py-10 text-sm text-muted">Loading Gold Savings…</p>;
  if (!dashboard) return (
    <div className="rounded-lg border border-border bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-bold text-primary">Gold Savings account</h2>
      <p className="mt-2 text-sm text-muted">Sign in to deposit, submit proof, view your verified balance, and request redemption.</p>
      {error && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      <form onSubmit={authenticate} className="mt-6 space-y-4">
        {mode === "register" && <><input required minLength={2} placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded border border-border px-4 py-3 text-sm" /><input required placeholder="Phone / WhatsApp" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded border border-border px-4 py-3 text-sm" /></>}
        <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded border border-border px-4 py-3 text-sm" />
        <input required type="password" minLength={mode === "register" ? 10 : 1} placeholder={mode === "register" ? "Password (at least 10 characters)" : "Password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded border border-border px-4 py-3 text-sm" />
        <button className="w-full rounded bg-gold px-5 py-3 text-sm font-semibold text-primary">{mode === "login" ? "Sign in" : "Create account"}</button>
      </form>
      <button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} className="mt-4 text-sm font-semibold text-gold-dark underline">{mode === "login" ? "Create a Gold Savings account" : "Already have an account? Sign in"}</button>
    </div>
  );

  return <div className="space-y-8">
    <div className="rounded-lg bg-primary p-6 text-white">
      <div className="flex items-start justify-between gap-4"><div><p className="text-sm text-white/70">Available balance</p><p className="text-3xl font-bold text-gold">{formatBalanceKg(dashboard.balanceGrams)}</p><p className="mt-1 text-xs text-white/60">Verified {formatBalanceKg(dashboard.creditedGrams)} · Reserved {formatBalanceKg(dashboard.reservedGrams)}</p></div><button onClick={logout} className="text-xs underline">Sign out</button></div>
    </div>
    {error && <p className="rounded bg-red-50 p-3 text-sm text-red-600">{error}</p>}
    <GoldSavingsDepositWizard customer={dashboard.customer} />
    <section className="rounded-lg border border-border bg-white p-6"><h2 className="font-bold text-primary">Transaction history</h2><div className="mt-4 space-y-3">{dashboard.deposits.length === 0 ? <p className="text-sm text-muted">No deposits yet.</p> : dashboard.deposits.map((item) => <div key={item.reference} className="flex flex-wrap justify-between gap-2 border-b border-border pb-3 text-sm"><span><strong>{item.reference}</strong><br /><span className="text-muted">{new Date(item.createdAt).toLocaleDateString("en-UG")}</span></span><span className="text-right">{Number(item.grams).toFixed(4)} g<br /><span className="capitalize text-muted">{item.status.replaceAll("_", " ")}</span></span></div>)}</div></section>
    <section className="rounded-lg border border-border bg-white p-6"><h2 className="font-bold text-primary">Request redemption</h2><p className="mt-1 text-sm text-muted">Minimum 20 g. Requests reserve the selected balance while DCA completes identity and availability checks.</p><form onSubmit={requestRedemption} className="mt-4 grid gap-3 sm:grid-cols-3"><input type="number" min="20" step="0.0001" value={redemption.grams} onChange={(e) => setRedemption({ ...redemption, grams: e.target.value })} className="rounded border border-border px-3 py-2 text-sm" /><select value={redemption.method} onChange={(e) => setRedemption({ ...redemption, method: e.target.value })} className="rounded border border-border px-3 py-2 text-sm"><option value="collection">Physical collection</option><option value="sell_back">Sell back</option></select>{redemption.method === "collection" && <select value={redemption.collectionCentre} onChange={(e) => setRedemption({ ...redemption, collectionCentre: e.target.value })} className="rounded border border-border px-3 py-2 text-sm"><option>Kampala</option><option>Arua</option></select>}<button className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white">Submit request</button></form><div className="mt-5 space-y-2">{dashboard.redemptions.map((item) => <p key={item.reference} className="text-sm"><strong>{item.reference}</strong> · {Number(item.grams).toFixed(4)} g · <span className="capitalize">{item.status}</span></p>)}</div></section>
  </div>;
}
