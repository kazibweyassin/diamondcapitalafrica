import { company } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact | Buy Gold in Uganda",
  description: `Contact ${company.contactName} at ${company.name}, ${company.phone}. Enquire about buying 99.99% gold bars, wholesale export, Gold Savings, refining, or assay services in Kampala, Uganda.`,
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}