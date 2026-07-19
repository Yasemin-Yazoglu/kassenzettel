"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import AccountHeader from "./_components/AccountHeader";
import PasswordModal from "./_components/PasswordModal";
import { ArrowLeft } from "lucide-react";
import SettingsList from "./_components/SettingsList";
import { formatMemberSince } from "@/lib/formatMemberSince";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

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
        <p className="text-slate-400">Lädt...</p>
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
              aria-label="Zurück zur Startseite"
              title="Zurück zur Startseite"
              className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <h1 className="text-white text-2xl font-semibold">Konto</h1>
          </div>

          {user.created_at && (
            <p className="text-xs text-slate-500">
              Mitglied seit {formatMemberSince(user.created_at)}
            </p>
          )}

          <AccountHeader user={user} />
        </header>

        <SettingsList
          user={user}
          onChangePassword={() => setPasswordModalOpen(true)}
        />

        <section className="flex flex-col gap-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border text-red-400 bg-red-400/5 border-red-400 hover:bg-red-400/10 transition"
          >
            <span>Abmelden</span>
          </button>
        </section>
      </main>

      {passwordModalOpen && (
        <PasswordModal onClose={() => setPasswordModalOpen(false)} />
      )}
    </div>
  );
}