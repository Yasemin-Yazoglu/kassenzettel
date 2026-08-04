import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ImpressumPage() {
    return (
        <div className="flex justify-center min-h-screen">
            <main className="flex flex-col w-full max-w-2xl gap-8 px-6 py-14">
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        aria-label="Zurück zur Startseite"
                        title="Zurück zur Startseite"
                        className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-white text-2xl font-semibold">Impressum</h1>
                </div>

                <article className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col gap-6 text-slate-200 leading-relaxed">
                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">Angaben gemäß § 5 DDG</h2>
                        <p>
                            Yasemin Yazoglu<br />
                            Victor-Andersen-Weg 10<br />
                            25436 Uetersen<br />
                            Deutschland
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">Kontakt</h2>
                        <p>
                            E-Mail: info@my-semmy.com<br />
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">
                            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
                        </h2>
                        <p>
                            Yasemin Yazoglu<br />
                            Victor-Andersen-Weg 10<br />
                            25436 Uetersen
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">Hinweis zum Status</h2>
                        <p>
                            Dieses Angebot wird derzeit von einer Privatperson betrieben.
                            Eine Gewerbeanmeldung besteht aktuell nicht, da das Angebot
                            derzeit kostenlos ist. Bei Einführung kostenpflichtiger
                            Funktionen wird dieses Impressum entsprechend aktualisiert.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">
                            EU-Streitschlichtung
                        </h2>
                        <p>
                            Die Europäische Kommission stellt eine Plattform zur
                            Online-Streitbeilegung (OS) bereit, abrufbar unter{" "}
                            <a
                                href="https://ec.europa.eu/consumers/odr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:underline"
                            >
                                https://ec.europa.eu/consumers/odr/
                            </a>
                            . Unsere E-Mail-Adresse finden Sie oben unter „Kontakt".
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">
                            Verbraucherstreitbeilegung / Universalschlichtungsstelle
                        </h2>
                        <p>
                            Wir sind nicht bereit oder verpflichtet, an
                            Streitbeilegungsverfahren vor einer
                            Verbraucherschlichtungsstelle teilzunehmen.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">Haftung für Inhalte</h2>
                        <p>
                            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
                            Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                            verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
                            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                            gespeicherte fremde Informationen zu überwachen oder nach
                            Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                            hinweisen.
                        </p>
                        <p>
                            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                            Informationen nach den allgemeinen Gesetzen bleiben hiervon
                            unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                            Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                            möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen
                            werden wir diese Inhalte umgehend entfernen.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">Haftung für Links</h2>
                        <p>
                            Unser Angebot kann Links zu externen Websites Dritter
                            enthalten, auf deren Inhalte wir keinen Einfluss haben. Deshalb
                            können wir für diese fremden Inhalte auch keine Gewähr
                            übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
                            jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">Urheberrecht</h2>
                        <p>
                            Die durch den Betreiber erstellten Inhalte und Werke auf diesen
                            Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter
                            sind als solche gekennzeichnet. Die Vervielfältigung,
                            Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb
                            der Grenzen des Urheberrechtes bedürfen der schriftlichen
                            Zustimmung des jeweiligen Autors bzw. Erstellers.
                        </p>
                    </section>
                </article>
            </main>
        </div>
    );
}