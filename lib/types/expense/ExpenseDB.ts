/** A row of the `expense` table, as returned by Supabase. */
export type ExpenseDB = {
    id: string;
    created_at: string;   // ISO timestamp, set by the DB
    updated_at: string;   // ISO timestamp, set by the DB (default on insert, trigger on update)
    store: string;
    amount_cents: number; // integer cents: 1999 = 19,99 €
    user_id: string;      // set by the DB via auth.uid()
    spend_at: string;     // "YYYY-MM-DD"
};

/** What the app sends when creating an expense. The DB fills in the rest. */
export type NewExpenseDB = Pick<ExpenseDB, "store" | "amount_cents" | "spend_at">;