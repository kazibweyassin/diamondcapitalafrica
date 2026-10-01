import NetworkPortal from "@/components/NetworkPortal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Institutional Portal",
  description:
    "Request a purchase quote on gold Diamond Capital Africa is selling. Supplier identities are not shown.",
  path: "/network/portal",
});

export default function NetworkPortalPage() {
  return <NetworkPortal />;
}