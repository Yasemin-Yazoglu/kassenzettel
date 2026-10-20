import { fromDbDate } from "@/lib/date";
import type { ExpenseDB } from "@/lib/types/expense/ExpenseDB";
import type { ExpenseFrontend } from "@/lib/types/expense/ExpenseFrontend";

export function toExpenseFrontend(expense: ExpenseDB): ExpenseFrontend {
    const { year, month, day } = fromDbDate(expense.spend_at);
    return {
        id: expense.id,
        year,
        month,
        day,
        store: expense.store,
        amountCents: expense.amount_cents,
    };
}