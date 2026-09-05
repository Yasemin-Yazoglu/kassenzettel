"use client"

import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

interface Props {
    label: string;
}

export function SubmitButton({ label }: Props) {
    const t = useTranslations("SubmitButton");
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
            {pending ? t("pending") : label}
        </button>
    );
}