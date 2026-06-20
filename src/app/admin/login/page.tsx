"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (!json.success) {
        setError(json.error ?? "Login failed");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-primary">Admin Login</h1>
        <p className="mb-6 text-sm text-muted">
          Sign in to manage enquiries and content.
        </p>

        {error && (
          <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-border px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border border-border px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-gold px-4 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 inline-block text-sm text-gold-dark transition hover:text-gold"
        >
          &larr; Back to website
        </Link>
      </div>
    </div>
  );
}