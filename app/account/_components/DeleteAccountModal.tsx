"use client";

import { useActionState } from "react";
import { deleteAccount } from "../actions";
import type { FormState } from "@/lib/types";
import { X } from "lucide-react";

const initialState: FormState = { message: "" };

interface Props {
    onClose: () => void;
}

export default function DeleteAccountModal({ onClose }: Props) {
    const [state, formAction, pending] = useActionState(deleteAccount, initialState);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 flex flex-col gap-5 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-slate-900 font-semibold text-lg">Konto löschen</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition" title="Schließen">
                        <X />
                    </button>
                </div>

                <p className="text-sm text-slate-600">
                    Diese Aktion kann nicht rückgängig gemacht werden. Alle deine Daten,
                    einschließlich deiner Ausgaben, werden dauerhaft gelöscht.
                </p>

                <form action={formAction} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="confirmText" className="text-sm text-slate-600">
                            Gib <strong>löschen</strong> ein, um zu bestätigen
                        </label>
                        <input
                            id="confirmText"
                            name="confirmText"
                            type="text"
                            autoComplete="off"
                            className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 outline-none focus:border-red-400 transition"
                            placeholder="löschen"
                            required
                        />
                    </div>

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
                            Abbrechen
                        </button>
                        <button
                            type="submit"
                            disabled={pending}
                            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition"
                        >
                            {pending ? "Löscht..." : "Konto endgültig löschen"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}