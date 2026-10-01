"use client";

import { useEffect, useState } from "react";
import { formatUsd, settleLot } from "@/lib/lot-settlement";

interface LotBid {
  id: string;
  reference: string;
  premiumPct: string;
  spotUsdPerOz: string;
  spotUsdPerG: string;
  spotSource: string;
  status: string;
  createdAt: string;
  buyer: string;
  buyerReference: string;
}

interface AdminLot {
  id: string;
  reference: string;
  productType: string;
  estimatedWeightG: string;
  estimatedPurityPct: string;
  documentName: string | null;
  hasDocument: boolean;
  status: string;
  declineReason: string | null;
  assayedByEmail: string | null;
  settledBidId: string | null;
  fineGrams: string | null;
  grossUsd: string | null;
  commissionUsd: string | null;
  assayFeeUsd: string | null;
  netUsd: string | null;
  premiumPct: string | null;
  payoutApprovedByEmail: string | null;
  supplier: { companyName: string; reference: string; email: string } | null;
  bids: LotBid[];
}

const statusLabel: Record<string, string> = {
  submitted: "Waiting for DCA",
  declined: "Declined",
  accepted: "On the DCA book",
  assayed: "Assay entered",
  payout_approved: "Payout instruction approved",
};

export default function LotAdminSection({ adminEmail }: { adminEmail: string }) {
  const [lots, setLots] = useState<AdminLot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [drafts, setDrafts] = useState<Record<string, { bidId: string; weight: string; purity: string }>>({});

  async function load() {
    try {
      const res = await fetch("/api/network/admin/lots");
      const json = await res.json();
      if (!json.success) {
        setError(json.error ?? "Failed to load lots");
        return;
      }
      setLots(json.data);
      setError("");
    } catch {
      setError("Failed to load lots");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const pending = fetch("/api/network/admin/lots");
    void pending
      .then(async (res) => {
        const json = await res.json();
        if (!json.success) {
          setError(json.error ?? "Failed to load lots");
          return;
        }
        setLots(json.data);
        setError("");
      })
      .catch(() => setError("Failed to load lots"))
      .finally(() => setLoading(false));
  }, []);

  async function act(id: string, body: Record<string, unknown>) {
    setError("");
    setMessage("");
    const res = await fetch(`/api/network/admin/lots/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!json.success) {
      setError(json.error ?? "Could not update the lot");
      return;
    }
    setMessage(`${json.data.reference} updated.`);
    load();
  }

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h3 className="font-bold text-primary">Lots offered to DCA</h3>
        <p className="mt-1 text-sm text-muted">
          Accept a lot onto the book, then enter the assay against one buyer bid.
          A different staff member approves the payout instruction. This screen
          does not send money.
        </p>
      </div>
      {message && (
        <p className="mx-6 mt-4 rounded border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-primary">
          {message}
        </p>
      )}
      {error && (
        <p className="mx-6 mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
      {loading && lots.length === 0 ? (
        <p className="px-6 py-8 text-sm text-muted">Loading lots...</p>
      ) : lots.length === 0 ? (
        <p className="px-6 py-8 text-sm text-muted">No lots yet.</p>
      ) : (
        <div className="divide-y divide-border">
          {lots.map((lot) => {
            const draft = drafts[lot.id] ?? {
              bidId: lot.bids.find((bid) => bid.status === "open")?.id ?? "",
              weight: lot.estimatedWeightG,
              purity: lot.estimatedPurityPct,
            };
            const bid = lot.bids.find((item) => item.id === draft.bidId);
            let preview: string | null = null;
            if (lot.status === "accepted" && bid) {
              try {
                const settlement = settleLot({
                  finalWeightG: Number(draft.weight),
                  finalPurityPct: Number(draft.purity),
                  spotUsdPerG: Number(bid.spotUsdPerG),
                  premiumPct: Number(bid.premiumPct),
                });
                preview = `Gross ${formatUsd(settlement.grossUsd)} · Commission ${formatUsd(settlement.commissionUsd)} · Assay ${formatUsd(settlement.assayFeeUsd)} · Supplier net ${formatUsd(settlement.netUsd)}`;
              } catch (err) {
                preview = err instanceof Error ? err.message : "Check the assay figures";
              }
            }
            const sameAdmin = lot.assayedByEmail === adminEmail;

            return (
              <article key={lot.id} className="px-6 py-5">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {lot.reference}{" "}
                      <span className="text-xs font-normal text-muted">
                        {statusLabel[lot.status] ?? lot.status}
                      </span>
                    </p>
                    <p className="text-sm text-muted">
                      {lot.supplier?.companyName} ({lot.supplier?.reference}) · {lot.productType}
                    </p>
                  </div>
                  {lot.hasDocument && (
                    <a
                      href={`/api/network/admin/lots/${lot.id}/document`}
                      className="text-sm font-semibold text-gold-dark underline"
                    >
                      {lot.documentName || "Document"}
                    </a>
                  )}
                </div>
                <p className="mb-3 text-sm text-muted">
                  Estimate {Number(lot.estimatedWeightG).toLocaleString()} g at{" "}
                  {lot.estimatedPurityPct}% 
                </p>
                {lot.declineReason && (
                  <p className="mb-3 text-sm text-muted">Reason: {lot.declineReason}</p>
                )}
                {lot.bids.length > 0 && (
                  <ul className="mb-3 space-y-1 text-sm">
                    {lot.bids.map((item) => (
                      <li key={item.id} className="text-muted">
                        {item.buyer} ({item.buyerReference}) · {item.premiumPct}% to spot · locked{" "}
                        ${Number(item.spotUsdPerOz).toLocaleString()} /oz · {item.status}
                      </li>
                    ))}
                  </ul>
                )}
                {lot.status === "submitted" && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => act(lot.id, { action: "accept" })}
                      className="rounded bg-gold px-3 py-1.5 text-xs font-semibold text-primary"
                    >
                      Accept onto DCA book
                    </button>
                    <button
                      type="button"
                      onClick={() => act(lot.id, { action: "decline" })}
                      className="rounded border border-border px-3 py-1.5 text-xs"
                    >
                      Decline
                    </button>
                  </div>
                )}
                {lot.status === "accepted" && (
                  <form
                    className="grid gap-3 border-t border-border pt-3 md:grid-cols-4"
                    onSubmit={(event) => {
                      event.preventDefault();
                      act(lot.id, {
                        action: "assay",
                        bidId: draft.bidId,
                        finalWeightG: Number(draft.weight),
                        finalPurityPct: Number(draft.purity),
                      });
                    }}
                  >
                    <label className="block text-sm md:col-span-2">
                      <span className="mb-1 block font-medium">Bid to settle</span>
                      <select
                        required
                        value={draft.bidId}
                        onChange={(event) =>
                          setDrafts({ ...drafts, [lot.id]: { ...draft, bidId: event.target.value } })
                        }
                        className="w-full rounded border border-border px-3 py-2"
                      >
                        <option value="">Select a bid</option>
                        {lot.bids
                          .filter((item) => item.status === "open")
                          .map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.buyer} · {item.premiumPct}%
                            </option>
                          ))}
                      </select>
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium">Final grams</span>
                      <input
                        required
                        inputMode="decimal"
                        value={draft.weight}
                        onChange={(event) =>
                          setDrafts({ ...drafts, [lot.id]: { ...draft, weight: event.target.value } })
                        }
                        className="w-full rounded border border-border px-3 py-2"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium">Final purity %</span>
                      <input
                        required
                        inputMode="decimal"
                        value={draft.purity}
                        onChange={(event) =>
                          setDrafts({ ...drafts, [lot.id]: { ...draft, purity: event.target.value } })
                        }
                        className="w-full rounded border border-border px-3 py-2"
                      />
                    </label>
                    {preview && (
                      <p className="text-sm text-muted md:col-span-4">{preview}</p>
                    )}
                    <button
                      type="submit"
                      className="rounded bg-primary px-3 py-2 text-xs font-semibold text-white md:col-span-4 md:w-fit"
                    >
                      Save assay
                    </button>
                  </form>
                )}
                {(lot.status === "assayed" || lot.status === "payout_approved") && (
                  <div className="border-t border-border pt-3 text-sm">
                    <p className="text-foreground">
                      Fine {lot.fineGrams} g · Gross {lot.grossUsd ? formatUsd(Number(lot.grossUsd)) : "—"} ·
                      Commission {lot.commissionUsd ? formatUsd(Number(lot.commissionUsd)) : "—"} ·
                      Assay {lot.assayFeeUsd ? formatUsd(Number(lot.assayFeeUsd)) : "—"} ·
                      Supplier net {lot.netUsd ? formatUsd(Number(lot.netUsd)) : "—"}
                    </p>
                    <p className="mt-1 text-muted">
                      Assay entered by {lot.assayedByEmail}. Bid premium {lot.premiumPct}%.
                    </p>
                    {lot.status === "assayed" && (
                      <div className="mt-3">
                        <button
                          type="button"
                          disabled={sameAdmin}
                          onClick={() => act(lot.id, { action: "approve_payout" })}
                          className="rounded bg-gold px-3 py-1.5 text-xs font-semibold text-primary disabled:opacity-50"
                        >
                          Approve payout instruction
                        </button>
                        {sameAdmin && (
                          <p className="mt-2 text-xs text-muted">
                            You entered this assay. A different staff member must approve the payout.
                          </p>
                        )}
                      </div>
                    )}
                    {lot.status === "payout_approved" && (
                      <p className="mt-2 text-muted">
                        Approved by {lot.payoutApprovedByEmail}. Send the supplier net outside this site.
                      </p>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
