"use client";

import { useMemo, useState } from "react";
import { Date_Enum } from "../utility/enum";
import GreetingTitle from "./GreetingTitle";
import ExpenseForm, { DraftExpense } from "./ExpenseForm";
import CardsContainer from "./CardsContainer";
import MonthsView from "./MonthsView";
import { useTranslations } from "next-intl";
import { ExpenseFrontend } from "@/lib/types/expense/ExpenseFrontend";
import { eurosToCents } from "@/lib/money";

export default function ExpenseFormDemo() {
    const t = useTranslations("Expenses")
    const [entries, setEntries] = useState<DraftExpense[]>([]);
    const [monthView, setMonthView] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<number>(0);

    function handleSubmit(item: DraftExpense) {
        setEntries((prev) => [...prev, item]);
    }

    const spendings: ExpenseFrontend[] = useMemo(() => {
        return entries.map((entry, index) => ({
            id: String(index),
            year: entry.year,
            month: entry.month,
            day: entry.day,
            store: entry.store,
            amountCents: eurosToCents(entry.amountDecimal),
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
                            {t("demo")}
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