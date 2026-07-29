export type Period = "week" | "month" | "year";

// Takes a single expense's date and returns the bucket it belongs to
export function getPeriodBucket(spendAt: string, period: Period): { key: string; label: string } {
    const date = new Date(`${spendAt}T00:00:00`);

    switch (period) {
        case "week": {
            const { year, week } = getISOWeek(date);
            return { key: `${year}-W${String(week).padStart(2, "0")}`, label: `KW ${week}` };
        }
        case "month": {
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
            const label = new Intl.DateTimeFormat("de-DE", { month: "short", year: "2-digit" }).format(date);
            return { key, label };
        }
            case "year": {
            const key = String(date.getFullYear());
            return { key, label: key };
        }
    }
}

// ISO 8601 week number
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