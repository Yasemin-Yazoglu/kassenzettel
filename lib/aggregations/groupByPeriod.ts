import type { Expense } from "@/lib/types";
import { getPeriodBucket, type Period } from "./period";

export type PeriodDataPoint = {
    key: string;
    label: string;
    total: number;
    count: number;
};

export function groupByPeriod(expenses: Expense[], period: Period): PeriodDataPoint[] {
    const buckets = new Map<string, PeriodDataPoint>();

    for (const expense of expenses) {
        const { key, label } = getPeriodBucket(expense.spend_at, period);
        const existing = buckets.get(key);

        if (existing) {
            existing.total += expense.amount;
            existing.count += 1;
        } else {
            buckets.set(key, { key, label, total: expense.amount, count: 1 });
        }
    }

    return Array.from(buckets.values()).sort((a, b) => a.key.localeCompare(b.key));
}