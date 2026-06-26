"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExternalLink, LogOut, Mail, RefreshCw } from "lucide-react";
function txExplorerUrl(txHash: string) {
  return `https://tronscan.org/#/transaction/${txHash}`;
}

interface Enquiry {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

interface GoldDeposit {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  amountUsd: string;
  gramsQuoted: string;
  spotPricePerG: string;
  priceLockedUntil: string;
  status: string;
  txHash: string | null;
  proofUrl: string | null;
  adminNotes: string | null;
  createdAt: string;
}

export default function AdminDashboard({ email }: { email: string }) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [deposits, setDeposits] = useState<GoldDeposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [enquiryRes, depositRes] = await Promise.all([
        fetch("/api/enquiries"),
        fetch("/api/gold-deposits"),
      ]);

      const enquiryJson = await enquiryRes.json();
      const depositJson = await depositRes.json();

      if (!enquiryJson.success) {
        setError(enquiryJson.error ?? "Failed to load enquiries");
        return;
      }

      setEnquiries(enquiryJson.data);

      if (depositJson.success) {
        setDeposits(depositJson.data);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function updateEnquiryStatus(id: string, status: string) {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) loadData();
  }

  async function updateDeposit(
    id: string,
    status: string,
    adminNotes?: string
  ) {
    const res = await fetch(`/api/gold-deposits/manage/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNotes }),
    });
    if (res.ok) loadData();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const enquiryStats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    read: enquiries.filter((e) => e.status === "read").length,
    replied: enquiries.filter((e) => e.status === "replied").length,
  };

  const depositStats = {
    total: deposits.length,
    pending: deposits.filter((d) =>
      ["pending_payment", "proof_submitted"].includes(d.status)
    ).length,
    verified: deposits.filter((d) => d.status === "verified").length,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-sm text-muted">Signed in as {email}</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={loadData}
            className="inline-flex items-center gap-1 rounded border border-border px-4 py-2 text-sm font-medium transition hover:bg-section-alt"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1 rounded bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Enquiries", value: enquiryStats.total },
          { label: "New enquiries", value: enquiryStats.new },
          { label: "Gold deposits", value: depositStats.total },
          { label: "Pending deposits", value: depositStats.pending },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-12 overflow-hidden rounded-lg border border-border bg-white shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-bold text-primary">Gold Deposits (USDT)</h2>
          <p className="text-xs text-muted">
            Verify on-chain, then mark as verified to credit gold.
          </p>
        </div>

        {loading && deposits.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-muted">Loading...</p>
        ) : deposits.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-muted">
            No gold deposits yet.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {deposits.map((deposit) => (
              <div key={deposit.id} className="px-6 py-5">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {deposit.name}{" "}
                      <span className="text-xs font-normal text-muted">
                        ({deposit.reference})
                      </span>
                    </p>
                    <p className="text-sm text-muted">
                      ${deposit.amountUsd} USDT → {deposit.gramsQuoted} g
                    </p>
                  </div>
                  <select
                    value={deposit.status}
                    onChange={(e) => updateDeposit(deposit.id, e.target.value)}
                    className="rounded border border-border px-3 py-1.5 text-xs font-medium"
                  >
                    <option value="pending_payment">Pending payment</option>
                    <option value="proof_submitted">Proof submitted</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="mb-3 flex flex-wrap gap-4 text-xs text-muted">
                  <a
                    href={`mailto:${deposit.email}`}
                    className="inline-flex items-center gap-1 hover:text-gold"
                  >
                    <Mail size={12} />
                    {deposit.email}
                  </a>
                  <span>{deposit.phone}</span>
                  <span>
                    {new Date(deposit.createdAt).toLocaleString("en-UG")}
                  </span>
                  <span>
                    Lock until{" "}
                    {new Date(deposit.priceLockedUntil).toLocaleString("en-UG")}
                  </span>
                </div>

                {deposit.txHash && (
                  <p className="mb-2 text-sm">
                    <span className="font-medium text-foreground">Tx: </span>
                    <a
                      href={txExplorerUrl(deposit.txHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-gold-dark underline hover:text-gold"
                    >
                      {deposit.txHash.slice(0, 18)}…
                      <ExternalLink size={12} />
                    </a>
                  </p>
                )}

                {deposit.proofUrl && (
                  <p className="mb-2 text-sm">
                    <a
                      href={deposit.proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-gold-dark underline hover:text-gold"
                    >
                      View proof screenshot
                    </a>
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {deposit.status === "proof_submitted" && (
                    <>
                      <button
                        type="button"
                        onClick={() => updateDeposit(deposit.id, "verified")}
                        className="rounded bg-gold px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-gold-light"
                      >
                        Verify & credit gold
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateDeposit(deposit.id, "rejected", "Payment not verified")
                        }
                        className="rounded border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-bold text-primary">Contact Enquiries</h2>
        </div>

        {loading && enquiries.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-muted">Loading...</p>
        ) : enquiries.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-muted">
            No enquiries yet. Submit one via the{" "}
            <Link href="/contact" className="text-gold-dark underline">
              contact form
            </Link>
            .
          </p>
        ) : (
          <div className="divide-y divide-border">
            {enquiries.map((enquiry) => (
              <div key={enquiry.id} className="px-6 py-5">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {enquiry.name}{" "}
                      <span className="text-xs font-normal text-muted">
                        ({enquiry.reference})
                      </span>
                    </p>
                    <p className="text-sm text-muted">{enquiry.subject}</p>
                  </div>
                  <select
                    value={enquiry.status}
                    onChange={(e) =>
                      updateEnquiryStatus(enquiry.id, e.target.value)
                    }
                    className="rounded border border-border px-3 py-1.5 text-xs font-medium"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-foreground">
                  {enquiry.message}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-muted">
                  <a
                    href={`mailto:${enquiry.email}`}
                    className="inline-flex items-center gap-1 hover:text-gold"
                  >
                    <Mail size={12} />
                    {enquiry.email}
                  </a>
                  {enquiry.phone && <span>{enquiry.phone}</span>}
                  <span>
                    {new Date(enquiry.createdAt).toLocaleString("en-UG")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}