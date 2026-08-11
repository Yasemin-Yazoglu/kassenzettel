"use client";

import { useState, useEffect, useRef } from "react";
import { logout } from "../../lib/services/auth";
import Avatar from "../_ui/Avatar";

type Props = {
  email?: string | null;
  avatar?: string | null;
};

export default function UserMenu({ email, avatar }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* ICON */}
      <button
        onClick={() => setOpen((v) => !v)}
      >
        <Avatar src={avatar} fallbackText={email ? email[0].toUpperCase() : "U"} size="md" />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 min-w-48 main-bg rounded-xl p-2 shadow-xl z-50">
          <div className="px-3 py-2 text-xs text-white/50 border-b border-white/10">
            {email ?? "Guest"}
          </div>

          <a
            href="/account"
            className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg"
          >
            Konto
          </a>

          <a
            href="/analytics"
            className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg"
          >
            Analytics
          </a>

          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-white/10 rounded-lg"
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}