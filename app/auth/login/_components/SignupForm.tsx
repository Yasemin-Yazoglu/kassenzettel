"use client";

import { useTranslations } from "next-intl";
import { signup } from "../actions";
import CredentialsForm from "./CredentialsForm";

export function SignupForm() {
    const t = useTranslations("SignupForm");
    return <CredentialsForm action={signup} submitLabel={t("submit")} />;
}