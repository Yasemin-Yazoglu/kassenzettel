import { DateKey, Sort, Spending } from "./type";

export function group_spendings(type: DateKey, spendings: Spending[], order_by: Sort): [number, number][] {
    const grouped = new Map<number, number>();
    console.log("Spendings", spendings);

    for(const entry of spendings) {
        const key = entry[type] as number;
        console.log(`Grouped key ${key}: `, grouped.get(key));

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

export function month_to_string(month: number): string {
    switch(month) {
        case 1:
            return "Januar";
        case 2:
            return "Februar";
        case 3:
            return "März";
        case 4:
            return "April";
        case 5:
            return "Mai";
        case 6:
            return "Juni";
        case 7:
            return "Juli";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "Oktober";
        case 11:
            return "November";
        case 12:
            return "Dezember";
        default:
            throw new Error("Ungültige Eingabe");
    }
};

export function translate_date_to_german(date_type: DateKey): string {
    switch (date_type) {
        case "year":
            return "Jahr";
        case "month":
            return "Monat";
        case "day":
            return "Tag";
        default:
            throw new Error("Ungültige Eingabe");
    }
};