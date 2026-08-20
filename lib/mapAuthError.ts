import { isAuthApiError } from "@supabase/supabase-js";

const KNOWN_ERROR_CODES: Record<string, string> = {
    invalid_credentials: "Email oder Passwort ist falsch.",
    email_not_confirmed: "Bitte bestätige zuerst deine Email-Adresse.",
    user_already_exists: "Für diese Email-Adresse existiert bereits ein Konto.",
    current_password_required: "Aktuelles Passwort erforderlich beim Festlegen eines neuen Passworts.",
    current_password_invalid: "Aktuelles Passwort erforderlich beim Festlegen eines neuen Passworts.",
    weak_password: "Das Passwort ist zu schwach. Bitte wähle ein stärkeres Passwort.",
    same_password: "Das neue Passwort muss sich vom aktuellen unterscheiden.",
    over_email_send_rate_limit: "Zu viele Anfragen. Bitte warte kurz, bevor du es erneut versuchst.",
    otp_expired: "Der Link ist abgelaufen. Bitte fordere einen neuen an.",
};

export function mapAuthError(error: unknown): string {
    if (isAuthApiError(error) && error.code) {
        const message = KNOWN_ERROR_CODES[error.code];
        if (message) return message;

        console.error("Unmapped Supabase auth error code:", error.code);
    }

    return "Etwas ist schief gelaufen. Bitte versuche es erneut.";
}