import SupplierPortal from "@/components/SupplierPortal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Offer a Lot to DCA",
  description:
    "Submit an estimated gold lot to Diamond Capital Africa. The company name stays inside DCA.",
  path: "/network/supplier",
});

export default function SupplierPortalPage() {
  return <SupplierPortal />;
}
