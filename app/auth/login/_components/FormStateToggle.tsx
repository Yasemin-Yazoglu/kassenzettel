import { useTranslations } from "next-intl";

type FormStateToggleProps = {
    value: 'login' | 'signup';
    onChange: (value: 'login' | 'signup') => void;
};

export default function FormStateToggle({ value, onChange }: FormStateToggleProps) {
    const t = useTranslations("FormStateToggle");

    const TABS: { key: 'login' | 'signup'; label: string }[] = [
        { key: 'login', label: t("login") },
        { key: 'signup', label: t("signup") },
    ];

    return (
        <div className="flex justify-center gap-8 my-6">
            {TABS.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    onClick={() => onChange(tab.key)}
                    className={`relative pb-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                        value === tab.key ? 'text-white' : 'text-white/40 hover:text-white/60'
                    }`}
                >
                    {tab.label}
                    <span
                        className={`absolute -left-2 -right-2 -bottom-px h-px bg-indigo-400 origin-center transition-transform duration-300 ease-out ${
                            value === tab.key ? 'scale-x-100' : 'scale-x-0'
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}