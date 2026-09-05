"use client";

import { useTranslations } from "next-intl";
import { login } from "../actions";
import CredentialsForm from "./CredentialsForm";

export function LoginForm() {
    const t = useTranslations("LoginForm");
    return <CredentialsForm action={login} submitLabel={t("submit")} showForgotPassword />;
}