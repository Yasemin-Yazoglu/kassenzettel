import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "passwordTooShort")
  .max(72, "passwordTooLong")
  .regex(/[A-Z]/, "passwordNeedsUppercase")
  .regex(/[a-z]/, "passwordNeedsLowercase");