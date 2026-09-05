import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const SUPPORTED_LOCALES = ["de", "en"];
const DEFAULT_LOCALE = "de";

export default getRequestConfig(async () => {
    const cookieStore = await cookies();
    const stored = cookieStore.get("locale")?.value;
    const locale = SUPPORTED_LOCALES.includes(stored ?? "") ? stored! : DEFAULT_LOCALE;

    return {
        locale,
        messages: (await import(`../locales/${locale}.json`)).default,
    };
});