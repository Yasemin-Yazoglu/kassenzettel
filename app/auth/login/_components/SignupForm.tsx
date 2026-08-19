import { signup } from "../actions";
import CredentialsForm from "./CredentialsForm";

export function SignupForm() {
    return <CredentialsForm action={signup} submitLabel="Konto erstellen" />;
}