"use client";

import { useEffect, useState } from "react";
import VerificationBadge from "./VerificationBadge";

interface NetworkMember {
  id: string;
  reference: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  productType: string;
  volumeRange: string;
  status: string;
  verificationLevel: number;
  adminNotes: string | null;
}

interface VerifiedSupply {
  id: string;
  reference: string;
  memberId: string;
  title: string;
  productType: string;
  purity: string | null;
  volumeEstimate: string;
  location: string;
  verificationLevel: number;
  status: string;
  member: { companyName: string; reference: string };
}

interface InstitutionalAccount {
  id: string;
  reference: string;
  companyName: string;
  contactName: string;
  email: string;
  buyerType: string;
  status: string;
  membershipTier: string;
  adminNotes: string | null;
}

interface ExchangeEnquiry {
  id: string;
  reference: string;
  contactName: string;
  email: string;
  companyName: string | null;
  message: string;
  status: string;
  supply: { title: string; reference: string };
}

interface SupplyDraft {
  memberId: string;
  title: string;
  productType: string;
  purity: string;
  volumeEstimate: string;
  location: string;
  verificationLevel: number;
  assayRef: string;
  summary: string;
}

const emptySupply: SupplyDraft = {
  memberId: "",
  title: "",
  productType: "Raw gold / doré",
  purity: "99.99%",
  volumeEstimate: "",
  location: "",
  verificationLevel: 3,
  assayRef: "",
  summary: "",
};

export default function NetworkAdminPanel() {
  const [suppliers, setSuppliers] = useState<NetworkMember[]>([]);
  const [supply, setSupply] = useState<VerifiedSupply[]>([]);
  const [institutional, setInstitutional] = useState<InstitutionalAccount[]>([]);
  const [enquiries, setEnquiries] = useState<ExchangeEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [supplyDraft, setSupplyDraft] = useState<SupplyDraft>(emptySupply);
  const [lastPassword, setLastPassword] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/network/admin");
      const json = await res.json();
      if (!json.success) {
        setError(json.error ?? "Failed to load network data");
        return;
      }
      setSuppliers(json.data.suppliers);
      setSupply(json.data.supply);
      setInstitutional(json.data.institutional);
      setEnquiries(json.data.enquiries);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function patchSupplier(id: string, data: Record<string, unknown>) {
    const res = await fetch(`/api/network/admin/suppliers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) load();
  }

  async function patchSupply(id: string, data: Record<string, unknown>) {
    const res = await fetch(`/api/network/admin/supply/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) load();
  }

  async function createSupply(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/network/admin/supply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...supplyDraft, status: "draft" }),
    });
    if (res.ok) {
      setSupplyDraft(emptySupply);
      load();
    }
  }

  async function patchInstitutional(
    id: string,
    data: Record<string, unknown>
  ) {
    const res = await fetch(`/api/network/admin/institutional/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      if (json.data?.temporaryPassword) {
        setLastPassword(`${json.data.email}: ${json.data.temporaryPassword}`);
      }
      load();
    }
  }

  async function patchEnquiry(id: string, status: string) {
    const res = await fetch(`/api/network/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) load();
  }

  const verifiedSuppliers = suppliers.filter((s) => s.status === "verified");

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-bold text-primary">
          Institutional Gold Network
        </h2>
        <p className="text-sm text-muted">
          Verify suppliers, publish supply, and activate institutional access.
        </p>
      </div>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {lastPassword && (
        <p className="rounded border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-primary">
          Portal password set — share securely with the buyer:{" "}
          <span className="font-mono font-semibold">{lastPassword}</span>
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Supplier applications", value: suppliers.length },
          { label: "Verified suppliers", value: verifiedSuppliers.length },
          { label: "Published supply", value: supply.filter((s) => s.status === "published").length },
          { label: "Exchange enquiries", value: enquiries.length },
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

      <section className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-bold text-primary">Supplier applications</h3>
        </div>
        {loading && suppliers.length === 0 ? (
          <p className="px-6 py-8 text-sm text-muted">Loading...</p>
        ) : suppliers.length === 0 ? (
          <p className="px-6 py-8 text-sm text-muted">No supplier applications yet.</p>
        ) : (
          <div className="divide-y divide-border">
            {suppliers.map((member) => (
              <div key={member.id} className="px-6 py-5">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {member.companyName}{" "}
                      <span className="text-xs font-normal text-muted">
                        ({member.reference})
                      </span>
                    </p>
                    <p className="text-sm text-muted">
                      {member.contactName} · {member.productType} · {member.volumeRange}
                    </p>
                  </div>
                  <VerificationBadge level={member.verificationLevel} />
                </div>
                <p className="mb-3 text-sm text-muted">
                  {member.email} · {member.phone} · {member.location}
                </p>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={member.status}
                    onChange={(e) =>
                      patchSupplier(member.id, { status: e.target.value })
                    }
                    className="rounded border border-border px-3 py-1.5 text-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <select
                    value={member.verificationLevel}
                    onChange={(e) =>
                      patchSupplier(member.id, {
                        verificationLevel: Number(e.target.value),
                      })
                    }
                    className="rounded border border-border px-3 py-1.5 text-xs"
                  >
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        Level {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-bold text-primary">Create verified supply</h3>
        </div>
        <form onSubmit={createSupply} className="grid gap-4 px-6 py-5 md:grid-cols-2">
          <label className="block text-sm md:col-span-2">
            <span className="mb-1 block font-medium">Verified supplier</span>
            <select
              required
              value={supplyDraft.memberId}
              onChange={(e) =>
                setSupplyDraft({ ...supplyDraft, memberId: e.target.value })
              }
              className="w-full rounded border border-border px-3 py-2"
            >
              <option value="">Select supplier</option>
              {verifiedSuppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.companyName} ({s.reference})
                </option>
              ))}
            </select>
          </label>
          {(
            [
              ["title", "Listing title"],
              ["productType", "Product type"],
              ["purity", "Purity"],
              ["volumeEstimate", "Volume estimate"],
              ["location", "Location"],
              ["assayRef", "Assay reference"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block text-sm">
              <span className="mb-1 block font-medium">{label}</span>
              <input
                required={key !== "assayRef" && key !== "purity"}
                value={supplyDraft[key]}
                onChange={(e) =>
                  setSupplyDraft({ ...supplyDraft, [key]: e.target.value })
                }
                className="w-full rounded border border-border px-3 py-2"
              />
            </label>
          ))}
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Verification level</span>
            <select
              value={supplyDraft.verificationLevel}
              onChange={(e) =>
                setSupplyDraft({
                  ...supplyDraft,
                  verificationLevel: Number(e.target.value),
                })
              }
              className="w-full rounded border border-border px-3 py-2"
            >
              {[3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  Level {n}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm md:col-span-2">
            <span className="mb-1 block font-medium">Summary</span>
            <textarea
              value={supplyDraft.summary}
              onChange={(e) =>
                setSupplyDraft({ ...supplyDraft, summary: e.target.value })
              }
              rows={3}
              className="w-full rounded border border-border px-3 py-2"
            />
          </label>
          <button
            type="submit"
            className="rounded bg-gold px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gold-light md:col-span-2 md:w-fit"
          >
            Create supply (draft)
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-bold text-primary">Verified supply</h3>
        </div>
        {supply.length === 0 ? (
          <p className="px-6 py-8 text-sm text-muted">No supply listings yet.</p>
        ) : (
          <div className="divide-y divide-border">
            {supply.map((item) => (
              <div key={item.id} className="px-6 py-5">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {item.title}{" "}
                      <span className="text-xs font-normal text-muted">
                        ({item.reference})
                      </span>
                    </p>
                    <p className="text-sm text-muted">
                      {item.member.companyName} · {item.volumeEstimate}
                    </p>
                  </div>
                  <VerificationBadge level={item.verificationLevel} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      patchSupply(item.id, { status: e.target.value })
                    }
                    className="rounded border border-border px-3 py-1.5 text-xs"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-bold text-primary">Institutional access requests</h3>
        </div>
        {institutional.length === 0 ? (
          <p className="px-6 py-8 text-sm text-muted">No access requests yet.</p>
        ) : (
          <div className="divide-y divide-border">
            {institutional.map((account) => (
              <div key={account.id} className="px-6 py-5">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {account.companyName}{" "}
                      <span className="text-xs font-normal text-muted">
                        ({account.reference})
                      </span>
                    </p>
                    <p className="text-sm text-muted">
                      {account.contactName} · {account.buyerType}
                    </p>
                  </div>
                  <select
                    value={account.status}
                    onChange={(e) =>
                      patchInstitutional(account.id, { status: e.target.value })
                    }
                    className="rounded border border-border px-3 py-1.5 text-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="rejected">Rejected</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <p className="mb-3 text-sm text-muted">{account.email}</p>
                <button
                  type="button"
                  onClick={() => {
                    const pwd = crypto.randomUUID().slice(0, 10);
                    patchInstitutional(account.id, {
                      status: "active",
                      setPassword: pwd,
                    });
                  }}
                  className="rounded bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-dark"
                >
                  Activate & generate portal password
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-bold text-primary">Exchange quote requests</h3>
        </div>
        {enquiries.length === 0 ? (
          <p className="px-6 py-8 text-sm text-muted">No quote requests yet.</p>
        ) : (
          <div className="divide-y divide-border">
            {enquiries.map((enquiry) => (
              <div key={enquiry.id} className="px-6 py-5">
                <p className="font-semibold text-foreground">
                  {enquiry.companyName ?? enquiry.contactName}{" "}
                  <span className="text-xs font-normal text-muted">
                    ({enquiry.reference})
                  </span>
                </p>
                <p className="text-sm text-muted">
                  {enquiry.supply.title} · {enquiry.email}
                </p>
                <p className="my-3 text-sm leading-relaxed">{enquiry.message}</p>
                <select
                  value={enquiry.status}
                  onChange={(e) => patchEnquiry(enquiry.id, e.target.value)}
                  className="rounded border border-border px-3 py-1.5 text-xs"
                >
                  <option value="new">New</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="quoted">Quoted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}