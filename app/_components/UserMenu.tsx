"use client";

import { useState, useEffect, useRef } from "react";
import { logout } from "@/app/actions";

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
        className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
            />
        ) : (
          <span className="text-white">
            {email ? email[0].toUpperCase() : "U"}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 min-w-48 glass rounded-xl p-2 shadow-xl z-50">
          <div className="px-3 py-2 text-xs text-white/50 border-b border-white/10">
            {email ?? "Guest"}
          </div>

          <a
            href="/dashboard"
            className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg"
          >
            Dashboard
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