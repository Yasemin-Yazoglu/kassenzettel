"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import PasswordInput from "@/app/_ui/PasswordInput";
import { SubmitButton } from "./SubmitButton";
import type { FormState } from "../types";

const initialState: FormState = { message: "" };

interface Props {
    action: (prevState: FormState, formData: FormData) => Promise<FormState>;
    submitLabel: string;
    showForgotPassword?: boolean;
}

export default function CredentialsForm({ action, submitLabel, showForgotPassword }: Props) {
    const t = useTranslations("CredentialsForm");
    const [state, formAction] = useActionState(action, initialState);

    return (
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
                    {t("emailLabel")}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t("emailPlaceholder")}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-indigo-400 transition"
                    required
                />
            </div>

            <PasswordInput
                id="password"
                name="password"
                label={t("passwordLabel")}
                placeholder={t("passwordPlaceholder")}
                variant="dark"
                required
                minLength={8}
                maxLength={72}
                autoComplete={showForgotPassword ? "current-password" : "new-password"}
            />

            {showForgotPassword && (
                <div className="flex justify-end mt-2">
                    <Link
                        href="/auth/reset-password"
                        className="text-sm text-indigo-400 hover:text-indigo-300 transition"
                    >
                        {t("forgotPassword")}
                    </Link>
                </div>
            )}

            <SubmitButton label={submitLabel} />
        </form>
    );
}