"use client";

interface Props {
    stores: string[];
    value: string;
    onChange: (store: string) => void;
}

export default function StoreSelector({ stores, value, onChange }: Props) {
    if (stores.length === 0) {
        return <p className="text-sm text-slate-400">Keine Läden vorhanden.</p>;
    }

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-indigo-400 transition"
        >
            {stores.map((store) => (
                <option key={store} value={store} className="bg-slate-900">
                    {store}
                </option>
            ))}
        </select>
    );
}