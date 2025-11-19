import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/components/sign-in-1/sso-callback",
        destination: "/sso-callback",
      },
      {
        source: "/components/sign-up-1/sso-callback",
        destination: "/sso-callback",
      },
      {
        source: "/components/sign-in-1/continue",
        destination: "/components/sign-in-1",
      },
      {
        source: "/components/sign-up-1/continue",
        destination: "/components/sign-up-1",
      },
    ];
  },
};

export default withMDX(nextConfig);
