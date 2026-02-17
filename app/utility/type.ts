import { Date_Enum } from "./enum";

export type Language = "de" | "en";

export type DateKey = Date_Enum;

export type Sort = "asc" | "desc";

export type Spending = {
    id: string;
    year: number;
    month: number;
    day: number;
    store: string;
    amount: number;
};