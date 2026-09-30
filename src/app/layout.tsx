import type { Metadata } from "next";
import { Hind_Siliguri, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-price",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BazaarX | Bangladesh's Transparent & Fast Multi-Vendor Marketplace",
  description:
    "Shop 100% authentic products with 90-day verified price history, upfront delivery fee calculation, 1-click returns, and instant bKash/Nagad/COD checkout across all 64 districts of Bangladesh.",
  keywords: [
    "e-commerce Bangladesh",
    "bazaarx",
    "online shopping BD",
    "authentic products Dhaka",
    "bKash online shopping",
    "Nagad payment",
    "fast delivery Bangladesh",
    "best Daraz alternative",
  ],
  authors: [{ name: "BazaarX Engineering Team" }],
  openGraph: {
    title: "BazaarX - Transparent, Reliable E-Commerce for Bangladesh",
    description:
      "No fake discounts. 90-Day price history tracking, verified sellers, and instant wallet refunds.",
    url: "https://bazaarx.com.bd",
    siteName: "BazaarX",
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        <meta name="theme-color" content="#FF4500" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD Structured Data for Marketplace */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BazaarX",
              url: "https://bazaarx.com.bd",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://bazaarx.com.bd/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased selection:bg-[#FF4500]/20 selection:text-[#FF4500]">
        {children}
      </body>
    </html>
  );
}
