export type Period = "week" | "month" | "year";

export type PeriodDataPoint = {
    key: string;
    label: string;
    range: string;
    total: number;
    count: number;
};

export function getPeriodBucket(spendAt: string, period: Period): { key: string; label: string; range: string } {
    const date = new Date(`${spendAt}T00:00:00`);

    switch (period) {
        case "week": {
            const start = getWeekStart(date);
            const end = addDays(start, 6);
            const { year, week } = getISOWeek(date);
            const range = `${formatDayMonth(start)} - ${formatDayMonth(end)}`;
            return { key: `${year}-W${String(week).padStart(2, "0")}`, label: `KW ${week}`, range };
        }
        case "month": {
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
            const label = new Intl.DateTimeFormat("de-DE", { month: "short", year: "2-digit" }).format(date);
            return { key, label, range: label };
        }
        case "year": {
            const key = String(date.getFullYear());
            return { key, label: key, range: key };
        }
    }
}

export function getISOWeek(date: Date): { year: number; week: number } {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = (d.getUTCDay() + 6) % 7;
    d.setUTCDate(d.getUTCDate() - dayNum + 3);
    const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
    const week =
        1 +
        Math.round(
            ((d.getTime() - firstThursday.getTime()) / 86400000 -
                3 +
                ((firstThursday.getUTCDay() + 6) % 7)) /
                7
        );
    return { year: d.getUTCFullYear(), week };
}

export function getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);
    return d;
}

export function addDays(date: Date, days: number): Date {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

export function formatDayMonth(date: Date): string {
    return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit" }).format(date);
}