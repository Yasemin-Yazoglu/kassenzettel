"use client"

import { useMemo, useState } from "react";
import CardsContainer from "./_components/CardsContainer";
import InputContainer from "./_components/InputContainer";
import Logo from "./_components/logo";
import MonthsView from "./_components/MonthsView";
import { Spending } from "./utility/type";
import { Date_Enum } from "./utility/enum";
import { useExpenses } from "@/app/lib/hooks/useExpenses";
import { fromDbDate } from "@/app/lib/date";

export default function Home() {
  const { data: expenses = [] } = useExpenses();
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
      <main className="flex flex-col items-center justify-between w-full gap-14">
        {/* Logo container */}
        <div className="mx-auto pt-32">
          <Logo />
        </div>

        {/* Input container */}
        <div className="mx-auto">
          <InputContainer />
        </div>

        {/* Cards Container */}
        {monthView ? (
          <div className="w-full">
            <MonthsView selected_year={selectedYear} onClose={() => setMonthView(false)} spending={spendings.filter((spending) => spending.year === selectedYear)} />
          </div>
        ) : (
          <div className="mx-auto w-full">
            <CardsContainer type={Date_Enum.YEAR} spendings={spendings} onSelect={(year: number) => handleSelection(year)} />
          </div>
        )}
      </main>
    </div>
  );
}