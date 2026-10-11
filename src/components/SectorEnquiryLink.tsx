"use client";

import { ArrowRight } from "lucide-react";

export default function SectorEnquiryLink({ sector }: { sector: string }) {
  function selectSector() {
    const select = document.getElementById("invest-sector");
    if (select instanceof HTMLSelectElement) {
      select.value = sector;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  return (
    <a
      href="#enquiry"
      onClick={selectSector}
      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#397ba0] hover:text-[#18372e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74b8df]"
      aria-label={`Enquire about ${sector}`}
    >
      Enquire about this sector <ArrowRight size={15} />
    </a>
  );
}
