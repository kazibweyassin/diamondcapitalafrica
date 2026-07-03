"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import VerificationBadge from "./VerificationBadge";

interface SupplyItem {
  id: string;
  reference: string;
  title: string;
  productType: string;
  purity: string | null;
  volumeEstimate: string;
  location: string;
  verificationLevel: number;
  assayRef: string | null;
  summary: string | null;
  supplierName: string;
  supplierLevel: number;
}

interface Account {
  companyName: string;
  contactName: string;
  email: string;
  membershipTier: string;
}

export default function NetworkPortal() {
  const [account, setAccount] = useState<Account | null>(null);
  const [supply, setSupply] = useState<SupplyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [quoteFor, setQuoteFor] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [meRes, supplyRes] = await Promise.all([
        fetch("/api/network/institutional/me"),
        fetch("/api/network/supply"),
      ]);

      if (!meRes.ok) {
        window.location.href = "/network/login";
        return;
      }

      const meJson = await meRes.json();
      const supplyJson = await supplyRes.json();
      setAccount(meJson.data);
      if (supplyJson.success) setSupply(supplyJson.data.supply);
    } catch {
      setError("Failed to load portal");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function logout() {
    await fetch("/api/network/institutional/logout", { method: "POST" });
    window.location.href = "/network/login";
  }

  async function submitQuote(supplyId: string) {
    setSubmitting(true);
    setFeedback("");
    setError("");
    try {
      const res = await fetch("/api/network/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ supplyId, message }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error ?? "Failed to submit");
        return;
      }
      setFeedback(`Quote request submitted (${json.data.reference}). DCA will respond shortly.`);
      setQuoteFor(null);
      setMessage("");
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <p className="py-16 text-center text-sm text-muted">Loading portal...</p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Verified Gold Exchange
          </p>
          <h1 className="text-2xl font-bold text-primary md:text-3xl">
            Institutional portal
          </h1>
          {account && (
            <p className="mt-1 text-sm text-muted">
              {account.companyName} · {account.membershipTier} membership
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-1 rounded border border-border px-4 py-2 text-sm font-medium transition hover:bg-section-alt"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>

      {feedback && (
        <p className="mb-6 rounded border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-primary">
          {feedback}
        </p>
      )}
      {error && (
        <p className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {supply.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-section-alt px-6 py-12 text-center">
          <p className="text-sm text-muted">
            No Level 3+ verified supply is published yet. Check back soon or{" "}
            <Link href="/contact" className="font-semibold text-gold-dark underline">
              contact DCA
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {supply.map((item) => (
            <article
              key={item.id}
              className="rounded-lg border border-border bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-primary">{item.title}</h2>
                <VerificationBadge level={item.verificationLevel} />
              </div>
              <dl className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Product</dt>
                  <dd className="font-medium">{item.productType}</dd>
                </div>
                {item.purity && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Purity</dt>
                    <dd className="font-medium">{item.purity}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Volume</dt>
                  <dd className="font-medium">{item.volumeEstimate}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Location</dt>
                  <dd className="font-medium">{item.location}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Supplier</dt>
                  <dd className="font-medium">{item.supplierName}</dd>
                </div>
                {item.assayRef && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Assay ref</dt>
                    <dd className="font-mono text-xs">{item.assayRef}</dd>
                  </div>
                )}
              </dl>
              {item.summary && (
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>
              )}
              {quoteFor === item.id ? (
                <div className="space-y-3 border-t border-border pt-4">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Describe your quote requirements (volume, delivery, settlement)..."
                    className="w-full rounded border border-border px-3 py-2 text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={submitting || message.length < 10}
                      onClick={() => submitQuote(item.id)}
                      className="rounded bg-gold px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gold-light disabled:opacity-50"
                    >
                      {submitting ? "Sending..." : "Submit quote request"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuoteFor(null)}
                      className="rounded border border-border px-4 py-2 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setQuoteFor(item.id)}
                  className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Request quote
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}