import SectionHeader from "./SectionHeader";
import DocumentDownloadButton from "./DocumentDownloadButton";
import QuarterlyReports from "./QuarterlyReports";
import { getPublishedDocuments } from "@/lib/documents";
import { company } from "@/data/content";

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

      <QuarterlyReports />
    </>
  );
}