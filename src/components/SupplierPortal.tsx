"use client";

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { productTypes } from "@/data/network";
import { formatUsd } from "@/lib/lot-settlement";

function redirectTo(path: string) {
  window.location.assign(path);
}

interface Account {
  companyName: string;
  contactName: string;
  email: string;
}

interface SupplierLot {
  id: string;
  reference: string;
  productType: string;
  estimatedWeightG: string;
  estimatedPurityPct: string;
  documentName: string | null;
  hasDocument: boolean;
  status: string;
  declineReason: string | null;
  finalWeightG: string | null;
  finalPurityPct: string | null;
  fineGrams: string | null;
  grossUsd: string | null;
  commissionUsd: string | null;
  assayFeeUsd: string | null;
  netUsd: string | null;
}

const statusLabel: Record<string, string> = {
  submitted: "Waiting for DCA",
  declined: "Declined",
  accepted: "Accepted onto the DCA book",
  assayed: "Assayed. Payout instruction is waiting for a second approval.",
  payout_approved: "Payout instruction approved. DCA sends the funds outside this portal.",
};

export default function SupplierPortal() {
  const [account, setAccount] = useState<Account | null>(null);
  const [lots, setLots] = useState<SupplierLot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [productType, setProductType] = useState<string>(productTypes[0]);
  const [weight, setWeight] = useState("");
  const [purity, setPurity] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [formKey, setFormKey] = useState(0);

  async function load() {
    try {
      const [meRes, lotsRes] = await Promise.all([
        fetch("/api/network/supplier/me"),
        fetch("/api/network/supplier/lots"),
      ]);
      if (!meRes.ok) {
        redirectTo("/network/supplier/login");
        return;
      }
      const meJson = await meRes.json();
      const lotsJson = await lotsRes.json();
      setAccount(meJson.data);
      if (lotsJson.success) setLots(lotsJson.data);
    } catch {
      setError("Failed to load your lots");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const pending = Promise.all([
      fetch("/api/network/supplier/me"),
      fetch("/api/network/supplier/lots"),
    ]);
    void pending
      .then(async ([meRes, lotsRes]) => {
        if (!meRes.ok) {
          redirectTo("/network/supplier/login");
          return;
        }
        const meJson = await meRes.json();
        const lotsJson = await lotsRes.json();
        setAccount(meJson.data);
        if (lotsJson.success) setLots(lotsJson.data);
      })
      .catch(() => setError("Failed to load your lots"))
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/network/supplier/logout", { method: "POST" });
    redirectTo("/network/supplier/login");
  }

  async function submitLot(event: React.FormEvent) {
    event.preventDefault();
    if (!document) {
      setError("Attach a permit, licence, or photo of the lot");
      return;
    }
    setSubmitting(true);
    setError("");
    setFeedback("");
    try {
      const body = new FormData();
      body.set("productType", productType);
      body.set("estimatedWeightG", weight);
      body.set("estimatedPurityPct", purity);
      body.set("document", document);
      const res = await fetch("/api/network/supplier/lots", { method: "POST", body });
      const json = await res.json();
      if (!json.success) {
        setError(json.error ?? "Failed to submit the lot");
        return;
      }
      setFeedback(`${json.data.reference} was offered to Diamond Capital Africa.`);
      setWeight("");
      setPurity("");
      setDocument(null);
      setFormKey((key) => key + 1);
      load();
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="py-16 text-center text-sm text-muted">Loading portal...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Sell to Diamond Capital Africa
          </p>
          <h1 className="text-2xl font-bold text-primary md:text-3xl">Offer a lot</h1>
          {account && (
            <p className="mt-1 text-sm text-muted">
              {account.companyName}. Buyers do not see your name or documents.
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

      <form onSubmit={submitLot} className="mb-10 space-y-4 rounded-lg border border-border bg-white p-6">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Product</span>
          <select
            value={productType}
            onChange={(event) => setProductType(event.target.value)}
            className="w-full rounded border border-border px-3 py-2"
          >
            {productTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Estimated weight (grams)</span>
          <input
            required
            inputMode="decimal"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            className="w-full rounded border border-border px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Estimated purity (%)</span>
          <input
            required
            inputMode="decimal"
            value={purity}
            onChange={(event) => setPurity(event.target.value)}
            className="w-full rounded border border-border px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Permit, licence, or lot photo</span>
          <input
            required
            key={formKey}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={(event) => setDocument(event.target.files?.[0] ?? null)}
            className="w-full text-sm"
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-gold px-4 py-2 text-sm font-semibold text-primary disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Offer this lot to DCA"}
        </button>
      </form>

      <h2 className="mb-4 text-lg font-bold text-primary">Your lots</h2>
      {lots.length === 0 ? (
        <p className="text-sm text-muted">You have not offered a lot yet.</p>
      ) : (
        <div className="space-y-4">
          {lots.map((lot) => (
            <article key={lot.id} className="rounded-lg border border-border bg-white p-5">
              <p className="font-semibold text-primary">{lot.reference}</p>
              <p className="mt-1 text-sm text-muted">
                {lot.productType} · {Number(lot.estimatedWeightG).toLocaleString()} g ·{" "}
                {lot.estimatedPurityPct}%
              </p>
              <p className="mt-2 text-sm">{statusLabel[lot.status] ?? lot.status}</p>
              {lot.declineReason && (
                <p className="mt-1 text-sm text-muted">Reason: {lot.declineReason}</p>
              )}
              {lot.netUsd && (
                <p className="mt-2 text-sm text-foreground">
                  Fine {lot.fineGrams} g · Gross {formatUsd(Number(lot.grossUsd))} · Commission{" "}
                  {formatUsd(Number(lot.commissionUsd))} · Assay {formatUsd(Number(lot.assayFeeUsd))} ·
                  Your net {formatUsd(Number(lot.netUsd))}
                </p>
              )}
              {lot.hasDocument && (
                <a
                  href={`/api/network/supplier/lots/${lot.id}/document`}
                  className="mt-2 inline-block text-sm font-semibold text-gold-dark underline"
                >
                  {lot.documentName || "Your document"}
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
