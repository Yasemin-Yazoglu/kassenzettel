"use client";

import { getGreeting } from "@/lib/getGreeting";
import { getName } from "@/lib/getName";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState, useRef } from "react";

const TYPE_SPEED = 60;
const DELETE_SPEED = 35;
const HOLD_BEFORE_DELETE = 1400;

type Phase = "typing1" | "pausing" | "deleting" | "typing2" | "idle";

export default function GreetingTitle() {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [displayed, setDisplayed] = useState("");
    const [phase, setPhase] = useState<Phase>("typing1");
    const [isSmallPhone, setIsSmallPhone] = useState(false);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));

        const updateSize = () => {
            setIsSmallPhone(window.innerWidth < 430);
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const line1 = user && !isSmallPhone ? `${getGreeting()}, ${getName(user)}` : getGreeting();
    const line2 = "Was hast du heute ausgegeben?";
    const loading = user === undefined;

    const prevLine1 = useRef(line1);
    useEffect(() => {
        if (loading) return;
        if (prevLine1.current === line1) return;

        prevLine1.current = line1;
        setDisplayed("");
        setPhase("typing1");
    }, [line1, loading]);

    useEffect(() => {
        if (loading) return;

        if (phase === "typing1") {
            if (displayed.length < line1.length) {
                const t = setTimeout(() => setDisplayed(line1.slice(0, displayed.length + 1)), TYPE_SPEED);
                return () => clearTimeout(t);
            }

            if (isSmallPhone) {
                setPhase("idle");
                return;
            }

            const t = setTimeout(() => setPhase("pausing"), HOLD_BEFORE_DELETE);
            return () => clearTimeout(t);
        }

        if (phase === "pausing") {
            setPhase("deleting");
            return;
        }

        if (phase === "deleting") {
            if (displayed.length > 0) {
                const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_SPEED);
                return () => clearTimeout(t);
            }
            setPhase("typing2");
            return;
        }

        if (phase === "typing2") {
            if (displayed.length < line2.length) {
                const t = setTimeout(() => setDisplayed(line2.slice(0, displayed.length + 1)), TYPE_SPEED);
                return () => clearTimeout(t);
            }
            setPhase("idle");
        }
    }, [displayed, phase, loading, line1, line2, isSmallPhone]);

    const cursorBlinks = phase === "pausing" || phase === "idle" || loading;

    return (
        <h1 className="flex w-full justify-center text-4xl tracking-tight text-white/90 py-4 px-8">
            <span className="sr-only">{line2}</span>
    
            <span className="flex max-w-full items-center gap-3">
                {/* Left bar */}
                <span
                    aria-hidden="true"
                    className="h-[1.5em] w-[2px] shrink-0 bg-white/50"
                />
    
                {/* Text viewport */}
                <span
                    aria-hidden="true"
                    className="relative overflow-hidden whitespace-nowrap "
                    style={{ direction: "rtl" }}
                >
                    <span className="inline-block min-w-full text-center" style={{ direction: "ltr" }}>
                        {displayed}
                    </span>
                </span>
    
                {/* Right bar */}
                <span
                    aria-hidden="true"
                    className={`h-[1.5em] w-[4px] shrink-0 bg-indigo-400 ${
                        cursorBlinks
                            ? "animate-blink transition"
                            : "opacity-100"
                    }`}
                />
            </span>
        </h1>
    );
}