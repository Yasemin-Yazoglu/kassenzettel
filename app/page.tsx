"use client"

import { useMemo, useState } from "react";
import CardsContainer from "./_components/CardsContainer";
import InputContainer from "./_components/InputContainer";
import MonthsView from "./_components/MonthsView";
import { Spending } from "./utility/type";
import { Date_Enum } from "./utility/enum";
import { useExpenses } from "@/lib/hooks/useExpenses";
import { fromDbDate } from "@/lib/date";
import Logo from "./_components/logo";

export default function Home() {
  const { data: expenses = [], isLoading } = useExpenses();
  const [monthView, setMonthView] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(0);

  const spendings: Spending[] = useMemo(() => {
    return expenses.map((expense) => {
      const { year, month, day } = fromDbDate(expense.spend_at);
      return {
        id: expense.id,
        year,
        month,
        day,
        store: expense.store,
        amount: expense.amount,
      };
    });
  }, [expenses]);

  const handleSelection = (year: number) => {
    setMonthView(true);
    setSelectedYear(year);
  }

  return (
    <div className="flex items-center justify-center">
      <main className="flex flex-col items-center justify-between w-full max-w-4xl gap-14">
        {/* Header */}
        <header className="mt-18">
          <Logo />
        </header>

        {/* Input container */}
        <div className="mx-auto">
          <InputContainer />
        </div>

        <div className="mx-auto w-full max-w-3xl">
          {isLoading ? (
            <p className="text-slate-400 text-sm">Lädt...</p>
          ) : monthView ? (
            <MonthsView
              selected_year={selectedYear}
              onClose={() => setMonthView(false)}
              spending={spendings.filter((s) => s.year === selectedYear)}
            />
          ) : spendings.length === 0 ? (
            <p className="text-slate-400 text-sm mx-4">
              Noch keine Ausgaben erfasst. Trage deine erste Ausgabe ein.
            </p>
          ) : (
            <CardsContainer
              type={Date_Enum.YEAR}
              spendings={spendings}
              onSelect={(year) => handleSelection(year)}
            />
          )}
        </div>
      </main>
    </div>
  );
}