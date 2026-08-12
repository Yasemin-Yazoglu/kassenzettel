import { X } from "lucide-react";
import { Spending } from "../utility/type";
import { useDeleteExpense } from "@/lib/hooks/useDeleteExpense";

interface Props {
    spending: Spending;
    onClose: () => void;
}

export default function DeleteModal({
    spending,
    onClose
}: Props) {
    const { mutate: deleteExpense } = useDeleteExpense();

    function deleteItem() {
        deleteExpense(spending.id);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 flex flex-col gap-5 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-slate-900 font-semibold text-lg">Bist du dir sicher?</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-700 transition"
                        title="Fenster schließen"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-sm text-slate-600">
                    Möchtest du wirklich die Ausgabe vom {spending.day}.{spending.month}.{spending.year}{" "}
                    bei {spending.store} in Höhe von {spending.amount}&euro; löschen?
                </p>

                <div className="flex gap-3 justify-end pt-1">
                    <button
                        onClick={onClose}
                        title="Ausgabe behalten"
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                    >
                        Behalten
                    </button>
                    <button
                        onClick={deleteItem}
                        title="Ausgabe löschen"
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition"
                    >
                        Löschen
                    </button>
                </div>
            </div>
        </div>
    );
}