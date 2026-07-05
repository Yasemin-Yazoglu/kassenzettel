export function toDbDate(day: number, month: number, year: number): string {
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${year}-${pad(month)}-${pad(day)}`
}

export function fromDbDate(dbDate: string): { day: number; month: number; year: number } {
    const [year, month, day] = dbDate.split('-').map(Number)
    return { day, month, year }
}