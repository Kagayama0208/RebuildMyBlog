import type { Metadata } from "next";
import { Tilt_Neon } from "next/font/google";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import DarkModeToggle from "./components/DarkModeToggle";

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
    <html lang="ja" suppressHydrationWarning>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              function getThemePreference() {
                if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                  return localStorage.getItem('theme');
                }
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              document.documentElement.classList.add(getThemePreference());
            })();
          `,
          }}
        />
      </head>

      <body className={`${TiltNeon.variable} `}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />

          <div className="h-full py-5 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            {children}
          </div>

          <Footer />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
