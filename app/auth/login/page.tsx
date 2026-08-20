"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo/kassenzettel.svg";
import { LoginForm } from "./_components/LoginForm";
import { SignupForm } from "./_components/SignupForm";
import { LoginWithGoogle } from "./_components/LoginWithGoogle";
import FormStateToggle from "./_components/FormStateToggle";

export default function LoginPage() {
    const [formState, setFormState] = useState<"login" | "signup">("login");
    const searchParams = useSearchParams();
    const oauthError = searchParams.get("error");

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="rounded-2xl bg-white/5 border border-white/10 w-full max-w-md py-8 px-6 mx-4">
                <div className="text-center">
                    <Link href="/">
                        <Image src={Logo} alt="Kassenzettel" className="w-64 mx-auto" />
                    </Link>
                </div>
                <p className="text-sm text-white/60 my-4 text-center">
                    Verfolge und analysiere Deine Ausgaben
                </p>

                <FormStateToggle value={formState} onChange={setFormState} />

                {oauthError && (
                    <p className="mb-5 block px-4 py-3 rounded-xl border text-red-400 bg-red-400/5 border-red-400">
                        {oauthError}
                    </p>
                )}

                {formState === "login" ? <LoginForm /> : <SignupForm />}

                <div className="relative my-6">
                    <hr className="w-full border-t border-white/10" />
                </div>

                <LoginWithGoogle />

                <p className="text-xs text-center text-white/40 mt-6">
                    Mit der Nutzung stimmst du unseren{" "}
                    <a
                        href="/legal/nutzungsbedingungen"
                        className="underline underline-offset-2 hover:text-white/60 transition"
                    >
                        Nutzungsbedingungen
                    </a>{" "}
                    zu.
                </p>
            </div>
        </div>
    );
}