"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import VerificationBadge from "./VerificationBadge";
import { formatUsd } from "@/lib/lot-settlement";

function redirectTo(path: string) {
  window.location.assign(path);
}

interface SupplyItem {
  id: string;
  reference: string;
  title: string;
  productType: string;
  purity: string | null;
  volumeEstimate: string;
  location: string;
  verificationLevel: number;
  assayOnFile: boolean;
  summary: string | null;
  seller: string;
}

interface Account {
  companyName: string;
  contactName: string;
  email: string;
  membershipTier: string;
}

interface BuyerBid {
  id: string;
  reference: string;
  premiumPct: string;
  spotUsdPerOz: string;
  status: string;
}

interface BuyerLot {
  id: string;
  reference: string;
  productType: string;
  estimatedWeightG: string;
  estimatedPurityPct: string;
  status: string;
  seller: string;
  canBid: boolean;
  buyerGrossUsd: string | null;
  bids: BuyerBid[];
}

export default function NetworkPortal() {
  const [account, setAccount] = useState<Account | null>(null);
  const [supply, setSupply] = useState<SupplyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lots, setLots] = useState<BuyerLot[]>([]);
  const [premiums, setPremiums] = useState<Record<string, string>>({});
  const [quoteFor, setQuoteFor] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      const [meRes, supplyRes, lotsRes] = await Promise.all([
        fetch("/api/network/institutional/me"),
        fetch("/api/network/supply"),
        fetch("/api/network/lots"),
      ]);

      if (!meRes.ok) {
        redirectTo("/network/login");
        return;
      }

      const meJson = await meRes.json();
      const supplyJson = await supplyRes.json();
      const lotsJson = await lotsRes.json();
      setAccount(meJson.data);
      if (supplyJson.success) setSupply(supplyJson.data.supply);
      if (lotsJson.success) setLots(lotsJson.data);
    } catch {
      setError("Failed to load portal");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const pending = Promise.all([
      fetch("/api/network/institutional/me"),
      fetch("/api/network/supply"),
      fetch("/api/network/lots"),
    ]);
    void pending
      .then(async ([meRes, supplyRes, lotsRes]) => {
        if (!meRes.ok) {
          redirectTo("/network/login");
          return;
        }
        const meJson = await meRes.json();
        const supplyJson = await supplyRes.json();
        const lotsJson = await lotsRes.json();
        setAccount(meJson.data);
        if (supplyJson.success) setSupply(supplyJson.data.supply);
        if (lotsJson.success) setLots(lotsJson.data);
      })
      .catch(() => setError("Failed to load portal"))
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/network/institutional/logout", { method: "POST" });
    redirectTo("/network/login");
  }

  async function submitBid(lotId: string) {
    setSubmitting(true);
    setFeedback("");
    setError("");
    try {
      const res = await fetch(`/api/network/lots/${lotId}/bids`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ premiumPct: premiums[lotId] ?? "0" }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error ?? "Failed to place bid");
        return;
      }
      setFeedback(
        `Bid ${json.data.reference} is locked at $${Number(json.data.spotUsdPerOz).toLocaleString()} /oz, ${json.data.premiumPct}% to spot.`,
      );
      load();
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
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
      setFeedback(
        `Purchase request submitted (${json.data.reference}). DCA will quote this metal.`,
      );
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
            Buy from Diamond Capital Africa
          </p>
          <h1 className="text-2xl font-bold text-primary md:text-3xl">
            Institutional portal
          </h1>
          {account && (
            <p className="mt-1 text-sm text-muted">
              {account.companyName} · buying from DCA
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

      <section className="mb-12">
        <h2 className="mb-2 text-xl font-bold text-primary">Lots on the DCA book</h2>
        <p className="mb-6 text-sm text-muted">
          A bid is an offer to buy from Diamond Capital Africa. The spot price is
          locked when you submit it.
        </p>
        {lots.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border bg-section-alt px-6 py-8 text-sm text-muted">
            No lots are open for a bid right now.
          </p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {lots.map((lot) => (
              <article key={lot.id} className="rounded-lg border border-border bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-primary">{lot.reference}</h3>
                <dl className="my-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Product</dt>
                    <dd className="font-medium">{lot.productType}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Estimate</dt>
                    <dd className="font-medium">
                      {Number(lot.estimatedWeightG).toLocaleString()} g · {lot.estimatedPurityPct}%
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Seller</dt>
                    <dd className="font-medium">{lot.seller}</dd>
                  </div>
                </dl>
                {lot.bids.length > 0 && (
                  <ul className="mb-4 space-y-1 text-sm text-muted">
                    {lot.bids.map((bid) => (
                      <li key={bid.id}>
                        {bid.reference}: {bid.premiumPct}% locked at $
                        {Number(bid.spotUsdPerOz).toLocaleString()} /oz · {bid.status}
                      </li>
                    ))}
                  </ul>
                )}
                {lot.buyerGrossUsd && (
                  <p className="mb-4 text-sm font-medium text-primary">
                    Amount payable to DCA after assay: {formatUsd(Number(lot.buyerGrossUsd))}
                  </p>
                )}
                {lot.canBid && (
                  <form
                    className="flex flex-wrap items-end gap-2 border-t border-border pt-4"
                    onSubmit={(event) => {
                      event.preventDefault();
                      submitBid(lot.id);
                    }}
                  >
                    <label className="text-sm">
                      <span className="mb-1 block font-medium">Premium or discount %</span>
                      <input
                        required
                        inputMode="decimal"
                        value={premiums[lot.id] ?? "0"}
                        onChange={(event) =>
                          setPremiums({ ...premiums, [lot.id]: event.target.value })
                        }
                        className="w-32 rounded border border-border px-3 py-2"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Bid to DCA
                    </button>
                  </form>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <h2 className="mb-6 text-xl font-bold text-primary">Published supply</h2>
      {supply.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-section-alt px-6 py-12 text-center">
          <p className="text-sm text-muted">
            No DCA supply is open for purchase right now. Check back soon or{" "}
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
                  <dt className="text-muted">Region</dt>
                  <dd className="font-medium">{item.location}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Seller</dt>
                  <dd className="font-medium">{item.seller}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Assay</dt>
                  <dd className="font-medium">
                    {item.assayOnFile ? "On file with DCA" : "Arranged by DCA"}
                  </dd>
                </div>
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
                    placeholder="Volume, delivery (FOB Kampala, CIF Dubai, or escorted), and settlement. You are buying from Diamond Capital Africa."
                    className="w-full rounded border border-border px-3 py-2 text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={submitting || message.length < 10}
                      onClick={() => submitQuote(item.id)}
                      className="rounded bg-gold px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gold-light disabled:opacity-50"
                    >
                      {submitting ? "Sending..." : "Request purchase"}
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
                  Request to buy
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}