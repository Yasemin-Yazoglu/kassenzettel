import { z } from "zod";
import { passwordSchema } from "./password";

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Bitte gib dein aktuelles Passwort ein"),
        newPassword: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Die Passwörter stimmen nicht überein",
        path: ["confirmPassword"],
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
        message: "Das neue Passwort muss sich vom aktuellen unterscheiden",
        path: ["newPassword"],
    });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;