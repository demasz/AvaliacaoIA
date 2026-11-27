import { z } from "zod";

const orderItemSchema = z
  .object({
    productId: z.string().uuid("O identificador do produto deve ser um UUID válido."),
    quantity: z.number().int("A quantidade deve ser um número inteiro.").min(1).max(99),
  })
  .strict();

export const createOrderSchema = z
  .object({
    items: z.array(orderItemSchema).min(1).max(50),
  })
  .strict()
  .superRefine(({ items }, context) => {
    const productIds = new Set<string>();
    items.forEach((item, index) => {
      if (productIds.has(item.productId)) {
        context.addIssue({
          code: "custom",
          path: ["items", index, "productId"],
          message: "Cada produto deve aparecer uma única vez no pedido.",
        });
      }
      productIds.add(item.productId);
    });
  });
