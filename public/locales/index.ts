import { Language } from "@/app/utility/type";
import de from "./de.json";
import en from "./en.json";

const translations = {
    de,
    en,
};

let currentLanguage: Language = "de";

export function setLanguage(lang: Language) {
    currentLanguage = lang;
    localStorage.setItem("lang", lang);
}

export function getLanguage(): Language {
    if (typeof window === "undefined") return currentLanguage;

    return (
        (localStorage.getItem("lang") as Language) ||
        currentLanguage
    );
}

export function t(key: keyof typeof de): string {
    const lang = getLanguage();
    return translations[lang][key] || key;
}
