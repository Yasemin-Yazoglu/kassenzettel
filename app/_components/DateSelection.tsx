import { useEffect, useRef, useState } from "react";
import { DateKey } from "../utility/type";

interface Props {
    type: DateKey;
    value: number;
    onSelect: (date: number) => void;
    onClose: () => void;
}

const YEARS_BACK = 100;

export default function DateSelection(props: Props) {
    const dateList = buildDateList(props.type);
    const [highlighted, setHighlighted] = useState<number>(props.value);
    const selectedRef = useRef<HTMLLIElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        selectedRef.current?.scrollIntoView({ block: "center", inline: "center" });
    }, [highlighted]);

    useEffect(() => {
        listRef.current?.focus();
    }, []);

    function moveHighlight(direction: 1 | -1) {
        const currentIndex = dateList.indexOf(highlighted);
        const nextIndex = Math.min(Math.max(currentIndex + direction, 0), dateList.length - 1);
        setHighlighted(dateList[nextIndex]);
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                moveHighlight(-1);
                break;
            case "ArrowDown":
                event.preventDefault();
                moveHighlight(1);
                break;
            case "Enter":
                event.preventDefault();
                props.onSelect(highlighted);
                break;
            case "Escape":
                event.preventDefault();
                props.onClose();
                break;
        }
    }

    return (
        <ul
            ref={listRef}
            role="listbox"
            aria-activedescendant={`date-option-${highlighted}`}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="date-selection backdrop-blur-sm bg-white/5 border border-white/10 outline-none"
        >
            {dateList.map((date) => {
                const isHighlighted = date === highlighted;
                return (
                    <li
                        key={date}
                        id={`date-option-${date}`}
                        role="option"
                        aria-selected={isHighlighted}
                        ref={isHighlighted ? selectedRef : null}
                    >
                        <button
                            type="button"
                            tabIndex={-1}
                            className={`w-full ${isHighlighted ? "font-semibold text-indigo-400" : ""}`}
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