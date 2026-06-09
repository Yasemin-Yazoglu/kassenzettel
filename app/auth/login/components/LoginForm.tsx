import { useActionState, useState } from "react";
import { login } from "../actions";
import { SubmitButton } from "./SubmitButton";

const initialState = {
    message: '',
}

export function LoginForm() {
    const [state, formAction, pending] = useActionState(login, initialState)
    const [visible, setVisible] = useState(false);

    return (
        <form action={formAction} className="space-y-5" >
            {/* Error message */}
            {state.message && (
                <p className="block text-red-400 px-4 py-3 rounded-xl bg-red-400/5 border border-red-400">{state.message}</p>
            )}

            {/* Email field */}
            <label htmlFor="email" className="authLabel" >
                Email
            </label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="deine@email.com"
                className="authInput"
                required
            />

            {/* Password field */}
            <label htmlFor="password" className="authLabel">
                Passwort
            </label>
            <div className="relative inputAutofillWrapper">
                <input 
                    type={visible ? "text" : "password"} 
                    id="password" 
                    name="password" 
                    placeholder="Passwort"
                    className="authInput"
                    required
                    minLength={8}
                    maxLength={72}
                />
                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    aria-label={visible ? "Passwort verbergen" : "Passwort anzeigen"}
                    className="absolute right-3 top-1/2 -translate-y-1/2
                            text-white/50 hover:text-white/80 transition"
                >
                    {visible ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                    ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    )}
                </button>
            </div>
            <SubmitButton />
        </form>
    );
}