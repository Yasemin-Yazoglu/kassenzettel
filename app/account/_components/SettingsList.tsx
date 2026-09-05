import type { User } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";

interface Props {
    user: User;
    onChangePassword: () => void;
    onDeleteAccount: () => void;
    onLogout: () => void;
}

export default function SettingsList({ user, onChangePassword, onDeleteAccount, onLogout }: Props) {
    const t = useTranslations("SettingsList");
    const hasPasswordAuth = user.app_metadata?.providers?.includes("email") ?? false;

    return (
        <section className="flex flex-col gap-3">
            {hasPasswordAuth && (
                <>
                    <p className="text-xs font-medium tracking-wide uppercase text-slate-400">
                        {t("settingsLabel")}
                    </p>
                    <button
                        onClick={onChangePassword}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition"
                    >
                        <span>{t("changePassword")}</span>
                    </button>
                </>
            )}

            <button
                onClick={onLogout}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition"
            >
                <span>{t("logout")}</span>
            </button>

            <div className="h-px bg-white/10 my-2" />

            <button
                onClick={onDeleteAccount}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border text-red-400 bg-red-400/5 border-red-400 hover:bg-red-400/10 transition"
            >
                <span>{t("deleteAccount")}</span>
            </button>

        </section>
    );
}