import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import UserMenu from "./UserMenu";

export default async function Navbar() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const claims = data?.claims;

    return (
        <nav className="flex flex-row justify-end p-4">
            {claims ? (
                <div className="mr-4">
                    <UserMenu
                        email={claims.email as string}
                        avatar={claims.user_metadata?.avatar_url as string | undefined}
                        name={claims.user_metadata?.full_name as string | undefined}
                    />
                </div>
            ) : (
                <Link
                    href="/auth/login"
                    className="px-4 py-2 text-sm font-medium bg-white/5 rounded-md border border-white/20 text-white/80 hover:border-indigo-400 hover:text-white transition-colors duration-200"
                >
                    Sign in
                </Link>
            )}
        </nav>
    );
}