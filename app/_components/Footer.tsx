import Link from "next/link";

export default function Footer() {
    const date = new Date();

    return (
        <footer className="flex flex-col items-center gap-2 text-sm text-slate-400 mt-16">
            <nav className="flex items-center gap-4">
                <Link href="/legal/impressum" className="hover:text-white transition">
                    Impressum
                </Link>
                <Link href="/legal/datenschutz" className="hover:text-white transition">
                    Datenschutz
                </Link>
                <Link href="/legal/nutzungsbedingungen" className="hover:text-white transition">
                    Nutzungsbedingungen
                </Link>
            </nav>
            <p>&copy; Yasemin Yazoglu, {date.getFullYear()}</p>
        </footer>
    );
}