import { isAuthApiError } from "@supabase/supabase-js";

const KNOWN_ERROR_CODES: Record<string, string> = {
    invalid_credentials: "Email oder Passwort ist falsch.",
    email_not_confirmed: "Bitte bestätige zuerst deine Email-Adresse.",
    user_already_exists: "Für diese Email-Adresse existiert bereits ein Konto.",
    current_password_required: "Aktuelles Passwort erforderlich beim Festlegen eines neuen Passworts.",
    current_password_invalid: "Aktuelles Passwort erforderlich beim Festlegen eines neuen Passworts.",
};

export function mapAuthError(error: unknown): string {
    if (isAuthApiError(error) && error.code) {
        return KNOWN_ERROR_CODES[error.code] ?? "Etwas ist schief gelaufen. Bitte versuche es erneut.";
    }

    return "Etwas ist schief gelaufen. Bitte versuche es erneut.";
}