import { useActionState } from "react";
import { login } from "../actions";
import { SubmitButton } from "./SubmitButton";

const initialState = {
    message: '',
}

export function LoginForm() {
    const [state, formAction, pending] = useActionState(login, initialState)
    return (
        <form action={formAction}>
            {/* Email field */}
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            
            {/* Password field */}
            <label htmlFor="password">Passwort</label>
            <input type="password" id="password" name="password" />
            <SubmitButton />
        </form>
    );
}