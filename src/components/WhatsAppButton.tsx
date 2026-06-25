import { company } from "@/data/content";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton() {
  return (
    <a
      href={company.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${company.contactName} on WhatsApp`}
      className="fixed bottom-24 right-4 z-[85] flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:bg-[#20bd5a] hover:shadow-xl active:scale-95 md:hidden"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}