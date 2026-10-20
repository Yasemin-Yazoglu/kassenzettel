import type { ExpenseDB } from "@/lib/types/expense/ExpenseDB";
import { normalizeStoreKey } from "./normalizeStore";

export function getDistinctStores(expenses: ExpenseDB[]): string[] {
    const seen = new Map<string, string>();

    for (const expense of expenses) {
        const normKey = normalizeStoreKey(expense.store);
        if (!seen.has(normKey)) {
            seen.set(normKey, expense.store.trim());
        }
    }

    return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
}