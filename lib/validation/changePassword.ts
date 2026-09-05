import { z } from "zod";
import { passwordSchema } from "./password";

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "currentPasswordRequired"),
        newPassword: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "passwordsDoNotMatch",
        path: ["confirmPassword"],
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
        message: "newPasswordMustDiffer",
        path: ["newPassword"],
    });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;