import { z } from "zod";
import { passwordSchema } from "./password";

export const loginSchema = z
  .object({
    email: z
      .email("Bitte gebe eine gültige email Adresse ein")
      .toLowerCase(),

    password: passwordSchema,
  });

export type LoginInput = z.infer<typeof loginSchema>;