import Link from "next/link";

const LEGAL_LINKS = [
    { href: "/legal/impressum", label: "Impressum" },
    { href: "/legal/datenschutz", label: "Datenschutz" },
    { href: "/legal/nutzungsbedingungen", label: "Nutzungsbedingungen" },
] as const;

export default function Footer() {
    const currentYear = new Date().getFullYear();

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