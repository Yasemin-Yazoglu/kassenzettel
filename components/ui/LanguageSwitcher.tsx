"use client";

import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
    const router = useRouter();

    function setLocale(locale: string) {
        document.cookie = `locale=${locale}; path=/; max-age=31536000`;
        router.refresh();
    }

    return (
        <div className="flex gap-2">
            <button onClick={() => setLocale("de")}>DE</button>
            <button onClick={() => setLocale("en")}>EN</button>
        </div>
    );
}