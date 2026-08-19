"use client"

import { useFormStatus } from "react-dom";

interface Props {
    label: string;
}

export function SubmitButton({ label }: Props) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
            {pending ? "Bitte warten..." : label}
        </button>
    );
}