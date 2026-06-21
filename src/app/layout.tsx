import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import JsonLd from "@/components/JsonLd";
import { company } from "@/data/content";
import {
  defaultOgImage,
  defaultOgImageSize,
  organizationJsonLd,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003b49",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Gold Dealing & Refining`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  keywords: [
    "gold dealer Uganda",
    "gold refinery Kampala",
    "gold export Africa",
    "LBMA gold bars",
    "artisanal gold Uganda",
    "gold assay testing",
    "responsible gold sourcing",
    company.name,
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
  robots: { index: true, follow: true },
  verification: {
    google: "rn-Ay9i6B-OFBRvbynMMd0mvYfDwYXx77FV2Fb380rw",
  },
  openGraph: {
    type: "website",
    locale: "en_UG",
    siteName: company.name,
    title: `${company.name} | Gold Dealing & Refining`,
    description: company.description,
    images: [
      {
        url: defaultOgImage,
        alt: company.name,
        ...defaultOgImageSize,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Gold Dealing & Refining`,
    description: company.description,
    images: [{ url: defaultOgImage, ...defaultOgImageSize }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}