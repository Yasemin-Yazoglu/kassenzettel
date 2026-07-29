"use client";

import type { Period } from "@/lib/aggregations/period";

const periods: { value: Period; label: string }[] = [
    { value: "week", label: "Woche" },
    { value: "month", label: "Monat" },
    { value: "year", label: "Jahr" },
];

interface Props {
    value: Period;
    onChange: (period: Period) => void;
}

export default function PeriodToggle({ value, onChange }: Props) {
    return (
        <div className="inline-flex rounded-xl bg-white/5 border border-white/10 p-1">
            {periods.map((p) => (
                <button
                    key={p.value}
                    onClick={() => onChange(p.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition ${
                        value === p.value
                        ? "bg-indigo-500 text-white"
                        : "text-slate-300 hover:text-white"
                    }`}
                >
                    {p.label}
                </button>
            ))}
        </div>
    );
}