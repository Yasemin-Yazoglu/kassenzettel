import { z } from "zod";
import { passwordSchema } from "./password";

export const credentialsSchema = z.object({
    email: z.email("invalidEmail").toLowerCase(),
    password: passwordSchema,
});

export type CredentialsInput = z.infer<typeof credentialsSchema>;

export const requestPasswordResetSchema = z.object({
    email: z.email("invalidEmail").toLowerCase(),
});

export const updatePasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "passwordsDoNotMatch",
        path: ["confirmPassword"],
    });