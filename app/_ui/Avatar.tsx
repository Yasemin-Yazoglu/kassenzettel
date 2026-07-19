"use client";

import { useState } from "react";
import { getInitial } from "@/lib/getInitial";

type AvatarSize = "sm" | "md" | "lg";

const sizeClasses: Record<AvatarSize, string> = {
    sm: "w-9 h-9 text-sm",
    md: "w-11 h-11 text-base",
    lg: "w-14 h-14 text-xl",
};

interface Props {
    src?: string | null;
    fallbackText: string;
    size?: AvatarSize;
    className?: string;
}

export default function Avatar({ src, fallbackText, size = "md", className = "" }: Props) {
    const [imageError, setImageError] = useState(false);
    const showImage = src && !imageError;
    const sizeClass = sizeClasses[size];

    if (showImage) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={src}
                alt=""
                className={`${sizeClass} rounded-full object-cover border border-indigo-400/30 shrink-0 ${className}`}
                onError={() => setImageError(true)}
            />
        );
    }

    return (
        <div
            className={`flex items-center justify-center rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-semibold shrink-0 ${sizeClass} ${className}`}
        >
            {getInitial(fallbackText)}
        </div>
    );
}