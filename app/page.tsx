'use client'

import { useEffect, useState } from "react";
import CardsContainer from "./_components/CardsContainer";
import InputContainer from "./_components/InputContainer";
import Logo from "./_components/logo";
import MonthsView from "./_components/MonthsView";
import Footer from "./_components/Footer";
import { Spending } from "./utility/type";
import { Date_Enum } from "./utility/enum";

export default function Home() {
  const [spendings, setSpendings] = useState<Spending[]>([]);
  const [monthView, setMonthView] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(0);

  useEffect(() => {
    const data = localStorage.getItem("spendings");
    if(data) {
      setSpendings(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "spendings",
      JSON.stringify(spendings)
    );
  }, [spendings]);

  const handleSelection = (year: number) => {
    setMonthView(true);
    setSelectedYear(year);
  }

  return (
    <div className="flex items-center justify-center">
      <main className="flex flex-col items-center justify-between w-full gap-16">
        {/* Logo container */}
        <div className="mx-auto pt-32">
          <Logo />
        </div>

        {/* Input container */}
        <div className="mx-auto">
          <InputContainer setSpendings={setSpendings} />
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

        {/* Footer Section */}
        <div className="mx-auto pb-8">
          <Footer />
        </div>
      </main>
    </div>
  );
}
