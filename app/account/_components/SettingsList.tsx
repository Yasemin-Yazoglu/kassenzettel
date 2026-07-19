import type { User } from "@supabase/supabase-js";

interface Props {
    user: User;
    onChangePassword: () => void;
}

export default function SettingsList({ user, onChangePassword }: Props) {
    const hasPasswordAuth = user.app_metadata?.providers?.includes("email") ?? false;

    return (
        <section className="flex flex-col gap-3">
            {hasPasswordAuth && (
                <>
                    <p className="text-xs font-medium tracking-wide uppercase text-slate-400">
                        Einstellungen
                    </p>
                    <button
                        onClick={onChangePassword}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition"
                    >
                        <span>Passwort ändern</span>
                    </button>
                </>
            )}
        </section>
    );
}