import SectionHeader from "./SectionHeader";
import DocumentDownloadButton from "./DocumentDownloadButton";
import { getPublishedDocuments } from "@/lib/documents";
import { company, quarterlyStats } from "@/data/content";

function EmptyReports({ message }: { message: string }) {
  return (
    <p className="rounded-lg border border-dashed border-border bg-section-alt px-6 py-10 text-center text-sm text-muted">
      {message}{" "}
      <a
        href={`mailto:${company.email}?subject=Investor%20materials%20request`}
        className="font-semibold text-gold-dark underline hover:text-gold"
      >
        Contact us
      </a>{" "}
      for current materials.
    </p>
  );
}

export default async function ReportsSection() {
  const documents = await getPublishedDocuments();
  const annualReports = documents.filter((doc) =>
    ["Annual", "ESG", "Compliance", "Governance"].includes(doc.category)
  );

  return (
    <>
      <section className="py-12">
        <SectionHeader title="Annual reporting suite" id="annual-reports" />
        {annualReports.length === 0 ? (
          <EmptyReports message="No annual reports published yet." />
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <a
              href={annualReports[0].sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex aspect-[3/4] max-w-xs cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-dark shadow-lg transition hover:opacity-90"
            >
              <div className="text-center text-white">
                <p className="text-4xl font-bold text-gold">
                  {annualReports[0].title.match(/\d{4}/)?.[0] ?? "Report"}
                </p>
                <p className="mt-2 text-sm uppercase tracking-wider">
                  {annualReports[0].category}
                </p>
                <p className="mt-2 text-xs text-white/70">View document</p>
              </div>
            </a>
            <ul className="space-y-3">
              {annualReports.map((report) => (
                <li key={report.slug}>
                  <DocumentDownloadButton
                    slug={report.slug}
                    title={report.title}
                    type={report.type}
                    sourceUrl={report.sourceUrl}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="py-12" id="quarterly-reports">
        <SectionHeader title="Quarterly reports" />
        <p className="mb-6 text-sm text-muted">
          Operational highlights for {quarterlyStats.period},{" "}
          {quarterlyStats.asAt.toLowerCase()}.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quarterlyStats.metrics.map((stat) => (
            <div
              key={stat.label}
              className="border-l-4 border-gold bg-white p-5 shadow-sm"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-primary md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted">{stat.suffix}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}