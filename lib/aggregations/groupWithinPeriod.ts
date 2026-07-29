import type { Expense } from "@/lib/types";
import { toDbDate } from "@/lib/date";
import { getPeriodBucket, type Period } from "./period";
import { getPeriodRange } from "./dateRange";

export type PeriodDataPoint = {
    key: string;
    label: string;
    total: number;
    count: number;
};

export function groupWithinPeriod(expenses: Expense[], period: Period, anchor: Date): PeriodDataPoint[] {
    const { start, end } = getPeriodRange(period, anchor);
    const buckets = buildEmptyBuckets(period, start, end);

    for (const expense of expenses) {
        const date = new Date(`${expense.spend_at}T00:00:00`);
        if (date < start || date > end) continue;

        const key = getBucketKey(period, date);
        const bucket = buckets.get(key);
        if (bucket) {
            bucket.total += expense.amount;
            bucket.count += 1;
        }
    }

  return Array.from(buckets.values());
}

function buildEmptyBuckets(period: Period, start: Date, end: Date): Map<string, PeriodDataPoint> {
    const buckets = new Map<string, PeriodDataPoint>();

    if (period === "week") {
        const dayLabels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
        for (let i = 0; i < 7; i++) {
            const d = new Date(start);
            d.setDate(d.getDate() + i);
            const key = toIsoDate(d);
            buckets.set(key, { key, label: dayLabels[i], total: 0, count: 0 });
        }
    } else if (period === "month") {
        const cursor = new Date(start);
        while (cursor <= end) {
            const { key, label } = getPeriodBucket(toIsoDate(cursor), "week");
            if (!buckets.has(key)) buckets.set(key, { key, label, total: 0, count: 0 });
            cursor.setDate(cursor.getDate() + 1);
        }
    } else {
        const monthLabel = new Intl.DateTimeFormat("de-DE", { month: "short" });
        for (let m = 0; m < 12; m++) {
            const d = new Date(start.getFullYear(), m, 1);
            const key = `${start.getFullYear()}-${String(m + 1).padStart(2, "0")}`;
            buckets.set(key, { key, label: monthLabel.format(d), total: 0, count: 0 });
        }
    }

    return buckets;
}

function getBucketKey(period: Period, date: Date): string {
    if (period === "week") return toIsoDate(date);
    if (period === "month") return getPeriodBucket(toIsoDate(date), "week").key;
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function toIsoDate(date: Date): string {
    return toDbDate(date.getDate(), date.getMonth() + 1, date.getFullYear());
}