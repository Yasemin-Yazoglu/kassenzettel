import { formatCurrency } from "@/lib/formatCurrency";
import { group_spendings } from "../utility/function";
import { DateKey, Spending } from "../utility/type";

interface Props {
    type: DateKey;
    spendings: Spending[];
    onSelect: (year: number) => void;
}

export default function CardsContainer({
    type,
    spendings,
    onSelect,
}: Props) {
    const sorted = group_spendings(type, spendings, "desc");

    return (
        <div className="max-w-5xl m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sorted.map(([year, total]) => (
                <button
                    key={year}
                    title={`${year} hast du ${formatCurrency(total / 100)} ausgegeben`}
                    onClick={() => onSelect(year)}
                    className="w-full flex flex-col text-left gap-3 justify-between px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-400/40 transition"
                >
                    <span className="text-white/90 font-semibold text-4xl">{year}</span>
                    <span className="text-indigo-400 font-medium">
                        {formatCurrency(total/ 100)}
                    </span>
                </button>
            ))}
        </div>
    );
}