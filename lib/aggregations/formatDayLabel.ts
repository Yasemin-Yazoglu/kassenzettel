const MS_PER_DAY = 86_400_000;
const RELATIVE_WINDOW_DAYS = 30;

function parseIso(isoDate: string): Date {
    return new Date(`${isoDate}T00:00:00`);
}

/** Full date for the tooltip title, e.g. "Mo., 12. Okt." */
export function formatFullDate(isoDate: string, locale: string): string {
    return new Intl.DateTimeFormat(locale, {
        weekday: "short",
        day: "numeric",
        month: "short",
    }).format(parseIso(isoDate));
}

/** Short date for x-axis anchors, e.g. "12. Okt." */
export function formatShortDate(isoDate: string, locale: string): string {
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(parseIso(isoDate));
}

/** True if the ISO date is a Monday (start of the week). */
export function isWeekStart(isoDate: string): boolean {
    return parseIso(isoDate).getDay() === 1;
}

/**
 * "vor 19 Tagen" / "gestern" / "heute" for today and the 30 days before it.
 * Returns null for older or future dates.
 */
export function formatDaysAgo(isoDate: string, locale: string, now: Date = new Date()): string | null {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const daysAgo = Math.round((today.getTime() - parseIso(isoDate).getTime()) / MS_PER_DAY);

    if (daysAgo < 0 || daysAgo > RELATIVE_WINDOW_DAYS) return null;

    return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-daysAgo, "day");
}