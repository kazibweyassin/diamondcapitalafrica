"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import DocumentDownloadButton from "./DocumentDownloadButton";
import { annualReports, quarterlyReports } from "@/data/content";

export default function ReportsSection() {
  const [webcastOpen, setWebcastOpen] = useState(false);

  return (
    <>
      <section className="py-12">
        <SectionHeader title="Annual reporting suite" id="annual-reports" />
        <div className="grid gap-8 lg:grid-cols-2">
          <a
            href={`/api/documents/${annualReports[0]?.id}`}
            className="flex aspect-[3/4] max-w-xs cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-dark shadow-lg transition hover:opacity-90"
          >
            <div className="text-center text-white">
              <p className="text-4xl font-bold text-gold">2025</p>
              <p className="mt-2 text-sm uppercase tracking-wider">
                Annual Report
              </p>
              <p className="mt-2 text-xs text-white/70">Click to download</p>
            </div>
          </a>
          <ul className="space-y-3">
            {annualReports.map((report) => (
              <li key={report.id}>
                <DocumentDownloadButton
                  slug={report.id}
                  title={report.title}
                  type={report.type}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12" id="quarterly-reports">
        <SectionHeader title="Quarterly reports" />
        {quarterlyReports.map((report) => (
          <div key={report.title} className="grid gap-8 lg:grid-cols-2">
            <div className="flex aspect-video items-center justify-center rounded-lg bg-primary">
              <div className="text-center text-white">
                <p className="text-sm font-medium uppercase text-gold">
                  {report.month} {report.day}
                </p>
                <p className="mt-1 text-2xl font-bold">{report.title}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {report.items.map((item) => (
                <li key={item.id}>
                  <DocumentDownloadButton
                    slug={item.id}
                    title={item.title}
                    type={item.kind === "webcast" ? "www" : "pdf"}
                    kind={item.kind}
                    onWebcast={() => setWebcastOpen(true)}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {webcastOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-2xl">
            <h3 className="mb-2 text-lg font-bold text-primary">
              Q1 2026 Operational Results Webcast
            </h3>
            <p className="mb-4 text-sm text-muted">
              Webcast playback placeholder. In production, embed your video
              player or link to your hosting platform here.
            </p>
            <div className="mb-6 flex aspect-video items-center justify-center rounded-lg bg-primary text-white">
              <p className="text-sm">Video player placeholder</p>
            </div>
            <button
              type="button"
              onClick={() => setWebcastOpen(false)}
              className="rounded bg-gold px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gold-light"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}