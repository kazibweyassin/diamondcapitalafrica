"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Mail, RefreshCw } from "lucide-react";

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

export default function AdminDashboard({ email }: { email: string }) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEnquiries() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/enquiries");
      const json = await res.json();
      if (!json.success) {
        setError(json.error ?? "Failed to load");
        return;
      }
      setEnquiries(json.data);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) loadEnquiries();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    read: enquiries.filter((e) => e.status === "read").length,
    replied: enquiries.filter((e) => e.status === "replied").length,
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
            onClick={loadEnquiries}
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

      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: stats.total },
          { label: "New", value: stats.new },
          { label: "Read", value: stats.read },
          { label: "Replied", value: stats.replied },
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

      {error && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

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
                    onChange={(e) => updateStatus(enquiry.id, e.target.value)}
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