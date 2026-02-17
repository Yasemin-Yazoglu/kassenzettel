'use client'

import { useState } from "react";
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

    function handleSelection(selectedDate: number) {
        setSelectDate(false);
        setSelDate(selectedDate);
        props.getSelected(selectedDate);
    }

    return (
        <div>
            {selectDate && (
                <DateSelection type={props.date_type} value={selDate} onSelect={(selected_date) => handleSelection(selected_date)} />
            )}
            <button title={`${translate_date_to_german(props.date_type)} wählen`} type="button" onClick={() => setSelectDate(true)}>{selDate}</button>
        </div>
    );
}