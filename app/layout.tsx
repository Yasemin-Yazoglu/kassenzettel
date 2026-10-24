import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "kassenzettel",
    description: "Ausgaben im Blick behalten",
};

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const supabase = await createClient();
    const [locale, messages, { data: { user } }] = await Promise.all([
        getLocale(),
        getMessages(),
        supabase.auth.getUser(),
    ]);

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <Navbar user={user} />
                    <Providers user={user}>{children}</Providers>
                    <div className="text-center pb-8">
                        <Footer />
                    </div>
                    <Analytics />
                    <SpeedInsights />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}