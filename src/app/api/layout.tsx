import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { profile, socials } from "@/lib/data";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://adrianvoss.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    "full stack developer",
    "web developer",
    "mobile app developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "AI development",
    "freelance developer",
    "software engineer",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  applicationName: `${profile.name} Portfolio`,
  alternates: { canonical: "/" },
  category: "portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${profile.name} · Portfolio`,
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    images: ["/images/og.jpg"],
    creator: "@adrianvoss",
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
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: profile.role,
  description: profile.tagline,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
  knowsAbout: [
    "Full Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Mobile App Development",
    "Artificial Intelligence",
  ],
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-void text-mist antialiased">
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
