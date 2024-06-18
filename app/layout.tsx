import type { Metadata } from "next";
import { Tilt_Neon } from "next/font/google";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const TiltNeon = Tilt_Neon({ subsets: ["latin"], variable: "--font-TiltNeon" });

export const metadata: Metadata = {
  title: {
    default: "にーとの知恵袋",
    template: "%s - にーとの知恵袋",
  },
  description:
    "にーとの知恵袋は写真、ゲーム、ガジェットについてのブログです。最新のトピックや興味深い記事をお届けします。",
  openGraph: {
    title: "にーとの知恵袋",
    description:
      "にーとの知恵袋は写真、ゲーム、ガジェットについてのブログです。最新のトピックや興味深い記事をお届けします。",
    locale: "ja_JP",
    siteName: "にーとの知恵袋",
    url: "https://neetwisdom.com/",
    type: "website",
  },
  keywords: "ブログ, ゲーム, ガジェット, 技術, 写真, カメラ, ADHD, ASD",
  twitter: {
    card: "summary_large_image",
    title: "にーとの知恵袋",
    description:
      "にーとの知恵袋は写真、ゲーム、ガジェットについてのブログです。最新のトピックや興味深い記事をお届けします。",
    site: "@kagayama_kk",
    creator: "@kagayama_kk",
  },
  authors: {
    name: "Kosuke Kagayama",
  },
  verification: {
    google:
      '<meta name="google-site-verification" content="AOPnR66iiBlMDgHyRDuPSs2RddS0Gevcm6dLMtnF5ro" />',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          async
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-H6EK669P4K"
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'G-H6EK669P4K');`}
        </Script>
      </head>

      <body className={`${TiltNeon.variable} `}>
        <Header />
        <div className="h-full">{children}</div>

        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
