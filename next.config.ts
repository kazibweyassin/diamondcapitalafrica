import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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