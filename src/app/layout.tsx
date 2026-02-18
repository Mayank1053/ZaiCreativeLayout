import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/shared";
import { SEO_CONFIG, BRAND_INFO } from "@/lib/config";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SEO_CONFIG.title,
    template: `%s | ${BRAND_INFO.name}`,
  },
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  authors: [{ name: BRAND_INFO.director.name }],
  icons: {
    icon: "https://i.ibb.co/gFcwGMMS/Logo-Favicon.png",
  },
  openGraph: {
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    url: SEO_CONFIG.url,
    siteName: BRAND_INFO.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ArchitecturalFirm",
  name: BRAND_INFO.name,
  description: BRAND_INFO.description,
  url: SEO_CONFIG.url,
  telephone: BRAND_INFO.contact.phone,
  email: BRAND_INFO.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BRAND_INFO.contact.address.line1,
    addressLocality: BRAND_INFO.contact.address.city,
    addressRegion: BRAND_INFO.contact.address.state,
    addressCountry: "IN",
  },
  founder: {
    "@type": "Person",
    name: BRAND_INFO.director.name,
    jobTitle: BRAND_INFO.director.title,
  },
  areaServed: {
    "@type": "City and State",
    name: "Raipur, Chhattisgarh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
