import type { Metadata } from "next";
import "./globals.css";
import { getLanguage } from "@/public/locales";

export const metadata: Metadata = {
  title: "kassenzettel",
  description: "Ausgaben im Blick behalten",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={getLanguage()}>
      <body>
        {children}
      </body>
    </html>
  );
}
