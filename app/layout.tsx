import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const title = "CraftlyAI · The one app your whole business runs on";
const description =
  "Quotes, invoices, payments, projects and follow-ups in one place, with Kraft, an AI assistant that does the paperwork and asks before anything goes out.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.craftlyai.app"),
  title,
  description,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    type: "website",
    url: "https://www.craftlyai.app",
    siteName: "CraftlyAI",
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, type: "image/jpeg", alt: "CraftlyAI: the one app your business runs on. Quotes, projects, invoices and payments with an AI assistant." }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FFFFFF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        <link rel="preload" href="/fonts/Chillax-Variable.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
