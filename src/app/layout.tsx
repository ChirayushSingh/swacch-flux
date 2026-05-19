import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swacch Flux | Smart Municipal Complaint & Operations Platform",
  description: "Enterprise-grade AI-powered Complaint Management System for Indian Municipal Solid Waste Management.",
};

import QueryProvider from "@/components/providers/QueryProvider";

import { TenantProvider } from "@/components/auth/TenantProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <QueryProvider>
          <TenantProvider>
            {children}
          </TenantProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
