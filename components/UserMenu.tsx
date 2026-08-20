"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { logout } from "@/lib/services/auth";
import Avatar from "@/app/_ui/Avatar";

interface Props {
    email?: string | null;
    avatar?: string | null;
    name?: string | null;
}

const MENU_ITEMS = [
    { href: "/account", label: "Konto" },
    { href: "/analytics", label: "Analytics" },
] as const;

export default function UserMenu({ email, avatar, name }: Props) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const displayName = name ?? email ?? "Guest";

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    return (
        <div className="relative" ref={containerRef}>
            <button
                ref={buttonRef}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Benutzermenü öffnen"
            >
                <Avatar src={avatar} fallbackText={displayName} size="md" />
            </button>

            {open && (
                <div
                    role="menu"
                    aria-label="Benutzermenü"
                    className="absolute right-0 mt-2 min-w-48 bg-white/5 border border-white/10 backdrop-blur-xs rounded-xl p-2 shadow-xl z-50"
                >
                    <div className="px-3 py-2 text-xs text-white/50 border-b border-white/10">
                        {email ?? "Guest"}
                    </div>

                    {MENU_ITEMS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg"
                        >
                            {label}
                        </Link>
                    ))}

                    <form action={logout}>
                        <button
                            type="submit"
                            role="menuitem"
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