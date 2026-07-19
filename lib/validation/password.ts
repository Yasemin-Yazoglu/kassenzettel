import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein")
  .max(72, "Das Passwort darf höchstens 72 Zeichen lang sein")
  .regex(/[A-Z]/, "Es muss einen Großbuchstaben enthalten")
  .regex(/[a-z]/, "Es muss einen Kleinbuchstaben enthalten");