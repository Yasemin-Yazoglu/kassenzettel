import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import UserMenu from "./UserMenu";
import Logo from "./ui/Logo";
import LanguageSwitcher from "./ui/LanguageSwitcher";

export default async function Navbar() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const claims = data?.claims;

    return (
        <nav className="flex flex-row justify-between py-4 px-4 sm:px-8">
            <Link href="/" aria-label="Zur Startseite" className="shrink-0">
                <Logo variant="full" color="light" className="hidden w-36 sm:block" />
                <Logo variant="mark" color="light" className="w-9 sm:hidden" />
            </Link>
            <div className="flex gap-4">
                <LanguageSwitcher />
                {claims ? (
                    <UserMenu
                        email={claims.email as string}
                        avatar={claims.user_metadata?.avatar_url as string | undefined}
                        name={claims.user_metadata?.full_name as string | undefined}
                    />
                ) : (
                    <Link
                        href="/auth/login"
                        className="px-4 py-2 text-sm font-medium bg-white/5 rounded-md border border-white/20 text-white/80 hover:border-indigo-400 hover:text-white transition-colors duration-200"
                    >
                        Sign in
                    </Link>
                )}
            </div>
        </nav>
    );
}