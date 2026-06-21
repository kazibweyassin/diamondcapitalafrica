import Image from "next/image";
import { company } from "@/data/content";

interface BrandLogoProps {
  className?: string;
  priority?: boolean;
}

export default function BrandLogo({
  className = "h-10 w-auto md:h-12",
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/Logo.png"
      alt={company.name}
      width={320}
      height={64}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}