import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClientError } from "@/lib/api/client";
import { createOrder } from "@/lib/api/orders";
import type { OrderConfirmation } from "@/lib/api/types";

const fetchMock = vi.fn();

const order: OrderConfirmation = {
  id: "order-1",
  status: "CONFIRMED",
  createdAt: "2026-01-01T00:00:00.000Z",
  items: [],
  totalCents: 5000,
};

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("cliente da API", () => {
  it("envia apenas identificadores e quantidades e retorna o pedido da API", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ data: order }),
    });

    await expect(createOrder([{ productId: "product-1", quantity: 2 }])).resolves.toEqual(order);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3001/api/orders",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ items: [{ productId: "product-1", quantity: 2 }] }),
      }),
    );
  });

  it("preserva mensagem e código de erro retornados pela API", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 409,
      json: async () => ({
        error: {
          code: "PRODUCT_UNAVAILABLE",
          message: "Um produto não está disponível.",
        },
      }),
    });

    await expect(createOrder([{ productId: "product-1", quantity: 1 }])).rejects.toMatchObject({
      name: "ApiClientError",
      message: "Um produto não está disponível.",
      status: 409,
      code: "PRODUCT_UNAVAILABLE",
    });
  });

  it("converte falhas de conexão em erro compreensível", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));

    await expect(createOrder([{ productId: "product-1", quantity: 1 }])).rejects.toMatchObject({
      name: "ApiClientError",
      status: undefined,
      code: "NETWORK_ERROR",
    });
  });

  it("rejeita respostas fora do envelope esperado", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => order,
    });

    await expect(createOrder([])).rejects.toBeInstanceOf(ApiClientError);
  });
});
