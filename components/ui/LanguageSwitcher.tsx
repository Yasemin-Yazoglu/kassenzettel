"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import { DE, GB, TR } from "country-flag-icons/react/3x2";

const LANGUAGES = [
    { code: "de", label: "Deutsch", Flag: DE },
    { code: "en", label: "English", Flag: GB },
    { code: "tr", label: "Türkçe", Flag: TR },
] as const;

export default function LanguageSwitcher() {
    const router = useRouter();
    const locale = useLocale();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function setLocale(code: string) {
        document.cookie = `locale=${code}; path=/; max-age=31536000`;
        setOpen(false);
        router.refresh();
    }

    return (
        <div ref={ref} className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-1.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
            >
                <current.Flag className="w-6 h-auto rounded-[2px]" />
                <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-100 border border-slate-200 shadow-lg overflow-hidden z-50">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            type="button"
                            onClick={() => setLocale(lang.code)}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-slate-200 transition ${
                                lang.code === locale ? "text-slate-900 font-bold" : "text-slate-600"
                            }`}
                        >
                            <lang.Flag className="w-5 h-auto rounded-[2px]" />
                            <span>{lang.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}