"use client";

export type Metric = "total" | "count";

const metrics: { value: Metric; label: string }[] = [
    { value: "total", label: "EUR" },
    { value: "count", label: "Anzahl" },
];

interface Props {
    value: Metric;
    onChange: (metric: Metric) => void;
}

export default function MetricToggle({ value, onChange }: Props) {
    return (
        <div className="inline-flex rounded-xl bg-white/5 border border-white/10 p-1">
            {metrics.map((m) => (
                <button
                    key={m.value}
                    onClick={() => onChange(m.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition ${
                        value === m.value
                        ? "bg-indigo-500 text-white"
                        : "text-slate-300 hover:text-white"
                    }`}
                >
                    {m.label}
                </button>
            ))}
        </div>
    );
}