import { z } from "zod";
import { passwordSchema } from "./password";

export const credentialsSchema = z.object({
    email: z.email("Bitte gebe eine gültige email Adresse ein").toLowerCase(),
    password: passwordSchema,
});

export type CredentialsInput = z.infer<typeof credentialsSchema>;

export const requestPasswordResetSchema = z.object({
    email: z.email("Bitte gebe eine gültige email Adresse ein").toLowerCase(),
});

export const updatePasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Die Passwörter stimmen nicht überein",
        path: ["confirmPassword"],
    });