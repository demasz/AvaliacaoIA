import { z } from "zod";

export const productIdSchema = z.object({
  id: z.string().uuid("O identificador do produto deve ser um UUID válido."),
});

export const productFilterSchema = z.object({
  category: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "A categoria informada é inválida.")
    .optional(),
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;
      return value === "true";
    }),
});
