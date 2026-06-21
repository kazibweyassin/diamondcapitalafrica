import { company } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Gold Dealer Uganda",
  description: `Contact ${company.contactName} at ${company.name}, ${company.phone}. Gold buying, refining, and export enquiries in Kampala, Uganda and across East Africa.`,
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}