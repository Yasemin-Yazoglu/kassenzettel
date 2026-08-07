import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import { getLanguage } from "@/public/locales";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { Providers } from "./providers";

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
        {/* Navbar */}
        <div>
          <Navbar />
        </div>
        <Providers>{children}</Providers>
        {/* Footer Section */}
        <div className="text-center pb-8">
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
