"use client";

import { useState, useMemo } from "react";
import { groupWithinPeriod } from "@/lib/aggregations/groupWithinPeriod";
import { getPeriodRange, shiftAnchor } from "@/lib/aggregations/dateRange";
import type { Expense } from "@/lib/types";
import type { Period } from "@/lib/aggregations/period";
import Graph from "./Graph";
import PeriodToggle from "./PeriodToggle";
import PeriodNavigator from "./PeriodNavigator";

interface Props {
    expenses: Expense[];
}

export default function ShoppingFrequencyChart({ expenses }: Props) {
    const [period, setPeriod] = useState<Period>("month");
    const [anchor, setAnchor] = useState<Date>(new Date());

    function handlePeriodChange(newPeriod: Period) {
        setPeriod(newPeriod);
        setAnchor(new Date());
    }

    const data = useMemo(() => groupWithinPeriod(expenses, period, anchor), [expenses, period, anchor]);
    const range = useMemo(() => getPeriodRange(period, anchor), [period, anchor]);

    const canGoNext = useMemo(() => {
        const nextRange = getPeriodRange(period, shiftAnchor(period, anchor, 1));
        return nextRange.start <= new Date();
    }, [period, anchor]);

    return (
        <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="text-white font-semibold">Einkaufshäufigkeit</h3>
                <PeriodToggle value={period} onChange={handlePeriodChange} />
            </div>

            <PeriodNavigator
                label={range.label}
                onPrev={() => setAnchor(shiftAnchor(period, anchor, -1))}
                onNext={() => setAnchor(shiftAnchor(period, anchor, 1))}
                canGoNext={canGoNext}
            />

            <Graph
                type="line"
                data={data}
                xKey="label"
                yKey="count"
                emptyMessage="Noch keine Einkäufe in diesem Zeitraum."
            />
        </div>
    );
}