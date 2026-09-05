export type GreetingKey = "morning" | "afternoon" | "evening";

export function getGreetingKey(): GreetingKey {
    const hour = new Date().getHours();
    if (hour > 4 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    return "evening";
}