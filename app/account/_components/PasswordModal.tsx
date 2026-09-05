"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { changePassword } from "../actions";
import type { FormState } from "@/lib/types";
import PasswordInput from "@/app/_ui/PasswordInput";
import { X } from "lucide-react";

const initialState: FormState = { message: "" };

interface Props {
    onClose: () => void;
}

export default function PasswordModal({ onClose }: Props) {
    const t = useTranslations("PasswordModal");
    const [state, formAction, pending] = useActionState(changePassword, initialState);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 flex flex-col gap-5 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-slate-900 font-semibold text-lg">{t("title")}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition" title={t("close")}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form action={formAction} className="flex flex-col gap-3">
                    <PasswordInput
                        id="currentPassword"
                        name="currentPassword"
                        label={t("currentPasswordLabel")}
                        placeholder={t("currentPasswordLabel")}
                        autoComplete="current-password"
                        variant="light"
                        required
                    />

                    <PasswordInput
                        id="newPassword"
                        name="newPassword"
                        label={t("newPasswordLabel")}
                        placeholder={t("newPasswordLabel")}
                        autoComplete="new-password"
                        variant="light"
                        required
                        minLength={8}
                        maxLength={72}
                    />
                    <p className="text-xs text-slate-400 -mt-2">
                        {t("passwordHint")}
                    </p>

                    <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        label={t("confirmPasswordLabel")}
                        placeholder={t("confirmPasswordLabel")}
                        autoComplete="new-password"
                        variant="light"
                        required
                    />

                    {state.message && (
                        <p className={state.type === "error" ? "text-red-500 text-sm" : "text-emerald-600 text-sm"}>
                            {state.message}
                        </p>
                    )}

                    <div className="flex gap-3 justify-end pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={pending}
                            className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition"
                        >
                            {pending ? t("saving") : t("submit")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}