import { signup } from "../actions";

export function SignupForm() {
    return (
        <form action={signup}></form>
    );
}