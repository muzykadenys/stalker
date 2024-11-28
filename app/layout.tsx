import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import "./globals.css";

const geologica_init = Geologica({
  subsets: ["latin", "cyrillic"],
  weight: ["900", "800", "700", "600", "500", "400"],
  variable: "--font-geologica",
});

export const metadata: Metadata = {
  title: "Коментарі Stalker2",
  description:
    "STALKER 2 - це черговий доказ нашої автентичності, показаний на весь світ",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
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
    </html>
  );
}
