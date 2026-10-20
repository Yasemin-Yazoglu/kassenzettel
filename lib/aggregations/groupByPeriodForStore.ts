import type { ExpenseDB } from "@/lib/types/expense/ExpenseDB";
import { getPeriodBucket, type Period, type PeriodDataPoint } from "./period";
import { normalizeStoreKey } from "./normalizeStore";

export function groupByPeriodForStore(
    expenses: ExpenseDB[],
    period: Period,
    store: string
): PeriodDataPoint[] {
    const targetKey = normalizeStoreKey(store);
    const filtered = expenses.filter((expense) => normalizeStoreKey(expense.store) === targetKey);

    const buckets = new Map<string, PeriodDataPoint>();

    for (const expense of filtered) {
        const { key, label, range } = getPeriodBucket(expense.spend_at, period);
        const existing = buckets.get(key);

        if (existing) {
            existing.total += expense.amount_cents;
            existing.count += 1;
        } else {
            buckets.set(key, { key, label, range, total: expense.amount_cents, count: 1 });
        }
    }

    return Array.from(buckets.values()).sort((a, b) => a.key.localeCompare(b.key));
}