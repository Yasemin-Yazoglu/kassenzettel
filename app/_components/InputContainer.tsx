"use client";

import React, { useState } from "react";
import { Date_Enum } from "../utility/enum";
import DateComponent from "./DateComponent";
import { useAddExpense } from "@/lib/hooks/useAddExpense";
import { toDbDate } from "@/lib/date";

type DraftExpense = {
    year: number;
    month: number;
    day: number;
    store: string;
    amount: number;
};

export default function InputContainer() {
    const today_date = new Date();
    const [draft, setDraft] = useState<DraftExpense>({
        year: today_date.getFullYear(),
        month: today_date.getMonth() + 1,
        day: today_date.getDate(),
        store: "",
        amount: 0.0,
    });

    const { mutate: addExpense } = useAddExpense();

    function handleSubmit(item: DraftExpense) {
        addExpense({
            store: item.store,
            amount: item.amount,
            spend_at: toDbDate(item.day, item.month, item.year),
        });

        setDraft((prev) => ({ ...prev, store: "", amount: 0.0 }));
    }

    return (
        <div>
            <form className="input-container text-white" action={() => handleSubmit(draft)}>
                <div className="date-row">
                    <div className="input-item date-item">
                        <DateComponent getSelected={(date: number) => setDraft((prev) => ({...prev, year: date}))} date_type={Date_Enum.YEAR} today={draft.year} />
                    </div>
                    <div className="input-item date-item">
                        <DateComponent getSelected={(date: number) => setDraft((prev) => ({...prev, month: date}))} date_type={Date_Enum.MONTH} today={draft.month} />
                    </div>
                    <div className="input-item date-item">
                        <DateComponent getSelected={(date: number) => setDraft((prev) => ({...prev, day: date}))} date_type={Date_Enum.DAY} today={draft.day} />
                    </div>
                </div>
                <input 
                    title="Eingeben in welchem Laden eingekauft wurde"
                    name="store"
                    required 
                    value={draft.store}
                    onChange={(e) => setDraft({...draft, store: e.target.value})} 
                    className="input-item input-box" 
                    type="text" 
                    placeholder="Laden"
                />
                <input 
                    title="Angeben wie viel ausgegeben wurde"
                    name="amount"
                    required 
                    value={draft.amount === 0 ? "" : draft.amount}
                    onChange={(e) => setDraft({...draft, amount: Number(e.target.value)})} 
                    className="input-item input-box w-48" 
                    type="number" 
                    step="any"
                    placeholder="Ausgabe"
                />
                <button type="submit" hidden />
            </form>
        </div>
    );
}