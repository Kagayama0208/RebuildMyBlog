import type { Metadata } from "next";
import { Tilt_Neon } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const TiltNeon = Tilt_Neon({ subsets: ["latin"], variable: "--font-TiltNeon" });

export const metadata: Metadata = {
  title: {
    default: "RoMi Blog",
    template: "%s - RoMi Blog",
  },
  description:
    "RoMiは写真、ゲーム、ガジェットについてのブログです。最新のトピックや興味深い記事をお届けします。",
  openGraph: {
    title: "RoMi Blog",
    description:
      "RoMiは写真、ゲーム、ガジェットについてのブログです。最新のトピックや興味深い記事をお届けします。",
    locale: "ja_JP",
    siteName: "RoMi Blog",
    url: "https://romi-travel.com/",
    type: "website",
  },
  keywords: "ブログ, ガジェット, 技術, 写真, カメラ, 発達障害, ADHD, ASD",
  twitter: {
    card: "summary_large_image",
    title: "RoMi Blog",
    description:
      "RoMiは写真、ゲーム、ガジェットについてのブログです。最新のトピックや興味深い記事をお届けします。",
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
    <html lang="en">
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

      <body className={`${TiltNeon.variable} `}>
        <Header />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
