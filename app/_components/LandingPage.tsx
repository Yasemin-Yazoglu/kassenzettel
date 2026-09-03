import Image from "next/image";
import Link from "next/link";
import ExpenseFormDemo from "./ExpenseFormDemo";

export default function LandingPage() {
    return (
        <section className="w-full">
            <ExpenseFormDemo />

            <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-10 text-center sm:pt-24">
                <h2 className="max-w-3xl text-3xl sm:text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl mb-8">
                    Finde heraus, wie viel du
                    <br />
                    <span className="text-slate-400"> tatsächlich ausgibst</span>
                </h2>
            </div>

            <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-4 text-center">
                <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-slate-400">
                    Trage deine Einkäufe einfach ein und sieh, wie viel du für Lebensmittel ausgibst.
                </div>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-2 px-4 mt-10">
                <div className="overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl">
                    <Image 
                        src="/list_view.png"
                        alt="Monatsübersicht"
                        width={1200}
                        height={773}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="block w-full"
                    />
                </div>

                <div className="overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl">
                    <Image
                        src="/analytics.png"
                        alt="Analytics der Ausgaben"
                        width={1200}
                        height={773}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="block w-full"
                    />
                </div>
            </div>

            <div className="mx-auto flex max-w-4xl flex-col items-center py-16 text-center">
                <Link
                    href="/auth/login?mode=signup"
                    className="px-4 py-2 rounded-lg text-md font-semibold bg-indigo-500 hover:bg-indigo-400 text-white transition hover:ring-2 hover:ring-indigo-400/40 hover:ring-offset-2 hover:ring-offset-black"
                >
                    Jetzt registrieren
                </Link>
            </div>
        </section>
    );
}