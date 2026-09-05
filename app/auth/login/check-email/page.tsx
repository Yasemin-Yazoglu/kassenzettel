import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function CheckEmailPage() {
    const t = await getTranslations("CheckEmailPage");

    return (
        <div className="min-h-screen flex justify-center items-start pt-24">
            <div className="rounded-2xl bg-white/5 border border-white/10 w-full max-w-md py-8 px-6 text-center mx-4">
                <h1 className="text-lg font-medium text-white">{t("title")}</h1>
                <p className="text-sm text-white/60 mt-2">
                    {t("description")}
                </p>

                <p className="text-sm text-center text-white/50 mt-6">
                    <Link href="/" className="text-indigo-400 hover:text-indigo-300 transition">
                        {t("backToHome")}
                    </Link>
                </p>
            </div>
        </div>
    );
}