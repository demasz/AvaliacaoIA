import { describe, expect, it } from "vitest";
import { createOrderSchema } from "../../src/schemas/orders.ts";

const productId = "00000000-0000-4000-8000-000000000101";

describe("Validação de pedidos", () => {
  it("aceita itens com UUID e quantidade inteira positiva", () => {
    expect(createOrderSchema.safeParse({ items: [{ productId, quantity: 2 }] }).success).toBe(true);
  });

  it.each([
    { items: [] },
    { items: [{ productId: "inválido", quantity: 1 }] },
    { items: [{ productId, quantity: 0 }] },
    { items: [{ productId, quantity: -1 }] },
    { items: [{ productId, quantity: 1.5 }] },
    { items: [{ productId, quantity: 100 }] },
    {
      items: [
        { productId, quantity: 1 },
        { productId, quantity: 2 },
      ],
    },
    { items: [{ productId, quantity: 1, totalCents: 1 }] },
  ])("rejeita entrada inválida: %j", (input) => {
    expect(createOrderSchema.safeParse(input).success).toBe(false);
  });
});
