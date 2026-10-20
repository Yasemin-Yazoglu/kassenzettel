import { group_spendings } from "../utility/function";
import { DateKey } from "../utility/type";
import { useTranslations } from "next-intl";
import { ExpenseFrontend } from "@/lib/types/expense/ExpenseFrontend";
import { formatCurrencyFromCents } from "@/lib/money";

interface Props {
    type: DateKey;
    spendings: ExpenseFrontend[];
    onSelect: (year: number) => void;
}

export default function CardsContainer({
    type,
    spendings,
    onSelect,
}: Props) {
    const t = useTranslations("CardsContainer");
    const sorted = group_spendings(type, spendings, "desc");

    return (
        <div className="max-w-5xl m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sorted.map(([year, total]) => (
                <button
                    key={year}
                    title={t("yearSpendingTitle", { year, amount: formatCurrencyFromCents(total) })}
                    onClick={() => onSelect(year)}
                    className="w-full flex flex-col text-left gap-3 justify-between px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-400/40 transition"
                >
                    <span className="text-white/90 font-semibold text-4xl">{year}</span>
                    <span className="text-indigo-400 font-medium">
                        {formatCurrencyFromCents(total)}
                    </span>
                </button>
            ))}
        </div>
    );
}