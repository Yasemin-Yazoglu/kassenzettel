"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { groupWithinPeriod } from "@/lib/aggregations/groupWithinPeriod";
import {
    formatDaysAgo,
    formatFullDate,
    formatShortDate,
    isWeekStart,
} from "@/lib/aggregations/formatDayLabel";
import { getPeriodRange, shiftAnchor } from "@/lib/aggregations/dateRange";
import type { Period } from "@/lib/aggregations/period";
import Graph from "./Graph";
import PeriodToggle from "./PeriodToggle";
import PeriodNavigator from "./PeriodNavigator";
import MetricToggle, { type Metric } from "./MetricToggle";
import { formatCurrencyFromCents } from "@/lib/money";
import { ExpenseDB } from "@/lib/types/expense/ExpenseDB";

interface Props {
    expenses: ExpenseDB[];
}

export default function TimeSeriesChart({ expenses }: Props) {
    const t = useTranslations("TimeSeriesChart");
    const locale = useLocale();
    const [period, setPeriod] = useState<Period>("month");
    const [anchor, setAnchor] = useState<Date>(new Date());
    const [metric, setMetric] = useState<Metric>("total");

    function handlePeriodChange(newPeriod: Period) {
        setPeriod(newPeriod);
        setAnchor(new Date());
    }

    const data = useMemo(() => groupWithinPeriod(expenses, period, anchor), [expenses, period, anchor]);
    const range = useMemo(() => getPeriodRange(period, anchor), [period, anchor]);

    // Month view: one anchor per week (Mondays) instead of a label per day.
    const weekStartTicks = useMemo(
        () => (period === "month" ? data.filter((p) => isWeekStart(p.key)).map((p) => p.label) : undefined),
        [data, period]
    );

    const periodSum = useMemo(
        () => data.reduce((sum, point) => sum + point[metric], 0),
        [data, metric]
    );

    const canGoNext = useMemo(() => {
        const nextRange = getPeriodRange(period, shiftAnchor(period, anchor, 1));
        return nextRange.start <= new Date();
    }, [period, anchor]);

    return (
        <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="text-white font-semibold">
                    {metric === "total" ? t("trend") : t("frequency")}
                </h3>
                <div className="flex items-center gap-3">
                    <MetricToggle value={metric} onChange={setMetric} />
                    <PeriodToggle value={period} onChange={handlePeriodChange} />
                </div>
            </div>
 
            <div className="flex items-center justify-between flex-wrap gap-3">
                <PeriodNavigator
                    label={range.label}
                    onPrev={() => setAnchor(shiftAnchor(period, anchor, -1))}
                    onNext={() => setAnchor(shiftAnchor(period, anchor, 1))}
                    canGoNext={canGoNext}
                />
                <p className="text-2xl font-semibold text-white">
                    {metric === "total" ? formatCurrencyFromCents(periodSum) : periodSum}
                </p>
            </div>

            <Graph
                type="area"
                data={data}
                xKey="label"
                yKey={metric}
                valueFormatter={metric === "total" ? formatCurrencyFromCents : undefined}
                emptyMessage={t("graphEmptyMessage")}
                tooltipLabel={period === "month" ? (point) => formatFullDate(point.key, locale) : undefined}
                xTicks={weekStartTicks}
                xTickLabel={period === "month" ? (point) => formatShortDate(point.key, locale) : undefined}
                hoverNote={period === "month" ? (point) => formatDaysAgo(point.key, locale) : undefined}
            />
        </div>
    );
}