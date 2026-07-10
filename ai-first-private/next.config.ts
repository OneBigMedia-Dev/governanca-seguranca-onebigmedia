import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: path.join(__dirname)
  },
  outputFileTracingIncludes: {
    "/programa-ai-first": ["./content/programa-ai-first.html"],
    "/pre-curso-ai-first": ["./content/pre-curso-ai-first.html"]
  }
};

export default nextConfig;
