"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  if (loading) return null;

  return (
    <nav className="flex flex-row justify-end p-4">
      {user ? (
        <div className="mr-4">
          <UserMenu 
            email={user?.email} 
            avatar={user?.user_metadata?.avatar_url}
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