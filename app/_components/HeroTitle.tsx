"use client";

import { getGreeting } from "@/lib/getGreeting";
import { getName } from "@/lib/getName";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const TYPE_SPEED = 60;
const DELETE_SPEED = 35;
const HOLD_BEFORE_DELETE = 1400;

type Phase = "typing1" | "pausing" | "deleting" | "typing2" | "idle";

export default function HeroTitle() {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [displayed, setDisplayed] = useState("");
    const [phase, setPhase] = useState<Phase>("typing1");

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
    }, []);

    const line1 = user ? `${getGreeting()}, ${getName(user)}` : getGreeting();
    const line2 = "Was hast du heute ausgegeben?";
    const loading = user === undefined;

    useEffect(() => {
        if (loading) return;

        if (phase === "typing1") {
            if (displayed.length < line1.length) {
                const t = setTimeout(() => setDisplayed(line1.slice(0, displayed.length + 1)), TYPE_SPEED);
                return () => clearTimeout(t);
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
    }, [displayed, phase, loading, line1, line2]);

    const cursorBlinks = phase === "pausing" || phase === "idle" || loading;

    return (
        <h1 className="flex items-center justify-center gap-3 text-4xl tracking-tight text-white/90 sm:text-4xl">
            <span className="sr-only">{line2}</span>
            <span aria-hidden="true" className="h-[1.5em] w-[2px] bg-white/50" />
            <span aria-hidden="true">{displayed}</span>
            <span
                aria-hidden="true"
                className={`h-[1.5em] w-[4px] bg-indigo-400 ${cursorBlinks ? "animate-blink transition" : "opacity-100"}`}
            />
        </h1>
    );
}