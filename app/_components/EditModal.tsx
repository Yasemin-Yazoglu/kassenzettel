import { useState } from "react";
import { useUpdateExpense } from "@/lib/hooks/useUpdateExpense";
import { X } from "lucide-react";
import { ExpenseFrontend } from "@/lib/types/expense/ExpenseFrontend";
import type { DraftExpense } from "./ExpenseForm";
import { centsToEuros, eurosToCents } from "@/lib/money";

type EditDraft = Pick<DraftExpense, "store" | "amountDecimal">;

interface Props {
    spending: ExpenseFrontend;
    onClose: () => void;
}

export default function EditModal({ spending, onClose }: Props) {
    const [draft, setDraft] = useState<EditDraft>({
        store: spending.store,
        amountDecimal: centsToEuros(spending.amountCents),
    });
    const { mutate: updateExpense } = useUpdateExpense();
    
    const isDisabled =
        draft.store === spending.store &&
        eurosToCents(draft.amountDecimal) === spending.amountCents;

    function saveChanges() {
        updateExpense({
            id: spending.id,
            store: draft.store,
            amount_cents: eurosToCents(draft.amountDecimal),
        });

        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 flex flex-col gap-5 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-slate-900 font-semibold text-lg">Ausgabe bearbeiten</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-700 transition"
                        title="Fenster schließen"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="laden" className="text-sm text-slate-600">
                            Laden
                        </label>
                        <input
                            id="laden"
                            name="laden"
                            type="text"
                            defaultValue={spending.store}
                            placeholder="Laden"
                            title="Laden bearbeiten"
                            onChange={(e) => setDraft({ ...draft, store: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-400 transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="ausgabe" className="text-sm text-slate-600">
                            Ausgabe (EUR)
                        </label>
                        <input
                            id="ausgabe"
                            name="ausgabe"
                            type="number"
                            step="any"
                            defaultValue={spending.amountCents / 100}
                            placeholder="Ausgabe"
                            title="Ausgabe bearbeiten"
                            onChange={(e) => setDraft({ ...draft, amountDecimal: Number(e.target.value) })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-400 transition"
                        />
                    </div>
                </div>

                <div className="flex gap-3 justify-end pt-1">
                    <button
                        type="button"
                        disabled={isDisabled}
                        onClick={onClose}
                        title="Änderungen verwerfen"
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        Verwerfen
                    </button>
                    <button
                        disabled={isDisabled}
                        onClick={saveChanges}
                        title="Änderungen speichern"
                        className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition"
                    >
                        Speichern
                    </button>
                </div>
            </div>
        </div>
    );
}