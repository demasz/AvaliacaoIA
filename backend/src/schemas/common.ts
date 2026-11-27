import { z } from "zod";
import { HttpError } from "../utils/http-error.ts";

export function parseOrThrow<T>(schema: z.ZodType<T>, input: unknown): T {
  const parsed = schema.safeParse(input);
  if (parsed.success) return parsed.data;

  throw new HttpError(
    400,
    "VALIDATION_ERROR",
    "A requisição contém dados inválidos.",
    parsed.error.issues.map((issue) => ({
      path: issue.path.map(String).join("."),
      message: issue.message,
    })),
  );
}
