"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "./_components/LoginForm";
import { SignupForm } from "./_components/SignupForm";
import { LoginWithGoogle } from "./_components/LoginWithGoogle";
import FormStateToggle from "./_components/FormStateToggle";
import { LoginError } from "./_components/LoginError";
import Logo from "@/components/ui/Logo";

function LoginPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialState = searchParams.get("mode") === "signup" ? "signup" : "login";
    const [formState, setFormState] = useState<"login" | "signup">(initialState);

    const handleFormStateChange = (next: "login" | "signup") => {
        setFormState(next);

        const params = new URLSearchParams(searchParams.toString());
        params.set("mode", next);

        router.replace(`/auth/login?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="min-h-screen flex justify-center items-start pt-16">
            <div className="rounded-2xl bg-white/5 border border-white/10 w-full max-w-md py-8 px-6 mx-4">
                <div className="text-center text-white">
                    <Link href="/">
                        <Logo variant="full" color="light" className="w-64 mx-auto" />
                    </Link>
                </div>
                <p className="text-sm text-white/60 my-4 text-center">
                    Verfolge und analysiere Deine Ausgaben
                </p>

                <FormStateToggle value={formState} onChange={handleFormStateChange} />

                <LoginError />

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

export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <LoginPageContent />
        </Suspense>
    );
}