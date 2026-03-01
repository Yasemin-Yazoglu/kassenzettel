import { useState } from "react";
import { group_spendings, month_to_string } from "../utility/function";
import { Spending } from "../utility/type";
import { Date_Enum } from "../utility/enum";
import EditModal from "./EditModal";
import Icon from "../_ui/Icon";
import DeleteModal from "./DeleteModal";

type Props = {
    selected_year: number;
    spending: Spending[];
    onClose: () => void;
    setSpendings: React.Dispatch<React.SetStateAction<Spending[]>>;
}

export default function MonthsView({
    selected_year,
    spending,
    onClose,
    setSpendings,
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
        if(action === "edit") {
            setEditModal(true);
        }
        else if (action === "delete") {
            setDeleteModal(true);
        }
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-row items-center justify-between">
                <button className="hover:underline" onClick={onClose}>Zurück</button>
                <p className="font-bold">{selected_year}</p>
            </div>
            {sorted.map(([month, total]) => {
                const monthSpendings = spending.filter(
                    (entry) => entry.month === month
                );

                monthSpendings.sort((a, b) => b.day - a.day);

                return (
                    <div className="p-2 my-2 rounded glass" key={month}>
                        <button title="Zeige Details" onClick={() => handleViewDetails(month)} className="w-full flex flex-row justify-between">
                            <h1>{month_to_string(month)}</h1>
                            <h1>{total}€</h1>
                        </button>
                        {openMonths[month] && (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-white text-black">
                                        <th>Tag</th>
                                        <th>Laden</th>
                                        <th>Ausgaben</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthSpendings.map((entry) => (
                                        <tr className="table-row" key={entry.id}>
                                            <td>{entry.day}</td>
                                            <td>{entry.store}</td>
                                            <td>{entry.amount}&euro;</td>
                                            <td className="flex items-center justify-end gap-2">
                                                <button title="Bearbeiten" className="m-1" onClick={() => handleEditSpending(entry, "edit")}>
                                                    <Icon name="editIcon" className="w-5 h-5" />
                                                </button>
                                                <button title="Eintrag löschen" onClick={() => handleEditSpending(entry, "delete")}>
                                                    <Icon name="closeIcon" className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                );
            })}
            {editModal && (
                <EditModal setSpendings={setSpendings} spending={selectedSpending} onClose={() => setEditModal(false)} />
            )}

            {deleteModal && (
                <DeleteModal setSpendings={setSpendings} spending={selectedSpending} onClose={() => setDeleteModal(false)} />
            )}
        </div>
    );
}