import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/sign-in-1/sso-callback",
        destination: "/sso-callback",
      },
      {
        source: "/sign-up-1/sso-callback",
        destination: "/sso-callback",
      },
    ];
  },
};

export default withMDX(nextConfig);
