export function validatePassword(password: string): string | null {
    if (password.length < 8) {
        return "Das Passwort muss mindestens 8 Zeichen lang sein.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Das Passwort muss mindestens einen Großbuchstaben enthalten.";
    }
    if (!/[0-9]/.test(password)) {
        return "Das Passwort muss mindestens eine Zahl enthalten.";
    }
    
    return null;
}