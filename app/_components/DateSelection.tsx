import { DateKey } from "../utility/type";

type Props = {
    type: DateKey;
    value: number;
    onSelect: (date: number) => void;
}

export default function DateSelection(props: Props) {
    let date_list: number[] = [];

    let dec:number = 0;
    let start:number = props.value;
    switch (props.type) {
        case "year":
            const current_year = new Date();
            dec = 100;
            start = current_year.getFullYear();
            break;
        case "month":
            dec = 12;
            start = 12;
            break;
        case "day":
            dec = 31;
            start = 31;
            break;
    }

    for(let i = start; i > start - dec; --i) {
        date_list.push(i);
    }

    return (
        <div className="date-selection glass">
            {date_list.map((date) => (
                <li key={date}>
                    <button type="button" className="w-full" onClick={() => props.onSelect(date)}>{date}</button>
                </li>
            ))}
        </div>
    );
}