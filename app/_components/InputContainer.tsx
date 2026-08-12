"use client";

import { useState } from "react";
import { Date_Enum } from "../utility/enum";
import DateComponent from "./DateComponent";
import { useAddExpense } from "@/lib/hooks/useAddExpense";
import { toDbDate } from "@/lib/date";

interface DraftExpense {
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
        <form className="bg-white/20 p-1.5 rounded-2xl text-white/90 font-mono flex flex-row justify-between items-center gap-1.5" action={() => handleSubmit(draft)}>
            <div className="flex flex-row gap-2">
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
                className="input-item text-3xl focus:outline focus:outline-indigo-400 w-2xs" 
                type="text" 
                placeholder="Laden"
            />
            <input 
                title="Betrag eingeben"
                name="amount"
                required 
                value={draft.amount === 0 ? "" : draft.amount}
                onChange={(e) => setDraft({...draft, amount: Number(e.target.value)})} 
                className="input-item text-3xl focus:outline focus:outline-indigo-400 w-48" 
                type="number" 
                step="any"
                placeholder="Ausgabe"
            />
            <button type="submit" hidden />
        </form>
    );
}