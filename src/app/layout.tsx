import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import { SITE_CONFIG } from "@/config";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),

  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  description: SITE_CONFIG.description,

  applicationName: SITE_CONFIG.name,

  authors: [
    {
      name: SITE_CONFIG.author,
    },
  ],

  creator: SITE_CONFIG.author,

  keywords: [
    "beanlog",
    "bitandink",
    "virtual world",
    "developer playground",
    "creative coding",
    "웹 개발",
    "웹 인터랙션",
    "웹 디자인",
    "인터랙티브 웹",
    "개발 놀이터",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,

    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,

    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    other: {
      "naver-site-verification":
        "8093957bac455fefc42b868064f6e145aa87926c",
    },
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang={SITE_CONFIG.language}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}