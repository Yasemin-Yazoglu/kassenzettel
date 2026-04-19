import { group_spendings } from "../utility/function";
import { DateKey, Spending } from "../utility/type";

type Props = {
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
        <div className="container cards">
            {sorted.map(([year, total]) => (
                <button title={`${year} hast du ${total / 100}€ ausgegeben`} className="glass card" onClick={() => onSelect(year)} key={year}>
                    <h1>{year}</h1>
                    <p className="balance">{total / 100}&euro;</p>
                </button>
            ))}
        </div>
    );
}