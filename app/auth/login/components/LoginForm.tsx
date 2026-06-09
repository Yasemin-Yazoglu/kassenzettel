import { useActionState } from "react";
import { login } from "../actions";
import { SubmitButton } from "./SubmitButton";

const initialState = {
    message: '',
}

export function LoginForm() {
    const [state, formAction, pending] = useActionState(login, initialState)
    return (
        <form action={formAction} >
            {/* Email field */}
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="deine@email.com"
                className="authInput"
                required
            />

            {/* Password field */}
            <label htmlFor="password">Passwort</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Passwort"
                className="authInput"
                required
                minLength={8}
                maxLength={72}
            />
            <SubmitButton />
        </form>
    );
}