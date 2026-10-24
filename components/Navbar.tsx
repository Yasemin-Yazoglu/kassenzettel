import Link from "next/link";
import UserMenu from "./UserMenu";
import Logo from "./ui/Logo";
import LanguageSwitcher from "./ui/LanguageSwitcher";
import type { User } from "@supabase/supabase-js";

export default function Navbar({ user }: { user: User | null }) {

    return (
        <nav className="flex flex-row justify-between py-4 px-4 sm:px-8">
            <Link href="/" aria-label="Zur Startseite" className="shrink-0">
                <Logo variant="full" color="light" className="hidden w-36 sm:block" />
                <Logo variant="mark" color="light" className="w-9 sm:hidden" />
            </Link>
            <div className="flex gap-4 items-center">
                <LanguageSwitcher />
                {user ? (
                    <UserMenu
                        email={user.email ?? ""}
                        avatar={user.user_metadata?.avatar_url as string | undefined}
                        name={user.user_metadata?.full_name as string | undefined}
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