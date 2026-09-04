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

                <article className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col gap-8 text-slate-200 leading-relaxed">
                    <p className="text-sm text-slate-400">
                        Stand: 04. September 2026
                    </p>

                    {/* 1. Einleitung */}
                    <section className="flex flex-col gap-3">
                        <h2 id="einleitung" className="text-white font-semibold text-xl">
                            1. Einleitung
                        </h2>
                        <p>
                            Diese Datenschutzerklärung gilt für die Nutzung der Anwendung
                            &bdquo;Kassenzettel&ldquo; (nachfolgend &bdquo;App&ldquo; oder &bdquo;wir&ldquo;), erreichbar unter
                            kassenzettel.my-semmy.com, mit der Nutzer ihre Lebensmittelausgaben
                            erfassen und auswerten können.
                        </p>
                        <p>
                            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                        </p>
                        <p>
                            Yasemin Yazoglu<br />
                            Victor-Andersen-Weg 10<br />
                            25436 Uetersen<br />
                            E-Mail: info@my-semmy.com
                        </p>
                        <p>
                            Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich
                            nur, soweit dies zur Bereitstellung einer funktionsfähigen
                            Anwendung sowie unserer Inhalte und Leistungen erforderlich ist.
                            Die Verarbeitung personenbezogener Daten erfolgt regelmäßig nur
                            nach Einwilligung des Nutzers oder auf Grundlage einer
                            gesetzlichen Erlaubnis (Art. 6 Abs. 1 DSGVO).
                        </p>
                    </section>

                    {/* 2. Erfasste Daten */}
                    <section className="flex flex-col gap-4">
                        <h2 id="erfasste-daten" className="text-white font-semibold text-xl">
                            2. Erfasste Daten
                        </h2>
                        <p>
                            Wir erheben ausschließlich die im Folgenden aufgeführten Daten.
                            Eine darüberhinausgehende Datenerhebung findet nicht statt.
                        </p>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">2.1 Registrierung mit E-Mail und Passwort</h3>
                            <p>Bei der Registrierung über E-Mail und Passwort erheben wir:</p>
                            <ul className="list-disc list-inside flex flex-col gap-1">
                                <li>E-Mail-Adresse</li>
                                <li>Passwort (verschlüsselt gespeichert)</li>
                                <li>Zeitpunkt der Kontoerstellung</li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 id="google-daten" className="text-white font-medium">2.2 Anmeldung über Google (OAuth)</h3>
                            <p>
                                Alternativ können Sie sich mit einem bestehenden Google-Konto
                                anmelden. Anbieter ist Google Ireland Limited, Gordon House,
                                Barrow Street, Dublin 4, Irland (bzw. Google LLC, 1600
                                Amphitheatre Parkway, Mountain View, CA 94043, USA, für
                                außerhalb des EWR ansässige Nutzer).
                            </p>
                            <p>
                                <strong>Zugriff:</strong> Kassenzettel fordert bei der
                                Google-Anmeldung ausschließlich Lesezugriff auf Ihre
                                grundlegenden Kontoinformationen an (Scopes &bdquo;email&ldquo;,
                                &bdquo;profile&ldquo;, &bdquo;openid&ldquo;). Wir fordern keinen Zugriff auf
                                weitere Google-Dienste wie Google Drive, Kontakte, Kalender
                                oder Gmail an.
                            </p>
                            <p>Konkret übermittelt Google an uns dabei:</p>
                            <ul className="list-disc list-inside flex flex-col gap-1">
                                <li>E-Mail-Adresse</li>
                                <li>Name</li>
                                <li>Profilbild (URL zu Ihrem Google-Profilbild)</li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">2.3 Ausgabendaten</h3>
                            <p>
                                Zur Kernfunktion der App gehört die Erfassung persönlicher
                                Ausgaben. Hierbei speichern wir die von Ihnen eingegebenen Daten:
                            </p>
                            <ul className="list-disc list-inside flex flex-col gap-1">
                                <li>Betrag der Ausgabe</li>
                                <li>Datum der Ausgabe</li>
                                <li>Name des Ladens/Geschäfts</li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">2.4 Technische Daten</h3>
                            <p>
                                Beim Betrieb der App fallen zusätzlich folgende technische
                                Daten an:
                            </p>
                            <ul className="list-disc list-inside flex flex-col gap-1">
                                <li>Session-Cookies zur Authentifizierung</li>
                                <li>
                                    Allgemeine, nicht personenbezogene Zugriffsstatistiken
                                    über Vercel Analytics (siehe Abschnitt 3.4)
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 3. Datenverarbeitung */}
                    <section className="flex flex-col gap-4">
                        <h2 id="datenverarbeitung" className="text-white font-semibold text-xl">
                            3. Datenverarbeitung
                        </h2>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">3.1 Nutzerkonto</h3>
                            <p>
                                Die unter 2.1 genannten Daten verwenden wir zur Erstellung,
                                Verwaltung und Absicherung Ihres Nutzerkontos sowie zur
                                Authentifizierung bei jedem Login. Rechtsgrundlage ist Art. 6
                                Abs. 1 lit. b DSGVO (Erfüllung eines Vertrags bzw.
                                vorvertragliche Maßnahmen), da das Nutzerkonto zur
                                Bereitstellung der App-Funktionen erforderlich ist.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">3.2 Google-Kontodaten</h3>
                            <p>
                                <strong>Nutzung:</strong> Die über Google erhaltenen Daten
                                (E-Mail-Adresse, Name, Profilbild) verwenden wir ausschließlich
                                zur Erstellung und Verwaltung Ihres Nutzerkontos sowie zur
                                Personalisierung der App-Oberfläche (z. B. Begrüßung mit Ihrem
                                Namen, Anzeige Ihres Profilbilds). Eine Nutzung für
                                Werbezwecke, Profilbildung oder sonstige Zwecke findet nicht
                                statt.
                            </p>
                            <p>
                                <strong>Speicherung:</strong> Diese Daten werden in unserer
                                Datenbank bei Supabase auf Servern innerhalb der Europäischen
                                Union gespeichert (siehe Abschnitt 5.1) und für die Dauer des
                                Bestehens Ihres Nutzerkontos vorgehalten. Nach Löschung Ihres
                                Nutzerkontos werden diese Daten unverzüglich gelöscht (siehe
                                Abschnitt 3.5).
                            </p>
                            <p>
                                Unsere Nutzung und Weitergabe von Informationen, die wir über
                                die Google APIs erhalten, entspricht der{" "}
                                <a
                                    href="https://developers.google.com/terms/api-services-user-data-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-400 hover:underline"
                                >
                                    Google API Services User Data Policy
                                </a>
                                , einschließlich der Limited-Use-Anforderungen.
                            </p>
                            <p>
                                Sie können den Zugriff von Kassenzettel auf Ihr Google-Konto
                                jederzeit eigenständig widerrufen. Gehen Sie dazu zu
                                myaccount.google.com/permissions und entfernen Sie dort den
                                Zugriff für Kassenzettel. Der Widerruf des Google-Zugriffs führt
                                nicht automatisch zur Löschung Ihres Nutzerkontos bei uns;
                                hierfür nutzen Sie bitte die Löschfunktion in den
                                Kontoeinstellungen (siehe Abschnitt 4.4).
                            </p>
                            <p>
                                Es können hierbei Daten in die USA übertragen werden. Google hat
                                sich den EU-Standardvertragsklauseln unterworfen bzw. bietet
                                vergleichbare Garantien gemäß Art. 46 DSGVO. Weitere
                                Informationen finden Sie in der{" "}
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
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">3.3 Ausgabendaten</h3>
                            <p>
                                Die unter 2.3 genannten Daten verwenden wir ausschließlich, um
                                Ihnen die Kernfunktion der App bereitzustellen: das Erfassen und
                                Auswerten Ihrer Ausgaben (Listen- und Grafikansicht). Diese
                                Daten sind ausschließlich für Sie selbst über Ihr Nutzerkonto
                                einsehbar. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, da die
                                Verarbeitung dieser Daten die Kernfunktion der App darstellt, zu
                                deren Nutzung Sie sich durch die Kontoerstellung entschieden
                                haben.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">3.4 Technische Daten und Analyse</h3>
                            <p>
                                Wir setzen technisch notwendige Cookies ein, um Sie über Ihre
                                Sitzung hinweg angemeldet zu halten (Session-Cookies zur
                                Authentifizierung). Diese Cookies sind für den Betrieb der App
                                erforderlich; eine Einwilligung ist hierfür gemäß § 25 Abs. 2
                                TTDSG nicht erforderlich, da keine über den Betrieb der App
                                hinausgehende Verarbeitung stattfindet.
                            </p>
                            <p>
                                Wir nutzen zudem Vercel Analytics, einen Webanalysedienst der
                                Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, zur
                                Auswertung allgemeiner Zugriffsstatistiken (z. B. Seitenaufrufe,
                                Herkunft der Zugriffe). Der Dienst verwendet keine Cookies und
                                keine personenbezogenen Identifikatoren zur Wiedererkennung
                                einzelner Besucher über mehrere Sitzungen hinweg. Zur
                                technischen Auswertung wird ein aus der jeweiligen Anfrage
                                gebildeter Hash-Wert verwendet, der nach 24 Stunden automatisch
                                gelöscht wird. Rechtsgrundlage ist unser berechtigtes Interesse
                                (Art. 6 Abs. 1 lit. f DSGVO) an der Analyse und Verbesserung
                                unseres Angebots.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">3.5 Speicherdauer</h3>
                            <p>
                                Wir speichern personenbezogene Daten so lange, wie Ihr
                                Nutzerkonto besteht. Nach Löschung Ihres Nutzerkontos werden
                                Ihre Daten unverzüglich gelöscht, soweit keine gesetzlichen
                                Aufbewahrungspflichten entgegenstehen.
                            </p>
                        </div>
                    </section>

                    {/* 4. Teilen von Information */}
                    <section className="flex flex-col gap-4">
                        <h2 id="teilen-von-information" className="text-white font-semibold text-xl">
                            4. Teilen von Information
                        </h2>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">4.1 Weitergabe an Dritte</h3>
                            <p>
                                Wir verkaufen Ihre Daten nicht und geben sie nicht zu
                                Werbezwecken an Dritte weiter. Dies gilt insbesondere für die
                                über Google erhaltenen Daten (siehe Abschnitt 3.2).
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">4.2 Auftragsverarbeiter</h3>
                            <p>
                                Eine Weitergabe Ihrer Daten erfolgt ausschließlich an folgende
                                Auftragsverarbeiter, soweit dies für den Betrieb der App
                                technisch erforderlich ist:
                            </p>
                            <ul className="list-disc list-inside flex flex-col gap-1">
                                <li>
                                    <strong>Supabase</strong> &ndash; Datenbank und
                                    Authentifizierung. Die von Ihnen eingegebenen Daten werden
                                    auf Servern innerhalb der Europäischen Union gespeichert.
                                </li>
                                <li>
                                    <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut,
                                    CA 91789, USA &ndash; Anwendungs-Hosting. Hierbei kann es zu
                                    einer Übermittlung von Daten (z. B. IP-Adresse, technische
                                    Nutzungsdaten) in die USA kommen.
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">4.3 Datenübermittlung in Drittländer</h3>
                            <p>
                                Soweit Daten in die USA übertragen werden (Google, Vercel),
                                stützen sich diese Anbieter auf die EU-Standardvertragsklauseln
                                bzw. bieten vergleichbare Garantien gemäß Art. 46 DSGVO.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 id="nutzerkonto-loeschen" className="text-white font-medium">4.4 Löschung Ihres Nutzerkontos</h3>
                            <p>
                                Sie können Ihr Nutzerkonto jederzeit selbstständig über die
                                Kontoeinstellungen löschen. Dabei werden auch die über Google
                                erhaltenen und die von Ihnen eingegebenen Ausgabendaten
                                unverzüglich gelöscht, soweit keine gesetzlichen
                                Aufbewahrungspflichten entgegenstehen.
                            </p>
                        </div>
                    </section>

                    {/* 5. Nutzerrechte */}
                    <section className="flex flex-col gap-3">
                        <h2 id="nutzerrechte" className="text-white font-semibold text-xl">
                            5. Nutzerrechte
                        </h2>
                        <p>Ihnen stehen folgende Rechte zu:</p>
                        <ul className="list-disc list-inside flex flex-col gap-1">
                            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                            <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
                        </ul>
                        <p>
                            Für Anfragen zu Ihren Rechten wenden Sie sich an die in Abschnitt 1
                            genannte E-Mail-Adresse.
                        </p>
                    </section>

                    {/* 6. Weitere Informationen */}
                    <section className="flex flex-col gap-4">
                        <h2 id="weitere-informationen" className="text-white font-semibold text-xl">
                            6. Weitere Informationen
                        </h2>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">6.1 Änderung dieser Datenschutzerklärung</h3>
                            <p>
                                Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                                damit sie stets den aktuellen rechtlichen Anforderungen
                                entspricht oder um Änderungen unserer Leistungen umzusetzen.
                                Über wesentliche Änderungen, insbesondere im Hinblick auf Art,
                                Umfang oder Zweck der Verarbeitung von über Google erhaltenen
                                Nutzerdaten, informieren wir Sie per E-Mail an die bei uns
                                hinterlegte Adresse, bevor die Änderungen wirksam werden.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white font-medium">6.2 Kontakt</h3>
                            <p>
                                Bei Fragen zum Datenschutz erreichen Sie uns unter:{" "}
                                info@my-semmy.com
                            </p>
                        </div>
                    </section>
                </article>
            </main>
        </div>
    );
}