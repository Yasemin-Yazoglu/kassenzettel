import type { Expense } from "@/lib/types";
import { toDbDate } from "@/lib/date";
import { getPeriodBucket, type Period } from "./period";
import { normalizeStoreKey } from "./normalizeStore";

export type StoreDataPoint = {
    store: string;
    total: number;
    count: number;
};

export function groupByStore(expenses: Expense[], period: Period): StoreDataPoint[] {
    const today = new Date();
    const todayIso = toDbDate(today.getDate(), today.getMonth() + 1, today.getFullYear());
    const currentBucketKey = getPeriodBucket(todayIso, period).key;

    const relevant = expenses.filter(
        (expense) => getPeriodBucket(expense.spend_at, period).key === currentBucketKey
    );

    const buckets = new Map<string, StoreDataPoint>();

    for (const expense of relevant) {
        const normKey = normalizeStoreKey(expense.store);
        const existing = buckets.get(normKey);

        if (existing) {
            existing.total += expense.amount;
            existing.count += 1;
        } else {
            buckets.set(normKey, { store: expense.store.trim(), total: expense.amount, count: 1 });
        }
    }

    return Array.from(buckets.values()).sort((a, b) => b.total - a.total);
}