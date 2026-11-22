import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Pin the tracing root to this app so the lockfile in the parent folder is ignored.
  outputFileTracingRoot: process.cwd(),

  // The per-tool "guides" and per-product AI "reviews" were generated from
  // templates and contained unsupported claims. They have been retired in
  // favour of the live tool pages and the directory profiles.
  async redirects() {
    return [
      {
        source: "/articles",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/articles/:slug",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/ai-tools/article",
        destination: "/ai-tools",
        permanent: true,
      },
      {
        source: "/ai-tools/article/:slug",
        destination: "/ai-tools/tool/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
