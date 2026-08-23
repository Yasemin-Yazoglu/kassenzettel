'use client'

import { useEffect, useRef, useState } from "react";
import DateSelection from "./DateSelection";
import { translate_date_to_german } from "../utility/function";
import { DateKey } from "../utility/type";

interface Props {
    date_type: DateKey;
    today: number;
    getSelected: (d: number) => void;
}

export default function DateComponent(props: Props) {
    const [selectDate, setSelectDate] = useState<boolean>(false);
    const [selDate, setSelDate] = useState<number>(props.today);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    function handleSelection(selectedDate: number) {
        setSelectDate(false);
        setSelDate(selectedDate);
        props.getSelected(selectedDate);
    }

    function closeAndReturnFocus() {
        setSelectDate(false);
        buttonRef.current?.focus();
    }

    useEffect(() => {
        if (!selectDate) return;

        function handleClickOutside(event: MouseEvent) {
            if (!containerRef.current?.contains(event.target as Node)) {
                setSelectDate(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                closeAndReturnFocus();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [selectDate]);

    return (
        <div ref={containerRef}>
            {selectDate && (
                <DateSelection
                    type={props.date_type}
                    value={selDate}
                    onSelect={handleSelection}
                    onClose={closeAndReturnFocus}
                />
            )}
            <button
                ref={buttonRef}
                title={`${translate_date_to_german(props.date_type)} wählen`}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={selectDate}
                onClick={() => setSelectDate(true)}
            >
                {selDate}
            </button>
        </div>
    );
}