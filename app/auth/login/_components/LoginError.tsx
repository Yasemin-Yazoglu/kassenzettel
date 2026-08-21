"use client";

import { useSearchParams } from "next/navigation";

export function LoginError() {
    const searchParams = useSearchParams();
    const oauthError = searchParams.get("error");

    if (!oauthError) return null;

    return (
        <p className="mb-5 block px-4 py-3 rounded-xl border text-red-400 bg-red-400/5 border-red-400">
            {oauthError}
        </p>
    );
}