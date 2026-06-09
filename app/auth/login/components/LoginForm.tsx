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
            <SubmitButton />
        </form>
    );
}