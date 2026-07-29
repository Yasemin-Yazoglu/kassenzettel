"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useExpenses } from "@/lib/hooks/useExpenses";
import SpendOverTimeChart from "./_components/SpendOverTimeChart";

export default function DashboardPage() {
  const { data: expenses = [], isLoading } = useExpenses();

  return (
    <div className="flex justify-center min-h-screen">
      <main className="flex flex-col w-full max-w-2xl gap-8 px-6 py-14">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Zurück zur Startseite"
            title="Zurück zur Startseite"
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-white text-2xl font-semibold">Dashboard</h1>
        </div>

        {isLoading ? (
          <p className="text-slate-400 text-sm">Lädt...</p>
        ) : (
          <SpendOverTimeChart expenses={expenses} />
        )}
      </main>
    </div>
  );
}