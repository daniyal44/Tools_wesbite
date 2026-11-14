import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Pin the tracing root to this app so the lockfile in the parent folder is ignored.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
