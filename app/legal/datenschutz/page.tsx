import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DatenschutzPage() {
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
                    <h1 className="text-white text-2xl font-semibold">Datenschutzerklärung</h1>
                </div>

                <article className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col gap-6 text-slate-200 leading-relaxed">
                    <p className="text-sm text-slate-400">
                        Stand: 03. August 2026
                    </p>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">1. Verantwortlicher</h2>
                        <p>
                            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                        </p>
                        <p>
                            Yasemin Yazoglu<br />
                            Victor-Andersen-Weg 10<br />
                            25436 Uetersen<br />
                            E-Mail: info@my-semmy.com
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">2. Allgemeines zur Datenverarbeitung</h2>
                        <p>
                            Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich
                            nur, soweit dies zur Bereitstellung einer funktionsfähigen
                            Anwendung sowie unserer Inhalte und Leistungen erforderlich ist.
                            Die Verarbeitung personenbezogener Daten erfolgt regelmäßig nur
                            nach Einwilligung des Nutzers oder auf Grundlage einer
                            gesetzlichen Erlaubnis (Art. 6 Abs. 1 DSGVO).
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">3. Registrierung und Nutzerkonto</h2>
                        <p>
                            Zur Nutzung der App ist die Erstellung eines Nutzerkontos
                            erforderlich. Dabei erheben wir folgende Daten:
                        </p>
                        <ul className="list-disc list-inside flex flex-col gap-1">
                            <li>E-Mail-Adresse</li>
                            <li>Passwort (verschlüsselt gespeichert)</li>
                            <li>Zeitpunkt der Kontoerstellung</li>
                        </ul>
                        <p>
                            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Erfüllung eines
                            Vertrags bzw. vorvertragliche Maßnahmen), da das Nutzerkonto
                            zur Bereitstellung der App-Funktionen erforderlich ist.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">4. Anmeldung über Google (OAuth)</h2>
                        <p>
                            Wir bieten die Möglichkeit, sich mit einem bestehenden
                            Google-Konto anzumelden. Anbieter ist Google Ireland Limited,
                            Gordon House, Barrow Street, Dublin 4, Irland (bzw. Google LLC,
                            1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, für
                            außerhalb des EWR ansässige Nutzer).
                        </p>
                        <p>
                            Bei der Anmeldung über Google übermittelt Google an uns die von
                            Ihnen freigegebenen Kontoinformationen (in der Regel
                            E-Mail-Adresse, Name und Profilbild). Es können hierbei Daten
                            in die USA übertragen werden. Google hat sich den
                            EU-Standardvertragsklauseln unterworfen bzw. bietet vergleichbare
                            Garantien gemäß Art. 46 DSGVO. Weitere Informationen finden Sie
                            in der{" "}
                            <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:underline"
                            >
                                Datenschutzerklärung von Google
                            </a>
                            .
                        </p>
                        <p>
                            Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a
                            DSGVO), die Sie durch Auswahl der Google-Anmeldung erteilen.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">5. Ausgabendaten</h2>
                        <p>
                            Zur Kernfunktion der App gehört die Erfassung persönlicher
                            Ausgaben. Hierbei speichern wir die von Ihnen eingegebenen
                            Daten:
                        </p>
                        <ul className="list-disc list-inside flex flex-col gap-1">
                            <li>Betrag der Ausgabe</li>
                            <li>Datum der Ausgabe</li>
                            <li>Name des Ladens/Geschäfts</li>
                        </ul>
                        <p>
                            Diese Daten sind ausschließlich für Sie selbst über Ihr
                            Nutzerkonto einsehbar. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
                            DSGVO, da die Speicherung dieser Daten die Kernfunktion der App
                            darstellt, zu deren Nutzung Sie sich durch die Kontoerstellung
                            entschieden haben.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">6. Hosting und Infrastruktur</h2>
                        <p>
                            <strong>Datenbank und Authentifizierung:</strong> Wir nutzen für
                            die Speicherung von Nutzer- und Ausgabendaten sowie für die
                            Authentifizierung den Dienst Supabase. Die von Ihnen
                            eingegebenen Daten werden auf Servern innerhalb der Europäischen
                            Union gespeichert.
                        </p>
                        <p>
                            <strong>Anwendungs-Hosting:</strong> Die Anwendung selbst wird
                            über die Plattform Vercel Inc., 340 S Lemon Ave #4133, Walnut,
                            CA 91789, USA, bereitgestellt. Hierbei kann es zu einer
                            Übermittlung von Daten (z.B. IP-Adresse, technische
                            Nutzungsdaten) in die USA kommen. Vercel hat sich den
                            EU-Standardvertragsklauseln unterworfen bzw. bietet
                            vergleichbare Garantien gemäß Art. 46 DSGVO.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">7. Cookies</h2>
                        <p>
                            Wir setzen technisch notwendige Cookies ein, um Sie über Ihre
                            Sitzung hinweg angemeldet zu halten (Session-Cookies zur
                            Authentifizierung). Diese Cookies sind für den Betrieb der App
                            erforderlich; eine Einwilligung ist hierfür gemäß § 25 Abs. 2
                            TTDSG nicht erforderlich, da keine über den Betrieb der App
                            hinausgehende Verarbeitung stattfindet.
                        </p>
                    </section>
                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">
                            8. Vercel Analytics
                        </h2>
                        <p>
                            Wir nutzen Vercel Analytics, einen Webanalysedienst der Vercel Inc.,
                            340 S Lemon Ave #4133, Walnut, CA 91789, USA, zur Auswertung
                            allgemeiner Zugriffsstatistiken (z.B. Seitenaufrufe, Herkunft der
                            Zugriffe). Der Dienst verwendet keine Cookies und keine
                            personenbezogenen Identifikatoren zur Wiedererkennung einzelner
                            Besucher über mehrere Sitzungen hinweg. Zur technischen Auswertung
                            wird ein aus der jeweiligen Anfrage gebildeter Hash-Wert verwendet,
                            der nach 24 Stunden automatisch gelöscht wird.
                        </p>
                        <p>
                            Da Vercel Inc. ein US-amerikanisches Unternehmen ist, kann es im
                            Rahmen der Datenverarbeitung zu einer Übermittlung von Daten in die
                            USA kommen. Vercel stützt sich hierbei auf die EU-Standardvertragsklauseln
                            gemäß Art. 46 DSGVO. Rechtsgrundlage der Verarbeitung ist unser
                            berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO) an der
                            Analyse und Verbesserung unseres Angebots.
                        </p>
                        </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">9. Speicherdauer</h2>
                        <p>
                            Wir speichern personenbezogene Daten so lange, wie Ihr
                            Nutzerkonto besteht. Nach Löschung Ihres Nutzerkontos werden
                            Ihre Daten unverzüglich gelöscht, soweit keine gesetzlichen
                            Aufbewahrungspflichten entgegenstehen.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">10. Ihre Rechte</h2>
                        <p>Ihnen stehen folgende Rechte zu:</p>
                        <ul className="list-disc list-inside flex flex-col gap-1">
                            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                            <li>
                                Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)
                            </li>
                        </ul>
                        <p>
                            Sie können Ihr Nutzerkonto jederzeit selbstständig über die
                            Kontoeinstellungen löschen. Für weitere Anfragen zu Ihren
                            Rechten wenden Sie sich an die oben genannte E-Mail-Adresse.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">11. Kontakt</h2>
                        <p>
                            Bei Fragen zum Datenschutz erreichen Sie uns unter:{" "}
                            info@my-semmy.com
                        </p>
                    </section>
                </article>
            </main>
        </div>
    );
}