import { isAuthApiError } from "@supabase/supabase-js";

const KNOWN_ERROR_CODES: Record<string, string> = {
    invalid_credentials: "invalidCredentials",
    email_not_confirmed: "emailNotConfirmed",
    user_already_exists: "userAlreadyExists",
    current_password_required: "currentPasswordRequired",
    current_password_invalid: "currentPasswordRequired",
    weak_password: "weakPassword",
    same_password: "samePassword",
    over_email_send_rate_limit: "rateLimited",
    otp_expired: "otpExpired",
};

const FALLBACK_KEY = "genericError";

export function mapErrorCodeToKey(code: string | null | undefined): string {
    if (!code) return FALLBACK_KEY;

    const key = KNOWN_ERROR_CODES[code];
    if (key) return key;

    console.error("Unmapped Supabase auth error code:", code);
    return FALLBACK_KEY;
}

export function mapAuthErrorToKey(error: unknown): string {
    if (isAuthApiError(error) && error.code) {
        return mapErrorCodeToKey(error.code);
    }

    return FALLBACK_KEY;
}