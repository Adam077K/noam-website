import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this app — the monorepo has multiple lockfiles
  // (agent kit at repo root) and Next would otherwise infer the wrong root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Hide the dev-mode "N" indicator badge — never ships to prod, distracting in review.
  devIndicators: false,
};

export default nextConfig;
