import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import ComicThemePersistence from "./components/ComicThemePersistence";
import PageFlipSound from "./components/PageFlipSound";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prabhat Bajpai - Software Engineer",
  description:
    "Comic-inspired portfolio first page for Prabhat Bajpai, a software engineer based in Bengaluru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-comic-theme="paint">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;500;700&family=M+PLUS+Rounded+1c:wght@400;500;700;800&family=Yomogi&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ComicThemePersistence />
        <PageFlipSound />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
