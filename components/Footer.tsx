import Link from "next/link";
import { getTranslations } from 'next-intl/server';

export default async function Footer() {
    const t = await getTranslations("LegalLinks");
    const currentYear = new Date().getFullYear();

    const LEGAL_LINKS = [
        { href: "/legal/impressum", label: t("imprint") },
        { href: "/legal/datenschutz", label: t("privacyPolicy") },
        { href: "/legal/nutzungsbedingungen", label: t("termsOfUse") },
    ] as const;

    return (
        <footer className="flex flex-col items-center gap-2 text-sm text-slate-400 mt-16 py-8">
            <nav aria-label="Rechtliche Informationen" className="flex items-center gap-4">
                {LEGAL_LINKS.map(({ href, label }) => (
                    <Link key={href} href={href} className="hover:text-white transition">
                        {label}
                    </Link>
                ))}
            </nav>
            <p>&copy; {currentYear} Yasemin Yazoglu</p>
        </footer>
    );
}