import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NutzungsbedingungenPage() {
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
                    <h1 className="text-white text-2xl font-semibold">Nutzungsbedingungen</h1>
                </div>

                <article className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col gap-6 text-slate-200 leading-relaxed">
                    <p className="text-sm text-slate-400">
                        Stand: 03. August 2026
                    </p>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">1. Geltungsbereich</h2>
                        <p>
                            Diese Nutzungsbedingungen gelten für die Nutzung der Anwendung
                            &bdquo;Kassenzettel&ldquo; (nachfolgend &bdquo;App&ldquo;), bereitgestellt von:
                        </p>
                        <p>
                            Yasemin Yazoglu<br />
                            Victor-Andersen-Weg 10, 25436 Uetersen<br />
                            info@my-semmy.com
                        </p>
                        <p>(nachfolgend &bdquo;Anbieter&ldquo;).</p>
                        <p>
                            Mit der Erstellung eines Nutzerkontos und/oder der Nutzung der App
                            erklärt sich der Nutzer mit diesen Nutzungsbedingungen einverstanden.
                        </p>
                        <p>
                            Die App wird derzeit von einer Privatperson betrieben. Der Anbieter
                            behält sich vor, den Betrieb der App künftig auf ein registriertes
                            Unternehmen zu übertragen; Nutzer werden über eine solche Änderung
                            rechtzeitig informiert.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">2. Leistungsbeschreibung</h2>
                        <p>
                            Die App ermöglicht es Nutzern, persönliche Ausgaben zu erfassen,
                            zu kategorisieren und auszuwerten. Die Nutzung erfolgt über ein
                            persönliches, passwortgeschütztes Nutzerkonto.
                        </p>
                        <p>
                            Der Anbieter behält sich vor, den Funktionsumfang der App
                            jederzeit zu erweitern, einzuschränken oder zu ändern, sofern
                            dies dem Nutzer zumutbar ist.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">3. Registrierung und Nutzerkonto</h2>
                        <p>
                            3.1 Zur Nutzung der App ist die Erstellung eines Nutzerkontos
                            erforderlich. Der Nutzer verpflichtet sich, bei der Registrierung
                            wahrheitsgemäße Angaben zu machen.
                        </p>
                        <p>
                            3.2 Der Nutzer ist für die Geheimhaltung seiner Zugangsdaten
                            selbst verantwortlich. Bei Verdacht auf unbefugten Zugriff ist
                            der Anbieter unverzüglich zu informieren.
                        </p>
                        <p>
                            3.3 Die Nutzung der App ist Personen ab{" "}
                            14 Jahren gestattet.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">4. Nutzungsrechte</h2>
                        <p>
                            Der Anbieter räumt dem Nutzer ein einfaches, nicht übertragbares
                            Recht ein, die App im Rahmen dieser Nutzungsbedingungen zu
                            nutzen. Eine gewerbliche Weiterverwertung, Vervielfältigung
                            oder Bearbeitung der App ohne vorherige Zustimmung des Anbieters
                            ist untersagt.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">5. Pflichten des Nutzers</h2>
                        <p>Der Nutzer verpflichtet sich,</p>
                        <ul className="list-disc list-inside flex flex-col gap-1">
                            <li>keine rechtswidrigen Inhalte über die App zu verbreiten,</li>
                            <li>
                                die App nicht in einer Weise zu nutzen, die deren
                                Funktionsfähigkeit beeinträchtigen könnte,
                            </li>
                            <li>
                                keine automatisierten Systeme (Bots, Scraper) zur Nutzung der
                                App einzusetzen, sofern nicht ausdrücklich gestattet.
                            </li>
                        </ul>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">6. Kostenlose Nutzung / Preise</h2>
                        <p>
                            Die Nutzung der App ist derzeit kostenlos. Der Anbieter behält
                            sich vor, zukünftig kostenpflichtige Zusatzfunktionen
                            einzuführen. Über die Einführung kostenpflichtiger Funktionen
                            wird der Nutzer rechtzeitig vorab informiert; bestehende
                            kostenlose Funktionen werden hiervon nicht rückwirkend
                            betroffen, es sei denn, der Nutzer stimmt einer Änderung
                            ausdrücklich zu.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">7. Verfügbarkeit</h2>
                        <p>
                            Der Anbieter bemüht sich um eine möglichst unterbrechungsfreie
                            Verfügbarkeit der App, übernimmt jedoch keine Garantie für eine
                            ständige Verfügbarkeit. Wartungsarbeiten, technische Störungen
                            oder Ausfälle von Drittanbietern (z.B. Hosting- oder
                            Infrastrukturdienstleister) können zu vorübergehenden
                            Einschränkungen führen.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">8. Haftung</h2>
                        <p>
                            8.1 Der Anbieter haftet unbeschränkt für Vorsatz und grobe
                            Fahrlässigkeit sowie nach Maßgabe des Produkthaftungsgesetzes.
                        </p>
                        <p>
                            8.2 Für leichte Fahrlässigkeit haftet der Anbieter nur bei
                            Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht),
                            deren Erfüllung die ordnungsgemäße Durchführung der Nutzung
                            überhaupt erst ermöglicht und auf deren Einhaltung der Nutzer
                            regelmäßig vertrauen darf. In diesem Fall ist die Haftung auf
                            den vorhersehbaren, vertragstypischen Schaden begrenzt.
                        </p>
                        <p>
                            8.3 Die App dient der persönlichen Verwaltung von
                            Ausgabeninformationen. Der Anbieter übernimmt keine Gewähr für
                            die Richtigkeit, Vollständigkeit oder Aktualität der vom Nutzer
                            eingegebenen oder daraus erstellten Auswertungen. Die App
                            stellt keine Finanz-, Steuer- oder Anlageberatung dar.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">9. Datenschutz</h2>
                        <p>
                            Informationen zur Erhebung, Verarbeitung und Nutzung
                            personenbezogener Daten finden sich in der{" "}
                            <Link href="/legal/datenschutz" className="text-indigo-400 hover:underline">
                                Datenschutzerklärung
                            </Link>
                            .
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">10. Kündigung / Kontolöschung</h2>
                        <p>
                            Der Nutzer kann sein Nutzerkonto jederzeit über die
                            Kontoeinstellungen löschen. Der Anbieter kann Nutzerkonten bei
                            Verstößen gegen diese Nutzungsbedingungen sperren oder löschen.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">11. Änderungen der Nutzungsbedingungen</h2>
                        <p>
                            Der Anbieter behält sich vor, diese Nutzungsbedingungen mit
                            Wirkung für die Zukunft zu ändern, sofern dies zur Anpassung an
                            geänderte rechtliche oder technische Rahmenbedingungen
                            erforderlich ist. Über wesentliche Änderungen wird der Nutzer
                            in Textform (z.B. per E-Mail) informiert.
                        </p>
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="text-white font-semibold text-lg">12. Schlussbestimmungen</h2>
                        <p>
                            12.1 Es gilt das Recht der Bundesrepublik Deutschland unter
                            Ausschluss des UN-Kaufrechts.
                        </p>
                        <p>
                            12.2 Sollten einzelne Bestimmungen dieser Nutzungsbedingungen
                            unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen
                            Bestimmungen hiervon unberührt.
                        </p>
                        <p>
                            12.3 Gerichtsstand ist, soweit gesetzlich zulässig,{" "}
                            Heidelberg, Deutschland.
                        </p>
                    </section>
                </article>
            </main>
        </div>
    );
}