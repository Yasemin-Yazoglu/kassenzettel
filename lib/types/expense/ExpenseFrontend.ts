/**
 * An expense as the UI uses it.
 * Derived from ExpenseDB: the date is split into parts for grouping and display.
 */
export type ExpenseFrontend = {
    id: string;
    year: number;
    month: number;        // 1-12
    day: number;          // 1-31
    store: string;
    amountCents: number;  // integer cents: 1999 = 19,99 €. Convert with formatCurrencyFromCents().
};