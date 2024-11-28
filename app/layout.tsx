import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geologica_init = Geologica({
  subsets: ["latin", "cyrillic"],
  weight: ["900", "800", "700", "600", "500", "400"],
  variable: "--font-geologica",
});

export const metadata: Metadata = {
  title: "Коментарі Stalker 2",
  description:
    "STALKER 2 — це черговий доказ нашої автентичності, показаний на весь світ.",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Коментарі Stalker 2",
    description:
      "STALKER 2 — це черговий доказ нашої автентичності, показаний на весь світ.",
    url: "https://www.stalker2.com",
    siteName: "STALKER 2",
    images: [
      {
        url: "/apple-touch-icon.png",
        width: 800,
        height: 600,
        alt: "STALKER 2 Logo",
      },
    ],
    locale: "uk",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ua">
      <body className={`${geologica_init.variable} antialiased`}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {children}
      </body>

      <GoogleAnalytics gaId={"G-R0ZZDWR7FR"} />
    </html>
  );
}
