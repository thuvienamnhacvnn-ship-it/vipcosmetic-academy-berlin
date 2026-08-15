import type { NextConfig } from "next";

// Do not use createNextIntlPlugin — next-intl ≥4.13 loads @swc/core and
// Smart App Control on this machine blocks that native binding.
const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./src/i18n/request.ts",
    },
  },
};

export default nextConfig;
