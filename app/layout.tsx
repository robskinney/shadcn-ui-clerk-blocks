import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { InstallationProvider } from "@/components/installation-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clerk Blocks",
  description:
    "A registry of reusable shadcn/ui components to be used with Clerk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <InstallationProvider installId="pnpm">
              <div className="flex flex-col gap-5">
                <Navbar />
                <MaxWidthWrapper>{children}</MaxWidthWrapper>
                <Footer />
              </div>
            </InstallationProvider>

            <Toaster />
          </ThemeProvider>
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
