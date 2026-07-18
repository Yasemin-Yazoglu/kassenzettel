import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .email("Bitte gebe eine gültige email Adresse ein")
      .toLowerCase(),

    password: z
      .string()
      .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein")
      .regex(/[A-Z]/, "Es muss einen Großbuchstaben enthalten")
      .regex(/[a-z]/, "Es muss einen Kleinbuchstaben enthalten")
  })

export type LoginInput = z.infer<typeof loginSchema>;