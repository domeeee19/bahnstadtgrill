import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { business, siteUrl } from "@/content/business";
import { restaurantSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

// Schriften liegen lokal im Projekt – es wird nichts von Google Fonts geladen.
const barlowCondensed = localFont({
  src: [
    { path: "./fonts/barlow-condensed-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/barlow-condensed-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = localFont({
  src: [
    { path: "./fonts/barlow-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/barlow-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/barlow-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

const fraunces = localFont({
  src: "./fonts/fraunces-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const defaultTitle = `${business.name} – Griechischer Grill, Kneipe & Biergarten`;
const defaultDescription =
  "Gyros, Pizza und Schnitzel, frisch gezapftes Kölsch und ein Biergarten direkt am Bahnhof Opladen. Mo–Sa 11:30–21:00 Uhr. Telefon 02171 80154.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${business.name}`,
  },
  description: defaultDescription,
  applicationName: business.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName: business.name,
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f4efe4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${barlowCondensed.variable} ${barlow.variable} ${fraunces.variable}`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#inhalt"
          className="sr-only z-50 rounded-control bg-blue px-4 py-3 font-semibold text-stripe focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <JsonLd data={[restaurantSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
