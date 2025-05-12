import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
// Link import might still be needed by Footer or other components if not self-contained.
// Footer.tsx imports Link itself, so it's not strictly needed here if AppSidebar is the only other consumer.
// For now, let's keep it, as removing it might break something if it's used by a child not shown.
// Re-evaluating: Footer.tsx imports Link. Header.tsx does not. AppSidebar will import Link.
// So, top-level Link import in layout.tsx is likely not needed. Removing it.
// If any other direct child of RootLayout that isn't a separate component needs Link, it can be re-added.

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar"; // Import the new AppSidebar component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        {/* SidebarProvider defaultOpen is effectively always true for desktop due to internal changes */}
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow p-4 sm:p-6 bg-background/80">{children}</main>
              <Footer />
            </div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
        <ChatbotWidget />
      </body>
    </html>
  );
}
