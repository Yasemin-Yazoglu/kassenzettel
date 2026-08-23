import { getWeekStart, addDays, formatDayMonth, type Period } from "./period";

export type PeriodRange = {
    start: Date;
    end: Date;
    label: string;
};

export function getPeriodRange(period: Period, anchor: Date): PeriodRange {
    switch (period) {
        case "week": {
            const start = getWeekStart(anchor);
            const end = addDays(start, 6);
            const range = `${formatDayMonth(start)} - ${formatDayMonth(end)}`;
            return { start, end, label: range };
        }
        case "month": {
            const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
            const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
            const label = new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(start);
            return { start, end, label };
        }
        case "year": {
            const start = new Date(anchor.getFullYear(), 0, 1);
            const end = new Date(anchor.getFullYear(), 11, 31);
            return { start, end, label: String(anchor.getFullYear()) };
        }
    }
}

export function shiftAnchor(period: Period, anchor: Date, direction: 1 | -1): Date {
    const next = new Date(anchor);
    if (period === "week") next.setDate(next.getDate() + 7 * direction);
    if (period === "month") next.setMonth(next.getMonth() + direction);
    if (period === "year") next.setFullYear(next.getFullYear() + direction);
    return next;
}