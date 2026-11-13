import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Send www.ngcc-cancure.com -> ngcc-cancure.com so Google sees one site, not two copies.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ngcc-cancure.com" }],
        destination: "https://ngcc-cancure.com/:path*",
        permanent: true,
      },
    ];
  },
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
