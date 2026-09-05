"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";

type Variant = "dark" | "light";

interface Props {
    id: string;
    label: string;
    name?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    autoComplete?: string;
    variant?: Variant;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

export default function PasswordInput({
    id,
    label,
    name,
    value,
    onChange,
    placeholder,
    autoComplete,
    variant = "dark",
    required,
    minLength,
    maxLength,
}: Props) {
    const t = useTranslations("PasswordInput");
    const [visible, setVisible] = useState(false);

    const inputClass = variant === "dark" ? "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-indigo-400 transition" : "lightInput";
    const labelClass = variant === "dark" ? "text-sm text-slate-300" : "text-sm text-slate-600";
    const toggleClass = variant === "dark" ? "passwordToggleButton" : "passwordToggleButtonLight";

    const controlledProps =
        value !== undefined && onChange
        ? { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value) }
        : {};

    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className={labelClass}>
                {label}
            </label>
            <div className="relative inputAutofillWrapper">
                <input
                    id={id}
                    name={name}
                    type={visible ? "text" : "password"}
                    className={inputClass}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    minLength={minLength}
                    maxLength={maxLength}
                    {...controlledProps}
                />
                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    tabIndex={-1}
                    aria-label={visible ? t("hide") : t("show")}
                    className={toggleClass}
                >
                    {visible ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
            </div>
        </div>
    );
}