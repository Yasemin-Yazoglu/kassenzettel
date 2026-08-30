import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Link from "next/link";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });

export default function NotFound() {
    return (
        <div
            className={`${display.variable} ${mono.variable} min-h-screen text-white flex flex-col items-center px-6 py-24 gap-8`}
        >
            <div className="text-center max-w-md">
                <p className="font-[family-name:var(--font-display)] text-6xl font-bold text-indigo-400">
                    404
                </p>
                <h1 className="mt-4 text-xl font-medium">Diese Seite gibt es nicht.</h1>
            </div>

            <Link
                href="/"
                className="px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-colors"
            >
                Zur Startseite
            </Link>
        </div>
    );
}