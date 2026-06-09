"use client"

import { useFormStatus } from "react-dom";

export function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="
                w-full
                py-3
                rounded-xl
                font-semibold
                text-white
                bg-indigo-600
                hover:bg-indigo-500
                transition
            "
        >
        Login
        </button>
    );
}