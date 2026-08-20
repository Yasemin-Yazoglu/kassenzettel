"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo/kassenzettel.svg";
import { requestPasswordReset } from "../login/actions";
import { SubmitButton } from "../login/_components/SubmitButton";
import type { FormState } from "../login/types";

const initialState: FormState = { message: "" };

export default function ResetPasswordPage() {
    const [state, formAction] = useActionState(requestPasswordReset, initialState);

    return (
        <div className="min-h-screen flex justify-center items-start pt-24">
            <div className="rounded-2xl bg-white/5 border border-white/10 w-full max-w-md py-8 px-6 m-4">
                <div className="text-center">
                    <Link href="/">
                        <Image src={Logo} alt="Kassenzettel" className="w-64 mx-auto" />
                    </Link>
                </div>
                <p className="text-sm text-white/60 my-4 text-center">
                    Gib deine Email-Adresse ein, um dein Passwort zurückzusetzen.
                </p>

                <form action={formAction} className="space-y-5">
                    {state.message && (
                        <p
                            className={`block px-4 py-3 rounded-xl border ${
                                state.type === "success"
                                    ? "text-green-400 bg-green-400/5 border-green-400"
                                    : "text-red-400 bg-red-400/5 border-red-400"
                            }`}
                        >
                            {state.message}
                        </p>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm text-slate-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="deine@email.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-indigo-400 transition"
                            required
                        />
                    </div>

                    <SubmitButton label="Link zum Zurücksetzen senden" />
                </form>

                <p className="text-sm text-center text-white/50 mt-6">
                    <Link href="/auth/login" className="text-indigo-400 hover:text-indigo-300 transition">
                        Zurück zur Anmeldung
                    </Link>
                </p>
            </div>
        </div>
    );
}