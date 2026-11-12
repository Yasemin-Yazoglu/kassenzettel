"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import type { Ref } from "react";

export function CaptchaWidget({ ref }: { ref?: Ref<TurnstileInstance> }) {
    return (
        <Turnstile
            ref={ref}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            options={{ theme: "light" }}
        />
    );
}