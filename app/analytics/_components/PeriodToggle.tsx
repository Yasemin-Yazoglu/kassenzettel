"use client";

import { useTranslations } from "next-intl";
import type { Period } from "@/lib/aggregations/period";

interface Props {
    value: Period;
    onChange: (period: Period) => void;
}

export default function PeriodToggle({ value, onChange }: Props) {
    const t = useTranslations("Periods");

    const periods: { value: Period; label: string }[] = [
        { value: "week", label: t("week") },
        { value: "month", label: t("month") },
        { value: "year", label: t("year") },
    ];
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