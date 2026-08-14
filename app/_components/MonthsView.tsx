import { useState } from "react";
import { ArrowLeft, ChevronDown, PenIcon, X } from "lucide-react";
import { group_spendings, month_to_string } from "../utility/function";
import { Spending } from "../utility/type";
import { Date_Enum } from "../utility/enum";
import { formatCurrency } from "@/lib/formatCurrency";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

type Props = {
    selected_year: number;
    spending: Spending[];
    onClose: () => void;
}

export default function MonthsView({
    selected_year,
    spending,
    onClose,
}: Props) {
    const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});
    const [editModal, setEditModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [selectedSpending, setSelectedSpending] = useState<Spending>({
        id: "",
        year: 0,
        month: 0,
        day: 0,
        store: "",
        amount: 0,
    });

    const sorted = group_spendings(Date_Enum.MONTH, spending, "asc");

    const handleViewDetails = (month: number) => {
        setOpenMonths((prev) => ({
            ...prev,
            [month]: !prev[month],
        }));
    }

    function handleEditSpending(spending: Spending, action: "edit" | "delete") {
        setSelectedSpending(spending);
        if (action === "edit") {
            setEditModal(true);
        } else if (action === "delete") {
            setDeleteModal(true);
        }
    }

    return (
        <div className="flex flex-col gap-4 mx-4 lg:mx-0">
            <div className="flex items-center justify-between">
                <button
                    onClick={onClose}
                    aria-label="Zurück"
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Zurück</span>
                </button>
                <p className="font-semibold text-white">{selected_year}</p>
            </div>

            <div className="flex flex-col gap-2">
                {sorted.map(([month, total]) => {
                    const monthSpendings = spending
                        .filter((entry) => entry.month === month)
                        .sort((a, b) => b.day - a.day);

                    const isOpen = openMonths[month];

                    return (
                        <div key={month} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                            <button
                                title="Details anzeigen"
                                onClick={() => handleViewDetails(month)}
                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition"
                            >
                                <span className="text-white">{month_to_string(month)}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-indigo-400 font-medium">
                                        {formatCurrency(total / 100)}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                    />
                                </div>
                            </button>

                            {isOpen && (
                                <div className="border-t border-white/10 flex flex-col">
                                    {monthSpendings.map((entry) => (
                                        <div
                                            key={entry.id}
                                            className="flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-b-0"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <span className="text-slate-400 text-sm w-6 shrink-0">{entry.day}.</span>
                                                <span className="text-white truncate">{entry.store}</span>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                                <span className="text-slate-200 text-sm">
                                                    {formatCurrency(entry.amount)}
                                                </span>
                                                <button
                                                    title="Bearbeiten"
                                                    onClick={() => handleEditSpending(entry, "edit")}
                                                    className="text-slate-400 hover:text-white transition"
                                                >
                                                    <PenIcon className="w-4 h-4" />
                                                </button>
                                                <button
                                                    title="Eintrag löschen"
                                                    onClick={() => handleEditSpending(entry, "delete")}
                                                    className="text-slate-400 hover:text-red-400 transition"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {editModal && (
                <EditModal spending={selectedSpending} onClose={() => setEditModal(false)} />
            )}

            {deleteModal && (
                <DeleteModal spending={selectedSpending} onClose={() => setDeleteModal(false)} />
            )}
        </div>
    );
}