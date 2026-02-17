import { useState } from "react";
import { group_spendings, month_to_string } from "../utility/function";
import { Spending } from "../utility/type";
import { Date_Enum } from "../utility/enum";

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

    const sorted = group_spendings(Date_Enum.MONTH, spending, "asc");

    const handleViewDetails = (month: number) => {
        setOpenMonths((prev) => ({
            ...prev,
            [month]: !prev[month],
        }));
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthSpendings.map((entry) => (
                                        <tr className="table-row" key={entry.id}>
                                            <td>{entry.day}</td>
                                            <td>{entry.store}</td>
                                            <td>{entry.amount}&euro;</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                );
            })}
        </div>
    );
}