import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import "@/styles/global.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { cn } from "@/lib/utils";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ourFileRouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type Params = Promise<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>;

export default async function RootLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Params;
}) {
  const layoutParams = await params;
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background pt-[80px] font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NuqsAdapter>
          <Header />
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {modal}
          {children}
          <Footer />
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  );
}
