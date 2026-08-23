import { useEffect, useRef } from "react";
import { DateKey } from "../utility/type";

interface Props {
    type: DateKey;
    value: number;
    onSelect: (date: number) => void;
}

const YEARS_BACK = 100;

export default function DateSelection(props: Props) {
    const dateList = buildDateList(props.type);
    const selectedRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        selectedRef.current?.scrollIntoView({ block: "center", inline: "center" });
    }, []);

    return (
        <ul className="date-selection backdrop-blur-sm bg-white/5 border border-white/10">
            {dateList.map((date) => {
                const isSelected = date === props.value;
                return (
                    <li key={date} ref={isSelected ? selectedRef : null}>
                        <button
                            type="button"
                            className="w-full"
                            aria-current={isSelected ? "true" : undefined}
                            onClick={() => props.onSelect(date)}
                        >
                            {date}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

function buildDateList(type: DateKey): number[] {
    switch (type) {
        case "year": {
            const currentYear = new Date().getFullYear();
            return range(currentYear, currentYear - YEARS_BACK + 1);
        }
        case "month":
            return range(12, 1);
        case "day":
            return range(31, 1);
        default: {
            return [];
        }
    }
}

function range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i >= end; i--) {
        result.push(i);
    }
    return result;
}