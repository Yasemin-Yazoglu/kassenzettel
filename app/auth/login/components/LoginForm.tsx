import { login } from "../actions";

export function LoginForm() {
    return (
        <form action={login}></form>
    );
}