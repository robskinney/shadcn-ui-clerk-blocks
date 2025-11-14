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
      {
        source: "/sign-in-1/continue",
        destination: "/sign-in-1",
      },
      {
        source: "/sign-up-1/continue",
        destination: "/sign-up-1",
      },
    ];
  },
};

export default withMDX(nextConfig);
