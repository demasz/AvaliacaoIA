import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../../src/app.ts";
import type { ApiServices, CategoryDto, OrderDto, ProductDto } from "../../src/types/api.ts";

const category: CategoryDto = {
  id: "00000000-0000-4000-8000-000000000001",
  name: "Pratos principais",
  slug: "mains",
};

const product: ProductDto = {
  id: "00000000-0000-4000-8000-000000000101",
  slug: "mix-de-carnes",
  name: "Mix de Carnes",
  description: "Carnes grelhadas com vegetais.",
  priceCents: 2500,
  category,
  imageUrl: null,
  featured: true,
  featuredLabel: "O favorito da taverna",
};

const order: OrderDto = {
  id: "00000000-0000-4000-8000-000000000201",
  status: "CONFIRMED",
  createdAt: "2026-11-26T20:00:00.000Z",
  items: [
    {
      id: "00000000-0000-4000-8000-000000000301",
      productId: product.id,
      productName: product.name,
      unitPriceCents: product.priceCents,
      quantity: 2,
      subtotalCents: 5000,
    },
  ],
  totalCents: 5000,
};

function createServices(): ApiServices {
  return {
    listCategories: vi.fn(async () => [category]),
    listProducts: vi.fn(async () => [product]),
    getProduct: vi.fn(async () => product),
    createOrder: vi.fn(async () => order),
  };
}

describe("API HTTP contract", () => {
  let services: ApiServices;
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    services = createServices();
    app = createApp(services);
  });

  it("returns a public health response", async () => {
    await request(app).get("/api/health").expect(200, { status: "ok", service: "cardapio-api" });
  });

  it("lists categories and products in the documented envelopes", async () => {
    await request(app)
      .get("/api/categories")
      .expect(200, { data: [category] });
    await request(app)
      .get("/api/products?category=mains&featured=true")
      .expect(200, {
        data: [product],
      });
    expect(services.listProducts).toHaveBeenCalledWith({ category: "mains", featured: true });
  });

  it("rejects malformed product identifiers and unknown routes consistently", async () => {
    const invalidId = await request(app).get("/api/products/nope").expect(400);
    expect(invalidId.body.error.code).toBe("VALIDATION_ERROR");
    const missingRoute = await request(app).get("/api/not-a-route").expect(404);
    expect(missingRoute.body.error.code).toBe("ROUTE_NOT_FOUND");
  });

  it("creates an order using product identifiers and quantities only", async () => {
    await request(app)
      .post("/api/orders")
      .send({ items: [{ productId: product.id, quantity: 2 }] })
      .expect(201, { data: order });
    expect(services.createOrder).toHaveBeenCalledWith({
      items: [{ productId: product.id, quantity: 2 }],
    });
  });

  it("rejects client-supplied financial fields", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({ items: [{ productId: product.id, quantity: 2, priceCents: 1 }] })
      .expect(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
    expect(services.createOrder).not.toHaveBeenCalled();
  });

  it("rejects requests from origins not in the CORS allowlist", async () => {
    await request(app)
      .get("/api/health")
      .set("Origin", "http://localhost:3000")
      .expect(200)
      .expect("Access-Control-Allow-Origin", "http://localhost:3000");

    const response = await request(app)
      .get("/api/health")
      .set("Origin", "https://not-allowed.example")
      .expect(403);
    expect(response.body.error.code).toBe("ORIGIN_NOT_ALLOWED");
  });
});
