import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { RootProvider } from "fumadocs-ui/provider/next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { ReactQueryClientProvider } from "@/components/react-query-client-provider";
import { ClerkUIProvider } from "@/components/clerk-ui-provider";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <ReactQueryClientProvider>
        <ClerkProvider>
          <ClerkUIProvider>
            <body className="flex flex-col min-h-screen">
              <RootProvider>
                {children}
                <Analytics />
                <Toaster />
              </RootProvider>
            </body>
          </ClerkUIProvider>
        </ClerkProvider>
      </ReactQueryClientProvider>
    </html>
  );
}
