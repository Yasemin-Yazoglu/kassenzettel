export function formatMemberSince(isoDate: string): string {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("de-DE", {
        month: "long",
        year: "numeric",
    }).format(date);
}