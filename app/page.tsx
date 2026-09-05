"use client"

import { useMemo, useState } from "react";
import CardsContainer from "./_components/CardsContainer";
import MonthsView from "./_components/MonthsView";
import { Spending } from "./utility/type";
import { Date_Enum } from "./utility/enum";
import { useExpenses } from "@/lib/hooks/useExpenses";
import { useUser } from "@/lib/hooks/useUser";
import { fromDbDate } from "@/lib/date";
import LandingPage from "./_components/LandingPage";
import AddExpenseSection from "./_components/AddExpenseSection";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Expenses");
  const user = useUser();
  const { data: expenses = [], isLoading } = useExpenses({ enabled: !!user });
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

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400 text-sm">Lädt...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        <main className="flex flex-col items-center justify-between w-full max-w-4xl gap-16">
          <div className="mt-26">
            <LandingPage />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <main className="flex flex-col items-center justify-between w-full max-w-4xl gap-16">
        <div className="mx-auto mt-26">
          <AddExpenseSection />
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
              {t("empty")}
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