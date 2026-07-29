"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    label: string;
    onPrev: () => void;
    onNext: () => void;
    canGoNext: boolean;
}

export default function PeriodNavigator({ label, onPrev, onNext, canGoNext }: Props) {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={onPrev}
                aria-label="Vorheriger Zeitraum"
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-white font-medium min-w-[110px] text-center">{label}</span>
            <button
                onClick={onNext}
                disabled={!canGoNext}
                aria-label="Nächster Zeitraum"
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}