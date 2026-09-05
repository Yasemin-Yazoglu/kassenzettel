import { DateKey, Sort, Spending } from "./type";

export function group_spendings(type: DateKey, spendings: Spending[], order_by: Sort): [number, number][] {
    const grouped = new Map<number, number>();

    for(const entry of spendings) {
        const key = entry[type] as number;

        grouped.set(
            key,
            (((grouped.get(key)) || 0) + (entry.amount * 100))
        );
    }

    if(order_by === "desc") {
        return [...grouped.entries()].sort(
            (a, b) => b[0] - a[0]
        );
    }
    else {
        return [...grouped.entries()].sort(
            (a, b) => a[0] - b[0]
        );
    }
};

export type MonthKey =
    | "january" | "february" | "march" | "april" | "may" | "june"
    | "july" | "august" | "september" | "october" | "november" | "december";

export function month_to_key(month: number): MonthKey {
    switch (month) {
        case 1: return "january";
        case 2: return "february";
        case 3: return "march";
        case 4: return "april";
        case 5: return "may";
        case 6: return "june";
        case 7: return "july";
        case 8: return "august";
        case 9: return "september";
        case 10: return "october";
        case 11: return "november";
        case 12: return "december";
        default: throw new Error("Invalid month input");
    }
}