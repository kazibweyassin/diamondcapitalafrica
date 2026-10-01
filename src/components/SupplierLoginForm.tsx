"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold";

export default function SupplierLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/network/supplier/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error ?? "Login failed");
        return;
      }
      router.push("/network/supplier");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-5">
      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
          required
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light disabled:opacity-50"
      >
        {submitting ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-center text-sm text-muted">
        New supplier?{" "}
        <Link href="/network/apply" className="font-semibold text-gold-dark underline">
          Offer gold to DCA
        </Link>
      </p>
    </form>
  );
}
