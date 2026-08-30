import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "X-Frame-Options", value: "DENY" },
      ],
    }];
  },
  async redirects() {
    return [
      {
        source: "/gold-trading-services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/gold-trading-services/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/order-process",
        destination: "/services#export",
        permanent: true,
      },
      {
        source: "/how-gold-delivery-works",
        destination: "/services#export",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
