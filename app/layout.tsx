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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ua">
      <body className={`${geologica_init.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
