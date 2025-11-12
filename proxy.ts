import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl;

  // ✅ Let your /sign-in-1 subroutes (e.g. /sign-in-1/sso-callback) work dynamically
  // if (pathname.startsWith("/sign-in-1/")) {
  //   return NextResponse.rewrite(new URL(pathname, req.url));
  // }

  // Default: allow
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
