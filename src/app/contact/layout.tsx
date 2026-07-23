import { company } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact | Buy Gold in Uganda",
  description: `Contact ${company.contactName} at ${company.name}, ${company.phone}. Enquire about gold supply, wholesale export, CIF Dubai, Gold Savings, planned refining, or assay. Include volume and destination for faster response.`,
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}