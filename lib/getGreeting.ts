export function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour > 4 && hour < 12) return "Guten Morgen";
    if (hour < 18 && hour >= 12) return "Guten Tag";
    if (hour >= 18 && hour <= 4) return "Guten Abend";
    return "Guten Abend";
}