import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Inter } from "next/font/google";

import { getSiteOrigin } from "@/lib/site-url";

import "./globals.css";

const siteOrigin = getSiteOrigin();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const displaySerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const siteTitle = "BGG Website Design";
const siteDescription =
  "UK freelance web designer and developer — custom websites, modern UI, and fast builds for businesses across the United Kingdom. Hire a website maker for premium, conversion-focused sites.";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  applicationName: siteTitle,
  authors: [{ name: "Ben", url: siteOrigin }],
  creator: "BGG Website Design",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: siteTitle,
    title: `${siteTitle} | UK Web Designer & Website Maker`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteTitle} | UK Web Designer`,
    description: siteDescription,
  },
  category: "technology",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      url: siteOrigin,
      name: siteTitle,
      description: siteDescription,
      inLanguage: "en-GB",
      publisher: { "@id": `${siteOrigin}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteOrigin}/#organization`,
      name: siteTitle,
      description: siteDescription,
      url: siteOrigin,
      email: "bggwebsitedesign@gmail.com",
      areaServed: {
        "@type": "Country",
        name: "United Kingdom",
      },
      knowsAbout: [
        "Web design",
        "Website development",
        "Freelance web designer",
        "Custom websites",
        "Small business websites",
        "Responsive web design",
      ],
      serviceType: ["Web design", "Web development", "Website design"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${inter.variable} ${displaySerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
