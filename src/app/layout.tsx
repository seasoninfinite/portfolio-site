import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

import { MobileCta } from "@/components/site/mobile-cta";
import { RevealObserver } from "@/components/site/reveal-observer";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { buildPlans, carePlans } from "@/data/pricing";
import { SITE } from "@/lib/site";
import { getSiteOrigin } from "@/lib/site-url";

import "./globals.css";

const siteOrigin = getSiteOrigin();

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f2ec",
};

const siteDescription =
  "Websites that turn visitors into paying clients. ✓ Live in as little as 3 days ✓ From £199.99, no VAT ✓ Pay the rest when you're happy. Get a free quote →";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Web Designer Solihull | Websites Live in Days from £199.99",
    template: `%s | ${SITE.name}`,
  },
  description: siteDescription,
  applicationName: SITE.name,
  authors: [{ name: "Ben", url: siteOrigin }],
  creator: SITE.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: SITE.name,
    title: "Websites that turn visitors into paying clients | BGG Website Design",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites that turn visitors into paying clients",
    description: siteDescription,
  },
  category: "technology",
};

const offers = [...buildPlans, ...carePlans].map((p) => ({
  "@type": "Offer",
  name: `${p.name}${"pages" in p ? " website" : ""}`,
  price: (p.pricePence / 100).toFixed(2),
  priceCurrency: "GBP",
  url: `${siteOrigin}/pricing`,
}));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      url: siteOrigin,
      name: SITE.name,
      inLanguage: "en-GB",
      publisher: { "@id": `${siteOrigin}/#business` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteOrigin}/#business`,
      name: SITE.name,
      description: siteDescription,
      url: siteOrigin,
      email: SITE.email,
      logo: `${siteOrigin}/icon.svg`,
      image: `${siteOrigin}/opengraph-image`,
      priceRange: "£199.99–£499.99",
      founder: { "@id": `${siteOrigin}/#ben` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Solihull",
        addressRegion: "West Midlands",
        addressCountry: "GB",
      },
      areaServed: [
        ...SITE.areas.map((name) => ({ "@type": "Place", name })),
        { "@type": "Country", name: "United Kingdom" },
      ],
      knowsAbout: [
        "Web design",
        "Website development",
        "Small business websites",
        "Websites for dietitians",
        "Local SEO",
        "Responsive web design",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website design packages",
        itemListElement: offers,
      },
    },
    {
      "@type": "Person",
      "@id": `${siteOrigin}/#ben`,
      name: "Ben",
      jobTitle: "Web designer and developer",
      worksFor: { "@id": `${siteOrigin}/#business` },
      url: `${siteOrigin}/about`,
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          // Marks JS as available before paint so reveal animations never hide content without JS.
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="promo-bar">
          <span className="promo-bar__tag">Free</span>
          See your new homepage designed before you pay a penny.{" "}
          <a href="/contact?plan=Free%20Design%20Preview">Claim your free preview →</a>
        </div>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileCta />
        <RevealObserver />
      </body>
    </html>
  );
}
