"use client";

import { useMemo, useState } from "react";
import { Date_Enum } from "../utility/enum";
import { Spending } from "../utility/type";
import GreetingTitle from "./GreetingTitle";
import ExpenseForm, { DraftExpense } from "./ExpenseForm";
import CardsContainer from "./CardsContainer";
import MonthsView from "./MonthsView";

export default function ExpenseFormDemo() {
    const [entries, setEntries] = useState<DraftExpense[]>([]);
    const [monthView, setMonthView] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<number>(0);

    function handleSubmit(item: DraftExpense) {
        setEntries((prev) => [...prev, item]);
    }

    const spendings: Spending[] = useMemo(() => {
        return entries.map((entry, index) => ({
            id: String(index),
            year: entry.year,
            month: entry.month,
            day: entry.day,
            store: entry.store,
            amount: entry.amount,
        }));
    }, [entries]);

    const handleSelection = (year: number) => {
        setMonthView(true);
        setSelectedYear(year);
    };

    return (
        <div className="flex w-full flex-col items-center gap-8 text-center">
            <GreetingTitle />
            <ExpenseForm onSubmit={handleSubmit} />

            <div className="mx-auto w-full max-w-3xl">
                {monthView ? (
                    <MonthsView
                        selected_year={selectedYear}
                        onClose={() => setMonthView(false)}
                        spending={spendings.filter((s) => s.year === selectedYear)}
                        readOnly
                    />
                ) : spendings.length === 0 ? (
                    <>
                        <p className="text-slate-400 text-sm mx-4">
                            Das ist eine Demo, Einträge werden beim Refresh gelöscht.
                        </p>
                    </>
                ) : (
                    <CardsContainer
                        type={Date_Enum.YEAR}
                        spendings={spendings}
                        onSelect={(year) => handleSelection(year)}
                    />
                )}
            </div>
        </div>
    );
}