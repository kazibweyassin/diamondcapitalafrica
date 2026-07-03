import NetworkPortal from "@/components/NetworkPortal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Institutional Portal",
  description:
    "Browse verified gold supply and request quotes on the Diamond Capital Africa Verified Gold Exchange.",
  path: "/network/portal",
});

export default function NetworkPortalPage() {
  return <NetworkPortal />;
}