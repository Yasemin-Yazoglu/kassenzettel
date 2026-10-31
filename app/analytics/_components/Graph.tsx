"use client";

import { useState } from "react";
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
type Point = Record<string, any>;

interface Props {
    type: GraphType;
    data: Point[];
    xKey: string;
    yKey: string;
    valueFormatter?: (value: number) => string;
    emptyMessage?: string;
    /** Builds the tooltip title from the hovered data point. */
    tooltipLabel?: (point: Point) => string;
    /**
     * Only these x values (values of `xKey`) get an axis label. Without it,
     * recharts picks the ticks itself.
     */
    xTicks?: string[];
    /** Text for an x-axis anchor, built from its data point. Defaults to the x value. */
    xTickLabel?: (point: Point) => string;
    /**
     * Note shown below the x-axis, at the hovered point, only while hovering
     * (e.g. "3 days ago"). Return null for no note.
     */
    hoverNote?: (point: Point) => string | null;
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
    tooltipLabel,
    xTicks,
    xTickLabel,
    hoverNote,
}: Props) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-sm text-slate-400">
                {emptyMessage}
            </div>
        );
    }

    const hovered = hoveredIndex !== null ? data[hoveredIndex] : undefined;
    const note = hovered && hoverNote ? hoverNote(hovered) : null;
    const useCustomTicks = Boolean(xTicks) || Boolean(hoverNote);

    // Anchors plus (while hovering) the hovered point, so its note has a place to render.
    let ticks: string[] | undefined;
    if (xTicks) {
        ticks = [...xTicks];
        if (note && hovered && !ticks.includes(hovered[xKey])) ticks.push(hovered[xKey]);
        ticks.sort((a, b) => data.findIndex((p) => p[xKey] === a) - data.findIndex((p) => p[xKey] === b));
    }

    function renderTick({ x, y, payload }: { x: number | string; y: number | string; payload: { index: number; value: string } }) {
        const dataIndex = data.findIndex((p) => p[xKey] === payload.value);
        const point = data[dataIndex];
        const isAnchor = !xTicks || xTicks.includes(payload.value);
        const isHovered = note !== null && dataIndex === hoveredIndex;
        // Keep the note inside the chart near the edges.
        const anchor = dataIndex < 4 ? "start" : dataIndex > data.length - 5 ? "end" : "middle";

        return (
            <g>
                {isAnchor && (
                    <text x={x} y={Number(y) + 12} textAnchor="middle" fill={AXIS_COLOR} fontSize={12}>
                        {xTickLabel && point ? xTickLabel(point) : payload.value}
                    </text>
                )}
                {isHovered && (
                    <text x={x} y={Number(y) + 30} textAnchor={anchor} fill="white" fontSize={12} fontWeight={600}>
                        {note}
                    </text>
                )}
            </g>
        );
    }

    const xAxis = (
        <XAxis
            dataKey={xKey}
            stroke={AXIS_COLOR}
            tick={useCustomTicks ? renderTick : { fontSize: 12 }}
            ticks={ticks}
            interval={ticks ? 0 : undefined}
            height={hoverNote ? 44 : undefined}
        />
    );

    const hoverHandlers = {
        onMouseMove: (state: { activeTooltipIndex?: unknown }) => {
            // recharts may deliver the index as a number or as a string like "5"
            const raw = state.activeTooltipIndex;
            const parsed = raw === null || raw === undefined || raw === "" ? NaN : Number(raw);
            const index = Number.isInteger(parsed) ? parsed : null;
            setHoveredIndex((prev) => (prev === index ? prev : index));
        },
        onMouseLeave: () => setHoveredIndex(null),
    };

    return (
        <ResponsiveContainer width="100%" height={256}>
        {type === "line" ? (
            <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} {...hoverHandlers}>
            <CartesianGrid stroke={GRID_COLOR} vertical={false} />
            {xAxis}
            <YAxis
                stroke={AXIS_COLOR}
                tick={{ fontSize: 12 }}
                tickFormatter={valueFormatter}
            />
                <Tooltip
                    labelFormatter={(_label, payload) => {
                        const point = payload?.[0]?.payload;
                        if (point && tooltipLabel) return tooltipLabel(point);
                        return point?.range ?? _label;
                    }}
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
                dot={false}
            />
            </LineChart>
        ) : (
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} {...hoverHandlers}>
            <CartesianGrid stroke={GRID_COLOR} vertical={false} />
            {xAxis}
            <YAxis
                stroke={AXIS_COLOR}
                tick={{ fontSize: 12 }}
                tickFormatter={valueFormatter}
            />
                <Tooltip
                    labelFormatter={(_label, payload) => {
                        const point = payload?.[0]?.payload;
                        if (point && tooltipLabel) return tooltipLabel(point);
                        return point?.range ?? _label;
                    }}
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