import { login } from "../actions";
import CredentialsForm from "./CredentialsForm";

export function LoginForm() {
    return <CredentialsForm action={login} submitLabel="Anmelden" showForgotPassword />;
}