"use client";

import { useAddExpense } from "@/lib/hooks/useAddExpense";
import { toDbDate } from "@/lib/date";
import GreetingTitle from "./GreetingTitle";
import ExpenseForm, { DraftExpense } from "./ExpenseForm";
import { eurosToCents } from "@/lib/money";

export default function AddExpenseSection() {
    const { mutate: addExpense } = useAddExpense();

    function handleSubmit(item: DraftExpense) {
        addExpense({
            store: item.store,
            amount_cents: eurosToCents(item.amountDecimal),
            spend_at: toDbDate(item.day, item.month, item.year),
        });
    }

    return (
        <div className="flex w-full flex-col items-center gap-8 text-center">
            <GreetingTitle />
            <ExpenseForm onSubmit={handleSubmit} />
        </div>
    );
}