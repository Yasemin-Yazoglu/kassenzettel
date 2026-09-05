"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import AccountHeader from "./_components/AccountHeader";
import PasswordModal from "./_components/PasswordModal";
import { ArrowLeft } from "lucide-react";
import SettingsList from "./_components/SettingsList";
import { formatMemberSince } from "@/lib/formatMemberSince";
import DeleteAccountModal from "./_components/DeleteAccountModal";

export default function AccountPage() {
  const t = useTranslations("AccountPage");
  const locale = useLocale();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400">{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen">
      <main className="flex flex-col w-full max-w-md gap-8 px-6 py-14">
        <header className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label={t("backToHome")}
              title={t("backToHome")}
              className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <h1 className="text-white text-2xl font-semibold">{t("title")}</h1>
          </div>

          {user.created_at && (
            <p className="text-xs text-slate-500">
              {t("memberSince", { date: formatMemberSince(user.created_at, locale) })}
            </p>
          )}

          <AccountHeader user={user} />
        </header>

        <SettingsList
          user={user}
          onChangePassword={() => setPasswordModalOpen(true)}
          onDeleteAccount={() => setDeleteModalOpen(true)}
          onLogout={handleLogout}
        />
      </main>

      {passwordModalOpen && (
        <PasswordModal onClose={() => setPasswordModalOpen(false)} />
      )}
      {deleteModalOpen && (
        <DeleteAccountModal onClose={() => setDeleteModalOpen(false)} />
      )}
    </div>
  );
}