import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { SITE } from "./lib/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.role}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} · ${SITE.role}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@PrabhatAstrix",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <div className="shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
