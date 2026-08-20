"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo/kassenzettel.svg";
import PasswordInput from "@/app/_ui/PasswordInput";
import { updatePassword } from "../login/actions";
import { SubmitButton } from "../login/_components/SubmitButton";
import type { FormState } from "../login/types";

const initialState: FormState = { message: "" };

export default function UpdatePasswordPage() {
    const [state, formAction] = useActionState(updatePassword, initialState);

    return (
        <div className="min-h-screen flex justify-center items-start pt-24">
            <div className="rounded-2xl bg-white/5 border border-white/10 w-full max-w-md py-8 px-6 mx-4">
                <div className="text-center">
                    <Link href="/">
                        <Image src={Logo} alt="Kassenzettel" className="w-64 mx-auto" />
                    </Link>
                </div>
                <p className="text-sm text-white/60 my-4 text-center">
                    Wähle ein neues Passwort für dein Konto.
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

                    <PasswordInput
                        id="password"
                        name="password"
                        label="Neues Passwort"
                        placeholder="Neues Passwort"
                        variant="dark"
                        required
                        minLength={8}
                        maxLength={72}
                        autoComplete="new-password"
                    />

                    <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Passwort bestätigen"
                        placeholder="Passwort bestätigen"
                        variant="dark"
                        required
                        autoComplete="new-password"
                    />

                    <SubmitButton label="Passwort speichern" />
                </form>
            </div>
        </div>
    );
}