import { useEffect, useState } from "react";
import { Spending } from "../utility/type";
import { useUpdateExpense } from "@/lib/hooks/useUpdateExpense";
import { X } from "lucide-react";

interface Props {
    spending: Spending;
    onClose: () => void;
}

export default function EditModal({ spending, onClose }: Props) {
    const [costItem, setCostItem] = useState<Spending>(spending);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const { mutate: updateExpense } = useUpdateExpense();

    useEffect(() => {
        if (costItem.store !== spending.store || costItem.amount !== spending.amount) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [costItem]);

    function saveChanges() {
        updateExpense({
            id: costItem.id,
            store: costItem.store,
            amount: costItem.amount,
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
                            onChange={(e) => setCostItem({ ...costItem, store: e.target.value })}
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
                            defaultValue={spending.amount}
                            placeholder="Ausgabe"
                            title="Ausgabe bearbeiten"
                            onChange={(e) => setCostItem({ ...costItem, amount: Number(e.target.value) })}
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