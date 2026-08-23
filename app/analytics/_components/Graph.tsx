"use client";

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type GraphType = "line" | "bar";

interface Props {
    type: GraphType;
    data: Record<string, any>[];
    xKey: string;
    yKey: string;
    valueFormatter?: (value: number) => string;
    emptyMessage?: string;
}

const AXIS_COLOR = "rgba(255, 255, 255, 0.5)";
const GRID_COLOR = "rgba(255, 255, 255, 0.08)";
const ACCENT_COLOR = "#6366f1"; // indigo-500

export default function Graph({
    type,
    data,
    xKey,
    yKey,
    valueFormatter,
    emptyMessage = "Noch keine Daten für diesen Zeitraum.",
}: Props) {
    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-sm text-slate-400">
                {emptyMessage}
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={256}>
        {type === "line" ? (
            <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey={xKey} stroke={AXIS_COLOR} tick={{ fontSize: 12 }} />
            <YAxis
                stroke={AXIS_COLOR}
                tick={{ fontSize: 12 }}
                tickFormatter={valueFormatter}
            />
                <Tooltip
                    labelFormatter={(_label, payload) => payload?.[0]?.payload?.range ?? _label}
                    formatter={(value) =>
                        typeof value === "number" && valueFormatter ? valueFormatter(value) : value
                    }
                    contentStyle={{
                        backgroundColor: "#0a0c2e",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8,
                        color: "white",
                    }}
                />
            <Line
                type="monotone"
                dataKey={yKey}
                stroke={ACCENT_COLOR}
                strokeWidth={2}
                dot={{ r: 3, fill: ACCENT_COLOR }}
            />
            </LineChart>
        ) : (
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={GRID_COLOR} vertical={false} />
            <XAxis dataKey={xKey} stroke={AXIS_COLOR} tick={{ fontSize: 12 }} />
            <YAxis
                stroke={AXIS_COLOR}
                tick={{ fontSize: 12 }}
                tickFormatter={valueFormatter}
            />
                <Tooltip
                    labelFormatter={(_label, payload) => payload?.[0]?.payload?.range ?? _label}
                    formatter={(value) =>
                        typeof value === "number" && valueFormatter ? valueFormatter(value) : value
                    }
                    contentStyle={{
                        backgroundColor: "#0a0c2e",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8,
                        color: "white",
                    }}
                />
            <Bar dataKey={yKey} fill={ACCENT_COLOR} radius={[6, 6, 0, 0]} />
            </BarChart>
        )}
        </ResponsiveContainer>
    );
}